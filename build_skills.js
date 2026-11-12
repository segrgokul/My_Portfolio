const fs = require('fs');
const {
  getTopNav,
  getBottomNav,
  getDesktopSidebar,
  getMobileProfileHeader,
  getFloatingWidgets,
} = require('./site_helpers');

// Skills data from resume
const skillsData = [
  // Test Automation
  { name: 'Selenium', category: 'automation', catLabel: 'Test Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg', fallback: 'SE' },
  { name: 'Java', category: 'languages', catLabel: 'Languages', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', fallback: 'JA' },
  { name: 'TestNG', category: 'automation', catLabel: 'Test Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', fallback: 'NG' },
  { name: 'Maven', category: 'automation', catLabel: 'Test Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg', fallback: 'MV' },
  { name: 'POM', category: 'automation', catLabel: 'Test Automation', icon: '', fallback: 'POM' },
  { name: 'Playwright', category: 'automation', catLabel: 'Test Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg', fallback: 'PW' },
  { name: 'Tesseract OCR', category: 'automation', catLabel: 'Test Automation', icon: '', fallback: 'OCR' },
  
  // API & DevOps
  { name: 'Postman', category: 'api', catLabel: 'API & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', fallback: 'PM' },
  { name: 'REST API', category: 'api', catLabel: 'API & DevOps', icon: '', fallback: 'API' },
  { name: 'Jenkins', category: 'api', catLabel: 'API & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg', fallback: 'JK' },
  { name: 'Git', category: 'api', catLabel: 'API & DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', fallback: 'GIT' },
  
  // Emerging & AI
  { name: 'Gemini 3.5', category: 'emerging', catLabel: 'AI & RPA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg', fallback: 'AI' },
  { name: 'Automation Anywhere', category: 'emerging', catLabel: 'AI & RPA', icon: '', fallback: 'RPA' },

  // Databases & Languages
  { name: 'SQL', category: 'languages', catLabel: 'Languages', icon: '', fallback: 'SQL' },
  { name: 'MySQL', category: 'databases', catLabel: 'Databases & Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', fallback: 'MY' },
  { name: 'PostgreSQL', category: 'databases', catLabel: 'Databases & Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', fallback: 'PG' },
  { name: 'SSMS', category: 'databases', catLabel: 'Databases & Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg', fallback: 'SS' },

  // Methodologies
  { name: 'Agile/Scrum', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'AG' },
  { name: 'Regression', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'REG' },
  { name: 'Integration', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'INT' },
  { name: 'Cross-Browser', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'XB' },
  { name: 'UAT', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'UAT' },
  { name: 'Defect Triage', category: 'methodologies', catLabel: 'Methodologies', icon: '', fallback: 'BUG' },
];

const skillsGridHtml = skillsData
  .map(
    (s, idx) => `
    <div class="filterable-item group relative flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-110" data-category="${s.category}" title="${s.name} (${s.catLabel})">
      <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border border-dark-300 bg-dark-100 group-hover:border-gold/60 group-hover:bg-dark-200 group-hover:shadow-lg group-hover:shadow-gold/10 relative overflow-hidden">
        ${
          s.icon
            ? `<img src="${s.icon}" alt="${s.name}" class="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 filter brightness-90 group-hover:brightness-125" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/>
               <span class="hidden text-gold font-bold text-sm font-mono">${s.fallback}</span>`
            : `<span class="text-gold font-bold text-sm font-mono">${s.fallback}</span>`
        }
      </div>
      <p class="text-[10px] font-medium text-center leading-tight transition-colors duration-200 text-gray-400 group-hover:text-gold max-w-[70px] truncate">
        ${s.name}
      </p>
    </div>`
  )
  .join('');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Technical Skills — Gokulraj S E</title>
    <meta name="description" content="Technical testing skills of Gokulraj S E: Selenium WebDriver, Java, Postman API Testing, Jenkins CI/CD, SQL, and QA methodologies." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-dark text-white min-h-screen">
    ${getTopNav('skills')}

    <div class="relative z-10 flex min-h-screen">
      <main class="min-w-0 flex-1 pt-0 lg:pt-6">
        <div class="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
          <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

          <div class="relative z-10 max-w-5xl mx-auto flex flex-col gap-10 pt-4">

            <!-- Page Title -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Expertise</p>
              <h1 class="text-4xl font-bold text-white gold-underline pb-2">Technical Skills</h1>
              <p class="text-gray-500 text-sm mt-4">${skillsData.length} core technologies &amp; methodologies · click pills to filter</p>
            </div>

            <!-- Category Filter Pills -->
            <div class="flex flex-wrap gap-2">
              <button data-filter="all" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-gold text-dark border-gold font-semibold cursor-pointer">
                All (${skillsData.length})
              </button>
              <button data-filter="automation" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Test Automation <span class="ml-1 opacity-60 text-[9px]">7</span>
              </button>
              <button data-filter="languages" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Languages <span class="ml-1 opacity-60 text-[9px]">2</span>
              </button>
              <button data-filter="api" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                API &amp; DevOps <span class="ml-1 opacity-60 text-[9px]">4</span>
              </button>
              <button data-filter="emerging" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                AI &amp; RPA <span class="ml-1 opacity-60 text-[9px]">2</span>
              </button>
              <button data-filter="databases" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Databases &amp; Tools <span class="ml-1 opacity-60 text-[9px]">3</span>
              </button>
              <button data-filter="methodologies" class="filter-btn px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 bg-dark-100 border-dark-300 text-gray-400 hover:border-gold/50 hover:text-white cursor-pointer">
                Methodologies <span class="ml-1 opacity-60 text-[9px]">6</span>
              </button>
            </div>

            <!-- Floating Skill Icons Grid -->
            <div class="bg-dark-100 border border-dark-300 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
                ${skillsGridHtml}
              </div>
            </div>

            <!-- Detailed Competency Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 space-y-3 hover:border-gold/30 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-gold font-bold font-mono">01.</span>
                  <h3 class="text-white font-semibold text-base">Test Automation &amp; Frameworks</h3>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Deep experience architecting and maintaining <strong class="text-white">Selenium WebDriver with Java</strong> automation frameworks. Proficient in Page Object Model (POM), data-driven testing using Excel (Apache POI), TestNG assertions, parallel execution, and working knowledge of Playwright.
                </p>
              </div>

              <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 space-y-3 hover:border-gold/30 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-gold font-bold font-mono">02.</span>
                  <h3 class="text-white font-semibold text-base">API Testing &amp; CI/CD Pipelines</h3>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  End-to-end REST API testing using <strong class="text-white">Postman</strong>. Writing test suites for status codes, latency, headers, and JSON schema validation. Automated trigger integration via <strong class="text-white">Jenkins</strong> pipelines and Git version control.
                </p>
              </div>

              <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 space-y-3 hover:border-gold/30 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-gold font-bold font-mono">03.</span>
                  <h3 class="text-white font-semibold text-base">AI &amp; RPA Emerging Tech</h3>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Leveraging <strong class="text-white">Google Gemini 3.5</strong> for intelligent log parsing, automated defect triage, and synthetic edge-case generation. Proven experience in Robotic Process Automation using <strong class="text-white">Automation Anywhere</strong> for bot health monitoring and issue resolution.
                </p>
              </div>

              <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 space-y-3 hover:border-gold/30 transition-colors">
                <div class="flex items-center gap-2">
                  <span class="text-gold font-bold font-mono">04.</span>
                  <h3 class="text-white font-semibold text-base">Process &amp; Agile QA Leadership</h3>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  Experienced in Agile/Scrum ceremonies, test estimation, sprint planning, defect life cycle management, and release validation. Track record of mentoring 3-4 junior QA engineers and stepping in to steer test strategy during the QA Lead's absence.
                </p>
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

    ${getBottomNav('skills')}
    ${getFloatingWidgets()}

    <script src="./main.js"></script>
  </body>
</html>`;

fs.writeFileSync('skills.html', html, 'utf8');
console.log('Created skills.html');

