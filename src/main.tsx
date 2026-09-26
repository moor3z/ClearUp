import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { currentPath } from './lib/router'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App path={currentPath()} />
  </StrictMode>
)

// Prerendered pages hydrate when the markup matches the route. If a host
// serves a different page's HTML (an SPA fallback, say), render fresh instead.
if (root.firstElementChild && root.dataset.route === currentPath()) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
