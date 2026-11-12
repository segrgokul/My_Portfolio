const fs = require('fs');
const {
  getTopNav,
  getBottomNav,
  getFloatingWidgets,
} = require('./site_helpers');

const developmentExperienceProjects = [
  {
    id: '06',
    period: '2026 · Edition 1.1',
    liveLabel: 'Live · V1.0',
    eyebrow: 'COEMPT EDUTECK · SOFTWARE DEVELOPMENT · S.E. GOKULRAJ',
    backTag: 'COEMPT PROJECT PLANNER · APPLICATION DEVELOPMENT',
    backFooter: 'Development Experience · Coempt Eduteck',
    footerLeft: 'Coempt Eduteck',
    backFooterRight: 'S.E.Gokulraj',
    linkUrl: null,
    title: 'COEMPT Project Planner — Requirement Tracker V1.0',
    image: null,
    desktopSpan: 'span 1 / span 2',
    summary:
      'Designed and developed the COEMPT Project Planner (Requirement Tracker V1.0) web portal—orchestrating 5 role-based workflows across Org Admin, COE/VC, Project Manager, Developer, and Tester with timeline negotiation, 24h SLA escalations, Email OTP security, and Excel export.',
    tags: [
      'Requirement Tracker V1.0',
      '5 Role Workflows',
      'SLA & Escalations',
      'OTP Security',
      'Excel Export',
    ],
    highlights: [
      '<strong>Designed &amp; Developed by S.E. Gokulraj:</strong> Engineered the COEMPT Project Planner (Requirement Tracker V1.0) platform for COEMPT EDUTECK Pvt. Ltd. (Edition 1.0 Sep 2026 / Edition 1.1 Oct 2026).',
      '<strong>5 Role-Based Login Portals:</strong> Built tailored workflows for Org Admin (users, service mapping, statistical reports, calendar), COE/VC (P1–P4 intake up to 100 MB), PM (sub-requirements &amp; backup allocation), Developer, and Tester.',
      '<strong>Timeline Negotiation &amp; SLA Escalation:</strong> Implemented Accept / Suggest Another Date counter-proposals, Move to Backup handover, automated "In Testing" transitions, and 24-hour delay flags.',
      '<strong>Security &amp; Issue Tracking:</strong> Enforced single active session per user, 15-min idle auto-logout, 5-min Email OTP recovery, CMP-xxxx issue monitoring, and Excel (.xlsx) report exports.',
    ],
  },
  {
    id: '07',
    period: '2022 – 2023',
    liveLabel: 'Live',
    eyebrow: 'GitHub · Python Security IDS',
    backTag: 'INTRUDER-DETECTION-SYSTEM-FOR-HOME-SECURITY',
    backFooter: 'Dev Experience · Python IDS',
    linkLabel: 'GitHub Repo ↗',
    backLinkLabel: 'View Source ↗',
    linkUrl:
      'https://github.com/segrgokul/INTRUDER-DETECTION-SYSTEM-FOR-HOME-SECURITY',
    title: 'Intruder Detection System for Home Security',
    image: './assets/project-ids-security.svg',
    desktopSpan: 'span 1 / span 1',
    summary:
      'An IDS system for a home based security and alert system via mail—built in Python (IDS(with twilio).py) for email & Twilio alerts.',
    tags: ['Python', 'Home IDS', 'Email Alerts', 'Twilio'],
    highlights: [
      'Python-based Intruder Detection System (IDS) for home security monitoring.',
      'Automated email alerts & Twilio SMS triggers inside IDS(with twilio).py.',
      'Isolated config & dependencies via credentials.txt and requirements.txt.',
      'Structured pom.xml & testng.xml metadata for modular validation.',
    ],
  },
];

function renderDevExperienceCard(project, isMobile) {
  const heightPx = isMobile ? 300 : 270;
  const containerStyle = isMobile
    ? `min-height: ${heightPx}px; height: ${heightPx}px; perspective: 1200px;`
    : `min-height: ${heightPx}px; height: ${heightPx}px; grid-area: ${project.desktopSpan}; perspective: 1200px;`;
  const innerStyle = `transform-style: preserve-3d; min-height: ${heightPx}px; height: 100%;`;
  const isWideDesktop = !isMobile && project.desktopSpan.includes('span 2');
  const tagsHtml = (isMobile ? project.tags.slice(0, 4) : project.tags)
    .map(
      (tag) =>
        `<span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">${tag}</span>`
    )
    .join('\n                        ');
  const highlightsHtml = (isMobile ? project.highlights.slice(0, 3) : project.highlights)
    .map((item) => `<li>${item}</li>`)
    .join('\n                          ');

  const backgroundHtml = project.image
    ? `<div class="absolute inset-0">
                      <img src="${project.image}" alt="${project.title}" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>`
    : `<div class="absolute inset-0" style="background: radial-gradient(circle at 85% 22%, rgba(212, 165, 55, 0.08), transparent 55%);"></div>`;

  const frontFooterLeftHtml = project.linkUrl
    ? `<a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="text-[10px] font-mono text-gold hover:underline">${project.linkLabel}</a>`
    : `<span class="text-[9px] uppercase tracking-[0.18em] text-gold/80">${project.footerLeft}</span>`;

  const backFooterRightHtml = project.linkUrl
    ? `<a href="${project.linkUrl}" target="_blank" rel="noopener noreferrer" class="text-gold hover:underline shrink-0">${project.backLinkLabel}</a>`
    : `<span class="text-gold/80 shrink-0">${project.backFooterRight}</span>`;

  return `
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="${containerStyle}" data-category="all live developer">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="${innerStyle}">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    ${backgroundHtml}
                    <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">${project.period}</span>
                      <div class="flex items-center gap-1.5">
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-[10px] text-gray-400">${project.liveLabel}</span>
                      </div>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-8 select-none text-[60px] font-bold leading-none text-white/[0.04]">${project.id}</div>

                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest block truncate">${project.eyebrow}</span>
                      <h3 class="${isWideDesktop ? 'text-lg' : 'text-base'} font-bold text-white group-hover:text-gold transition-colors">
                        ${project.title}
                      </h3>
                      <p class="text-xs text-gray-300 ${isWideDesktop ? 'max-w-xl leading-relaxed' : 'line-clamp-3 leading-relaxed'}">
                        ${project.summary}
                      </p>
                      <div class="flex flex-wrap gap-1.5 pt-1">
                        ${tagsHtml}
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        ${frontFooterLeftHtml}
                        <span class="text-[9px] uppercase tracking-[0.18em] text-gray-500">tap card to flip</span>
                      </div>
                    </div>
                  </div>

                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest truncate">${project.backTag}</span>
                      <span class="text-[9px] text-gray-500 shrink-0">Tap to flip ⟳</span>
                    </div>
                    <div class="min-h-0 flex-1 space-y-1.5 py-2 text-xs text-gray-300 overflow-y-auto leading-relaxed">
                      <p class="font-semibold text-white">${project.title}</p>
                      <ul class="list-disc list-inside space-y-1 text-[11px]">
                        ${highlightsHtml}
                      </ul>
                    </div>
                    <div class="pt-1.5 border-t border-dark-300 flex items-center justify-between gap-2 text-[10px] font-mono shrink-0">
                      <span class="text-gray-400 truncate">${project.backFooter}</span>
                      ${backFooterRightHtml}
                    </div>
                  </div>
                </div>
              </div>`;
}

function renderDevelopmentExperienceCards(isMobile) {
  return developmentExperienceProjects
    .map((project) => renderDevExperienceCard(project, isMobile))
    .join('\n');
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Projects — Gokulraj S E</title>
    <meta name="description" content="Selected test automation and QA projects by Gokulraj S E, featuring Selenium WebDriver, Postman API suites, and AI-assisted QA." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-dark text-white min-h-screen">
    ${getTopNav('projects')}

    <div class="relative z-10 flex min-h-screen">
      <main class="min-w-0 flex-1 pt-0 lg:pt-6">
        <div class="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
          <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

          <div class="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 pt-4">

            <!-- Page Title -->
            <div>
              <p class="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-gold">Portfolio</p>
              <h1 class="gold-underline pb-2 text-4xl font-bold text-white">Selected Works</h1>
              <p class="mt-4 text-sm text-gray-500"><span id="projects-count-label">7 projects</span> · Tap cards to flip &amp; explore</p>
            </div>

            <!-- Filter Buttons -->
            <div class="flex flex-wrap gap-2">
              <button data-filter="all" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-gold bg-gold font-semibold text-dark cursor-pointer">
                All <span class="filter-count">(7)</span>
              </button>
              <button data-filter="live" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                <span class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Live <span class="filter-count">(7)</span></span>
              </button>
              <button data-filter="automation" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Automation <span class="filter-count">(4)</span>
              </button>
              <button data-filter="manual" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Manual QA <span class="filter-count">(2)</span>
              </button>
              <button data-filter="tools" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                CI/CD &amp; Tools <span class="filter-count">(4)</span>
              </button>
              <button data-filter="developer" class="filter-btn rounded-xl border px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 border-dark-300 bg-dark-100 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Development Experience <span class="filter-count">(2)</span>
              </button>
            </div>

            <!-- Desktop Bento Grid (Matching Pic 2 layout & dimensions) -->
            <div class="hidden md:block">
              <div id="projects-desktop-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0px, 1fr)); gap: 16px; grid-auto-flow: dense;">

                <!-- Card 1 (Large: span 2 / span 2, aligns with Cards 02+03 = 456px) -->
                <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 456px; height: 100%; grid-area: span 2 / span 2; perspective: 1200px;" data-category="all live automation tools">
                  <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 456px; height: 100%;">
                    
                    <!-- Front -->
                    <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-6 rounded-2xl overflow-hidden">
                      <div class="absolute inset-0">
                        <img src="./assets/project-selenium.png" alt="Selenium Automation" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-dark-200/40"></div>
                      </div>
                      <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div class="relative z-10 flex items-center justify-between">
                        <span class="text-[10px] font-mono text-gray-400">2024 – Present</span>
                        <div class="flex items-center gap-1.5">
                          <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                      </div>
                      <div class="pointer-events-none absolute right-5 top-12 select-none text-[80px] font-bold leading-none text-white/[0.04]">01</div>
                      
                      <div class="relative z-10 space-y-2 mt-auto">
                        <span class="text-[10px] uppercase font-mono text-gold tracking-widest">Coempt Eduteck · Automation Test Engineer</span>
                        <h3 class="text-2xl font-bold text-white group-hover:text-gold transition-colors">
                          Selenium WebDriver-Java Framework
                        </h3>
                        <p class="text-sm text-gray-300 max-w-xl leading-relaxed">
                          Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing, validating results against defined pass/fail conditions and generating detailed quality reports.
                        </p>
                        <div class="flex flex-wrap gap-1.5 pt-2">
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2.5 py-0.5 text-[10px] font-mono text-gold/90">Selenium WebDriver</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2.5 py-0.5 text-[10px] font-mono text-gold/90">Java</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2.5 py-0.5 text-[10px] font-mono text-gold/90">TestNG</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2.5 py-0.5 text-[10px] font-mono text-gold/90">POM</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2.5 py-0.5 text-[10px] font-mono text-gold/90">Jenkins CI/CD</span>
                        </div>
                      </div>

                      <div class="relative z-10 flex items-center justify-between pt-2">
                        <span class="text-[9px] uppercase tracking-[0.18em] text-gold/80">Coempt Eduteck</span>
                        <span class="text-[9px] uppercase tracking-[0.18em] text-gray-500">tap card to flip</span>
                      </div>
                    </div>

                    <!-- Back -->
                    <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-6 flex flex-col justify-between backdrop-blur">
                      <div class="flex items-center justify-between gap-3 pb-2 border-b border-dark-300 shrink-0">
                        <span class="text-[10px] font-mono text-gold uppercase tracking-widest">Key Responsibilities</span>
                        <span class="text-[10px] text-gray-500">Tap to flip back ⟳</span>
                      </div>
                      <div class="min-h-0 flex-1 space-y-3 py-2 overflow-y-auto">
                        <h4 class="text-base font-semibold text-white">Automation Test Engineer — Coempt Eduteck</h4>
                        <ul class="text-xs text-gray-300 space-y-2 list-disc list-inside leading-relaxed">
                          <li>Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing.</li>
                          <li>Validated results against defined pass/fail conditions and generated comprehensive quality reports.</li>
                          <li>Supported CI/CD implementation through Jenkins, and used Git for version control of automation scripts.</li>
                          <li>Participated in sprint planning, test estimation, risk assessment, quality reporting, and defect tracking.</li>
                          <li>Mentored a team of 3-4 junior QA engineers and stepped in several times each quarter to coordinate testing in the QA Lead's absence.</li>
                        </ul>
                      </div>
                      <div class="pt-2 border-t border-dark-300 flex items-center justify-between shrink-0">
                        <span class="text-[10px] text-gold font-mono">December 2024 – Present</span>
                        <span class="text-[9px] uppercase tracking-widest text-gray-500">Gokulraj S E</span>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Card 2 (Card 02: span 1 / span 1, min-height: 220px) -->
                <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 220px; height: 220px; grid-area: span 1 / span 1; perspective: 1200px;" data-category="all live automation tools">
                  <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 220px; height: 100%;">
                    
                    <!-- Front -->
                    <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                      <div class="absolute inset-0">
                        <img src="./assets/project-api-postman.png" alt="PDF & Postman" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                      </div>
                      <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div class="relative z-10 flex items-center justify-between">
                        <span class="text-[10px] font-mono text-gray-400">2024</span>
                        <div class="flex items-center gap-1.5">
                          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                      </div>
                      <div class="pointer-events-none absolute right-4 top-8 select-none text-[60px] font-bold leading-none text-white/[0.04]">02</div>
                      
                      <div class="relative z-10 space-y-1 mt-auto">
                        <h3 class="text-base font-bold text-white group-hover:text-gold transition-colors">
                          PDF Extraction &amp; Postman API Suite
                        </h3>
                        <p class="text-xs text-gray-300 line-clamp-2">
                          Automated extraction of data from PDFs into Excel for validation and reporting, and performed API testing using Postman to ensure backend data integrity.
                        </p>
                        <div class="flex flex-wrap gap-1 pt-1">
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Postman</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">REST API</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Excel Automation</span>
                        </div>
                      </div>
                    </div>

                    <!-- Back -->
                    <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-4 flex flex-col justify-between backdrop-blur">
                      <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                        <span class="text-[9px] font-mono text-gold uppercase tracking-widest">API &amp; Data Validation</span>
                        <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                      </div>
                      <div class="min-h-0 flex-1 space-y-1.5 py-1 text-xs text-gray-300 overflow-y-auto leading-relaxed">
                        <p class="font-semibold text-white">Coempt Eduteck</p>
                        <ul class="list-disc list-inside space-y-1 text-[11px]">
                          <li>Automated extraction of data from PDFs into Excel for validation and reporting.</li>
                          <li>Performed API testing using Postman to ensure backend data integrity.</li>
                          <li>Verified endpoint responses, status codes, and JSON schema structures.</li>
                        </ul>
                      </div>
                      <span class="text-[9px] text-gray-500 font-mono shrink-0">2024 · Validation Suite</span>
                    </div>

                  </div>
                </div>

                <!-- Card 3 (Card 03: span 1 / span 1, min-height: 220px) -->
                <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 220px; height: 220px; grid-area: span 1 / span 1; perspective: 1200px;" data-category="all live automation tools">
                  <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 220px; height: 100%;">
                    
                    <!-- Front -->
                    <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                      <div class="absolute inset-0">
                        <img src="./assets/project-ai-gemini.png" alt="AI Assisted Testing" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                      </div>
                      <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div class="relative z-10 flex items-center justify-between">
                        <span class="text-[10px] font-mono text-gray-400">2024</span>
                        <div class="flex items-center gap-1.5">
                          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                      </div>
                      <div class="pointer-events-none absolute right-4 top-8 select-none text-[60px] font-bold leading-none text-white/[0.04]">03</div>
                      
                      <div class="relative z-10 space-y-1 mt-auto">
                        <h3 class="text-base font-bold text-white group-hover:text-gold transition-colors">
                          AI-Assisted Testing Suite (Gemini 3.5)
                        </h3>
                        <p class="text-xs text-gray-300 line-clamp-2">
                          Utilized Google Gemini 3.5 to support AI-based automation tasks, including test data generation and log analysis.
                        </p>
                        <div class="flex flex-wrap gap-1 pt-1">
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Gemini 3.5</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">AI Testing</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Log Analysis</span>
                        </div>
                      </div>
                    </div>

                    <!-- Back -->
                    <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-4 flex flex-col justify-between backdrop-blur">
                      <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                        <span class="text-[9px] font-mono text-gold uppercase tracking-widest">AI Testing Automation</span>
                        <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                      </div>
                      <div class="min-h-0 flex-1 space-y-1.5 py-1 text-xs text-gray-300 overflow-y-auto leading-relaxed">
                        <p class="font-semibold text-white">Coempt Eduteck</p>
                        <ul class="list-disc list-inside space-y-1 text-[11px]">
                          <li>Utilized Google Gemini 3.5 to support AI-based automation tasks.</li>
                          <li>Generated synthetic test data covering boundary and edge conditions.</li>
                          <li>Parsed error logs and clustered test failures for accelerated triage.</li>
                        </ul>
                      </div>
                      <span class="text-[9px] text-gray-500 font-mono shrink-0">2024 · AI QA Suite</span>
                    </div>

                  </div>
                </div>

                <!-- Card 4 (Card 04: span 1 / span 2, min-height: 256px) -->
                <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 256px; height: 256px; grid-area: span 1 / span 2; perspective: 1200px;" data-category="all live automation manual">
                  <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 256px; height: 100%;">
                    
                    <!-- Front -->
                    <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                      <div class="absolute inset-0">
                        <img src="./assets/project-crossbrowser.png" alt="Kaaspro QA" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                      </div>
                      <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div class="relative z-10 flex items-center justify-between">
                        <span class="text-[10px] font-mono text-gray-400">October 2023 – November 2024</span>
                        <div class="flex items-center gap-1.5">
                          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                      </div>
                      <div class="pointer-events-none absolute right-4 top-8 select-none text-[60px] font-bold leading-none text-white/[0.04]">04</div>
                      
                      <div class="relative z-10 space-y-1.5 mt-auto">
                        <span class="text-[10px] uppercase font-mono text-gold tracking-widest">Quality Assurance Engineer — Kaaspro Enterprises</span>
                        <h3 class="text-lg font-bold text-white group-hover:text-gold transition-colors">
                          Cross-Platform Web QA &amp; Selenium Suite
                        </h3>
                        <p class="text-xs text-gray-300 max-w-xl leading-relaxed">
                          Executed manual, functional, and regression testing to validate web application products within an Agile/Scrum environment. Developed and maintained Selenium scripts, conducting cross-platform compatibility testing.
                        </p>
                        <div class="flex flex-wrap gap-1.5 pt-1">
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Selenium</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Cross-Platform QA</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Agile/Scrum</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Regression Testing</span>
                        </div>
                      </div>
                    </div>

                    <!-- Back -->
                    <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                      <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                        <span class="text-[9px] font-mono text-gold uppercase tracking-widest">Kaaspro Enterprises QA Experience</span>
                        <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                      </div>
                      <div class="min-h-0 flex-1 space-y-1.5 py-1 text-xs text-gray-300 overflow-y-auto leading-relaxed">
                        <p class="font-semibold text-white">Quality Assurance Engineer (October 2023 – November 2024)</p>
                        <ul class="list-disc list-inside space-y-1 text-[11px]">
                          <li>Executed manual, functional, and regression testing to validate web applications within Agile/Scrum.</li>
                          <li>Developed and maintained Selenium-based test automation scripts, improving reliability and coverage.</li>
                          <li>Conducted cross-platform compatibility testing across multiple devices, browsers, and operating systems.</li>
                          <li>Mentored and guided junior testers on manual test execution and defect tracking best practices.</li>
                        </ul>
                      </div>
                      <div class="pt-1 border-t border-dark-300 flex items-center justify-between text-[9px] text-gray-500 font-mono shrink-0">
                        <span>Kaaspro Enterprises</span>
                        <span>1 Year 2 Months</span>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Card 5 (Card 05: span 1 / span 1, min-height: 256px) -->
                <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 256px; height: 256px; grid-area: span 1 / span 1; perspective: 1200px;" data-category="all live manual tools">
                  <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 256px; height: 100%;">
                    
                    <!-- Front -->
                    <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                      <div class="absolute inset-0">
                        <img src="./assets/project-rpa-bots.png" alt="RPA Bots" class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                      </div>
                      <div class="absolute left-0 right-0 top-0 z-20 h-0.5 origin-left bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      
                      <div class="relative z-10 flex items-center justify-between">
                        <span class="text-[10px] font-mono text-gray-400">January 2023 – July 2023</span>
                        <div class="flex items-center gap-1.5">
                          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                      </div>
                      <div class="pointer-events-none absolute right-4 top-8 select-none text-[60px] font-bold leading-none text-white/[0.04]">05</div>
                      
                      <div class="relative z-10 space-y-1 mt-auto">
                        <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Medusind Solution</span>
                        <h3 class="text-base font-bold text-white group-hover:text-gold transition-colors">
                          RPA Bot Monitoring &amp; Web Defect Triage
                        </h3>
                        <p class="text-xs text-gray-300 line-clamp-2">
                          Monitored and resolved live issues in RPA bots built with Automation Anywhere, improving production environment usage by 10%. Tracked and reported web defects.
                        </p>
                        <div class="flex flex-wrap gap-1 pt-1">
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Automation Anywhere</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">RPA Bots</span>
                          <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Defect Triage</span>
                        </div>
                      </div>
                    </div>

                    <!-- Back -->
                    <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-4 flex flex-col justify-between backdrop-blur">
                      <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                        <span class="text-[9px] font-mono text-gold uppercase tracking-widest">Medusind Solution Experience</span>
                        <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                      </div>
                      <div class="min-h-0 flex-1 space-y-1.5 py-1 text-xs text-gray-300 overflow-y-auto leading-relaxed">
                        <p class="font-semibold text-white">Software Tester Trainee</p>
                        <ul class="list-disc list-inside space-y-1 text-[11px]">
                          <li>Monitored and resolved live issues in RPA bots built with Automation Anywhere, improving production environment usage by 10%.</li>
                          <li>Tracked and reported web application defects, supporting developers in issue resolution through detailed test documentation.</li>
                          <li>Conducted regression validation and verification tests.</li>
                        </ul>
                      </div>
                      <span class="text-[9px] text-gray-500 font-mono shrink-0">Medusind Solution · Jan – Jul 2023</span>
                    </div>

                  </div>
                </div>

                <!-- Cards 6-7 (Development Experience: span 1 / span 2 + span 1 / span 1) -->
                ${renderDevelopmentExperienceCards(false)}

              </div>
            </div>

            <!-- Mobile View (Stacked full-height flip cards) -->
            <div class="md:hidden flex flex-col gap-5">
              
              <!-- Mobile Card 1 -->
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 320px; height: 320px; perspective: 1200px;" data-category="all live automation tools">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 320px; height: 100%;">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    <div class="absolute inset-0">
                      <img src="./assets/project-selenium.png" alt="Project 1" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>
                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">2024 – Present</span>
                      <span class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-9 select-none text-[60px] font-bold leading-none text-white/[0.04]">01</div>
                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Coempt Eduteck</span>
                      <h3 class="text-lg font-bold text-white">Selenium WebDriver-Java Framework</h3>
                      <p class="text-xs text-gray-300 line-clamp-3">
                        Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing, validating results against defined pass/fail conditions and generating detailed quality reports.
                      </p>
                      <div class="flex flex-wrap gap-1 pt-1">
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Selenium</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Java</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">TestNG</span>
                      </div>
                      <div class="text-[9px] text-gray-500 pt-1">tap card to flip</div>
                    </div>
                  </div>
                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest">Responsibilities</span>
                      <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                    </div>
                    <ul class="min-h-0 flex-1 text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed overflow-y-auto py-1">
                      <li>Developed and maintained Selenium WebDriver-Java data-driven frameworks for regression testing.</li>
                      <li>Automated extraction of data from PDFs into Excel and tested APIs with Postman.</li>
                      <li>Supported CI/CD Jenkins implementation and used Git for version control.</li>
                      <li>Mentored 3-4 junior QA engineers and coordinated testing in QA Lead's absence.</li>
                    </ul>
                    <span class="text-[9px] text-gold font-mono shrink-0">Coempt Eduteck · Dec 2024 – Present</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Card 2 -->
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 280px; height: 280px; perspective: 1200px;" data-category="all live automation tools">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 280px; height: 100%;">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    <div class="absolute inset-0">
                      <img src="./assets/project-api-postman.png" alt="Project 2" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>
                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">2024</span>
                      <span class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-9 select-none text-[60px] font-bold leading-none text-white/[0.04]">02</div>
                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Coempt Eduteck</span>
                      <h3 class="text-base font-bold text-white">PDF Extraction &amp; Postman API Suite</h3>
                      <p class="text-xs text-gray-300 line-clamp-3">
                        Automated extraction of data from PDFs into Excel for validation and reporting, and performed API testing using Postman to ensure backend data integrity.
                      </p>
                      <div class="flex flex-wrap gap-1 pt-1">
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Postman</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">REST API</span>
                      </div>
                      <div class="text-[9px] text-gray-500 pt-1">tap card to flip</div>
                    </div>
                  </div>
                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest">API Testing</span>
                      <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                    </div>
                    <ul class="min-h-0 flex-1 text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed overflow-y-auto py-1">
                      <li>Automated extraction of data from PDFs into Excel for validation and reporting.</li>
                      <li>Performed API testing using Postman to ensure backend data integrity.</li>
                      <li>Validated response payload integrity and backend test assertions.</li>
                    </ul>
                    <span class="text-[9px] text-gold font-mono shrink-0">Coempt Eduteck · 2024</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Card 3 -->
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 280px; height: 280px; perspective: 1200px;" data-category="all live automation tools">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 280px; height: 100%;">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    <div class="absolute inset-0">
                      <img src="./assets/project-ai-gemini.png" alt="Project 3" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>
                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">2024</span>
                      <span class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-9 select-none text-[60px] font-bold leading-none text-white/[0.04]">03</div>
                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Coempt Eduteck</span>
                      <h3 class="text-base font-bold text-white">AI-Assisted Testing Suite (Gemini 3.5)</h3>
                      <p class="text-xs text-gray-300 line-clamp-3">
                        Utilized Google Gemini 3.5 to support AI-based automation tasks, including test data generation and log analysis.
                      </p>
                      <div class="flex flex-wrap gap-1 pt-1">
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Gemini 3.5</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">AI Testing</span>
                      </div>
                      <div class="text-[9px] text-gray-500 pt-1">tap card to flip</div>
                    </div>
                  </div>
                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest">AI QA Workflow</span>
                      <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                    </div>
                    <ul class="min-h-0 flex-1 text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed overflow-y-auto py-1">
                      <li>Utilized Google Gemini 3.5 to support AI-based automation tasks.</li>
                      <li>Generated automated synthetic datasets across boundary and edge conditions.</li>
                      <li>Clustered and parsed regression test failure logs with generative assistance.</li>
                    </ul>
                    <span class="text-[9px] text-gold font-mono shrink-0">Coempt Eduteck · 2024</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Card 4 -->
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 280px; height: 280px; perspective: 1200px;" data-category="all live automation manual">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 280px; height: 100%;">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    <div class="absolute inset-0">
                      <img src="./assets/project-crossbrowser.png" alt="Kaaspro" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>
                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">Oct 2023 – Nov 2024</span>
                      <span class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-9 select-none text-[60px] font-bold leading-none text-white/[0.04]">04</div>
                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Kaaspro Enterprises</span>
                      <h3 class="text-base font-bold text-white">Cross-Platform Web QA &amp; Selenium Suite</h3>
                      <p class="text-xs text-gray-300 line-clamp-3">
                        Executed manual, functional, and regression testing to validate web application products within an Agile/Scrum environment, participating in sprint ceremonies and providing testing estimates.
                      </p>
                      <div class="flex flex-wrap gap-1 pt-1">
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Selenium</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Cross-Platform</span>
                      </div>
                      <div class="text-[9px] text-gray-500 pt-1">tap card to flip</div>
                    </div>
                  </div>
                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest">Kaaspro Enterprises</span>
                      <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                    </div>
                    <ul class="min-h-0 flex-1 text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed overflow-y-auto py-1">
                      <li>Executed manual, functional, and regression testing within Agile/Scrum.</li>
                      <li>Developed and maintained Selenium-based test automation scripts.</li>
                      <li>Conducted cross-platform compatibility testing across devices, browsers, and OS.</li>
                      <li>Mentored junior testers on manual test execution and defect tracking.</li>
                    </ul>
                    <span class="text-[9px] text-gold font-mono shrink-0">Kaaspro Enterprises · 14 Months</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Card 5 -->
              <div class="filterable-item flip-card-container group relative rounded-2xl border border-dark-300 bg-dark-100 cursor-pointer transition-colors duration-300 hover:border-gold/40" style="min-height: 280px; height: 280px; perspective: 1200px;" data-category="all live manual tools">
                <div class="flip-card-inner relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 280px; height: 100%;">
                  <!-- Front -->
                  <div class="flip-card-front backface-hidden absolute inset-0 flex flex-col justify-between p-5 rounded-2xl overflow-hidden">
                    <div class="absolute inset-0">
                      <img src="./assets/project-rpa-bots.png" alt="RPA" class="absolute inset-0 h-full w-full object-cover opacity-30" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/75 to-transparent"></div>
                    </div>
                    <div class="relative z-10 flex items-center justify-between">
                      <span class="text-[10px] font-mono text-gray-400">Jan 2023 – Jul 2023</span>
                      <span class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>
                    </div>
                    <div class="pointer-events-none absolute right-4 top-9 select-none text-[60px] font-bold leading-none text-white/[0.04]">05</div>
                    <div class="relative z-10 space-y-1.5 mt-auto">
                      <span class="text-[9px] uppercase font-mono text-gold tracking-widest">Medusind Solution</span>
                      <h3 class="text-base font-bold text-white">RPA Bot Monitoring &amp; Web Defect Triage</h3>
                      <p class="text-xs text-gray-300 line-clamp-3">
                        Monitored and resolved live issues in RPA bots built with Automation Anywhere, improving production environment usage by 10%. Tracked and reported web application defects.
                      </p>
                      <div class="flex flex-wrap gap-1 pt-1">
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">Automation Anywhere</span>
                        <span class="rounded-full border border-dark-300 bg-dark-300/80 px-2 py-0.5 text-[9px] font-mono text-gold/80">RPA Bots</span>
                      </div>
                      <div class="text-[9px] text-gray-500 pt-1">tap card to flip</div>
                    </div>
                  </div>
                  <!-- Back -->
                  <div class="flip-card-back backface-hidden rotate-y-180 absolute inset-0 rounded-2xl overflow-hidden border border-gold/40 bg-dark-200/95 p-5 flex flex-col justify-between backdrop-blur">
                    <div class="flex items-center justify-between pb-1 border-b border-dark-300 shrink-0">
                      <span class="text-[9px] font-mono text-gold uppercase tracking-widest">Medusind Solution</span>
                      <span class="text-[9px] text-gray-500">Tap to flip ⟳</span>
                    </div>
                    <ul class="min-h-0 flex-1 text-xs text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed overflow-y-auto py-1">
                      <li>Monitored and resolved live issues in RPA bots built with Automation Anywhere.</li>
                      <li>Improved production environment usage by 10% through proactive triage.</li>
                      <li>Tracked and reported web application defects, supporting developers with detailed documentation.</li>
                    </ul>
                    <span class="text-[9px] text-gold font-mono shrink-0">Medusind Solution · 7 Months</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Cards 6-7 (Development Experience) -->
              ${renderDevelopmentExperienceCards(true)}

            </div>

            <!-- Footer -->
            <div class="text-center py-4">
              <p class="text-gold text-xs font-mono tracking-widest">© 2026 Gokulraj S E</p>
            </div>

          </div>
        </div>
      </main>
    </div>

    ${getBottomNav('projects')}
    ${getFloatingWidgets()}

    <script src="./main.js"></script>
  </body>
</html>`;

fs.writeFileSync('projects.html', html, 'utf8');
console.log('Created projects.html');
