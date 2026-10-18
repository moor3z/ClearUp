"""Bundle dist-preview/ into one self-contained HTML file for sharing (not for deployment).
Run after `npm run build:preview`. Output: dist-preview/clearup-preview.html"""
import base64, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = f'{ROOT}/dist-preview'
html = open(f'{d}/index.html').read()
css = open([f'{d}/assets/' + f for f in os.listdir(f'{d}/assets') if f.endswith('.css')][0]).read()
js = open([f'{d}/assets/' + f for f in os.listdir(f'{d}/assets') if f.endswith('.js')][0]).read()
def datauri(path, mime): return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()
css = re.sub(r'''url\(['"]?/fonts/(outfit-\d+\.woff2)['"]?\)''', lambda m: 'url(' + datauri(f'{d}/fonts/' + m.group(1), 'font/woff2') + ')', css)
for f in os.listdir(f'{d}/brand'):
    mime = 'image/webp' if f.endswith('.webp') else 'image/png'
    uri = datauri(f'{d}/brand/{f}', mime)
    js = js.replace(f'"/brand/{f}"', json.dumps(uri)).replace(f'/brand/{f} ', f'{uri} ').replace(f'/brand/{f}"', f'{uri}"')
    html = html.replace(f'"/brand/{f}"', f'"{uri}"')
html = re.sub(r'\s*<link rel="preload"[^>]*>', '', html)
safe = '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:calc(5.5rem + env(safe-area-inset-top,0px))}header{top:env(safe-area-inset-top,0px)!important}</style>'
html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1" />', '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />')
html = html.replace('<div id="root"><!--app-html--></div>', '<div id="root"></div>')
m = re.search(r'<link rel="stylesheet"[^>]*>', html); html = html[:m.start()] + '<style>' + css.replace('</', '<\\/') + '</style>' + safe + html[m.end():]
m = re.search(r'<script type="module" crossorigin src="[^"]+"></script>', html); html = html[:m.start()] + '<script type="module">' + js.replace('</script>', '<\\/script>') + '</script>' + html[m.end():]
open(f'{d}/clearup-preview.html', 'w').write(html)
print('preview KB', len(html) // 1024, 'external refs:', re.findall(r'(?:src|href)="(/[^"]+)"', html))
