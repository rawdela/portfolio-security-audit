/* ═══════════════════════════════════════════════════════
   INDEX PAGE JS — Hero roles + terminal typewriter
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroRoles();
  initTerminalTypewriter();
});

function initHeroRoles() {
  const role = document.getElementById('heroRole');
  if (!role) return;

  const roles = [
    'Computer Science Student',
    'Jr. Cybersecurity Analyst',
    'Web Developer',
    'Aspiring Cybersecurity Engineer',
    'Security-Focused Developer',
  ];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % roles.length;
    role.classList.add('is-changing');

    setTimeout(() => {
      role.textContent = roles[index];
      role.classList.remove('is-changing');
    }, 220);
  }, 2600);
}

function initTerminalTypewriter() {
  const out = document.getElementById('t-out');
  if (!out) return;

  const lines = [
    `{`,
    `&nbsp;&nbsp;<span class="t-k">"name"</span>: <span class="t-s">"Eugene Dela Gogah"</span>,`,
    `&nbsp;&nbsp;<span class="t-k">"role"</span>: <span class="t-s">"CS Student <span class="plain-amp">&amp;</span> Jr. Cybersecurity Analyst"</span>,`,
    `&nbsp;&nbsp;<span class="t-k">"university"</span>: <span class="t-s">"GCTU, Accra"</span>,`,
    `&nbsp;&nbsp;<span class="t-k">"status"</span>: <span class="t-v">"open_to_opportunities"</span>,`,
    `&nbsp;&nbsp;<span class="t-k">"skills"</span>: [<span class="t-s">"Cybersecurity"</span>, <span class="t-s">"Web Dev"</span>, <span class="t-s">"Python"</span>],`,
    `&nbsp;&nbsp;<span class="t-k">"Future Career"</span>: <span class="t-s">"Aspiring Cybersecurity Engineer"</span>,`,
    `&nbsp;&nbsp;<span class="t-k">"location"</span>: <span class="t-s">"Accra, Ghana"</span>`,
    `}`,
  ];

  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const d = document.createElement('div');
    d.innerHTML = lines[i++];
    d.style.cssText = 'opacity:0;transform:translateX(-5px);transition:opacity 200ms,transform 200ms';
    out.appendChild(d);
    requestAnimationFrame(() => { d.style.opacity = '1'; d.style.transform = 'none'; });
    setTimeout(next, 105);
  }
  setTimeout(next, 850);
}
