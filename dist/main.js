// Portfolio interactive logic for Gokulraj S E

const carouselData = [
  {
    id: '01',
    title: 'Selenium WebDriver-Java Framework',
    description: 'Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing.',
    tags: ['Selenium WebDriver', 'Java', 'TestNG', 'POM'],
    year: '2025',
    status: 'Live',
    image: './assets/project-selenium.png',
  },
  {
    id: '02',
    title: 'AI-Assisted Testing Suite',
    description: 'Utilized Google Gemini 3.5 to support AI-based automation tasks, including test data generation and log analysis.',
    tags: ['Gemini 3.5', 'AI Testing', 'Log Analysis'],
    year: '2026',
    status: 'Live',
    image: './assets/project-ai-gemini.png',
  },
  {
    id: '03',
    title: 'PDF Data Extraction & Postman API Suite',
    description: 'Automated extraction of data from PDFs into Excel for validation and reporting, and performed API testing using Postman.',
    tags: ['Postman', 'REST API', 'Excel Automation'],
    year: '2024',
    status: 'Live',
    image: './assets/project-api-postman.png',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initLoader();
  initSidebar();
  initMobileProfile();
  initCopyEmail();
  initPhoneActions();
  initTerminal();
  initFlipCards();
  initFilters();
  initCredentials();
  initContactForm();
  initCarousel();
  initVisitorGeography();
});

// 1. Interactive Starfield / Particle Background
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width < 768 ? 35 : 75, 90);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      isGold: Math.random() > 0.6,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold
        ? `rgba(245, 166, 35, ${p.opacity})`
        : `rgba(255, 255, 255, ${p.opacity * 0.35})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

// 2. Monogram Reveal Loader
function initLoader() {
  const loader = document.getElementById('portfolio-loader');
  if (!loader) return;

  const hasSeen = sessionStorage.getItem('portfolio-loader-seen');
  if (hasSeen === '1') {
    loader.style.display = 'none';
    return;
  }

  setTimeout(() => {
    const pulse = document.getElementById('loader-pulse');
    const subtitle = document.getElementById('loader-subtitle');
    if (pulse) pulse.style.opacity = '1';
    if (subtitle) subtitle.style.opacity = '1';
  }, 450);

  setTimeout(() => {
    loader.classList.add('loader-hidden');
    sessionStorage.setItem('portfolio-loader-seen', '1');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1600);
}

// 3. Desktop Collapsible Sidebar
function initSidebar() {
  const sidebar = document.getElementById('desktop-sidebar');
  if (!sidebar) return;

  const collapsedView = document.getElementById('sidebar-collapsed-view');
  const expandedView = document.getElementById('sidebar-expanded-view');
  if (!collapsedView || !expandedView) return;

  let isExpanded = sessionStorage.getItem('sidebar-expanded') === 'true';

  function updateSidebar() {
    if (isExpanded) {
      sidebar.style.width = '280px';
      collapsedView.classList.add('hidden');
      expandedView.classList.remove('hidden');
    } else {
      sidebar.style.width = '88px';
      expandedView.classList.add('hidden');
      collapsedView.classList.remove('hidden');
    }
  }

  updateSidebar();

  collapsedView.addEventListener('click', () => {
    isExpanded = true;
    sessionStorage.setItem('sidebar-expanded', 'true');
    updateSidebar();
  });

  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isExpanded = false;
      sessionStorage.setItem('sidebar-expanded', 'false');
      updateSidebar();
    });
  }
}

// 4. Mobile Profile Accordion
function initMobileProfile() {
  const toggleBtn = document.getElementById('mobile-profile-toggle');
  const details = document.getElementById('mobile-profile-details');
  const chevron = document.getElementById('mobile-profile-chevron');

  if (!toggleBtn || !details) return;

  let isOpen = false;

  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      details.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      details.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  });
}

// 5. Shared Clipboard Helper & Copy Contact Buttons (Email & Phone)
async function copyTextToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall back to execCommand when clipboard API is blocked (e.g. file:// origins)
    }
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (_) {
    copied = false;
  }
  document.body.removeChild(textarea);
  return copied;
}

function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn, .copy-phone-btn');

  copyButtons.forEach((btn) => {
    let resetTimer = null;
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const fallbackText = btn.classList.contains('copy-phone-btn')
        ? '+91-7358072514'
        : 'segrgokul@gmail.com';
      const targetText = btn.getAttribute('data-copy-text') || fallbackText;
      const copied = await copyTextToClipboard(targetText);
      if (!copied) return;

      const iconCopy = btn.querySelector('.icon-copy');
      const iconCheck = btn.querySelector('.icon-check');
      const toast = btn.querySelector('.copy-toast');

      if (iconCopy) iconCopy.classList.add('hidden');
      if (iconCheck) iconCheck.classList.remove('hidden');
      if (toast) toast.classList.remove('hidden');

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (iconCopy) iconCopy.classList.remove('hidden');
        if (iconCheck) iconCheck.classList.add('hidden');
        if (toast) toast.classList.add('hidden');
      }, 1800);
    });
  });
}

// 5b. Phone Action Modal (shows & copies phone number on desktop instead of launching broken tel: apps)
function initPhoneActions() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]:not([data-tel-direct="true"])');
  const modal = document.getElementById('phone-contact-modal');
  if (!phoneLinks.length || !modal) return;

  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const backdrop = document.getElementById('phone-modal-backdrop');
  const closeBtn = document.getElementById('phone-modal-close');
  const numberEl = document.getElementById('phone-modal-number');
  const statusEl = document.getElementById('phone-modal-copy-status');
  const copyBtn = document.getElementById('phone-modal-copy-btn');
  const copyLabel = document.getElementById('phone-modal-copy-label');
  const dialLink = document.getElementById('phone-modal-dial-link');

  let activePhone = '+91-7358072514';
  let lastTriggerEl = null;
  let labelResetTimer = null;

  function setStatus(copied) {
    if (!statusEl) return;
    statusEl.classList.remove('hidden');
    if (copied) {
      statusEl.textContent = `Copied ${activePhone} to clipboard`;
      statusEl.classList.remove('text-gray-400');
      statusEl.classList.add('text-emerald-400');
    } else {
      statusEl.textContent = `Select or click Copy Number to copy ${activePhone}`;
      statusEl.classList.remove('text-emerald-400');
      statusEl.classList.add('text-gray-400');
    }
  }

  async function openPhoneModal(link) {
    lastTriggerEl = link || document.activeElement;
    const href = link.getAttribute('href') || 'tel:+917358072514';
    activePhone = link.getAttribute('data-phone-display') || href.replace(/^tel:/i, '') || '+91-7358072514';

    if (numberEl) numberEl.textContent = activePhone;
    if (dialLink) dialLink.setAttribute('href', href);
    if (copyLabel) copyLabel.textContent = 'Copy Number';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const copied = await copyTextToClipboard(activePhone);
    setStatus(copied);
    if (closeBtn) closeBtn.focus();
  }

  function closePhoneModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
      lastTriggerEl = null;
    }
  }

  phoneLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (isMobileDevice) return;
      e.preventDefault();
      openPhoneModal(link);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const copied = await copyTextToClipboard(activePhone);
      setStatus(copied);
      if (copyLabel) {
        copyLabel.textContent = copied ? 'Copied!' : 'Copy Number';
        if (labelResetTimer) clearTimeout(labelResetTimer);
        labelResetTimer = setTimeout(() => {
          copyLabel.textContent = 'Copy Number';
        }, 1600);
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closePhoneModal);
  if (backdrop) backdrop.addEventListener('click', closePhoneModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closePhoneModal();
  });
}

// 6. Interactive Terminal Drawer
function initTerminal() {
  const fab = document.getElementById('terminal-fab');
  const drawer = document.getElementById('terminal-drawer');
  const closeBtn = document.getElementById('terminal-close-btn');
  const backdrop = document.getElementById('terminal-backdrop');
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const form = document.getElementById('terminal-form');

  if (!fab || !drawer) return;

  function openTerminal() {
    drawer.classList.remove('terminal-closed');
    if (backdrop) backdrop.classList.remove('hidden');
    if (input) setTimeout(() => input.focus(), 150);
  }

  function closeTerminal() {
    drawer.classList.add('terminal-closed');
    if (backdrop) backdrop.classList.add('hidden');
  }

  fab.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
  if (backdrop) backdrop.addEventListener('click', closeTerminal);

  if (!form || !input || !output) return;

  function appendLine(text, className = 'text-gray-300') {
    const div = document.createElement('div');
    div.className = `leading-relaxed ${className}`;
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  const commands = {
    help: () => {
      appendLine('<span class="text-gold font-bold">Available Commands:</span>');
      appendLine('  <span class="text-gold">whoami</span>      - Overview of Gokulraj S E');
      appendLine('  <span class="text-gold">skills</span>      - Technical testing skills & automation');
      appendLine('  <span class="text-gold">experience</span>  - Career journey & work history');
      appendLine('  <span class="text-gold">projects</span>    - Featured QA & automation suites');
      appendLine('  <span class="text-gold">contact</span>     - Reach out info (email, phone, location)');
      appendLine('  <span class="text-gold">socials</span>     - LinkedIn, GitHub, Email links');
      appendLine('  <span class="text-gold">date</span>        - Current date & system timestamp');
      appendLine('  <span class="text-gold">hire</span>        - Open mail client to collaborate');
      appendLine('  <span class="text-gold">clear</span>       - Clear terminal screen');
      appendLine('  <span class="text-gold">exit</span>        - Close terminal window');
    },
    whoami: () => {
      appendLine('<span class="text-gold font-bold">Gokulraj S E</span>');
      appendLine('Software Test Engineer — Manual & Automation Testing');
      appendLine('📍 Chennai, Tamil Nadu, India');
      appendLine('3+ years of QA experience building data-driven & hybrid Selenium frameworks, API validation, and AI-assisted automation.');
    },
    skills: () => {
      appendLine('<span class="text-gold font-bold">Technical Skills:</span>');
      appendLine('  <span class="text-white font-medium">Test Automation:</span> Selenium WebDriver, TestNG, Maven, POM, Playwright, Tesseract OCR');
      appendLine('  <span class="text-white font-medium">Languages:</span> Java, SQL');
      appendLine('  <span class="text-white font-medium">API & DevOps:</span> Postman, REST API Testing, Jenkins, Git');
      appendLine('  <span class="text-white font-medium">AI & RPA:</span> Google Gemini 3.5, Automation Anywhere');
      appendLine('  <span class="text-white font-medium">Databases:</span> MySQL, SSMS, PostgreSQL');
      appendLine('  <span class="text-white font-medium">Methodologies:</span> Agile/Scrum, Regression, Integration, UAT, Cross-Browser');
    },
    experience: () => {
      appendLine('<span class="text-gold font-bold">Work Experience:</span>');
      appendLine('  1. <span class="text-white font-semibold">Coempt Eduteck</span> (Dec 2024 – Present)');
      appendLine('     Role: Automation Test Engineer');
      appendLine('     - Selenium WebDriver-Java data-driven framework, Postman API testing, Jenkins CI/CD, Gemini 3.5 AI testing.');
      appendLine('  2. <span class="text-white font-semibold">Kaaspro Enterprises</span> (Oct 2023 – Nov 2024)');
      appendLine('     Role: Quality Assurance Engineer');
      appendLine('     - Manual & automation regression, cross-platform compatibility, mentored junior QA testers.');
      appendLine('  3. <span class="text-white font-semibold">Medusind Solution</span> (Jan 2023 – Jul 2023)');
      appendLine('     Role: Software Tester Trainee');
      appendLine('     - Automation Anywhere RPA bot monitoring, web application defect logging.');
    },
    projects: () => {
      appendLine('<span class="text-gold font-bold">Featured Projects:</span>');
      appendLine('  1. Selenium Java Data-Driven Framework (POM + TestNG + Jenkins)');
      appendLine('  2. AI-Assisted Testing Suite (Google Gemini 3.5 for test data & log analysis)');
      appendLine('  3. PDF-to-Excel Data Validation & Postman API Integrity Suite');
      appendLine('  4. Kaaspro Cross-Platform Test Automation Suite');
      appendLine('  5. RPA Bot Monitoring & Live Defect Resolution Engine');
      appendLine('  6. COEMPT Project Planner — Requirement Tracker V1.0 (5 Role Flows, SLA & OTP Portal)');
      appendLine('  7. Intruder Detection System for Home Security (Python + Email & Twilio Alerts)');
      appendLine('  <span class="text-gray-400">Visit <a href="./projects.html" class="text-gold underline">projects.html</a> for interactive 3D cards.</span>');
    },
    contact: () => {
      appendLine('<span class="text-gold font-bold">Contact Details:</span>');
      appendLine('  Email    : segrgokul@gmail.com');
      appendLine('  Phone    : +91-7358072514');
      appendLine('  Location : Chennai, Tamil Nadu');
    },
    socials: () => {
      appendLine('<span class="text-gold font-bold">Social Links:</span>');
      appendLine('  Email    : <a href="mailto:segrgokul@gmail.com" class="text-gold underline">segrgokul@gmail.com</a>');
      appendLine('  LinkedIn : <a href="https://www.linkedin.com/in/gokulrajse/" target="_blank" class="text-gold underline">linkedin.com/in/gokulrajse</a>');
      appendLine('  GitHub   : <a href="https://github.com/segrgokul" target="_blank" class="text-gold underline">github.com/segrgokul</a>');
    },
    date: () => {
      appendLine(`<span class="text-gold">${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'medium' })}</span>`);
    },
    hire: () => {
      appendLine('<span class="text-gold">Opening default email client...</span>');
      window.location.href = 'mailto:segrgokul@gmail.com?subject=QA%20Opportunity';
    },
    clear: () => {
      output.innerHTML = '';
    },
    exit: () => {
      closeTerminal();
    },
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    appendLine(`<span class="text-gold font-mono">&gt; ${cmd}</span>`);

    if (commands[cmd]) {
      commands[cmd]();
    } else {
      appendLine(`Command not found: <span class="text-red-400">${cmd}</span>. Type <span class="text-gold">help</span> for a list of commands.`, 'text-gray-400');
    }
  });
}

// 7. 3D Flip Card Handlers
function initFlipCards() {
  const flipContainers = document.querySelectorAll('.flip-card-container');

  flipContainers.forEach((container) => {
    const innerCard = container.querySelector('.flip-card-inner');
    if (!innerCard) return;

    if (!container.hasAttribute('tabindex')) container.tabIndex = 0;
    if (!container.hasAttribute('role')) container.setAttribute('role', 'button');
    container.setAttribute(
      'aria-pressed',
      innerCard.classList.contains('rotate-y-180') ? 'true' : 'false'
    );

    const toggleFlip = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const flipped = innerCard.classList.toggle('rotate-y-180');
      container.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    };

    container.addEventListener('click', toggleFlip);
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a') || e.target.closest('button')) return;
        e.preventDefault();
        toggleFlip(e);
      }
    });
  });
}

// 8. Dynamic Filter Buttons
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filterable-item');
  const projectsDesktopGrid = document.getElementById('projects-desktop-grid');
  const projectsCountLabel = document.getElementById('projects-count-label');
  const credsDesktopTimeline = document.getElementById('creds-desktop-timeline');
  const credsCountLabel = document.getElementById('creds-count-label');

  if (filterButtons.length === 0 || filterItems.length === 0) return;

  const canonicalItems = projectsDesktopGrid
    ? projectsDesktopGrid.querySelectorAll('.filterable-item')
    : credsDesktopTimeline
      ? credsDesktopTimeline.querySelectorAll('.filterable-item')
      : filterItems;

  if (projectsDesktopGrid) {
    projectsDesktopGrid.querySelectorAll('.filterable-item').forEach((item) => {
      if (!item.dataset.defaultGridArea && item.style.gridArea) {
        item.dataset.defaultGridArea = item.style.gridArea;
      }
    });
  }

  function countMatching(selected) {
    let n = 0;
    canonicalItems.forEach((item) => {
      const cats = (item.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
      if (selected === 'all' || cats.includes(selected)) n += 1;
    });
    return n;
  }

  function updateSummaryCount(count) {
    if (projectsCountLabel) {
      projectsCountLabel.textContent = count + (count === 1 ? ' project' : ' projects');
    }
    if (credsCountLabel) {
      credsCountLabel.textContent = count + (count === 1 ? ' certificate' : ' certificates');
    }
  }

  function repackDesktopGrid() {
    if (!projectsDesktopGrid) return;
    const desktopCards = Array.from(projectsDesktopGrid.querySelectorAll('.filterable-item'));
    const visibleCards = [];
    desktopCards.forEach((item) => {
      item.style.gridArea = item.dataset.defaultGridArea || '';
      if (item.style.display !== 'none') visibleCards.push(item);
    });

    if (visibleCards.length === 1) {
      visibleCards[0].style.gridArea = 'span 1 / span 3';
    } else if (
      visibleCards.length === 4 &&
      (visibleCards[0].dataset.defaultGridArea || '').startsWith('span 2 / span 2')
    ) {
      visibleCards[3].style.gridArea = 'span 1 / span 3';
    }
  }

  function repackCredsTimeline() {
    if (!credsDesktopTimeline) return;
    const rows = Array.from(credsDesktopTimeline.querySelectorAll('.cred-timeline-row'));
    let visibleIdx = 0;
    rows.forEach((row) => {
      if (row.style.display === 'none') {
        row.classList.remove('is-flipped', 'is-active');
        return;
      }
      const isEven = visibleIdx % 2 === 0;
      row.classList.toggle('flex-row', isEven);
      row.classList.toggle('flex-row-reverse', !isEven);
      const slot = row.querySelector('.cred-card-slot');
      if (slot) {
        slot.classList.toggle('justify-end', isEven);
        slot.classList.toggle('justify-start', !isEven);
      }
      visibleIdx += 1;
    });
  }

  // Keep button badge counts automatically synchronized with actual cards
  filterButtons.forEach((btn) => {
    const countSpan = btn.querySelector('.filter-count');
    const selected = btn.getAttribute('data-filter');
    if (countSpan && selected) {
      countSpan.textContent = '(' + countMatching(selected) + ')';
    }
    btn.setAttribute('aria-pressed', btn.classList.contains('bg-gold') ? 'true' : 'false');
  });
  updateSummaryCount(countMatching('all'));

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('bg-gold', 'text-dark', 'border-gold', 'font-semibold');
        b.classList.add('bg-dark-100', 'border-dark-300', 'text-gray-400', 'hover:border-gold/50', 'hover:text-white');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.remove('bg-dark-100', 'border-dark-300', 'text-gray-400', 'hover:border-gold/50', 'hover:text-white');
      btn.classList.add('bg-gold', 'text-dark', 'border-gold', 'font-semibold');
      btn.setAttribute('aria-pressed', 'true');

      filterItems.forEach((item) => {
        if (item._filterTimer) {
          clearTimeout(item._filterTimer);
          item._filterTimer = null;
        }
        const itemCategories = (item.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
        if (selected === 'all' || itemCategories.includes(selected)) {
          item.style.display = '';
          item.style.transform = '';
          item.style.opacity = '0';
          item._filterTimer = setTimeout(() => {
            item._filterTimer = null;
            item.style.transition = 'opacity 0.25s ease';
            item.style.opacity = '1';
          }, 20);
        } else {
          item.style.display = 'none';
          item.style.opacity = '';
          item.style.transform = '';
          item.classList.remove('is-flipped', 'is-active');
          const innerCard = item.querySelector('.flip-card-inner');
          if (innerCard) innerCard.classList.remove('rotate-y-180');
          if (item.classList.contains('flip-card-container')) {
            item.setAttribute('aria-pressed', 'false');
          }
        }
      });

      repackDesktopGrid();
      repackCredsTimeline();
      updateSummaryCount(countMatching(selected));
    });
  });
}

// 8b. Credentials Timeline & Certificate Modal Lightbox
function initCredentials() {
  const dataEl = document.getElementById('cred-data');
  const modal = document.getElementById('cred-modal');
  if (!dataEl || !modal) return;

  let creds = [];
  try {
    creds = JSON.parse(dataEl.textContent || '[]');
  } catch (_) {
    return;
  }

  const titleEl = document.getElementById('cred-modal-title');
  const tagsEl = document.getElementById('cred-modal-tags');
  const imgEl = document.getElementById('cred-modal-img');
  const descEl = document.getElementById('cred-modal-desc');
  const metaEl = document.getElementById('cred-modal-meta');
  const downloadEl = document.getElementById('cred-modal-download');
  const verifyEl = document.getElementById('cred-modal-verify');
  const verifiedEl = document.getElementById('cred-modal-verified');
  const closeBtn = document.getElementById('cred-modal-close');
  let lastTriggerEl = null;

  function openModal(idx, triggerEl) {
    const c = creds[idx];
    if (!c) return;
    lastTriggerEl = triggerEl || document.activeElement;

    if (titleEl) titleEl.textContent = c.title || '';
    if (tagsEl) {
      tagsEl.innerHTML = '';
      (c.tags || []).forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 text-xs font-mono bg-gold/10 border border-gold/40 text-gold rounded-lg uppercase tracking-wide';
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }
    if (imgEl) {
      imgEl.src = c.image || '';
      imgEl.alt = c.title || 'Certificate Preview';
    }
    if (descEl) {
      descEl.textContent = c.description || '';
    }
    if (metaEl) {
      metaEl.textContent = (c.issuer || '') + (c.date ? ' • ' + c.date : '');
    }
    if (verifyEl) {
      if (typeof c.verifyUrl === 'string' && /^https?:\/\//i.test(c.verifyUrl)) {
        verifyEl.href = c.verifyUrl;
        verifyEl.classList.remove('hidden');
        verifyEl.classList.add('flex');
      } else {
        verifyEl.href = '#';
        verifyEl.classList.add('hidden');
        verifyEl.classList.remove('flex');
      }
    }
    if (downloadEl && verifiedEl) {
      if (c.hasRealCert && c.image) {
        downloadEl.href = c.image;
        downloadEl.setAttribute('download', c.downloadName || (c.id || 'certificate') + '.jpg');
        downloadEl.classList.remove('hidden');
        downloadEl.classList.add('flex');
        verifiedEl.classList.add('hidden');
        verifiedEl.classList.remove('flex');
      } else {
        downloadEl.classList.add('hidden');
        downloadEl.classList.remove('flex');
        verifiedEl.classList.remove('hidden');
        verifiedEl.classList.add('flex');
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
      lastTriggerEl = null;
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  const desktopCards = document.querySelectorAll('.cred-flip-card');
  desktopCards.forEach((card) => {
    const row = card.closest('.cred-timeline-row');
    const idx = Number(card.getAttribute('data-cred-index'));

    card.addEventListener('mouseenter', () => {
      if (row) row.classList.add('is-active');
    });
    card.addEventListener('mouseleave', () => {
      if (row) row.classList.remove('is-active');
    });

    card.addEventListener('click', () => {
      const noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
      if (noHover && row && !row.classList.contains('is-flipped')) {
        document.querySelectorAll('.cred-timeline-row.is-flipped').forEach((r) => r.classList.remove('is-flipped'));
        row.classList.add('is-flipped');
        return;
      }
      openModal(idx, card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(idx, card);
      }
    });
  });

  document.querySelectorAll('.cred-mobile-card').forEach((btn) => {
    const idx = Number(btn.getAttribute('data-cred-index'));
    btn.addEventListener('click', () => openModal(idx, btn));
  });
}

// 9. Contact Form Email Delivery Modal (Mail App & Gmail)
function buildContactMailLinks(recipient, name, email, message) {
  const subject = `Portfolio Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { mailtoUrl, gmailUrl };
}

function setFormError(statusMsg, text) {
  statusMsg.textContent = '';
  const span = document.createElement('span');
  span.className = 'text-red-400';
  span.textContent = text;
  statusMsg.appendChild(span);
}

function initContactSendModal() {
  const modal = document.getElementById('contact-send-modal');
  const backdrop = document.getElementById('contact-send-backdrop');
  const closeBtn = document.getElementById('contact-send-close');
  const recipientEl = document.getElementById('contact-modal-recipient');
  const senderEl = document.getElementById('contact-modal-sender');
  const messageEl = document.getElementById('contact-modal-message');
  const mailLink = document.getElementById('contact-modal-mail-link');
  const gmailLink = document.getElementById('contact-modal-gmail-link');
  if (!modal || !mailLink || !gmailLink) return null;

  let lastFocused = null;

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function openModal({ recipient, name, email, message, mailtoUrl, gmailUrl }) {
    lastFocused = document.activeElement;
    if (recipientEl) recipientEl.textContent = recipient;
    if (senderEl) senderEl.textContent = `${name} <${email}>`;
    if (messageEl) messageEl.textContent = message;
    mailLink.href = mailtoUrl;
    gmailLink.href = gmailUrl;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  }

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  return { openModal, closeModal };
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  if (!form || !statusMsg) return;

  const modalController = initContactSendModal();
  const recipient = 'segrgokul@gmail.com';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const msgEl = document.getElementById('user-msg');
    const name = (nameEl ? nameEl.value : '').trim();
    const email = (emailEl ? emailEl.value : '').trim();
    const message = (msgEl ? msgEl.value : '').trim();

    if (name.length < 2) {
      setFormError(statusMsg, 'Please enter your name (at least 2 characters).');
      if (nameEl) nameEl.focus();
      return;
    }

    if (!emailPattern.test(email)) {
      setFormError(statusMsg, 'Please enter a valid email address (e.g. name@company.in).');
      if (emailEl) emailEl.focus();
      return;
    }

    if (message.length < 2) {
      setFormError(statusMsg, 'Please enter a message before sending.');
      if (msgEl) msgEl.focus();
      return;
    }

    statusMsg.textContent = '';
    const links = buildContactMailLinks(recipient, name, email, message);
    if (modalController) {
      modalController.openModal({
        recipient,
        name,
        email,
        message,
        mailtoUrl: links.mailtoUrl,
        gmailUrl: links.gmailUrl,
      });
    }
  });
}

// 10. Selected Projects Carousel (matching Pic 2)
function initCarousel() {
  const desktopCards = document.querySelectorAll('#desktop-carousel .carousel-card');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  const mobileContainer = document.getElementById('mobile-card-container');
  const mobilePrev = document.getElementById('mobile-prev');
  const mobileNext = document.getElementById('mobile-next');

  if (!desktopCards.length && !mobileContainer) return;

  let activeIndex = 1; // Start with card 1 (center) active, exactly like Pic 2!

  function updateDesktop() {
    desktopCards.forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const isActive = idx === activeIndex;
      const topAccent = card.querySelector('.carousel-top-accent');
      const actions = card.querySelector('.carousel-actions');

      card.classList.toggle('carousel-card-active', isActive);
      card.classList.toggle('carousel-card-inactive', !isActive);
      card.classList.toggle('border-gold', isActive);
      card.classList.toggle('border-dark-300', !isActive);

      if (topAccent) topAccent.classList.toggle('hidden', !isActive);
      if (actions) actions.classList.toggle('hidden', !isActive);
    });

    dots.forEach((dot) => {
      const dIdx = parseInt(dot.getAttribute('data-dot'), 10);
      if (dIdx === activeIndex) {
        dot.className = 'carousel-dot rounded-full transition-all duration-300 w-6 h-1.5 bg-gold cursor-pointer';
      } else {
        dot.className = 'carousel-dot rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40 cursor-pointer';
      }
    });
  }

  function updateMobile() {
    if (!mobileContainer) return;
    const item = carouselData[activeIndex];
    mobileContainer.innerHTML = `
      <div class="absolute inset-0">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover opacity-25" />
        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
      </div>
      <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
      <div class="relative z-10 flex flex-col justify-between h-full p-5 gap-3">
        <div class="flex items-start justify-between gap-2">
          <span class="text-[10px] font-mono text-gray-500">${item.year}</span>
          <div class="flex flex-col items-end">
            <div class="flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span class="text-[10px] text-gray-400">${item.status}</span>
            </div>
            <div class="text-[52px] font-bold leading-none select-none mt-1" style="color: rgba(255, 255, 255, 0.08);">${item.id}</div>
          </div>
        </div>
        <div class="flex flex-col gap-2.5">
          <h3 class="font-bold text-xl text-white leading-tight">${item.title}</h3>
          <p class="text-sm text-gray-400 leading-relaxed">${item.description}</p>
          <div class="flex flex-wrap gap-1.5">
            ${item.tags.map(t => `<span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">${t}</span>`).join('')}
          </div>
          <div class="flex gap-2 pt-1">
            <a href="./projects.html" class="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">Details →</a>
          </div>
        </div>
      </div>
    `;
  }

  function setIndex(newIdx) {
    activeIndex = (newIdx + carouselData.length) % carouselData.length;
    updateDesktop();
    updateMobile();
  }

  desktopCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      setIndex(idx);
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-dot'), 10);
      setIndex(idx);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => setIndex(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setIndex(activeIndex + 1));
  if (mobilePrev) mobilePrev.addEventListener('click', () => setIndex(activeIndex - 1));
  if (mobileNext) mobileNext.addEventListener('click', () => setIndex(activeIndex + 1));

  updateDesktop();
  updateMobile();
}

// ==========================================
// 11. VISITOR GEOGRAPHY & INDIA STATE -> DISTRICT TRACKING
// ==========================================
function initVisitorGeography() {
  const STORAGE_KEY = 'gokulraj_geo_visitors_v2';
  const VISITOR_ID_KEY = 'gokulraj_geo_visitor_id';
  const SESSION_GEO_KEY = 'gokulraj_geo_session_v2';

  const COUNTRY_GRADIENTS = {
    IN: 'linear-gradient(90deg, #ff9933 0%, #ffd08a 52%, #138808 100%)',
    US: 'linear-gradient(90deg, #b22234 0%, #ffffff 48%, #3c3b6e 100%)',
    GB: 'linear-gradient(90deg, #cf142b 0%, #ffffff 46%, #00247d 100%)',
    DE: 'linear-gradient(90deg, #000000 0%, #dd0000 50%, #ffce00 100%)',
    NP: 'linear-gradient(90deg, #dc143c 0%, #1a4ba3 100%)',
    CA: 'linear-gradient(90deg, #ff0000 0%, #ffffff 52%, #ff0000 100%)',
    FR: 'linear-gradient(90deg, #0055a4 0%, #ffffff 50%, #ef4135 100%)',
    ZZ: 'linear-gradient(90deg, #f5a623 0%, #94a3b8 100%)',
  };

  const WORLD_COORDS = {
    IN: { x: 250, y: 86 },
    US: { x: 72, y: 56 },
    CA: { x: 68, y: 38 },
    GB: { x: 164, y: 40 },
    DE: { x: 180, y: 44 },
    FR: { x: 170, y: 48 },
    SG: { x: 274, y: 102 },
    AE: { x: 222, y: 78 },
    AU: { x: 306, y: 132 },
    JP: { x: 312, y: 58 },
    NP: { x: 256, y: 74 },
  };

  const INDIA_STATES = [
    { code: 'TN', name: 'Tamil Nadu', x: 124, y: 178, districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Chengalpattu', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Tirunelveli', 'Thanjavur', 'Kanniyakumari', 'Krishnagiri (Hosur)'] },
    { code: 'KA', name: 'Karnataka', x: 108, y: 156, districts: ['Bengaluru Urban', 'Mysuru', 'Dakshina Kannada (Mangaluru)', 'Dharwad (Hubballi)', 'Belagavi', 'Kalaburagi', 'Udupi', 'Tumakuru'] },
    { code: 'MH', name: 'Maharashtra', x: 102, y: 128, districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar', 'Kolhapur'] },
    { code: 'DL', name: 'Delhi', x: 116, y: 68, districts: ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'South West Delhi'] },
    { code: 'TS', name: 'Telangana', x: 128, y: 134, districts: ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Warangal', 'Nizamabad', 'Karimnagar'] },
    { code: 'KL', name: 'Kerala', x: 110, y: 184, districts: ['Ernakulam (Kochi)', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Malappuram', 'Kannur', 'Kollam', 'Kottayam'] },
    { code: 'AP', name: 'Andhra Pradesh', x: 134, y: 152, districts: ['Visakhapatnam', 'NTR (Vijayawada)', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Kakinada'] },
    { code: 'UP', name: 'Uttar Pradesh', x: 138, y: 76, districts: ['Lucknow', 'Gautam Buddha Nagar (Noida)', 'Ghaziabad', 'Kanpur Nagar', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut'] },
    { code: 'GJ', name: 'Gujarat', x: 74, y: 102, districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar'] },
    { code: 'WB', name: 'West Bengal', x: 176, y: 94, districts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Darjeeling (Siliguri)', 'Purba Bardhaman'] },
    { code: 'RJ', name: 'Rajasthan', x: 90, y: 82, districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar'] },
    { code: 'HR', name: 'Haryana', x: 110, y: 64, districts: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal'] },
    { code: 'PB', name: 'Punjab', x: 106, y: 52, districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'SAS Nagar (Mohali)', 'Bathinda'] },
    { code: 'MP', name: 'Madhya Pradesh', x: 120, y: 100, districts: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Rewa'] },
    { code: 'BR', name: 'Bihar', x: 166, y: 82, districts: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'] },
    { code: 'OD', name: 'Odisha', x: 160, y: 114, districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Sundargarh (Rourkela)', 'Puri', 'Ganjam', 'Sambalpur'] },
    { code: 'AS', name: 'Assam', x: 200, y: 76, districts: ['Kamrup Metropolitan (Guwahati)', 'Dibrugarh', 'Jorhat', 'Cachar (Silchar)', 'Nagaon'] },
    { code: 'JH', name: 'Jharkhand', x: 162, y: 96, districts: ['Ranchi', 'East Singhbhum (Jamshedpur)', 'Dhanbad', 'Bokaro', 'Hazaribagh'] },
    { code: 'CG', name: 'Chhattisgarh', x: 144, y: 110, districts: ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Bastar'] },
    { code: 'UK', name: 'Uttarakhand', x: 128, y: 56, districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar'] },
    { code: 'HP', name: 'Himachal Pradesh', x: 118, y: 46, districts: ['Shimla', 'Kangra', 'Kullu', 'Mandi', 'Solan'] },
    { code: 'GA', name: 'Goa', x: 96, y: 152, districts: ['North Goa', 'South Goa'] },
    { code: 'CH', name: 'Chandigarh', x: 114, y: 54, districts: ['Chandigarh'] },
    { code: 'PY', name: 'Puducherry', x: 132, y: 174, districts: ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'] },
    { code: 'JK', name: 'Jammu and Kashmir', x: 114, y: 34, districts: ['Srinagar', 'Jammu', 'Baramulla', 'Anantnag'] },
    { code: 'LA', name: 'Ladakh', x: 128, y: 28, districts: ['Leh', 'Kargil'] },
    { code: 'TR', name: 'Tripura', x: 196, y: 90, districts: ['West Tripura (Agartala)', 'Gomati', 'North Tripura'] },
    { code: 'ML', name: 'Meghalaya', x: 194, y: 82, districts: ['East Khasi Hills (Shillong)', 'West Garo Hills', 'Ri-Bhoi'] },
    { code: 'MN', name: 'Manipur', x: 210, y: 86, districts: ['Imphal West', 'Imphal East', 'Thoubal', 'Churachandpur'] },
    { code: 'NL', name: 'Nagaland', x: 212, y: 78, districts: ['Kohima', 'Dimapur', 'Mokokchung'] },
    { code: 'AR', name: 'Arunachal Pradesh', x: 212, y: 66, districts: ['Papum Pare (Itanagar)', 'Tawang', 'Changlang', 'Lohit'] },
    { code: 'MZ', name: 'Mizoram', x: 204, y: 94, districts: ['Aizawl', 'Lunglei', 'Champhai'] },
    { code: 'SK', name: 'Sikkim', x: 182, y: 68, districts: ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing'] },
    { code: 'AN', name: 'Andaman and Nicobar Islands', x: 220, y: 168, districts: ['South Andaman (Port Blair)', 'North and Middle Andaman', 'Nicobar'] },
    { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu', x: 82, y: 116, districts: ['Dadra and Nagar Haveli', 'Daman', 'Diu'] },
    { code: 'LD', name: 'Lakshadweep', x: 86, y: 186, districts: ['Kavaratti', 'Agatti', 'Minicoy'] },
  ];

  const STATE_ALIASES = {
    orissa: 'Odisha',
    uttaranchal: 'Uttarakhand',
    pondicherry: 'Puducherry',
    'nct of delhi': 'Delhi',
    'national capital territory of delhi': 'Delhi',
    'new delhi': 'Delhi',
    'jammu & kashmir': 'Jammu and Kashmir',
    'andaman & nicobar': 'Andaman and Nicobar Islands',
    'andaman and nicobar': 'Andaman and Nicobar Islands',
    telengana: 'Telangana',
    tamilnadu: 'Tamil Nadu',
    'dadra & nagar haveli': 'Dadra and Nagar Haveli and Daman and Diu',
    'daman and diu': 'Dadra and Nagar Haveli and Daman and Diu',
  };

  const DISTRICT_ALIASES = {
    bengaluru: 'Bengaluru Urban',
    bangalore: 'Bengaluru Urban',
    mysore: 'Mysuru',
    mangalore: 'Dakshina Kannada (Mangaluru)',
    mangaluru: 'Dakshina Kannada (Mangaluru)',
    hubballi: 'Dharwad (Hubballi)',
    hubli: 'Dharwad (Hubballi)',
    belgaum: 'Belagavi',
    gurgaon: 'Gurugram',
    noida: 'Gautam Buddha Nagar (Noida)',
    'greater noida': 'Gautam Buddha Nagar (Noida)',
    kochi: 'Ernakulam (Kochi)',
    cochin: 'Ernakulam (Kochi)',
    ernakulam: 'Ernakulam (Kochi)',
    trivandrum: 'Thiruvananthapuram',
    calicut: 'Kozhikode',
    vizag: 'Visakhapatnam',
    vijayawada: 'NTR (Vijayawada)',
    trichy: 'Tiruchirappalli',
    tiruchirapalli: 'Tiruchirappalli',
    tanjore: 'Thanjavur',
    tuticorin: 'Thoothukudi',
    hosur: 'Krishnagiri (Hosur)',
    nagercoil: 'Kanniyakumari',
    tambaram: 'Chennai',
    ambattur: 'Chennai',
    guindy: 'Chennai',
    adyar: 'Chennai',
    velachery: 'Chennai',
    mumbai: 'Mumbai City',
    bombay: 'Mumbai City',
    'navi mumbai': 'Thane',
    aurangabad: 'Chhatrapati Sambhajinagar',
    secunderabad: 'Hyderabad',
    bhubaneswar: 'Khordha (Bhubaneswar)',
    rourkela: 'Sundargarh (Rourkela)',
    guwahati: 'Kamrup Metropolitan (Guwahati)',
    silchar: 'Cachar (Silchar)',
    jamshedpur: 'East Singhbhum (Jamshedpur)',
    siliguri: 'Darjeeling (Siliguri)',
    agartala: 'West Tripura (Agartala)',
    shillong: 'East Khasi Hills (Shillong)',
    itanagar: 'Papum Pare (Itanagar)',
    'port blair': 'South Andaman (Port Blair)',
    mohali: 'SAS Nagar (Mohali)',
    allahabad: 'Prayagraj',
    baroda: 'Vadodara',
    delhi: 'New Delhi',
    'new delhi': 'New Delhi',
    pondicherry: 'Puducherry',
  };

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatNumber(n) {
    return new Intl.NumberFormat('en-IN').format(Number(n) || 0);
  }

  function normalizeCountryCode(code) {
    const clean = String(code || 'ZZ').trim().toUpperCase();
    return /^[A-Z]{2}$/.test(clean) ? clean : 'ZZ';
  }

  function getCountryName(code, fallbackName) {
    const c = normalizeCountryCode(code);
    if (c === 'ZZ') return fallbackName || 'Other';
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' }).of(c) || fallbackName || c;
    } catch (_) {
      return fallbackName || c;
    }
  }

  function getFlagEmoji(code) {
    const c = normalizeCountryCode(code);
    if (c === 'ZZ') return '\uD83C\uDF0D';
    const a = c.codePointAt(0);
    const b = c.codePointAt(1);
    return a && b ? String.fromCodePoint(a + 127397, b + 127397) : '\uD83C\uDF0D';
  }

  function normalizeIndiaState(rawRegion) {
    const clean = String(rawRegion || '').trim();
    if (!clean) return 'Other State / UT';
    const key = clean.toLowerCase().replace(/\s+/g, ' ');
    if (STATE_ALIASES[key]) return STATE_ALIASES[key];
    const matched = INDIA_STATES.find((s) => s.name.toLowerCase() === key || s.code.toLowerCase() === key);
    return matched ? matched.name : clean;
  }

  function normalizeIndiaDistrict(rawCity, stateName) {
    const clean = String(rawCity || '').trim().replace(/\s+district$/i, '');
    if (!clean) return stateName === 'Delhi' ? 'New Delhi' : stateName + ' (Other)';
    const key = clean.toLowerCase().replace(/\s+/g, ' ');
    if (DISTRICT_ALIASES[key]) return DISTRICT_ALIASES[key];
    const stateObj = INDIA_STATES.find((s) => s.name === stateName);
    if (stateObj) {
      const exact = stateObj.districts.find((d) => d.toLowerCase() === key);
      if (exact) return exact;
    }
    return clean;
  }

  function getOrCreateVisitorId() {
    try {
      let id = localStorage.getItem(VISITOR_ID_KEY);
      if (!id) {
        id = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(VISITOR_ID_KEY, id);
      }
      return id;
    } catch (_) {
      return 'v_session';
    }
  }

  function readLocalStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            totalUniqueVisitors: Number(parsed.totalUniqueVisitors) || 0,
            countries: parsed.countries && typeof parsed.countries === 'object' ? parsed.countries : {},
            indiaStates: parsed.indiaStates && typeof parsed.indiaStates === 'object' ? parsed.indiaStates : {},
            recordedVisitorIds:
              parsed.recordedVisitorIds && typeof parsed.recordedVisitorIds === 'object'
                ? parsed.recordedVisitorIds
                : {},
          };
        }
      }
    } catch (_) {
      // ignore malformed storage
    }
    return {
      totalUniqueVisitors: 0,
      countries: {},
      indiaStates: {},
      recordedVisitorIds: {},
    };
  }

  function writeLocalStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (_) {
      // ignore storage quota / privacy mode
    }
  }

  function recordVisitLocally(visitorId, geo, allowUpdateExisting) {
    const store = readLocalStore();
    const countryCode = normalizeCountryCode(geo.countryCode);
    const countryName = getCountryName(countryCode, geo.countryName);
    const isIndia = countryCode === 'IN';
    const stateName = isIndia ? normalizeIndiaState(geo.region) : null;
    const districtName = isIndia ? normalizeIndiaDistrict(geo.city, stateName) : null;
    const prev = store.recordedVisitorIds[visitorId];

    if (prev && allowUpdateExisting) {
      const sameLocation =
        prev.countryCode === countryCode &&
        prev.state === stateName &&
        prev.district === districtName;

      if (!sameLocation) {
        // Decrement previous recorded location cleanly before moving visitor to updated location
        if (store.countries[prev.countryCode]) {
          store.countries[prev.countryCode].count = Math.max(0, store.countries[prev.countryCode].count - 1);
          if (store.countries[prev.countryCode].count === 0) delete store.countries[prev.countryCode];
        }
        if (prev.countryCode === 'IN' && prev.state && store.indiaStates[prev.state]) {
          const stObj = store.indiaStates[prev.state];
          stObj.count = Math.max(0, stObj.count - 1);
          if (prev.district && stObj.districts && stObj.districts[prev.district]) {
            stObj.districts[prev.district] = Math.max(0, stObj.districts[prev.district] - 1);
            if (stObj.districts[prev.district] === 0) delete stObj.districts[prev.district];
          }
          if (stObj.count === 0) delete store.indiaStates[prev.state];
        }

        if (!store.countries[countryCode]) {
          store.countries[countryCode] = { code: countryCode, name: countryName, count: 0 };
        }
        store.countries[countryCode].count += 1;

        if (isIndia && stateName) {
          if (!store.indiaStates[stateName]) {
            store.indiaStates[stateName] = { count: 0, districts: {} };
          }
          store.indiaStates[stateName].count += 1;
          store.indiaStates[stateName].districts[districtName] =
            (store.indiaStates[stateName].districts[districtName] || 0) + 1;
        }

        store.recordedVisitorIds[visitorId] = {
          countryCode,
          state: stateName,
          district: districtName,
          ts: Date.now(),
        };
        writeLocalStore(store);
      }
    } else if (!prev) {
      store.totalUniqueVisitors += 1;
      if (!store.countries[countryCode]) {
        store.countries[countryCode] = { code: countryCode, name: countryName, count: 0 };
      }
      store.countries[countryCode].count += 1;

      if (isIndia && stateName) {
        if (!store.indiaStates[stateName]) {
          store.indiaStates[stateName] = { count: 0, districts: {} };
        }
        store.indiaStates[stateName].count += 1;
        store.indiaStates[stateName].districts[districtName] =
          (store.indiaStates[stateName].districts[districtName] || 0) + 1;
      }

      store.recordedVisitorIds[visitorId] = {
        countryCode,
        state: stateName,
        district: districtName,
        ts: Date.now(),
      };
      writeLocalStore(store);
    }

    return {
      store,
      currentGeo: { countryCode, countryName, stateName, districtName, source: geo.source || 'geoip' },
    };
  }

  function parseBigDataCloudPayload(d, sourceLabel) {
    if (!d || !d.countryCode) return null;
    const admins =
      d.localityInfo && Array.isArray(d.localityInfo.administrative)
        ? d.localityInfo.administrative
        : [];
    const stateAdmin = admins.find((a) => a && a.adminLevel === 4);
    const districtAdmin = admins.find((a) => a && a.adminLevel === 5);
    const rawDistrict = districtAdmin
      ? String(districtAdmin.name || '').replace(/\s+district$/i, '').trim()
      : d.city || d.locality || '';

    return {
      countryCode: d.countryCode,
      countryName: d.countryName,
      region: (stateAdmin && stateAdmin.name) || d.principalSubdivision || '',
      city: rawDistrict || d.city || d.locality || '',
      source: sourceLabel,
    };
  }

  async function fetchLiveGeo() {
    try {
      const cached = sessionStorage.getItem(SESSION_GEO_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.countryCode) return parsed;
      }
    } catch (_) {
      // ignore sessionStorage error
    }

    const weightedProviders = [
      {
        weight: 1.5,
        fn: async () => {
          const res = await fetch(
            'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en',
            { cache: 'no-store' }
          );
          if (!res.ok) throw new Error('bdc status ' + res.status);
          const d = await res.json();
          const parsed = parseBigDataCloudPayload(d, 'bigdatacloud-ip');
          if (!parsed) throw new Error('bdc invalid payload');
          return parsed;
        },
      },
      {
        weight: 1.3,
        fn: async () => {
          const res = await fetch('https://ipinfo.io/json', { cache: 'no-store' });
          if (!res.ok) throw new Error('ipinfo status ' + res.status);
          const d = await res.json();
          if (!d || !d.country) throw new Error('ipinfo invalid payload');
          return {
            countryCode: d.country,
            countryName: getCountryName(d.country),
            region: d.region || '',
            city: d.city || '',
            source: 'ipinfo.io',
          };
        },
      },
      {
        weight: 1.1,
        fn: async () => {
          const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
          if (!res.ok) throw new Error('ipwhois status ' + res.status);
          const d = await res.json();
          if (!d || d.success === false || !d.country_code) throw new Error('ipwhois invalid payload');
          return {
            countryCode: d.country_code,
            countryName: d.country,
            region: d.region || '',
            city: d.city || '',
            source: 'ipwho.is',
          };
        },
      },
      {
        weight: 1.0,
        fn: async () => {
          const res = await fetch('https://get.geojs.io/v1/ip/geo.json', { cache: 'no-store' });
          if (!res.ok) throw new Error('geojs status ' + res.status);
          const d = await res.json();
          if (!d || !d.country_code) throw new Error('geojs invalid payload');
          return {
            countryCode: d.country_code,
            countryName: d.country,
            region: d.region || '',
            city: d.city || '',
            source: 'geojs.io',
          };
        },
      },
      {
        weight: 1.0,
        fn: async () => {
          const res = await fetch('https://free.freeipapi.com/api/json', { cache: 'no-store' });
          if (!res.ok) throw new Error('freeipapi status ' + res.status);
          const d = await res.json();
          if (!d || !d.countryCode) throw new Error('freeipapi invalid payload');
          return {
            countryCode: d.countryCode,
            countryName: d.countryName,
            region: d.regionName || '',
            city: d.cityName || '',
            source: 'freeipapi',
          };
        },
      },
    ];

    const settled = await Promise.allSettled(
      weightedProviders.map(async (p) => ({ weight: p.weight, data: await p.fn() }))
    );

    const candidates = settled
      .filter((r) => r.status === 'fulfilled' && r.value && r.value.data)
      .map((r) => r.value);

    if (candidates.length === 0) return null;

    // Tally weighted consensus on normalized (countryCode | state | district)
    const buckets = new Map();
    candidates.forEach(({ weight, data }) => {
      const cc = normalizeCountryCode(data.countryCode);
      const st = cc === 'IN' ? normalizeIndiaState(data.region) : '';
      const dist = cc === 'IN' ? normalizeIndiaDistrict(data.city, st) : '';
      const key = cc + '|' + st + '|' + dist;
      const existing = buckets.get(key) || { score: 0, sample: data };
      existing.score += weight;
      buckets.set(key, existing);
    });

    const winner = Array.from(buckets.values()).sort((a, b) => b.score - a.score)[0];
    const best = winner ? { ...winner.sample, source: 'consensus(' + candidates.length + ')' } : candidates[0].data;

    try {
      sessionStorage.setItem(SESSION_GEO_KEY, JSON.stringify(best));
    } catch (_) {
      // ignore
    }
    return best;
  }

  function fetchExactGpsGeo() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url =
              'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
              encodeURIComponent(lat) +
              '&longitude=' +
              encodeURIComponent(lon) +
              '&localityLanguage=en';
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('GPS reverse geocode failed');
            const d = await res.json();
            const parsed = parseBigDataCloudPayload(d, 'gps');
            if (!parsed) throw new Error('Invalid reverse geocode payload');
            resolve(parsed);
          } catch (err) {
            reject(err);
          }
        },
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }

  const state = {
    store: readLocalStore(),
    currentGeo: null,
    activeTab: 'countries',
    showAllStates: false,
    searchQuery: '',
    expandedStates: new Set(),
    apiSynced: false,
  };

  // DOM References (only populated on index.html where the badge & modal exist)
  const badgeBtn = document.getElementById('visitor-badge-btn');
  const modal = document.getElementById('visitor-geography-modal');
  const backdropBtn = document.getElementById('visitor-modal-backdrop');
  const closeBtn = document.getElementById('visitor-modal-close');
  const tooltipCount = document.getElementById('visitor-tooltip-count');
  const tooltipIndia = document.getElementById('visitor-tooltip-india');
  const modalTotal = document.getElementById('visitor-modal-total');
  const indiaTotalEl = document.getElementById('visitor-india-total');
  const currentLocationText = document.getElementById('visitor-current-location-text');
  const trackingSourceEl = document.getElementById('visitor-tracking-source');

  const tabCountriesBtn = document.getElementById('geo-tab-countries');
  const tabIndiaBtn = document.getElementById('geo-tab-india');
  const panelCountries = document.getElementById('geo-panel-countries');
  const panelIndia = document.getElementById('geo-panel-india');
  const distSubtitle = document.getElementById('visitor-dist-subtitle');
  const modalTitle = document.getElementById('visitor-geography-title');

  const mapModeBtn = document.getElementById('visitor-map-mode-btn');
  const mapLabel = document.getElementById('visitor-map-label');
  const svgWorld = document.getElementById('visitor-svg-world');
  const svgIndia = document.getElementById('visitor-svg-india');
  const worldPinsG = document.getElementById('visitor-world-pins');
  const indiaPinsG = document.getElementById('visitor-india-pins');

  const countryListEl = document.getElementById('geo-country-list');
  const indiaQuickListEl = document.getElementById('geo-india-quick-list');
  const openAllStatesBtn = document.getElementById('geo-open-all-states-btn');
  const indiaSearchInput = document.getElementById('geo-india-search');
  const indiaScopeBtn = document.getElementById('geo-india-scope-btn');
  const indiaStateListEl = document.getElementById('geo-india-state-list');
  const gpsBtn = document.getElementById('visitor-gps-btn');

  function getIndiaVisitorTotal() {
    const inObj = state.store.countries && state.store.countries.IN;
    if (inObj && typeof inObj.count === 'number') return inObj.count;
    return Object.values(state.store.indiaStates || {}).reduce((acc, s) => acc + (Number(s.count) || 0), 0);
  }

  function renderMapPins() {
    if (worldPinsG) {
      const entries = Object.values(state.store.countries || {});
      worldPinsG.innerHTML = entries
        .map((c) => {
          const coord = WORLD_COORDS[c.code] || { x: 185, y: 85 };
          return (
            '<g>' +
            '<circle cx="' + coord.x + '" cy="' + coord.y + '" r="8" fill="rgba(245,166,35,0.22)" />' +
            '<circle cx="' + coord.x + '" cy="' + coord.y + '" r="3.2" fill="#f5a623" stroke="#0a0a0a" stroke-width="1" />' +
            '</g>'
          );
        })
        .join('');
    }

    if (indiaPinsG) {
      const activeStates = Object.entries(state.store.indiaStates || {}).filter(([, v]) => (Number(v.count) || 0) > 0);
      indiaPinsG.innerHTML = activeStates
        .map(([stName, info]) => {
          const meta = INDIA_STATES.find((s) => s.name === stName);
          if (!meta) return '';
          return (
            '<g>' +
            '<circle cx="' + meta.x + '" cy="' + meta.y + '" r="9" fill="rgba(245,166,35,0.24)" />' +
            '<circle cx="' + meta.x + '" cy="' + meta.y + '" r="3.5" fill="#f5a623" stroke="#0a0a0a" stroke-width="1" />' +
            '<text x="' + (meta.x + 7) + '" y="' + (meta.y + 3) + '" fill="#f8fafc" font-size="7.5" font-family="JetBrains Mono, monospace">' +
            escHtml(meta.code) + ' (' + formatNumber(info.count) + ')' +
            '</text>' +
            '</g>'
          );
        })
        .join('');
    }
  }

  function renderCountriesSection() {
    if (!countryListEl) return;
    const total = state.store.totalUniqueVisitors || 0;
    const countries = Object.values(state.store.countries || {}).sort((a, b) => (b.count || 0) - (a.count || 0));

    if (countries.length === 0) {
      countryListEl.innerHTML =
        '<div class="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-xs text-slate-400">' +
        'Detecting live country and India state/district location...' +
        '</div>';
    } else {
      const top4 = countries.slice(0, 4);
      const rest = countries.slice(4);
      const displayRows = top4.map((c) => ({ ...c, isOther: false }));
      if (rest.length > 0) {
        displayRows.push({
          code: 'ZZ',
          name: 'Other',
          count: rest.reduce((acc, r) => acc + (r.count || 0), 0),
          isOther: true,
        });
      }

      countryListEl.innerHTML = displayRows
        .map((row) => {
          const code = normalizeCountryCode(row.code);
          const pct = total > 0 ? ((row.count || 0) / total) * 100 : 0;
          const flagUrl = code === 'ZZ' ? '' : 'https://flagcdn.com/w40/' + code.toLowerCase() + '.png';
          const grad = COUNTRY_GRADIENTS[code] || COUNTRY_GRADIENTS.ZZ;
          const isIndiaRow = code === 'IN';

          return (
            '<div ' +
            (isIndiaRow ? 'data-open-india-states="true" role="button" tabindex="0" title="Click to view India state & district counts" ' : '') +
            'class="rounded-[14px] border border-white/8 bg-white/5 px-3 py-2.5 ' +
            (isIndiaRow ? 'hover:border-gold/40 cursor-pointer transition-colors' : '') +
            '">' +
            '<div class="flex items-center gap-2.5">' +
            '<div class="relative flex h-5 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/8 text-[11px] leading-none">' +
            '<span class="select-none">' + escHtml(getFlagEmoji(code)) + '</span>' +
            (flagUrl
              ? '<img src="' + escHtml(flagUrl) + '" alt="' + escHtml(row.name) + ' flag" class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" onerror="this.style.display=\'none\'" />'
              : '') +
            '</div>' +
            '<div class="min-w-0 flex-1">' +
            '<div class="flex items-start justify-between gap-2">' +
            '<div class="min-w-0">' +
            '<div class="flex items-center gap-2">' +
            '<span class="truncate text-[14px] font-semibold text-white">' + escHtml(row.name) + '</span>' +
            (isIndiaRow
              ? '<span class="rounded-full border border-gold/25 bg-gold/10 px-1.5 py-0.5 text-[9px] font-mono text-gold">States →</span>'
              : '') +
            '</div>' +
            '<div class="text-[11px] text-slate-400">' + formatNumber(row.count) + (row.count === 1 ? ' visitor' : ' visitors') + '</div>' +
            '</div>' +
            '<div class="text-right text-[14px] font-semibold text-white">' + pct.toFixed(1) + '%</div>' +
            '</div>' +
            '<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/6">' +
            '<div class="geo-bar-fill h-full rounded-full" style="width:' + Math.max(pct, 3).toFixed(1) + '%; background:' + grad + ';"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
          );
        })
        .join('');
    }

    // Inline summary preview of India State -> District counts under Top Countries
    if (indiaQuickListEl) {
      const recordedStates = Object.entries(state.store.indiaStates || {})
        .filter(([, data]) => (Number(data.count) || 0) > 0)
        .sort((a, b) => (b[1].count || 0) - (a[1].count || 0));

      if (recordedStates.length === 0) {
        indiaQuickListEl.innerHTML =
          '<div class="rounded-[12px] border border-white/8 bg-black/40 px-3 py-2.5 text-[11px] text-slate-400">' +
          'No Indian state visits recorded in this browser yet. Click <span class="text-gold font-medium">India · States</span> to browse all 36 States/UTs &amp; Districts.' +
          '</div>';
      } else {
        const indiaSum = getIndiaVisitorTotal() || 1;
        indiaQuickListEl.innerHTML = recordedStates
          .slice(0, 3)
          .map(([stName, info]) => {
            const meta = INDIA_STATES.find((s) => s.name === stName);
            const stateCode = meta ? meta.code : 'IN';
            const stPct = ((info.count || 0) / indiaSum) * 100;
            const districts = Object.entries(info.districts || {}).sort((a, b) => (b[1] || 0) - (a[1] || 0));

            const districtChips = districts
              .map(([dName, dCount]) => {
                return (
                  '<div class="flex items-center justify-between gap-2 rounded-lg border border-white/6 bg-black/50 px-2 py-1 text-[11px]">' +
                  '<span class="flex items-center gap-1.5 text-slate-300 truncate">' +
                  '<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>' +
                  '<span class="truncate">' + escHtml(dName) + '</span>' +
                  '</span>' +
                  '<span class="font-mono text-[10px] font-semibold text-gold shrink-0">' + formatNumber(dCount) + '</span>' +
                  '</div>'
                );
              })
              .join('');

            return (
              '<div class="rounded-[12px] border border-white/8 bg-white/5 px-3 py-2">' +
              '<div class="flex items-center justify-between gap-2">' +
              '<div class="flex items-center gap-2 min-w-0">' +
              '<span class="inline-flex h-5 px-1.5 items-center justify-center rounded border border-gold/25 bg-gold/10 text-[10px] font-mono text-gold">' + escHtml(stateCode) + '</span>' +
              '<span class="truncate text-xs font-semibold text-white">' + escHtml(stName) + '</span>' +
              '</div>' +
              '<div class="text-right shrink-0 text-[11px] font-mono text-gray-300">' +
              formatNumber(info.count) + (info.count === 1 ? ' visitor' : ' visitors') + ' · ' + stPct.toFixed(0) + '%' +
              '</div>' +
              '</div>' +
              '<div class="mt-2 ml-1.5 border-l border-gold/25 pl-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">' +
              districtChips +
              '</div>' +
              '</div>'
            );
          })
          .join('');
      }
    }
  }

  function renderIndiaStatesList() {
    if (!indiaStateListEl) return;
    const q = state.searchQuery.trim().toLowerCase();
    const recordedMap = state.store.indiaStates || {};
    const totalIndia = getIndiaVisitorTotal();

    // Build merged state entries (all known states + any dynamically recorded extra state)
    const stateMap = new Map();
    INDIA_STATES.forEach((s) => {
      const rec = recordedMap[s.name] || { count: 0, districts: {} };
      const districtSet = new Set(s.districts);
      Object.keys(rec.districts || {}).forEach((d) => districtSet.add(d));
      stateMap.set(s.name, {
        code: s.code,
        name: s.name,
        count: Number(rec.count) || 0,
        districts: Array.from(districtSet).map((dName) => ({
          name: dName,
          count: Number((rec.districts && rec.districts[dName]) || 0),
        })),
      });
    });

    Object.entries(recordedMap).forEach(([stName, rec]) => {
      if (!stateMap.has(stName)) {
        stateMap.set(stName, {
          code: 'IN',
          name: stName,
          count: Number(rec.count) || 0,
          districts: Object.entries(rec.districts || {}).map(([dName, dCount]) => ({
            name: dName,
            count: Number(dCount) || 0,
          })),
        });
      }
    });

    let rows = Array.from(stateMap.values());

    // Filter by scope unless user is actively searching across India
    if (!state.showAllStates && !q) {
      const activeOnly = rows.filter((r) => r.count > 0);
      rows = activeOnly.length > 0 ? activeOnly : rows.slice(0, 6);
    }

    if (q) {
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.code.toLowerCase().includes(q) ||
          r.districts.some((d) => d.name.toLowerCase().includes(q))
      );
    }

    rows.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name);
    });

    if (rows.length === 0) {
      indiaStateListEl.innerHTML =
        '<div class="rounded-[14px] border border-white/8 bg-white/5 px-3 py-4 text-center text-xs text-slate-400">' +
        'No matching Indian state or district found for "' + escHtml(state.searchQuery) + '".' +
        '</div>';
      return;
    }

    indiaStateListEl.innerHTML = rows
      .map((st) => {
        const pct = totalIndia > 0 ? (st.count / totalIndia) * 100 : 0;
        const matchedDistricts = q ? st.districts.filter((d) => d.name.toLowerCase().includes(q)) : [];
        const isExpanded =
          state.expandedStates.has(st.name) ||
          (matchedDistricts.length > 0 && q.length > 0) ||
          (st.count > 0 && !state.expandedStates.has('__collapsed__' + st.name));

        const sortedDistricts = [...st.districts].sort((a, b) => {
          if (b.count !== a.count) return b.count - a.count;
          return a.name.localeCompare(b.name);
        });
        const maxDistCount = Math.max(1, ...sortedDistricts.map((d) => d.count));

        const districtRowsHtml = sortedDistricts
          .map((d) => {
            const isMatch = q && d.name.toLowerCase().includes(q);
            const dPct = st.count > 0 ? (d.count / st.count) * 100 : 0;
            const barWidth = d.count > 0 ? Math.max((d.count / maxDistCount) * 100, 12) : 0;

            return (
              '<div class="flex items-center justify-between gap-2 rounded-lg border ' +
              (isMatch ? 'border-gold/40 bg-gold/10' : 'border-white/6 bg-black/50') +
              ' px-2.5 py-1.5">' +
              '<div class="min-w-0 flex-1">' +
              '<div class="flex items-center gap-2">' +
              '<span class="h-1.5 w-1.5 shrink-0 rounded-full ' + (d.count > 0 ? 'bg-gold' : 'bg-gray-600') + '"></span>' +
              '<span class="truncate text-[11px] ' + (d.count > 0 ? 'text-white font-medium' : 'text-slate-400') + '">' +
              escHtml(d.name) +
              '</span>' +
              '</div>' +
              '<div class="mt-1 h-1 overflow-hidden rounded-full bg-white/6">' +
              '<div class="geo-bar-fill h-full rounded-full" style="width:' + barWidth.toFixed(0) + '%; background:linear-gradient(90deg, #ff9933 0%, #f5a623 55%, #138808 100%);"></div>' +
              '</div>' +
              '</div>' +
              '<div class="shrink-0 text-right flex items-center gap-1.5">' +
              (st.count > 0 && d.count > 0
                ? '<span class="text-[10px] text-slate-400 font-mono">' + dPct.toFixed(0) + '%</span>'
                : '') +
              '<span class="inline-flex min-w-[26px] items-center justify-center rounded-md px-1.5 py-0.5 font-mono text-[11px] ' +
              (d.count > 0
                ? 'bg-gold/15 border border-gold/30 text-gold font-semibold'
                : 'bg-white/5 border border-white/8 text-slate-500') +
              '">' +
              formatNumber(d.count) +
              '</span>' +
              '</div>' +
              '</div>'
            );
          })
          .join('');

        return (
          '<div class="state-row rounded-[14px] border border-white/8 bg-white/5 px-3 py-2.5" data-state-name="' +
          escHtml(st.name) +
          '" data-expanded="' +
          (isExpanded ? 'true' : 'false') +
          '">' +
          '<button type="button" class="state-toggle-btn w-full text-left cursor-pointer focus:outline-none">' +
          '<div class="flex items-center justify-between gap-2">' +
          '<div class="flex items-center gap-2 min-w-0">' +
          '<span class="inline-flex h-5 px-1.5 shrink-0 items-center justify-center rounded border ' +
          (st.count > 0 ? 'border-gold/35 bg-gold/15 text-gold' : 'border-white/10 bg-white/5 text-slate-400') +
          ' text-[10px] font-mono">' +
          escHtml(st.code) +
          '</span>' +
          '<span class="truncate text-[13px] font-semibold text-white">' +
          escHtml(st.name) +
          '</span>' +
          '</div>' +
          '<div class="flex items-center gap-2 shrink-0">' +
          '<span class="text-[11px] font-mono ' +
          (st.count > 0 ? 'text-white font-semibold' : 'text-slate-500') +
          '">' +
          formatNumber(st.count) +
          (st.count === 1 ? ' visitor' : ' visitors') +
          '</span>' +
          '<svg class="state-chevron h-3.5 w-3.5 text-slate-400 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="m6 9 6 6 6-6"></path>' +
          '</svg>' +
          '</div>' +
          '</div>' +
          '<div class="mt-1.5 flex items-center gap-2">' +
          '<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">' +
          '<div class="geo-bar-fill h-full rounded-full" style="width:' +
          (st.count > 0 ? Math.max(pct, 6).toFixed(1) : '0') +
          '%; background:' +
          COUNTRY_GRADIENTS.IN +
          ';"></div>' +
          '</div>' +
          '<span class="text-[10px] font-mono text-slate-400 w-10 text-right">' +
          pct.toFixed(0) +
          '%</span>' +
          '</div>' +
          '</button>' +
          '<div class="' +
          (isExpanded ? '' : 'hidden ') +
          'ml-2.5 mt-2.5 border-l border-gold/25 pl-3 space-y-1.5">' +
          '<div class="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-slate-500 font-mono pb-0.5">' +
          '<span>District-wise count</span>' +
          '<span>' +
          sortedDistricts.length +
          ' districts</span>' +
          '</div>' +
          districtRowsHtml +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function switchTab(tabName) {
    state.activeTab = tabName === 'india' ? 'india' : 'countries';
    const isIndia = state.activeTab === 'india';

    if (tabCountriesBtn && tabIndiaBtn) {
      tabCountriesBtn.classList.toggle('is-active', !isIndia);
      tabCountriesBtn.setAttribute('aria-selected', String(!isIndia));
      tabIndiaBtn.classList.toggle('is-active', isIndia);
      tabIndiaBtn.setAttribute('aria-selected', String(isIndia));
    }
    if (panelCountries && panelIndia) {
      panelCountries.classList.toggle('hidden', isIndia);
      panelIndia.classList.toggle('hidden', !isIndia);
    }
    if (svgWorld && svgIndia && mapLabel && mapModeBtn) {
      svgWorld.classList.toggle('hidden', isIndia);
      svgIndia.classList.toggle('hidden', !isIndia);
      mapLabel.textContent = isIndia ? 'India state map' : 'World map';
      mapModeBtn.textContent = isIndia ? '← World map' : 'Focus India →';
    }
    if (modalTitle) {
      modalTitle.textContent = isIndia ? 'India — States & Districts' : 'Top countries & India';
    }
    if (distSubtitle) {
      distSubtitle.textContent = isIndia
        ? 'Expand a state to view district-wise counts'
        : 'Countries & India state breakdown';
    }
  }

  function renderAllUI() {
    const total = state.store.totalUniqueVisitors || 0;
    const indiaCount = getIndiaVisitorTotal();
    const formattedTotal = formatNumber(total);

    if (tooltipCount) {
      tooltipCount.textContent = formattedTotal;
    }
    if (tooltipIndia) {
      if (state.currentGeo && state.currentGeo.stateName) {
        tooltipIndia.textContent =
          'India: ' + formatNumber(indiaCount) + ' (' + state.currentGeo.stateName + ' · ' + state.currentGeo.districtName + ')';
        tooltipIndia.classList.remove('hidden');
      } else {
        tooltipIndia.classList.add('hidden');
      }
    }
    if (modalTotal) modalTotal.textContent = formattedTotal;
    if (indiaTotalEl) indiaTotalEl.textContent = formatNumber(indiaCount);

    if (currentLocationText) {
      if (state.currentGeo) {
        if (state.currentGeo.countryCode === 'IN' && state.currentGeo.stateName) {
          currentLocationText.textContent =
            'Live session: ' +
            state.currentGeo.districtName +
            ', ' +
            state.currentGeo.stateName +
            ' (India)';
        } else {
          currentLocationText.textContent = 'Live session: ' + state.currentGeo.countryName;
        }
      } else {
        currentLocationText.textContent = 'GeoIP offline — showing browser records';
      }
    }

    if (trackingSourceEl) {
      trackingSourceEl.textContent = state.apiSynced
        ? 'Synced with portfolio backend visitor analytics.'
        : 'Multi-GeoIP consensus · Local browser preview (connect a hosted API to share counts across all visitors).';
    }

    if (indiaScopeBtn) {
      indiaScopeBtn.textContent = state.showAllStates ? 'Visited States Only' : 'Show All 36 States';
    }

    renderMapPins();
    renderCountriesSection();
    renderIndiaStatesList();
  }

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
    renderAllUI();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }, 200);
  }

  if (badgeBtn) badgeBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdropBtn) backdropBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (tabCountriesBtn) tabCountriesBtn.addEventListener('click', () => switchTab('countries'));
  if (tabIndiaBtn) tabIndiaBtn.addEventListener('click', () => switchTab('india'));
  if (openAllStatesBtn) {
    openAllStatesBtn.addEventListener('click', () => {
      state.showAllStates = true;
      switchTab('india');
      renderAllUI();
    });
  }
  if (mapModeBtn) {
    mapModeBtn.addEventListener('click', () => {
      switchTab(state.activeTab === 'india' ? 'countries' : 'india');
    });
  }

  if (countryListEl) {
    countryListEl.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-india-states="true"]')) {
        switchTab('india');
      }
    });
    countryListEl.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-open-india-states="true"]')) {
        e.preventDefault();
        switchTab('india');
      }
    });
  }

  if (indiaSearchInput) {
    indiaSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value || '';
      renderIndiaStatesList();
    });
  }

  if (indiaScopeBtn) {
    indiaScopeBtn.addEventListener('click', () => {
      state.showAllStates = !state.showAllStates;
      renderAllUI();
    });
  }

  if (indiaStateListEl) {
    indiaStateListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.state-toggle-btn');
      if (!btn) return;
      const row = btn.closest('.state-row');
      if (!row) return;
      const stName = row.getAttribute('data-state-name');
      const currentlyExpanded = row.getAttribute('data-expanded') === 'true';
      if (currentlyExpanded) {
        state.expandedStates.delete(stName);
        state.expandedStates.add('__collapsed__' + stName);
      } else {
        state.expandedStates.delete('__collapsed__' + stName);
        state.expandedStates.add(stName);
      }
      renderIndiaStatesList();
    });
  }

  if (gpsBtn) {
    gpsBtn.addEventListener('click', async () => {
      const originalLabel = gpsBtn.textContent;
      gpsBtn.disabled = true;
      gpsBtn.textContent = 'Locating...';
      try {
        const gpsGeo = await fetchExactGpsGeo();
        const visitorId = getOrCreateVisitorId();
        const res = recordVisitLocally(visitorId, gpsGeo, true);
        state.store = res.store;
        state.currentGeo = res.currentGeo;
        try {
          sessionStorage.setItem(SESSION_GEO_KEY, JSON.stringify(gpsGeo));
        } catch (_) {
          // ignore
        }
        renderAllUI();
        gpsBtn.textContent = 'GPS Verified';
      } catch (_) {
        gpsBtn.textContent = 'Blocked / Retry';
      } finally {
        gpsBtn.disabled = false;
        setTimeout(() => {
          if (gpsBtn.textContent === 'Blocked / Retry') gpsBtn.textContent = originalLabel;
        }, 2500);
      }
    });
  }

  // Record visit asynchronously (works across all pages + optionally syncs with backend if configured)
  (async function trackVisit() {
    const visitorId = getOrCreateVisitorId();
    const apiEndpoint =
      window.PORTFOLIO_VISITOR_API_URL ||
      (document.body && document.body.getAttribute('data-visitor-api')) ||
      '';

    const geo = await fetchLiveGeo();
    if (geo) {
      const res = recordVisitLocally(visitorId, geo, true);
      state.store = res.store;
      state.currentGeo = res.currentGeo;
    }

    if (apiEndpoint) {
      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-client-visitor-id': visitorId },
          body: JSON.stringify({ visitorId, geo }),
        });
        if (res.ok) {
          const payload = await res.json();
          if (payload && typeof payload.totalUniqueVisitors === 'number') {
            state.store = {
              ...state.store,
              totalUniqueVisitors: payload.totalUniqueVisitors,
              countries: payload.countries || state.store.countries,
              indiaStates: payload.indiaStates || state.store.indiaStates,
            };
            state.apiSynced = true;
          }
        }
      } catch (_) {
        // fallback cleanly to local GeoIP store
      }
    }

    renderAllUI();
  })();
}
