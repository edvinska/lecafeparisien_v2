(() => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  const background = [...document.querySelectorAll('main,.site-footer')];
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const label = () => toggle.setAttribute('aria-label', window.LeParisI18n.format(isOpen() ? 'closeMenu' : 'openMenu'));
  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    background.forEach(element => { element.inert = open; });
    label();
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('le-paris-language-change', label);
  document.addEventListener('keydown', event => {
    if (!isOpen()) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false, true); }
    if (event.key === 'Tab') {
      const items = [...document.querySelectorAll('.header-controls select'), toggle, ...menu.querySelectorAll('a,select,button')];
      const current = items.indexOf(document.activeElement);
      event.preventDefault();
      items[(current + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
  window.addEventListener('resize', () => { if (innerWidth > 760 && isOpen()) setOpen(false); });
})();
