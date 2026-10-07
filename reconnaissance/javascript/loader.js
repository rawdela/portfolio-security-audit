/* ================================================================
   LOADER — loader.js
   ================================================================ */
(function () {
  // Apply saved theme immediately so loader background matches
  const theme = localStorage.getItem('edg-theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    // Minimum display time: 900ms so the animation fully plays
    const elapsed = Date.now() - window._loaderStart;
    const remaining = Math.max(0, 900 - elapsed);
    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => loader.remove(), 520);
    }, remaining);
  }

  window._loaderStart = Date.now();
  window.addEventListener('load', hideLoader);

  // Fallback: never block longer than 3s
  setTimeout(hideLoader, 3000);
})();
