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

/* Show a small modal to collect details before redirecting to a placeholder (404) page.
   Use by setting button onclick="requireDetailsThenRedirect('404.html')".
*/
(function () {
  function removeModal(modal) {
    modal.remove();
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'rd-modal-overlay';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 9999;

    const box = document.createElement('div');
    box.style.width = 'min(520px, 92%)';
    box.style.background = '#fff';
    box.style.borderRadius = '8px';
    box.style.padding = '18px';
    box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';

    const title = document.createElement('h3');
    title.textContent = 'Please provide details';
    title.style.margin = '0 0 8px 0';
    title.style.fontSize = '1.05rem';

    const hint = document.createElement('p');
    hint.textContent = 'Provide required information before continuing.';
    hint.style.margin = '0 0 12px 0';
    hint.style.color = '#666';
    hint.style.fontSize = '0.9rem';

    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    textarea.placeholder = 'Enter details here...';
    textarea.style.width = '100%';
    textarea.style.padding = '8px';
    textarea.style.border = '1px solid #ddd';
    textarea.style.borderRadius = '4px';

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.justifyContent = 'flex-end';
    actions.style.gap = '8px';
    actions.style.marginTop = '12px';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancel';
    cancel.style.padding = '8px 12px';
    cancel.style.border = 'none';
    cancel.style.background = 'transparent';
    cancel.style.cursor = 'pointer';

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.textContent = 'Continue';
    submit.style.padding = '8px 12px';
    submit.style.border = 'none';
    submit.style.background = 'var(--green, #4CAF50)';
    submit.style.color = '#fff';
    submit.style.borderRadius = '4px';
    submit.style.cursor = 'pointer';

    actions.appendChild(cancel);
    actions.appendChild(submit);

    box.appendChild(title);
    box.appendChild(hint);
    box.appendChild(textarea);
    box.appendChild(actions);
    modal.appendChild(box);

    // keyboard handling
    modal.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') removeModal(modal);
    });

    cancel.addEventListener('click', () => removeModal(modal));

    return { modal, textarea, submit };
  }

  window.requireDetailsThenRedirect = function (url) {
    const { modal, textarea, submit } = createModal();
    document.body.appendChild(modal);
    textarea.focus();

    submit.addEventListener('click', () => {
      const val = textarea.value || '';
      if (val.trim() === '') {
        textarea.focus();
        textarea.style.borderColor = '#e53935';
        return;
      }
      // Here we could store or send 'val' to server. For now proceed to redirect.
      removeModal(modal);
      window.location.href = url;
    });
  };
})();
