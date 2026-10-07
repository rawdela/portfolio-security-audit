(() => {
  const API = (window.PORTFOLIO_CMS_API || "").replace(/\/+$/, "");
  if (!API || API.includes("YOUR-RENDER-SERVICE")) return;
  const collections = [
    "social_links",
    "education",
    "experiences",
    "certifications",
    "projects",
    "skill_categories",
    "skills",
  ];
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const array = (value) => (Array.isArray(value) ? value : []);
  function safeURL(value, schemes = ["http:", "https:", "mailto:", "tel:"]) {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value, location.origin);
      return schemes.includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }
  const icon = (name, fallback = "cpu") =>
    typeof I !== "undefined"
      ? (Object.prototype.hasOwnProperty.call(I, name)
          ? I[name]
          : I[fallback]) || ""
      : "";
  const tags = (values) =>
    array(values)
      .map(
        (value, i) => `<span class="tag ${i ? "" : "a"}">${esc(value)}</span>`,
      )
      .join("");
  function link(value, label, cls = "") {
    const url = safeURL(value);
    return url
      ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`
      : "";
  }
  function image(value, alt, cls = "", style = "") {
    const url = safeURL(value, ["http:", "https:"]);
    if (!url) return "";
    if (/\.pdf($|\?)/i.test(url)) return link(url, "Open PDF", "edu-link");
    return `<img class="${cls}" src="${esc(url)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${style ? `style="${style}"` : ""}>`;
  }
  const originalCards = new Map();
  const normalized = value => String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
  function captureOriginalCards() {
    const selectors = {
      education: [".edu-card", ".edu-name"], experiences: [".exp-card", ".exp-org"],
      certifications: [".award-card", ".award-title"], projects: [".website-card, .proj-card", ".wc-title, .proj-title"],
      skill_categories: [".skill-cat", ".skill-cat-title"], skills: [".skill-item, .soft-card", ".sk-name, .soft-name"],
    };
    Object.entries(selectors).forEach(([kind, [cards, title]]) => {
      originalCards.set(kind, [...document.querySelectorAll(cards)].map(card => ({
        node: card.cloneNode(true), name: normalized(card.querySelector(title)?.textContent),
      })));
    });
  }
  function originalCard(kind, row) {
    const name = normalized(row.institution || (kind === "experiences" ? row.organization : row.title || row.name));
    const cards = originalCards.get(kind) || [];
    let source = cards.find(card => card.name === name);
    if (!source && kind === "projects" && row.image_url?.includes("/restored-icons/")) {
      const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
      source = cards.find(card => row.image_url.includes("/restored-icons/" + slug(card.name) + "-"));
    }
    const result = source?.node.cloneNode(true) || null;
    if (result) {
      [result, ...result.querySelectorAll("[data-tilt-bound], [data-skill-observed], [data-w]")].forEach(node => {
        delete node.dataset.tiltBound;delete node.dataset.skillObserved;delete node.dataset.w;
      });
      result.querySelectorAll(".sk-fill").forEach(fill => fill.style.removeProperty("transform"));
    }
    return result;
  }
  function textInto(card, selector, value) {
    const node = card.querySelector(selector);
    if (!node || normalized(node.textContent) === normalized(value)) return;
    // Keep the original decorative calendar/location SVG when a field is edited.
    const svg = [...node.children].find(child => child.tagName.toLowerCase() === "svg");
    node.replaceChildren(...(svg ? [svg.cloneNode(true)] : []), document.createTextNode(String(value || "")));
  }
  function mediaInto(card, selector, value, alt) {
    const box = card.querySelector(selector);
    const url = safeURL(value, ["http:", "https:"]);
    if (!box) return;
    if (!url) { box.replaceChildren(); return; }
    if (/\.pdf($|\?)/i.test(url)) { box.innerHTML = link(url, "Open PDF", "edu-link"); return; }
    const img = box.querySelector("img") || document.createElement("img");
    img.src = url; img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
    img.removeAttribute("srcset"); box.replaceChildren(img);
  }
  function preserveCard(kind, row, fallback) {
    const card = originalCard(kind, row);
    if (!card) return fallback;
    card.dataset.cmsId = row.id;
    // CSS/markup come from the original page; all displayed fields come from the row.
    const textFields = {
      education: {institution:".edu-name", degree:".edu-degree", period:".edu-date", description:".edu-desc"},
      experiences: {organization:".exp-org", role:".exp-role", period:".exp-date", description:".exp-desc"},
      certifications: {title:".award-title", organization:".award-org", period:".award-year", description:".award-desc"},
      projects: {title:row.project_type === "website" ? ".wc-title" : ".proj-title", description:row.project_type === "website" ? ".wc-desc" : ".proj-desc", year:".proj-year"},
    };
    Object.entries(textFields[kind] || {}).forEach(([key, selector]) => textInto(card, selector, row[key]));
    if (kind === "education" || kind === "experiences") {
      const selector = kind === "education" ? ".edu-meta .tag" : ".exp-badges .tag";
      let status = card.querySelector(selector);
      if (!row.status) status?.remove();
      else if (status) textInto(card, selector, row.status);
      else { status = document.createElement("span");status.className="tag";status.textContent=row.status;card.querySelector(kind === "education" ? ".edu-meta" : ".exp-badges")?.append(status); }
      mediaInto(card, kind === "education" ? ".edu-logo-box" : ".exp-logo-box", row.image_url, row.institution || row.organization);
    }
    if (kind === "education" || kind === "certifications") {
      const selector = kind === "education" ? ".edu-link" : ".credly-btn";
      const url = safeURL(kind === "education" ? row.website_url : row.credential_url);
      const anchor = card.querySelector(selector);
      if (anchor && url) anchor.href = url;
      else if (anchor) anchor.remove();
      else if (url) card.querySelector(kind === "education" ? ".edu-body" : ".award-body")?.insertAdjacentHTML("beforeend", link(url, kind === "education" ? "Visit Website" : "View Credential", selector.slice(1)));
      if (kind === "certifications") mediaInto(card, ".award-img-area", row.image_url, row.title);
    }
    if (kind === "projects") {
      card.dataset.cat = row.category || "web";
      if (row.project_type === "website") {
        card.href = safeURL(row.live_url || row.repo_url) || "#";
        textInto(card, ".preview-url", row.live_url ? new URL(safeURL(row.live_url) || location.origin).hostname : "");
        if (safeURL(row.image_url, ["http:", "https:"])) {
          const wrap = card.querySelector(".iframe-wrap");
          if (wrap) wrap.outerHTML = `<div class="iframe-wrap">${image(row.image_url, row.title, "", "width:100%;height:100%;object-fit:cover")}</div>`;
        } else {
          const frame = card.querySelector("iframe");
          if (frame) frame.src = safeURL(row.live_url, ["https:"]) || "about:blank";
        }
      } else {
        // Original icons are rasterized separately in Storage, not merged into a favicon.
        const box = card.querySelector(".proj-icon-box");
        if (box) box.innerHTML = projectIcon(row);
        const container = card.querySelector(".proj-links");
        if (container) {
          const existing = [...container.querySelectorAll("a")];
          container.replaceChildren();
          const remaining = new Map([[row.live_url,"Live"],[row.repo_url,"GitHub"],[row.extra_url,"More"]].map(([value,label]) => [safeURL(value),label]).filter(([url]) => url));
          existing.forEach(anchor => { if (remaining.has(anchor.href)) { container.append(anchor);remaining.delete(anchor.href); } });
          remaining.forEach((label,url) => container.insertAdjacentHTML("beforeend",link(url,label,"proj-btn")));
        }
      }
    }
    if (kind === "experiences") {
      const bullets = card.querySelector(".exp-bullets");
      if (bullets && JSON.stringify([...bullets.querySelectorAll("li")].map(li => normalized(li.textContent))) !== JSON.stringify(array(row.bullets).map(normalized)))
        bullets.innerHTML = array(row.bullets).map(value => `<li>${esc(value)}</li>`).join("");
      const links = card.querySelector(".exp-links");
      if (links) {
        const existing = [...links.querySelectorAll("a")]; links.replaceChildren();
        array(row.links).forEach(value => {
          const url = safeURL(value.url); if (!url) return;
          const source = existing.find(anchor => anchor.href === url && normalized(anchor.textContent) === normalized(value.label));
          if (source) links.append(source);
          else links.insertAdjacentHTML("beforeend",link(url,value.label || "Open","exp-link-btn"));
        });
      }
    }
    const tagBox = card.querySelector(kind === "projects" ? (row.project_type === "website" ? ".wc-tags" : ".proj-tags") : ".exp-tags");
    if (tagBox) {
      const existing = [...tagBox.querySelectorAll(".tag")];tagBox.replaceChildren();
      array(row.tags).forEach(value => {
        const source = existing.find(tag => normalized(tag.textContent) === normalized(value));
        if (source) tagBox.append(source.cloneNode(true));
        else tagBox.insertAdjacentHTML("beforeend",`<span class="tag">${esc(value)}</span>`);
      });
    }
    return card.outerHTML;
  }
  function projectIcon(row) {
    const url = safeURL(row.image_url, ["http:", "https:"]);
    if (url?.includes("/restored-icons/"))
      return `<span class="restored-project-icon" role="img" aria-label="${esc(row.title)} icon" style="mask-image:url('${esc(url.replace(/'/g, '%27'))}');-webkit-mask-image:url('${esc(url.replace(/'/g, '%27'))}')"></span>`;
    return image(row.image_url, row.title, "", "width:100%;height:100%;object-fit:cover") || icon("folder");
  }
  function skillCard(skill, soft) {
    const source = originalCard("skills", {name:skill.name});
    if (source && Boolean(source.classList.contains("soft-card")) === soft) {
      source.dataset.cmsId = skill.id;
      textInto(source,soft ? ".soft-name" : ".sk-name",skill.name);
      textInto(source,soft ? ".soft-desc" : ".sk-level",skill.level);
      const fill = source.querySelector(".sk-fill");
      if (fill) fill.style.width = Math.max(0,Math.min(100,Number(skill.percent)||0))+"%";
      return source.outerHTML;
    }
    return soft
      ? `<div class="soft-card reveal" data-cms-id="${esc(skill.id)}"><div class="soft-icon">${icon("user")}</div><div class="soft-name">${esc(skill.name)}</div><div class="soft-desc">${esc(skill.level)}</div></div>`
      : `<div class="skill-item" data-cms-id="${esc(skill.id)}"><div class="sk-icon-box">${icon("code2")}</div><span class="sk-name">${esc(skill.name)}</span><div class="sk-bar"><div class="sk-fill" style="width:${Math.max(0,Math.min(100,Number(skill.percent)||0))}%"></div></div><span class="sk-level">${esc(skill.level)}</span></div>`;
  }
  function skillCategory(category, index) {
    const soft = category.icon === "soft-skills";
    const source = originalCard("skill_categories",category);
    const headerIcon = category.icon && !soft ? icon(category.icon,"cpu") : source?.querySelector(".skill-cat-icon")?.innerHTML || icon("user");
    return `${index ? '<hr class="rule" style="margin:2.5rem 0">' : ""}<div class="skill-cat reveal" data-cms-id="${esc(category.id)}"><div class="skill-cat-header"><div class="skill-cat-icon">${headerIcon}</div><div><div class="skill-cat-title">${esc(category.name)}</div><div class="skill-cat-sub">${esc(category.subtitle)}</div></div></div><div class="${soft ? "soft-grid" : "skill-badges"}">${array(category.skills).map(skill => skillCard(skill,soft)).join("")}</div></div>`;
  }

  const snapshots = [],
    fingerprints = new Map();
  function slot(parent, selector) {
    if (!parent) return null;
    const original = selector
      ? [...parent.querySelectorAll(selector)].filter(
          (node) => node.parentNode === parent,
        )
      : [...parent.childNodes];
    const marker = document.createComment("CMS collection");
    parent.insertBefore(marker, original[0] || null);
    let nodes = original;
    const replace = (html) => {
      const template = document.createElement("template");
      template.innerHTML = html;
      nodes.forEach((node) => node.remove());
      nodes = [...template.content.childNodes];
      marker.after(template.content);
    };
    const restore = () => {
      nodes.forEach((node) => node.remove());
      marker.after(...original);
      nodes = original;
    };
    snapshots.push(restore);
    replace.restore = restore;
    return replace;
  }
  function rememberElement(element) {
    if (!element) return;
    const html = element.innerHTML,
      attributes = [...element.attributes].map((a) => [a.name, a.value]);
    const restore = () => {
      element.innerHTML = html;
      [...element.attributes].forEach((a) => element.removeAttribute(a.name));
      attributes.forEach(([name, value]) => element.setAttribute(name, value));
    };
    snapshots.push(restore);
    return restore;
  }
  let renderers,
    inFlight = null,
    failureReported = false;
  function initialize() {
    captureOriginalCards();
    const education = slot(document.querySelector(".edu-list"));
    const experience = slot(
      document.querySelector(".exp-sec .wrap"),
      ".exp-card",
    );
    const certifications = slot(document.querySelector(".awards-grid"));
    const websites = slot(document.querySelector(".web-grid"));
    const projectSlots = [...document.querySelectorAll(".proj-grid")].map(
      (grid, index) => ({
        category:
          grid.previousElementSibling?.dataset.cat ||
          (index ? "robotics" : "cyber"),
        replace: slot(grid),
      }),
    );
    const skills = slot(
      document.querySelector(".skills-sec .wrap"),
      ".skill-cat, hr.rule",
    );
    const footerSocials = slot(document.querySelector(".footer-social"));
    const hero = document.querySelector(".hero h1");
    const counters = [...document.querySelectorAll(".hero-stats [data-count]")];
    const profileNodes = [
      ".hero-desc",
      ".prof-name",
      ".prof-role",
      ".prof-headline",
      ".avatar-wrap img",
      ".prof-meta",
      ".prof-tags",
      "a[download]",
    ].map((selector) => document.querySelector(selector));
    const aboutText = slot(document.querySelector(".prof-body .reveal"), "p");
    const profileRestore = [hero, ...counters, ...profileNodes].map(rememberElement).filter(Boolean);
    const ctaSocials = [...document.querySelectorAll(".cta-btns a")];
    ctaSocials.forEach(rememberElement);
    const ctaPlatforms = new Map(ctaSocials.map(anchor => {
      const href = anchor.getAttribute("href") || "";
      const platform = href.includes("linkedin.com") ? "linkedin" : href.includes("github.com") ? "github" : href.includes("wa.me") ? "whatsapp" : href.startsWith("mailto:") ? "email" : href.startsWith("tel:") ? "phone" : "";
      const footerLink = [...document.querySelectorAll(".footer-social a")].find(link => normalized(link.getAttribute("aria-label")) === platform);
      const key = footerLink && footerLink.getAttribute("href") !== href ? platform + "-cta" : platform;
      return [anchor,{platform,key}];
    }));
    renderers = {
      education: (rows) =>
        education?.(
          rows
            .map(
              (x, i) =>
                preserveCard("education", x, `<div class="edu-card reveal d${(i % 3) + 1}" style="align-items:center" data-cms-id="${esc(x.id)}"><div class="edu-logo-box">${image(x.image_url, x.institution) || icon("graduation").replace("<svg ", '<svg class="edu-logo-svg" ')}</div><div class="edu-body"><div class="edu-name">${esc(x.institution)}</div><div class="edu-degree">${esc(x.degree)}</div><div class="edu-meta"><span class="edu-date">${esc(x.period)}</span>${x.status ? `<span class="tag a">${esc(x.status)}</span>` : ""}</div><p class="edu-desc">${esc(x.description)}</p>${link(x.website_url, "Visit Website", "edu-link")}</div></div>`),
            )
            .join(""),
        ),
      experiences: (rows) =>
        experience?.(
          rows
            .map(
              (x, i) =>
                preserveCard("experiences", x, `<article class="exp-card reveal d${i % 4}" data-cms-id="${esc(x.id)}" data-collapsed="true"><div class="exp-head" data-toggle style="align-items:center"><div class="exp-logo-box">${image(x.image_url, x.organization) || icon("building").replace("<svg ", '<svg class="exp-logo-svg" ')}</div><div class="exp-meta"><div class="exp-org">${esc(x.organization)}</div><div class="exp-role">${esc(x.role)}</div><div class="exp-badges"><span class="exp-date">${esc(x.period)}</span>${x.status ? `<span class="tag">${esc(x.status)}</span>` : ""}</div></div><button class="exp-toggle-btn" aria-expanded="false" aria-label="Toggle details">${icon("chevronDown").replace("<svg ", '<svg class="toggle-chevron" ')}</button></div><div class="exp-body"><p class="exp-desc">${esc(x.description)}</p>${array(x.bullets).length ? `<ul class="exp-bullets">${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}<div class="exp-tags">${tags(x.tags)}</div><div class="exp-links">${array(
                  x.links,
                )
                  .map((l) => link(l.url, l.label || "Open", "exp-link-btn"))
                  .join("")}</div></div></article>`),
            )
            .join(""),
        ),
      certifications: (rows) =>
        certifications?.(
          rows
            .map(
              (x, i) =>
                preserveCard("certifications", x, `<div class="award-card reveal d${(i % 3) + 1}" data-cms-id="${esc(x.id)}"><div class="award-img-area">${image(x.image_url, x.title)}</div><div class="award-body"><div class="award-year">${esc(x.period)}</div><div class="award-title">${esc(x.title)}</div><div class="award-org">${esc(x.organization)}</div><p class="award-desc">${esc(x.description)}</p>${link(x.credential_url, "View Credential", "credly-btn")}</div></div>`),
            )
            .join(""),
        ),
      projects: (rows) => {
        websites?.(
          rows
            .filter((x) => x.project_type === "website")
            .map(
              (x, i) =>
                preserveCard("projects", x, `<a class="website-card reveal d${(i % 3) + 1}" data-cms-id="${esc(x.id)}" data-cat="${esc(x.category || "web")}" href="${esc(safeURL(x.live_url || x.repo_url) || "#")}" target="_blank" rel="noopener noreferrer"><div class="preview-wrap"><div class="preview-bar"><span class="td r"></span><span class="td y"></span><span class="td g"></span><span class="preview-url">${esc(x.live_url || "")}</span></div><div class="iframe-wrap">${image(x.image_url, x.title, "", "width:100%;height:100%;object-fit:cover") || (safeURL(x.live_url,["https:"]) ? `<iframe src="${esc(safeURL(x.live_url,["https:"]))}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin" title="${esc(x.title)} Preview"></iframe>` : "")}</div><div class="preview-hover"><div class="visit-pill">${icon("extLink")}Open Website</div></div></div><div class="wc-info"><div class="wc-title">${esc(x.title)}</div><div class="wc-desc">${esc(x.description)}</div><div class="wc-tags">${tags(x.tags)}</div></div></a>`),
            )
            .join(""),
        );
        projectSlots.forEach(({ category, replace }, index) =>
          replace(
            rows
              .filter(
                (x) =>
                  x.project_type !== "website" &&
                  (x.category === category ||
                    (!index &&
                      !projectSlots.some(
                        (slot) => slot.category === x.category,
                      ))),
              )
              .map(
                (x, i) =>
                  preserveCard("projects", x, `<div class="proj-card reveal d${(i % 3) + 1}" data-cms-id="${esc(x.id)}" data-cat="${esc(x.category || "web")}" data-tilt><div class="proj-top"><div class="proj-icon-box">${projectIcon(x)}</div><span class="proj-year">${esc(x.year)}</span></div><div class="proj-title">${esc(x.title)}</div><div class="proj-desc">${esc(x.description)}</div><div class="proj-tags">${tags(x.tags)}</div><div class="proj-links">${link(x.live_url, "Live", "proj-btn primary")}${link(x.repo_url, "GitHub", "proj-btn")}${link(x.extra_url, "More", "proj-btn")}</div></div>`),
              )
              .join(""),
          ),
        );
      },
      skill_categories: (rows) => skills?.(rows.map(skillCategory).join("")),
      social_links: (rows) => {
        footerSocials?.(
          rows
            .filter(row => !String(row.platform).endsWith("-cta"))
            .map((row) => {
              const platform = String(row.platform || "").toLowerCase();
              const value =
                platform === "email" && !row.url?.startsWith("mailto:")
                  ? "mailto:" + row.url
                  : row.url;
              const url = safeURL(value);
              return url
                ? `<a class="soc-btn" data-cms-id="${esc(row.id)}" href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="${esc(row.label || row.platform)}" aria-label="${esc(row.label || row.platform)}">${icon(row.icon || (platform === "email" ? "mail" : platform), "extLink")}</a>`
                : "";
            })
            .join(""),
        );
        ctaSocials.forEach((anchor) => {
          const {platform,key} = ctaPlatforms.get(anchor);
          if (!platform) return;
          const row = rows.find(x => String(x.platform).toLowerCase() === key);
          anchor.hidden = !row;
          if (row) {
            anchor.href = safeURL(platform === "email" && !row.url.startsWith("mailto:") ? "mailto:" + row.url : row.url) || "#";
            anchor.dataset.cmsId = row.id;
          } else delete anchor.dataset.cmsId;
        });
      },
      profile: (profile) => {
        if (!profile) { profileRestore.forEach(restore=>restore());aboutText?.restore();return; }
        if (profile?.about_text && aboutText) aboutText(profile.about_text.split(/\n\s*\n/).filter(Boolean).map(text => `<p>${esc(text)}</p>`).join(""));
        if (profile?.name && hero) {
          const [first, ...rest] = profile.name.trim().split(/\s+/);
          hero.innerHTML = `${esc(first)}<br><span class="grad">${esc(rest.join(" "))}</span>`;
        }
        [
          [".hero-desc", "summary"],
          [".prof-name", "name"],
          [".prof-role", "headline"],
          [".prof-headline", "subheadline"],
        ].forEach(([selector, key]) => {
          const el = document.querySelector(selector);
          if (el && profile?.[key]) textInto(document,selector,profile[key]);
        });
        const avatar = document.querySelector(".avatar-wrap img");
        if (avatar && safeURL(profile?.avatar_url, ["http:", "https:"]))
          avatar.src = profile.avatar_url;
        const meta = document.querySelector(".prof-meta");
        if (meta && profile?.location) textInto(meta,"span.pcon",profile.location);
        const mail = meta?.querySelector('a[href^="mailto:"]');
        if (mail && profile?.email) { mail.href = "mailto:" + profile.email; textInto(meta,'a[href^="mailto:"]',profile.email); }
        const resume = document.querySelector('a[download]');
        if (resume && safeURL(profile?.resume_url,["http:","https:"])) resume.href = profile.resume_url;
        const availability = document.querySelector(".prof-tags");
        if (availability && profile?.availability) availability.innerHTML = profile.availability.split(",").map((value,index)=>`<span class="tag ${index===0?"a":index===1?"b":""}">${esc(value.trim())}</span>`).join("");
      },
    };
  }
  function render(data) {
    let changed = false;
    for (const [key, renderer] of Object.entries(renderers)) {
      const signature = JSON.stringify(data[key]);
      if (fingerprints.get(key) !== signature) {
        renderer(data[key]);
        fingerprints.set(key, signature);
        changed = true;
      }
    }
    const counts = [
      data.projects.length,
      data.certifications.length,
      data.profile?.years_coding,
    ];
    document
      .querySelectorAll(".hero-stats [data-count]")
      .forEach((node, index) => {
        if (counts[index] != null) {
          node.dataset.count = String(counts[index]);
          node.textContent = counts[index] + (node.dataset.suffix || "");
        }
      });
    document.documentElement.dataset.cmsState = "ready";
    if (changed)
      document.dispatchEvent(
        new CustomEvent("portfolio:cms-loaded", { detail: data }),
      );
  }
  async function refresh() {
    if (inFlight) return inFlight;
    const controller = new AbortController(),
      timer = setTimeout(() => controller.abort(), 20000);
    inFlight = (async () => {
      try {
        const response = await fetch(API + "/api/public/content", {
          cache: "no-store",
          credentials: "omit",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error("Content API returned " + response.status);
        const data = await response.json();
        if (
          !data ||
          typeof data !== "object" ||
          !collections.every((key) => Array.isArray(data[key]))
        )
          throw new Error("Content API returned an invalid schema");
        render(data);
        failureReported = false;
      } catch (error) {
        snapshots.forEach((restore) => restore());
        fingerprints.clear();
        document.documentElement.dataset.cmsState = "fallback";
        document.dispatchEvent(new CustomEvent("portfolio:cms-failed"));
        if (!failureReported)
          console.warn(
            "CMS unavailable; showing static portfolio.",
            error.message,
          );
        failureReported = true;
      } finally {
        clearTimeout(timer);
        inFlight = null;
      }
    })();
    return inFlight;
  }
  function boot() {
    initialize();
    window.PortfolioCMS = Object.freeze({ refresh });
    refresh();
    setInterval(() => {
      if (!document.hidden) refresh();
    }, 30000);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refresh();
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
