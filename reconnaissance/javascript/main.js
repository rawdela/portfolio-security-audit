/* ═══════════════════════════════════════════════════════════════
   EUGENE DELA GOGAH · PORTFOLIO · SHARED JS
   ═══════════════════════════════════════════════════════════════ */

/* ── Logo SVG (inline, theme-aware via CSS vars) ── */
const LOGO_SVG = `<img src="/favicon/favicon-512.png" alt="Eugene Dela Gogah Logo" style="width:100%;height:100%;object-fit:contain;display:block;" />`;

/* ── Lucide-compatible inline SVGs ── */
const I = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  extLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  code2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  robot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V4"/><circle cx="12" cy="3" r="1"/><path d="M8 15h.01M16 15h.01M9 19h6"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  graduation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  utensils: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  languages2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  bug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
};

/* ── Theme ── */
const TK = "edg-theme";
function getTheme() {
  return (
    localStorage.getItem(TK) ||
    (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light")
  );
}
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem(TK, t);
  document.querySelectorAll("[data-ti]").forEach((el) => {
    el.innerHTML = t === "dark" ? I.sun : I.moon;
  });
  updateLogoImages(t);
}
function updateLogoImages(t) {
  const light = "/favicon/favicon-512.png";
  const dark = "/favicon/favicon-512_dark.png";
  const src = t === "dark" ? dark : light;
  document.querySelectorAll(".adaptive-logo").forEach((img) => {
    img.src = src;
  });
}
function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/* ── Nav ── */
function getNavPageName(pathname) {
  const lastSegment = pathname.replace(/\/+$/, "").split("/").pop();
  return (lastSegment || "index").replace(/\.html$/i, "").toLowerCase();
}

function buildNav() {
  const currentPage = getNavPageName(window.location.pathname);
  document.querySelectorAll(".site-nav").forEach((wrap) => {
    const pages = [
      ["/", "Home", I.zap],
      ["/about", "About", I.user],
      ["/experience", "Experience", I.briefcase],
      ["/projects", "Projects", I.folder],
      ["/awards", "Awards", I.award],
      ["/skills", "Skills", I.cpu],
    ];

    const links = pages
      .map(([h, l]) => {
        const isActive = getNavPageName(h) === currentPage
          ? ' class="active" aria-current="page"'
          : "";
        return `<li><a href="${h}"${isActive}>${l}</a></li>`;
      })
      .join("");

    const mlinks = pages
      .map(([h, l, ic]) => {
        const isActive = getNavPageName(h) === currentPage
          ? ' class="active" aria-current="page"'
          : "";
        return `<a href="${h}"${isActive}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;flex-shrink:0">
      ${ic.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? ""}
    </svg>
    <span>${l}</span>
  </a>`;
      })
      .join("");

    wrap.innerHTML = `
<nav class="nav" id="mainNav">
  <div class="scroll-progress" aria-hidden="true">
    <span id="scrollProgressBar"></span>
  </div>
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="Home">
<span class="nav-logo-img"><img src="/favicon/favicon-512.png" alt="EG Logo" class="adaptive-logo" style="width:100%;height:100%;object-fit:contain;display:block;"/></span>
    </a>
    <ul class="nav-links">${links}</ul>
    <div class="nav-actions">
  <button class="hamburger" id="hbg" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <button class="icon-btn" id="themeToggleBtn" aria-label="Toggle theme"><span data-ti>${I.moon}</span></button>
</div>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav" aria-hidden="true">${mlinks}</div>`;
  });
}

/* ── Footer ── */
function makeMailto(subject, body) {
  return `mailto:delagogah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildFooter() {
  document.querySelectorAll(".site-footer-wrap").forEach((wrap) => {
    const internshipMail = makeMailto(
      "Internship / remote opportunity",
      `Hi Eugene,

I came across your portfolio and would like to discuss an internship or remote opportunity with you.

Role / opportunity:
Company / organization:
Timeline:
Next steps:

Best regards,`,
    );
    const cyberMail = makeMailto(
      "Cybersecurity project inquiry",
      `Hi Eugene,

I came across your portfolio and would like to discuss a cybersecurity project with you.

Project goal:
Scope / systems involved:
Timeline:
Preferred next steps:

Best regards,`,
    );
    const webMail = makeMailto(
      "Web development collaboration",
      `Hi Eugene,

I came across your portfolio and would like to collaborate with you on a web development project.

Project idea:
Pages / features needed:
Timeline:
Preferred next steps:

Best regards,`,
    );

    wrap.innerHTML = `<section class="footer-connect" aria-label="Connect with Eugene">
    <div class="footer-connect-label">Connect with Eugene</div>
    <div class="footer-social">
      <a class="soc-btn" href="https://www.linkedin.com/in/eugene-gogah-474783328" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">${I.linkedin}</a>
      <a class="soc-btn" href="mailto:delagogah@gmail.com" title="Email" aria-label="Email">${I.mail}</a>
      <a class="soc-btn" href="tel:+233205956178" title="Phone" aria-label="Phone">${I.phone}</a>
      <a class="soc-btn" href="https://wa.me/233559336898" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">${I.whatsapp}</a>
      <a class="soc-btn" href="https://instagram.com/raw._dela" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">${I.instagram}</a>
      <a class="soc-btn" href="https://www.tiktok.com/@raw.dela" target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="TikTok">${I.tiktok}</a>
      <a class="soc-btn" href="https://youtube.com/@thetech_junction" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube">${I.youtube}</a>
      <a class="soc-btn" href="https://github.com/rawdela" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">${I.github}</a>
    </div>
  </section>

<footer>
  <div class="footer-main">
    <div class="footer-brand-wrap">
      <a href="/" class="footer-logo-row footer-home-link" aria-label="Go to home page">
        <span class="footer-logo-img"><img src="/favicon/favicon-512.png" alt="EG Logo" class="adaptive-logo" style="width:100%;height:100%;object-fit:contain;display:block;"/></span>
        <div class="footer-name">Eugene <span class="grad">Dela Gogah</span></div>
      </a>
      <p class="footer-tagline">Computer Science student, web developer, and aspiring cybersecurity engineer building secure digital systems from Accra, Ghana.</p>
    </div>

    <div class="footer-open">
      <div class="footer-mini-title">Open To</div>
      <a href="${internshipMail}">${I.globe}<span>Internship / remote opportunities</span></a>
      <a href="${cyberMail}">${I.shield}<span>Cybersecurity projects</span></a>
      <a href="${webMail}">${I.code2}<span>Web dev collabs</span></a>
    </div>

    <div class="footer-contact">
      <div class="footer-mini-title">Contact</div>
      <a href="mailto:delagogah@gmail.com">${I.mail}<span>delagogah@gmail.com</span></a>
      <a href="tel:+233205956178">${I.phone}<span>+233 20 595 6178</span></a>
      <span>${I.mapPin}<span>Accra, Ghana</span></span>
    </div>
  </div>

  <div class="footer-bottom">
    <span>&copy; 2026 Eugene Dela Gogah</span>
    <span class="footer-bottom-status"><span class="status-dot"></span>Available for opportunities</span>
  </div>
</footer>`;
  });
}

/* ── Page hero banners ── */
const SHARED_PAGE_BANNERS = [
  "/assets/page-banners/banner-01.jpg",
  "/assets/page-banners/banner-02.jpg",
  "/assets/page-banners/banner-03.jpg",
  "/assets/page-banners/banner-04.jpg",
  "/assets/page-banners/banner-05.jpg",
  "/assets/page-banners/banner-06.jpg",
  "/assets/page-banners/banner-07.jpg",
  "/assets/page-banners/banner-08.jpg",
  "/assets/page-banners/banner-09.jpg",
  "/assets/page-banners/banner-10.jpg",
];

const HOME_BANNERS = [
  "/assets/home/home-01.jpg",
  "/assets/home/home-02.jpg",
  "/assets/home/home-03.jpg",
  "/assets/home/home-04.jpg",
  "/assets/home/home-05.jpg",
  "/assets/home/home-06.jpg",
  "/assets/home/home-07.jpg",
  "/assets/home/home-08.jpg",
  "/assets/home/home-09.jpg",
  "/assets/home/home-10.jpg",
];

const PAGE_BANNERS = {
  about: SHARED_PAGE_BANNERS,
  experience: SHARED_PAGE_BANNERS,
  projects: SHARED_PAGE_BANNERS,
  awards: SHARED_PAGE_BANNERS,
  skills: SHARED_PAGE_BANNERS,
};

function preloadBannerImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (img.decode) {
        img
          .decode()
          .then(() => resolve(src))
          .catch(() => resolve(src));
        return;
      }
      resolve(src);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function runWhenIdle(task) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(task, { timeout: 1600 });
    return;
  }
  setTimeout(task, 120);
}

function getPageBannerImages(hero, key) {
  const custom = hero.dataset.bannerImages;
  if (custom) {
    return custom
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
  }
  return PAGE_BANNERS[key] || [];
}

function initRotatingBackground({
  root,
  sources,
  layers,
  noImagesClass,
  hasImagesClass,
  interval = 6500,
}) {
  if (!root || !layers.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const images = [];
  let index = 0;
  let activeLayer = 0;
  let rotationId = null;
  let rootVisible = true;
  let pageVisible = !document.hidden;

  root.classList.add(noImagesClass);

  const canRotate = () =>
    !reduceMotion && images.length > 1 && rootVisible && pageVisible;

  const stopRotation = () => {
    if (!rotationId) return;
    window.clearInterval(rotationId);
    rotationId = null;
  };

  const startRotation = () => {
    if (rotationId || !canRotate()) return;
    rotationId = window.setInterval(() => {
      if (!canRotate()) {
        stopRotation();
        return;
      }

      index = (index + 1) % images.length;
      const nextLayer = activeLayer === 0 ? 1 : 0;

      layers[nextLayer].style.backgroundImage = `url("${images[index]}")`;
      layers[nextLayer].classList.add("is-active");
      layers[activeLayer].classList.remove("is-active");
      activeLayer = nextLayer;
    }, interval);
  };

  const addImage = (image) => {
    if (!image || images.includes(image)) return;

    images.push(image);
    if (images.length === 1) {
      root.classList.remove(noImagesClass);
      root.classList.add(hasImagesClass);
      layers[0].style.backgroundImage = `url("${image}")`;
    }

    startRotation();
  };

  const preloadRemaining = (position) => {
    if (reduceMotion || position >= sources.length) return;

    runWhenIdle(() => {
      preloadBannerImage(sources[position]).then((image) => {
        addImage(image);
        preloadRemaining(position + 1);
      });
    });
  };

  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        rootVisible = entries.some((entry) => entry.isIntersecting);
        if (rootVisible) {
          startRotation();
        } else {
          stopRotation();
        }
      },
      { rootMargin: "160px 0px" },
    );
    visibilityObserver.observe(root);
  }

  document.addEventListener("visibilitychange", () => {
    pageVisible = !document.hidden;
    if (pageVisible) {
      startRotation();
    } else {
      stopRotation();
    }
  });

  if (sources.length) {
    preloadBannerImage(sources[0]).then((image) => addImage(image));
    preloadRemaining(1);
  }
}

function initPageBanners() {
  document.querySelectorAll("[data-page-banner]").forEach((hero) => {
    const key = hero.dataset.pageBanner;
    const sources = getPageBannerImages(hero, key);

    const bg = document.createElement("div");
    bg.className = "page-banner-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = `
      <div class="page-banner-layer is-active"></div>
      <div class="page-banner-layer"></div>
      <div class="page-banner-fallback"></div>
    `;
    hero.prepend(bg);

    const layers = [...bg.querySelectorAll(".page-banner-layer")];

    initRotatingBackground({
      root: hero,
      sources,
      layers,
      noImagesClass: "banner-no-images",
      hasImagesClass: "banner-has-images",
    });
  });
}

function initHomeBanner() {
  const hero = document.querySelector("[data-home-banner]");
  if (!hero) return;

  const sources = hero.dataset.bannerImages
    ? hero.dataset.bannerImages
        .split(",")
        .map((src) => src.trim())
        .filter(Boolean)
    : HOME_BANNERS;

  initRotatingBackground({
    root: hero,
    sources,
    layers: [...hero.querySelectorAll(".home-banner-layer")],
    noImagesClass: "home-banner-no-images",
    hasImagesClass: "home-banner-has-images",
    interval: 6500,
  });
}

/* ── Nav interactions ── */
function initNav() {
  const nav = document.getElementById("mainNav");
  const hbg = document.getElementById("hbg");
  const mob = document.getElementById("mobileNav");
  const progress = document.getElementById("scrollProgressBar");
  let scrollTicking = false;
  let navIsScrolled = null;
  let lastProgress = -1;
  const updateScrollState = () => {
    const scrollEl = document.scrollingElement || document.documentElement;
    const y = Math.max(
      0,
      scrollEl.scrollTop,
      window.scrollY || window.pageYOffset || 0,
    );
    const nextScrolled = navIsScrolled === true ? y > 2 : y > 18;

    if (nav && nextScrolled !== navIsScrolled) {
      nav.classList.remove("scrolled");
      nav.classList.toggle("is-scrolled", nextScrolled);
      nav.classList.toggle("is-at-top", !nextScrolled);
      navIsScrolled = nextScrolled;
    }
    if (!progress) return;

    const scrollable = scrollEl.scrollHeight - window.innerHeight;
    const amount =
      scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
    const rounded = Math.round(amount * 1000) / 1000;
    if (rounded !== lastProgress) {
      progress.style.transform = `scaleX(${rounded})`;
      lastProgress = rounded;
    }
  };
  const requestScrollUpdate = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScrollState();
      scrollTicking = false;
    });
  };

  if (nav || progress) {
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    updateScrollState();
  }
  if (hbg && mob) {
    hbg.addEventListener("click", () => {
      const open = mob.classList.toggle("open");
      hbg.setAttribute("aria-expanded", open);
      mob.setAttribute("aria-hidden", !open);
    });
    mob.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mob.classList.remove("open");
        hbg.setAttribute("aria-expanded", false);
        mob.setAttribute("aria-hidden", true);
      }),
    );
  }
  // Attach theme toggle listener for nav (avoid inline handlers)
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
}

/* ── Scroll reveal ── */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.06, rootMargin: "0px 0px -32px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ── Counter animation ── */
function initCounters() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const suf = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const target = +el.dataset.count;
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }),
    { threshold: 0.5 },
  );
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
}

/* ── Skill bars ── */
function initSkillBars() {
  document.querySelectorAll(".sk-fill").forEach((el) => {
    if (el.dataset.w) return;
    const w = el.style.width;
    el.dataset.w = w;
    el.style.width = w;
    el.style.transformOrigin = "left center";
    el.style.transform = "scaleX(0)";
    el.style.willChange = "transform";
    el.style.transition = "transform 900ms cubic-bezier(0.215,0.61,0.355,1)";
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".sk-fill").forEach((el, i) => {
          setTimeout(() => {
            el.style.transform = "scaleX(1)";
            setTimeout(() => {
              el.style.willChange = "";
            }, 950);
          }, i * 60);
        });
        io.unobserve(e.target);
      }),
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".skill-item, .lang-card")
    .forEach((el) => {
      if (el.dataset.skillObserved) return;
      el.dataset.skillObserved = "true";
      io.observe(el);
    });
}

/* ── Tilt ── */
function initTilt() {
  if (matchMedia("(pointer:coarse), (prefers-reduced-motion: reduce)").matches)
    return;

  document.querySelectorAll("[data-tilt]").forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "true";
    let frameId = null;
    let nextTransform = "";
    let rect = null;

    el.addEventListener("pointerenter", () => {
      rect = el.getBoundingClientRect();
      el.style.willChange = "transform";
    });
    el.addEventListener("pointermove", (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      nextTransform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;

      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        el.style.transform = nextTransform;
        frameId = null;
      });
    });
    el.addEventListener("pointerleave", () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
      rect = null;
      el.style.transform = "";
      el.style.willChange = "";
    });
  });
}

/* ── Custom cursor ── */
function initCursor() {
  if (matchMedia("(pointer:coarse)").matches) return;
  const dot = Object.assign(document.createElement("div"), {
    className: "cursor-dot",
  });
  const ring = Object.assign(document.createElement("div"), {
    className: "cursor-ring",
  });
  document.body.append(dot, ring);
  let mx = -200,
    my = -200,
    rx = -200,
    ry = -200;
  let cursorVisible = false;
  let cursorFrame = null;
  const lerp = (a, b, t) => a + (b - a) * t;
  const renderCursor = () => {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    cursorFrame = cursorVisible ? requestAnimationFrame(renderCursor) : null;
  };
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!cursorVisible) {
      cursorVisible = true;
      document.body.classList.add("cursor-on");
    }
    if (!cursorFrame) cursorFrame = requestAnimationFrame(renderCursor);
  });
  document.addEventListener("mouseleave", () => {
    cursorVisible = false;
    document.body.classList.remove("cursor-on");
  });
  const hot =
    "a,button,.soc-btn,.card,[data-tilt],.skill-item,.lang-card,.hobby-card,.page-card,.website-card,.proj-card,.award-card,.edu-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hot)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget?.closest(hot))
      document.body.classList.remove("cursor-hover");
  });
}

/* ── BOOT ── */
document.addEventListener("DOMContentLoaded", () => {
  setTheme(getTheme());
  buildNav();
  buildFooter();
  initPageBanners();
  initHomeBanner();
  initNav();
  initReveal();
  initCounters();
  initSkillBars();
  initTilt();
  initCursor();
  setTheme(getTheme()); // re-apply icon after nav render
});

// CMS cards arrive after the initial DOM observers and need their existing effects.
["portfolio:cms-loaded", "portfolio:cms-failed"].forEach(event => {
  document.addEventListener(event, () => { initReveal(); initSkillBars(); initTilt(); });
});
