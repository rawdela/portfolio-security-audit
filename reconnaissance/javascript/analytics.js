(function () {
  function safeGtagEvent(action, params) {
    if (window.gtag && typeof window.gtag === "function") {
      try {
        gtag("event", action, params || {});
      } catch (e) {}
    }
  }

  // Expose helper to send custom events from inline scripts
  window.__sendAnalyticsEvent = function (action, params) {
    safeGtagEvent(action, params);
  };

  function trackClick(e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    // mailto
    if (href.indexOf("mailto:") === 0) {
      safeGtagEvent("contact_email_click", {
        event_category: "engagement",
        event_label: href,
        transport_type: "beacon",
      });
      return;
    }
    // downloads
    if (href.match(/\.pdf(\?|$)/i)) {
      safeGtagEvent("file_download", {
        event_category: "engagement",
        event_label: href,
      });
      return;
    }
    // social links
    try {
      var url = new URL(href, location.href);
      var host = url.hostname || "";
      if (host.indexOf("linkedin.com") !== -1) {
        safeGtagEvent("social_click", {
          event_category: "social",
          event_label: "linkedin",
        });
        return;
      }
      if (host.indexOf("github.com") !== -1) {
        safeGtagEvent("social_click", {
          event_category: "social",
          event_label: "github",
        });
        return;
      }
      if (host.indexOf("instagram.com") !== -1) {
        safeGtagEvent("social_click", {
          event_category: "social",
          event_label: "instagram",
        });
        return;
      }
      if (host.indexOf("twitter.com") !== -1 || host.indexOf("x.com") !== -1) {
        safeGtagEvent("social_click", {
          event_category: "social",
          event_label: "twitter",
        });
        return;
      }
    } catch (err) {
      /* ignore invalid URLs */
    }

    // project cards and external links
    if (
      a.classList &&
      (a.classList.contains("website-card") ||
        a.classList.contains("proj-link") ||
        a.classList.contains("exp-link-btn"))
    ) {
      safeGtagEvent("project_click", {
        event_category: "engagement",
        event_label: href,
      });
      return;
    }

    // fallback: external link clicks
    if (href.indexOf("http") === 0 && href.indexOf(location.origin) !== 0) {
      safeGtagEvent("external_link", {
        event_category: "engagement",
        event_label: href,
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", trackClick, true);
  });
})();
