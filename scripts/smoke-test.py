"""
Smoke test for the built site in dist/. Run after `npm run build`:
    pip install playwright && playwright install chromium
    python3 scripts/smoke-test.py
Checks rendering, navigation, form behaviour, schema validity and that no
house-clearance / removals wording has crept into any page.
"""
import glob, json, os, re, subprocess, sys, time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
U = 'http://localhost:4173'
res = []
def check(name, ok):
    res.append(ok); print(('PASS' if ok else 'FAIL'), name)

# ---- static checks on dist/
pages = glob.glob(f'{ROOT}/dist/**/index.html', recursive=True)
routes = set()
for f in pages:
    r = '/' + os.path.relpath(os.path.dirname(f), f'{ROOT}/dist').replace('\\', '/'); routes.add('/' if r == '/.' else r + '/')
bad, linked = set(), set()
for f in pages:
    for href in re.findall(r'href="(/[^"#?]*)', open(f).read()):
        if href.startswith(('/brand/', '/fonts/', '/assets/')): continue
        linked.add(href)
        if href not in routes: bad.add(href)
check(f'{len(pages)} pages, no broken internal links', not bad)
check('no orphan pages', not (routes - linked))
dup = 0
for f in pages:
    g = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', open(f).read(), re.S).group(1))
    ids = [n.get('@id') for n in g['@graph']]
    if len(ids) != len(set(ids)): dup += 1
check('schema parses on every page with unique @ids', dup == 0)
offtarget = re.compile(r'house clearance|removals\b|home clearance|moving out|furniture removal|garage|man and van|removal company', re.I)
hits = sum(len(offtarget.findall(re.sub(r'<[^>]+>', ' ', re.sub(r'<script.*?</script>', '', open(f).read(), flags=re.S)))) for f in pages)
check('no house-clearance / removals wording', hits == 0)
check('exactly one h1 per page', all(len(re.findall(r'<h1\b', open(f).read())) == 1 for f in pages))

# ---- browser checks
srv = subprocess.Popen(['npx', 'vite', 'preview', '--port', '4173', '--strictPort'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(2.5)
errs = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={'width': 1440, 'height': 900}); page = ctx.new_page()
        page.on('console', lambda m: errs.append(m.text) if m.type in ('error', 'warning') and '503' not in m.text else None)
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.route('**/api/enquiry', lambda route, req: route.fulfill(status=503, content_type='application/json', body='{"ok":false,"error":"The enquiry form is not connected yet."}'))
        page.goto(U + '/', wait_until='networkidle'); page.wait_for_timeout(400)
        check('home renders hero image', page.evaluate("document.querySelector('#top img')?.naturalWidth > 0"))
        page.click('button:has-text("Our Services")'); page.click('a:has-text("Shed Clearance")'); page.wait_for_timeout(600)
        check('dropdown to service page', page.url.endswith('/shed-clearance-and-dismantling/') and page.input_value('select[name=service]') == 'shed-clearance')
        page.click('#other-areas a:has-text("Mold")') if page.locator('#other-areas').count() else page.click('#service-areas a:has-text("Mold")'); page.wait_for_timeout(600)
        check('service-in-area page', 'Mold' in page.inner_text('h1'))
        page.goto(U + '/contact/', wait_until='networkidle')
        page.click('button[type=submit]'); page.wait_for_timeout(200)
        check('empty submit shows errors', page.locator('.field-error').count() == 5)
        page.fill('input[name=fullName]', 'T'); page.fill('input[name=postcode]', 'CH1 1AA'); page.fill('input[name=email]', 't@example.com')
        page.select_option('#quote-form select[name=service]', 'garden-clearance'); page.fill('textarea[name=job]', 'x')
        page.click('button[type=submit]'); page.wait_for_timeout(500)
        check('unconnected form shows honest error', page.locator('[role=alert]:has-text("not connected")').count() == 1 and page.locator('text=has been sent').count() == 0)
        page.goto(U + '/nothing-here/', wait_until='networkidle')
        check('404 page', 'not here' in page.inner_text('h1'))
        ctx.close()
        ctx = b.new_context(viewport={'width': 390, 'height': 844}); page = ctx.new_page()
        page.on('console', lambda m: errs.append(m.text) if m.type in ('error', 'warning') else None)
        for path in ['/', '/pricing/', '/guides/garden-clearance-vs-skip-hire/', '/garden-clearance/chester/']:
            page.goto(U + path, wait_until='networkidle'); page.wait_for_timeout(250)
            check(f'mobile no overflow {path}', page.evaluate('document.documentElement.scrollWidth') == 390)
        page.goto(U + '/', wait_until='networkidle')
        page.click('button[aria-controls=mobile-nav]'); page.wait_for_timeout(150)
        check('mobile menu opens', page.locator('#mobile-nav').is_visible())
        ctx.close(); b.close()
finally:
    srv.terminate()
check('no console errors or hydration warnings', not errs); print(errs[:3] if errs else '')
print(f'{sum(res)} / {len(res)} passed')
sys.exit(0 if all(res) else 1)
