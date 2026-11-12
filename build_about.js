const fs = require('fs');
const {
  getTopNav,
  getBottomNav,
  getFloatingWidgets,
} = require('./site_helpers');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Me — Gokulraj S E</title>
    <meta name="description" content="About Gokulraj S E, Software Test Engineer specializing in manual and automation testing with Selenium WebDriver, Java, Postman, and CI/CD." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-dark text-white min-h-screen">
    ${getTopNav('about')}

    <div class="relative z-10 flex min-h-screen">
      <main class="min-w-0 flex-1 pt-0 lg:pt-6">
        <div class="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
          <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

          <div class="relative z-10 max-w-4xl mx-auto flex flex-col gap-10 pt-4">

            <!-- Page Title -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Who I Am</p>
              <h1 class="text-4xl font-bold text-white gold-underline pb-2">About Me</h1>
            </div>

            <!-- Bio Card -->
            <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:border-gold/30 transition-colors">
              <p class="text-gray-300 leading-relaxed text-sm">
                I am a dedicated <strong class="text-white font-semibold">Software Test Engineer</strong> with 3+ years of professional experience across manual and automation testing. I specialize in building robust, data-driven test automation frameworks using <span class="text-gold">Selenium WebDriver with Java</span>, ensuring comprehensive functional, regression, integration, and UAT test coverage across multi-platform web applications.
              </p>
              <p class="text-gray-400 leading-relaxed text-sm">
                Throughout my career at organizations like Coempt Eduteck, Kaaspro Enterprises, and Medusind Solution, I have paired deep automation engineering with hands-on CI/CD pipeline implementation via Jenkins, API testing with Postman, and emerging technologies including RPA bot validation (Automation Anywhere) and AI-assisted testing with Google Gemini 3.5.
              </p>
              <p class="text-gray-400 leading-relaxed text-sm">
                Beyond writing automated tests, I take strong ownership of release quality — from sprint planning and test case design to defect triage, test-strategy leadership, and mentoring junior QA team members.
              </p>
            </div>

            <!-- Career Journey / Work Experience -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Work Experience</p>
              <div class="space-y-4">
                <!-- Role 1 -->
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-dark-300">
                    <div>
                      <h3 class="text-lg font-bold text-white">Automation Test Engineer</h3>
                      <p class="text-gold text-sm font-medium">Coempt Eduteck</p>
                    </div>
                    <span class="text-xs font-mono text-gray-400 bg-dark-200 border border-dark-300 px-3 py-1 rounded-full self-start sm:self-center">
                      December 2024 – Present
                    </span>
                  </div>
                  <ul class="mt-4 space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside">
                    <li>Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing, validating results against defined pass/fail criteria and generating detailed quality reports.</li>
                    <li>Automated extraction of data from PDFs into Excel for validation and reporting; performed API testing using Postman to verify backend data integrity.</li>
                    <li>Supported CI/CD implementation through Jenkins, utilizing Git for version control of automation suites.</li>
                    <li>Utilized Google Gemini 3.5 to support AI-based automation tasks, including synthetic test data generation and log analysis.</li>
                    <li>Participated in sprint ceremonies, risk assessment, quality reporting, and release validation; mentored 3-4 junior QA engineers and coordinated testing in the QA Lead's absence.</li>
                  </ul>
                </div>

                <!-- Role 2 -->
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-dark-300">
                    <div>
                      <h3 class="text-lg font-bold text-white">Quality Assurance Engineer</h3>
                      <p class="text-gold text-sm font-medium">Kaaspro Enterprises</p>
                    </div>
                    <span class="text-xs font-mono text-gray-400 bg-dark-200 border border-dark-300 px-3 py-1 rounded-full self-start sm:self-center">
                      October 2023 – November 2024
                    </span>
                  </div>
                  <ul class="mt-4 space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside">
                    <li>Executed manual, functional, and regression testing to validate web application products within an Agile/Scrum environment, participating in sprint ceremonies and test estimations.</li>
                    <li>Developed and maintained Selenium-based test automation scripts, implementing enhancements to improve script reliability and test coverage.</li>
                    <li>Conducted cross-platform compatibility testing across multiple devices, browsers, and operating systems to ensure consistent application behavior and release readiness.</li>
                    <li>Mentored and guided junior testers on manual test execution, defect tracking, and testing best practices, collaborating with developers to support quality deliverables.</li>
                  </ul>
                </div>

                <!-- Role 3 -->
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-dark-300">
                    <div>
                      <h3 class="text-lg font-bold text-white">Software Tester Trainee</h3>
                      <p class="text-gold text-sm font-medium">Medusind Solution</p>
                    </div>
                    <span class="text-xs font-mono text-gray-400 bg-dark-200 border border-dark-300 px-3 py-1 rounded-full self-start sm:self-center">
                      January 2023 – July 2023
                    </span>
                  </div>
                  <ul class="mt-4 space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc list-inside">
                    <li>Monitored and resolved live issues in RPA bots built with Automation Anywhere, improving production environment usage by 10%.</li>
                    <li>Tracked and reported web application defects, supporting developers in issue resolution through detailed test documentation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Education Timeline -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Education</p>
              <div class="bg-dark-100 border border-dark-300 rounded-2xl p-6 relative">
                <div class="flex flex-col">
                  <!-- Education 1 -->
                  <div class="mb-6 pb-6 flex gap-4 items-start">
                    <div class="w-6 flex justify-center pt-1">
                      <div class="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-white font-semibold text-sm">Jerusalem College of Engineering</h3>
                      <p class="text-gold text-sm mt-0.5">2018 – 2022</p>
                      <p class="text-gray-300 text-sm font-medium mt-1">Bachelor of Engineering — Computer Science</p>
                      <p class="text-gray-400 text-xs mt-1">Completed undergraduate computer science studies with strong foundation in software engineering, database management systems, data structures, and algorithms.</p>
                    </div>
                  </div>

                  <!-- Education 2 -->
                  <div class="mb-0 pb-1 flex gap-4 items-start">
                    <div class="w-6 flex justify-center pt-1">
                      <div class="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-white font-semibold text-sm">Railway Mixed Hr. Sec. School</h3>
                      <p class="text-gold text-sm mt-0.5">2015 – 2018</p>
                      <p class="text-gray-300 text-sm font-medium mt-1">Higher &amp; Secondary Schooling</p>
                      <p class="text-gray-400 text-xs mt-1">Completed secondary and higher secondary school education with academic excellence in science and mathematics.</p>
                    </div>
                  </div>
                </div>
                <!-- Vertical Timeline connector line -->
                <div class="absolute left-9 top-8 bottom-8 w-px bg-dark-300/80 pointer-events-none z-0"></div>
              </div>
            </div>

            <!-- By The Numbers Grid -->
            <div>
              <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">By The Numbers</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 hover:border-gold/40 transition-colors">
                  <span class="text-3xl font-bold text-gold">3+</span>
                  <span class="text-xs text-gray-500 text-center">Years QA Experience</span>
                </div>
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 hover:border-gold/40 transition-colors">
                  <span class="text-3xl font-bold text-gold">7</span>
                  <span class="text-xs text-gray-500 text-center">Featured Projects</span>
                </div>
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 hover:border-gold/40 transition-colors">
                  <span class="text-3xl font-bold text-gold">8</span>
                  <span class="text-xs text-gray-500 text-center">Certifications</span>
                </div>
                <div class="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1 hover:border-gold/40 transition-colors">
                  <span class="text-3xl font-bold text-gold">18+</span>
                  <span class="text-xs text-gray-500 text-center">Testing Technologies</span>
                </div>
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

    ${getBottomNav('about')}
    ${getFloatingWidgets()}

    <script src="./main.js"></script>
  </body>
</html>`;

fs.writeFileSync('about.html', html, 'utf8');
console.log('Created about.html');

