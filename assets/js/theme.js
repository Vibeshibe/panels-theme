(() => {
  const key = 'panels-theme-appearance';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => value === 'light' || value === 'dark';
  const urlTheme = new URL(window.location.href).searchParams.get('theme');
  let saved = null;
  try { saved = localStorage.getItem(key); } catch { /* Use the system preference when storage is unavailable. */ }
  let followsSystem = !valid(urlTheme) && !valid(saved);
  let selected = valid(urlTheme) ? urlTheme : valid(saved) ? saved : preference.matches ? 'dark' : 'light';

  function apply(theme) {
    selected = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#1b211d' : '#d9dcd2';
    const banner = document.getElementById('panel-banner-image');
    if (banner) {
      const source = theme === 'dark' ? banner.dataset.darkSrc : banner.dataset.lightSrc;
      if (banner.getAttribute('src') !== source) banner.src = source;
    }
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    });
  }

  apply(selected);
  document.addEventListener('DOMContentLoaded', () => {
    apply(selected);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.addEventListener('click', () => {
        followsSystem = false;
        const theme = button.dataset.themeChoice;
        apply(theme);
        try { localStorage.setItem(key, theme); } catch { /* The current selection still works for this visit. */ }
        const url = new URL(window.location.href);
        if (url.searchParams.has('theme')) {
          url.searchParams.set('theme', theme);
          history.replaceState(history.state, '', url);
        }
      });
    });
  });
  preference.addEventListener('change', event => {
    if (followsSystem) apply(event.matches ? 'dark' : 'light');
  });
})();
