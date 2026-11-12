const fs = require('fs');
const path = require('path');
const {
  getTopNav,
  getBottomNav,
  getFloatingWidgets,
} = require('./site_helpers');

const creds = [
  {
    id: 'aa-introducing-rpa',
    shortTitle: 'Introducing RPA',
    title: 'Introducing Robotic Process Automation (RPA)',
    issuer: 'Automation Anywhere',
    eyebrow: 'RPA Certification',
    category: 'certificates',
    date: '30 Jan, 2023',
    shortDate: 'Jan 2023',
    tags: ['RPA', 'Automation Anywhere', 'Bot Basics'],
    image: './assets/certificates/aa-introducing-rpa.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Automation_Anywhere_Introducing_RPA.jpg',
    objectPosition: '50% 0%',
    description:
      'Completed eLearning certification covering Robotic Process Automation fundamentals, bot workflows, and digital workforce concepts with Automation Anywhere.',
  },
  {
    id: 'aa-business-processes',
    shortTitle: 'Identifying Business Processes',
    title: 'Identifying Business Processes for Automation',
    issuer: 'Automation Anywhere',
    eyebrow: 'RPA Certification',
    category: 'certificates',
    date: '30 Jan, 2023',
    shortDate: 'Jan 2023',
    tags: ['RPA', 'Process Analysis', 'Automation'],
    image: './assets/certificates/aa-identifying-business-processes.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Automation_Anywhere_Identifying_Business_Processes.jpg',
    objectPosition: '50% 0%',
    description:
      'Certified in evaluating business workflows for RPA feasibility, automation ROI analysis, process discovery, and enterprise readiness.',
  },
  {
    id: 'besant-qa-sql',
    shortTitle: 'QA Testing & SQL',
    title: 'Software Testing Training & SQL Training',
    issuer: 'Besant Technology',
    eyebrow: 'QA & SQL Program',
    category: 'certificates',
    date: '2022',
    shortDate: '2022',
    tags: ['Manual QA', 'Selenium Java', 'SQL'],
    image: './assets/certificates/besant-qa-sql.svg',
    hasRealCert: false,
    svgFile: 'besant-qa-sql.svg',
    svgBadge: 'PROFESSIONAL QA TRAINING',
    svgModules: 'SDLC · STLC · TestNG · Selenium WebDriver · SQL Joins',
    description:
      'Intensive QA engineering training covering SDLC, STLC, TestNG, Selenium WebDriver with Java, SQL queries, joins, and database verification.',
  },
  {
    id: 'gl-software-testing-tutorial',
    shortTitle: 'Software Testing Tutorial',
    title: 'Software Testing Tutorial',
    issuer: 'Great Learning Academy',
    eyebrow: 'QA Certification',
    category: 'certificates',
    date: 'September 2022',
    shortDate: 'Sep 2022',
    tags: ['Software Testing', 'QA Fundamentals', 'Great Learning'],
    image: './assets/certificates/gl-software-testing-tutorial.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Great_Learning_Software_Testing_Tutorial.jpg',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/PUVJAGDN',
    objectPosition: '50% 50%',
    description:
      'Completed online certification course in Software Testing Tutorial from Great Learning Academy covering testing principles, methodologies, and quality verification (Credential ID: PUVJAGDN).',
  },
  {
    id: 'gl-selenium-with-python',
    shortTitle: 'Selenium with Python',
    title: 'Selenium with Python',
    issuer: 'Great Learning Academy',
    eyebrow: 'Test Automation',
    category: 'certificates',
    date: 'July 2022',
    shortDate: 'Jul 2022',
    tags: ['Selenium', 'Python', 'Web Automation'],
    image: './assets/certificates/gl-selenium-with-python.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Great_Learning_Selenium_with_Python.jpg',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/FYIOXPMA',
    objectPosition: '50% 50%',
    description:
      'Completed online certification in Selenium with Python from Great Learning Academy focused on browser test scripting, element locators, and automated UI validation (Credential ID: FYIOXPMA).',
  },
  {
    id: 'gl-selenium-basics',
    shortTitle: 'Selenium Basics',
    title: 'Selenium Basics',
    issuer: 'Great Learning Academy',
    eyebrow: 'Test Automation',
    category: 'certificates',
    date: 'July 2022',
    shortDate: 'Jul 2022',
    tags: ['Selenium', 'Test Automation', 'QA'],
    image: './assets/certificates/gl-selenium-basics.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Great_Learning_Selenium_Basics.jpg',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/YDECOSSD',
    objectPosition: '50% 50%',
    description:
      'Completed online certification in Selenium Basics from Great Learning Academy covering core WebDriver concepts, browser interactions, and automation workflows (Credential ID: YDECOSSD).',
  },
  {
    id: 'gl-ai-with-python',
    shortTitle: 'AI with Python',
    title: 'Artificial Intelligence with Python',
    issuer: 'Great Learning Academy',
    eyebrow: 'AI & Python',
    category: 'certificates',
    date: 'July 2022',
    shortDate: 'Jul 2022',
    tags: ['AI', 'Python', 'Automation'],
    image: './assets/certificates/gl-ai-with-python.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Great_Learning_Artificial_Intelligence_with_Python.jpg',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/SBXWWTTN',
    objectPosition: '50% 50%',
    description:
      'Completed online certification in Artificial Intelligence with Python from Great Learning Academy exploring Python-based AI workflows and problem-solving techniques (Credential ID: SBXWWTTN).',
  },
  {
    id: 'gl-resume-building',
    shortTitle: 'Resume Building',
    title: 'Resume Building',
    issuer: 'Great Learning Academy',
    eyebrow: 'Career Readiness',
    category: 'certificates',
    date: 'July 2022',
    shortDate: 'Jul 2022',
    tags: ['Career Skills', 'Documentation', 'Great Learning'],
    image: './assets/certificates/gl-resume-building.jpg',
    hasRealCert: true,
    downloadName: 'Gokulraj_Great_Learning_Resume_Building.jpg',
    verifyUrl: 'https://www.mygreatlearning.com/certificate/TSMWSFAY',
    objectPosition: '50% 50%',
    description:
      'Completed online certification in Resume Building from Great Learning Academy focused on clear technical portfolio structuring and professional presentation (Credential ID: TSMWSFAY).',
  },
  {
    id: 'jerusalem-be-cse',
    shortTitle: 'B.E. Computer Science',
    title: 'Bachelor of Engineering — Computer Science',
    issuer: 'Jerusalem College of Engineering',
    eyebrow: 'Academic Degree',
    category: 'education',
    date: '2018 – 2022',
    shortDate: '2018–22',
    tags: ['B.E. CSE', 'DBMS & Java', 'Algorithms'],
    image: './assets/certificates/jerusalem-be-cse.svg',
    hasRealCert: false,
    svgFile: 'jerusalem-be-cse.svg',
    svgBadge: 'UNDERGRADUATE DEGREE',
    svgModules: 'Software Engineering · Data Structures · DBMS · OOP · OS',
    description:
      'Four-year Bachelor of Engineering degree focused on software engineering, algorithms, database management systems, OOP, and operating systems.',
  },
  {
    id: 'railway-hsc',
    shortTitle: 'Higher Secondary (HSC)',
    title: 'Higher & Secondary Schooling',
    issuer: 'Railway Mixed Hr. Sec. School',
    eyebrow: 'Academic Education',
    category: 'education',
    date: '2015 – 2018',
    shortDate: '2015–18',
    tags: ['Higher Secondary', 'Science & Math'],
    image: './assets/certificates/railway-hsc.svg',
    hasRealCert: false,
    svgFile: 'railway-hsc.svg',
    svgBadge: 'SECONDARY EDUCATION',
    svgModules: 'Mathematics · Physics · Chemistry · Computer Science',
    description:
      'Completed secondary and higher secondary education with strong academic foundations in science, physics, chemistry, and mathematics.',
  },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSvgCover(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" width="560" height="380" fill="none">
  <defs>
    <radialGradient id="glow" cx="85%" cy="15%" r="65%">
      <stop offset="0%" stop-color="#f5a623" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#141414" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="560" height="380" fill="#141414"/>
  <rect width="560" height="380" fill="url(#grid)"/>
  <rect width="560" height="380" fill="url(#glow)"/>
  <rect x="18" y="18" width="524" height="344" rx="14" stroke="#f5a623" stroke-opacity="0.24" stroke-width="1.2"/>
  <rect x="40" y="42" width="186" height="24" rx="12" fill="#f5a623" fill-opacity="0.12" stroke="#f5a623" stroke-opacity="0.38"/>
  <text x="54" y="58" fill="#f5a623" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10.5" font-weight="600" letter-spacing="1.8">${escapeXml(c.svgBadge)}</text>
  <text x="520" y="60" text-anchor="end" fill="#f5a623" fill-opacity="0.22" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="36" font-weight="700">${escapeXml(c.shortDate)}</text>
  <text x="40" y="118" fill="#f5a623" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" font-weight="600" letter-spacing="1.6">${escapeXml(c.issuer.toUpperCase())}</text>
  <text x="40" y="156" fill="#ffffff" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="700">${escapeXml(c.title.length > 36 ? c.shortTitle : c.title)}</text>
  ${c.title.length > 36 ? `<text x="40" y="182" fill="#d1d5db" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500">${escapeXml(c.title)}</text>` : ''}
  <line x1="40" y1="205" x2="220" y2="205" stroke="#f5a623" stroke-width="2" stroke-opacity="0.65"/>
  <text x="40" y="236" fill="#9ca3af" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12">${escapeXml(c.svgModules)}</text>
</svg>`;
}

const certDirs = [
  path.join(__dirname, 'assets', 'certificates'),
  path.join(__dirname, 'public', 'assets', 'certificates'),
];
for (const dir of certDirs) {
  fs.mkdirSync(dir, { recursive: true });
}
for (const c of creds) {
  if (!c.hasRealCert && c.svgFile) {
    const svgContent = buildSvgCover(c);
    for (const dir of certDirs) {
      fs.writeFileSync(path.join(dir, c.svgFile), svgContent, 'utf8');
    }
  }
}

const desktopTimelineHtml = creds
  .map((c, idx) => {
    const isEven = idx % 2 === 0;
    return `
              <div
                class="filterable-item cred-timeline-row flex items-center w-full gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'}"
                data-category="${c.category}">
                <!-- Card Column -->
                <div class="cred-card-slot w-[calc(50%-28px)] flex ${isEven ? 'justify-end' : 'justify-start'}">
                  <div
                    class="cred-flip-card w-full max-w-[280px] cursor-pointer"
                    style="perspective: 1000px;"
                    tabindex="0"
                    role="button"
                    aria-label="${c.title} — ${c.issuer} (${c.date}). Hover to view details, click to inspect certificate"
                    data-cred-index="${idx}">
                    <div
                      class="cred-flip-inner relative w-full transition-transform duration-700"
                      style="transform-style: preserve-3d; min-height: 192px;">
                      <!-- Front (Thumbnail Card — Pic 1 style) -->
                      <div
                        class="cred-face-front backface-hidden absolute inset-0 bg-dark-100 border border-dark-300 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors shadow-lg">
                        <div class="relative block overflow-hidden h-full w-full ${c.hasRealCert ? 'bg-white' : 'bg-dark-100'}">
                          <img
                            src="${c.image}"
                            alt="${c.title}"
                            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
                            ${c.objectPosition ? `style="object-position: ${c.objectPosition};"` : ''} />
                          <div
                            class="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3.5 flex items-end justify-between gap-2"
                            style="background: linear-gradient(to top, rgba(10, 10, 10, 0.94) 0%, rgba(10, 10, 10, 0.72) 55%, rgba(10, 10, 10, 0) 100%);">
                            <span class="text-gold font-mono text-[10px] tracking-[0.14em] uppercase leading-snug line-clamp-2 text-left">${c.shortTitle}</span>
                            <span class="shrink-0 text-[9px] font-mono text-gray-300 bg-black/65 border border-gold/25 rounded px-1.5 py-0.5">${c.shortDate}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Back (Detail Card — Pic 2 style) -->
                      <div
                        class="cred-face-back backface-hidden rotate-y-180 absolute inset-0 bg-dark-200 border border-gold/30 rounded-2xl p-4 flex flex-col justify-between gap-2.5 shadow-lg">
                        <div>
                          <p class="text-gold text-[10px] font-mono uppercase tracking-widest mb-1.5">${c.issuer}</p>
                          <p class="text-white text-xs font-semibold leading-snug line-clamp-2">${c.title}</p>
                          <p class="text-gray-400 text-[10px] font-mono mt-1">${c.date}</p>
                        </div>
                        <div class="flex flex-wrap gap-1.5">
                          ${c.tags
                            .map(
                              (t) =>
                                `<span class="px-2 py-0.5 text-[9px] font-mono bg-dark-300 border border-gold/20 text-gold rounded-full uppercase">${t}</span>`
                            )
                            .join('')}
                        </div>
                        <div class="flex items-center justify-between pt-1">
                          <span class="flex items-center gap-1.5 text-xs text-gold font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                            ${c.hasRealCert ? 'View Certificate' : 'View Details'}
                          </span>
                          <span class="text-gold text-[10px] font-mono uppercase tracking-widest">Click to See</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Center Timeline Node -->
                <div class="w-14 flex flex-col items-center shrink-0 relative z-10">
                  <div class="cred-node-outer w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-dark-200 border-gold/50">
                    <div class="cred-node-inner w-2 h-2 rounded-full transition-colors duration-300 bg-gold/60"></div>
                  </div>
                </div>

                <!-- Balance Spacer Column -->
                <div class="w-[calc(50%-28px)]"></div>
              </div>`;
  })
  .join('\n');

const mobileTimelineHtml = creds
  .map((c, idx) => {
    return `
              <div class="filterable-item cred-mobile-row flex items-start gap-3" data-category="${c.category}">
                <div class="flex flex-col items-center pt-1 shrink-0 relative z-10">
                  <div class="w-4.5 h-4.5 rounded-full border-2 border-gold/50 bg-dark-200 flex items-center justify-center">
                    <div class="w-1.5 h-1.5 rounded-full bg-gold/60"></div>
                  </div>
                </div>
                <button
                  type="button"
                  class="cred-mobile-card relative flex-1 bg-dark-100 border border-dark-300 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors aspect-[7/4] text-left cursor-pointer"
                  data-cred-index="${idx}"
                  aria-label="${c.title} — ${c.issuer} (${c.date}). Tap to open certificate">
                  <img
                    src="${c.image}"
                    alt="${c.title}"
                    class="absolute inset-0 h-full w-full object-cover"
                    ${c.objectPosition ? `style="object-position: ${c.objectPosition};"` : ''} />
                  <div
                    class="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3.5 flex items-end justify-between gap-2"
                    style="background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.72) 55%, rgba(10, 10, 10, 0) 100%);">
                    <div class="min-w-0">
                      <p class="text-[9px] font-mono text-gray-300 uppercase tracking-wider truncate">${c.issuer} · ${c.shortDate}</p>
                      <p class="text-gold font-mono text-[11px] tracking-[0.12em] uppercase leading-tight line-clamp-2 mt-0.5">${c.shortTitle}</p>
                    </div>
                    <span class="shrink-0 text-[9px] font-mono text-gold border border-gold/30 bg-black/70 rounded-md px-2 py-0.5 uppercase">View</span>
                  </div>
                </button>
              </div>`;
  })
  .join('\n');

const certCount = creds.filter((c) => c.category === 'certificates').length;
const eduCount = creds.filter((c) => c.category === 'education').length;
const safeJsonData = JSON.stringify(creds).replace(/</g, '\\u003c');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certificates — Gokulraj S E</title>
    <meta name="description" content="Certificates and training records of Gokulraj S E: Automation Anywhere RPA, Great Learning Academy QA &amp; Python Selenium Certificates, Besant Technologies QA &amp; SQL Training." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-dark text-white min-h-screen">
    ${getTopNav('credentials')}

    <div class="relative z-10 flex min-h-screen">
      <main class="min-w-0 flex-1 pt-0 lg:pt-6">
        <div class="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
          <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

          <div class="relative z-10 max-w-3xl mx-auto flex flex-col gap-10 pt-4">
            <!-- Page Title -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Achievements</p>
              <h1 class="text-4xl font-bold text-white gold-underline pb-2">My Certificates</h1>
              <p class="text-gray-500 text-sm mt-4"><span id="creds-count-label">${creds.length} certificates</span> · hover or tap to explore</p>
            </div>

            <!-- Filter Pills -->
            <div class="flex flex-wrap gap-2">
              <button type="button" data-filter="all" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-gold text-dark border-gold font-semibold cursor-pointer">
                All <span class="ml-1 opacity-75 text-[10px] filter-count">(${creds.length})</span>
              </button>
              <button type="button" data-filter="certificates" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Certificates <span class="ml-1 opacity-60 text-[10px] filter-count">(${certCount})</span>
              </button>
              <button type="button" data-filter="education" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Education <span class="ml-1 opacity-60 text-[10px] filter-count">(${eduCount})</span>
              </button>
            </div>

            <!-- Desktop Alternating Timeline (Pic 1 & Pic 2) -->
            <div id="creds-desktop-timeline" class="hidden md:block relative">
              <div
                class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
                style="background-image: repeating-linear-gradient(rgb(245, 166, 35) 0px, rgb(245, 166, 35) 6px, transparent 6px, transparent 14px);"></div>
              <div class="flex flex-col gap-14 relative z-10">
                ${desktopTimelineHtml}
              </div>
            </div>

            <!-- Mobile Timeline -->
            <div id="creds-mobile-timeline" class="md:hidden relative pl-2 pb-4">
              <div
                class="absolute left-4 top-0 bottom-0 w-px pointer-events-none"
                style="background-image: repeating-linear-gradient(rgb(245, 166, 35) 0px, rgb(245, 166, 35) 5px, transparent 5px, transparent 12px);"></div>
              <div class="flex flex-col gap-5 pl-3 relative z-10">
                ${mobileTimelineHtml}
              </div>
            </div>

            <!-- Footer -->
            <footer class="pt-8 pb-4 border-t border-dark-300 text-center text-xs text-gray-500 font-mono">
              © 2026 Gokulraj S E · Software Test Engineer — Manual &amp; Automation Testing
            </footer>
          </div>
        </div>
      </main>
    </div>

    <!-- Credential / Certificate Modal Lightbox (Pic 3 style) -->
    <div
      id="cred-modal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4 pt-6 pb-24 md:pt-20 md:pb-8 opacity-0 pointer-events-none transition-opacity duration-200"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cred-modal-title">
      <div
        id="cred-modal-dialog"
        class="relative w-full max-w-xl max-h-[calc(100vh-140px)] bg-dark-100 border border-gold/30 rounded-2xl overflow-hidden shadow-2xl shadow-gold/20 flex flex-col">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-dark-200 to-dark-100 border-b border-gold/20 p-4 flex items-start justify-between gap-3 shrink-0">
          <div class="flex flex-col gap-2 flex-1 min-w-0">
            <h3 id="cred-modal-title" class="text-white font-bold text-base sm:text-lg leading-snug">Certificate</h3>
            <div id="cred-modal-tags" class="flex flex-wrap gap-2"></div>
          </div>
          <button
            id="cred-modal-close"
            type="button"
            class="w-9 h-9 rounded-lg bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/40 transition-all shrink-0 cursor-pointer"
            aria-label="Close certificate preview">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="relative bg-dark-200 overflow-auto max-h-[calc(100vh-280px)] p-3 sm:p-4">
          <img
            id="cred-modal-img"
            src=""
            alt=""
            class="w-full h-auto max-h-[56vh] object-contain mx-auto rounded-lg" />
          <p id="cred-modal-desc" class="text-xs text-gray-300 leading-relaxed mt-3 px-1"></p>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gradient-to-r from-dark-200 to-dark-100 border-t border-gold/20 p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div id="cred-modal-meta" class="text-xs text-gray-400 font-mono"></div>
          <div class="flex flex-wrap items-center gap-2">
            <a
              id="cred-modal-verify"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden items-center gap-2 px-4 py-2 bg-dark-200 border border-dark-300 rounded-lg text-gray-200 hover:border-gold hover:text-gold text-xs sm:text-sm font-medium transition-all duration-200">
              Verify &nearr;
            </a>
            <a
              id="cred-modal-download"
              href="#"
              download=""
              class="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/40 rounded-lg text-gold text-xs sm:text-sm font-medium hover:bg-gold/20 hover:border-gold/60 transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Certificate
            </a>
            <span
              id="cred-modal-verified"
              class="hidden items-center gap-1.5 px-3 py-1.5 bg-dark-200 border border-dark-300 rounded-lg text-gray-400 text-xs font-mono">
              Verified Portfolio Record
            </span>
          </div>
        </div>
      </div>
    </div>

    ${getBottomNav('credentials')}
    ${getFloatingWidgets()}

    <script id="cred-data" type="application/json">${safeJsonData}</script>
    <script src="./main.js"></script>
  </body>
</html>`;

fs.writeFileSync('credentials.html', html, 'utf8');
console.log('Created credentials.html');
