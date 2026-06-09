/* Stackly - Redirect invalid links to 404 */
(function () {
  const VALID = new Set([
    'index.html', 'shop.html', 'pages.html', 'blog.html', 'brand.html',
    'flash-sale.html', 'contact.html', 'login.html', 'signup.html',
    '404.html', 'admin-dashboard.html', 'client-dashboard.html', ''
  ]);

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.startsWith('http') && !href.includes(window.location.hostname) && !href.startsWith(window.location.origin)) return;

    try {
      const url = new URL(href, window.location.origin);
      const page = url.pathname.split('/').pop() || 'index.html';

      if (url.origin === window.location.origin && !VALID.has(page) && !page.includes('#')) {
        e.preventDefault();
        window.location.href = '404.html';
      }
    } catch (_) {
      if (!href.startsWith('http')) {
        e.preventDefault();
        window.location.href = '404.html';
      }
    }
  });
})();
