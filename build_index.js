const fs = require('fs');
const {
  getTopNav,
  getBottomNav,
  getDesktopSidebar,
  getMobileProfileHeader,
  getFloatingWidgets,
  getLoader,
  getVisitorsBadge,
  getVisitorsModal,
} = require('./site_helpers');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gokulraj S E — Software Test Engineer</title>
    <meta name="description" content="Portfolio of Gokulraj S E, a Software Test Engineer specializing in Selenium WebDriver, Test Automation, API Testing, and AI-assisted QA." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-dark text-white min-h-screen">
    ${getLoader()}
    ${getTopNav('home')}

    <div class="relative z-10 flex min-h-screen">
      <div class="hidden shrink-0 p-8 pr-4 pt-8 lg:flex">
        ${getDesktopSidebar()}
      </div>

      <main class="min-w-0 flex-1 pt-0 lg:pt-6">
        <div class="px-6 pb-24 lg:px-10 lg:pb-12 lg:pt-20">
          <canvas id="bg-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

          <div class="relative z-10 flex flex-col gap-16">
            ${getMobileProfileHeader()}

            <!-- Hero Section (Exactly matching Pic 2) -->
            <div class="flex flex-col justify-center min-h-[40vh] gap-7 pt-4">
              <p class="text-gold font-mono text-sm tracking-[0.2em] uppercase">HELLO! I'M</p>
              <div>
                <h1 class="text-5xl lg:text-7xl font-bold text-white leading-tight">Gokulraj S E</h1>
                <h2 class="text-xl lg:text-2xl text-gray-400 mt-2 font-light">
                  A passionate <span class="text-gold font-medium">Software Test</span> &amp; <span class="text-gold font-medium">Automation</span> Engineer
                </h2>
              </div>
              <p class="text-gray-400 text-base lg:text-lg max-w-xl leading-relaxed">
                Building reliable, release-ready web applications at the intersection of <span class="text-white font-medium">test automation</span> and <span class="text-white font-medium">quality engineering</span>.
              </p>
              <div>
                <a class="inline-flex items-center gap-2 px-6 py-3 border border-dark-300 text-gray-300 rounded-xl hover:border-gold hover:text-gold transition-colors text-sm bg-dark-100/60 shadow-md" href="./assets/Gokulraj_S_E_Resume.pdf" download="Gokulraj_S_E_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
                </a>
              </div>
            </div>

            <!-- Featured Work & Selected Projects 3-Card Carousel (Exactly matching Pic 2) -->
            <div class="flex flex-col gap-8">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">FEATURED WORK</p>
                  <h2 class="text-3xl font-bold text-white gold-underline pb-2">Selected Projects</h2>
                </div>
                <div class="hidden md:flex gap-2">
                  <button id="carousel-prev" class="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer" aria-label="Previous Project">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"></path></svg>
                  </button>
                  <button id="carousel-next" class="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer" aria-label="Next Project">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
                  </button>
                </div>
              </div>

              <!-- Desktop 3-Card Carousel -->
              <div id="desktop-carousel" class="hidden md:grid grid-cols-3 gap-4 items-stretch">
                <!-- Card 0 (Left - Inactive) -->
                <div data-index="0" class="carousel-card carousel-card-inactive relative rounded-2xl overflow-hidden flex flex-col border border-dark-300 cursor-pointer">
                  <div class="carousel-top-accent hidden absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
                  <div class="absolute inset-0">
                    <img src="./assets/project-selenium.png" alt="Selenium Automation" class="w-full h-full object-cover opacity-25" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
                  </div>
                  <div class="relative z-10 flex flex-col justify-between h-full p-5 gap-3">
                    <div class="flex items-start justify-between gap-2">
                      <span class="text-[10px] font-mono text-gray-500">2025</span>
                      <div class="flex flex-col items-end">
                        <div class="flex items-center gap-1.5">
                          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                        <div class="text-[52px] font-bold leading-none select-none mt-1" style="color: rgba(255, 255, 255, 0.08);">01</div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2.5">
                      <h3 class="font-bold text-xl text-white leading-tight">Selenium WebDriver-Java Framework</h3>
                      <p class="text-sm text-gray-400 leading-relaxed">Developed and maintained Selenium WebDriver-Java data-driven automation frameworks for regression and functional testing.</p>
                      <div class="flex flex-wrap gap-1.5">
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Selenium WebDriver</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Java</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">TestNG</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">POM</span>
                      </div>
                      <div class="carousel-actions hidden flex gap-2 pt-1">
                        <a href="./projects.html" class="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">
                          Details →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card 1 (Center - Active in Pic 2) -->
                <div data-index="1" class="carousel-card carousel-card-active relative rounded-2xl overflow-hidden flex flex-col border border-gold cursor-pointer">
                  <div class="carousel-top-accent absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
                  <div class="absolute inset-0">
                    <img src="./assets/project-ai-gemini.png" alt="AI Assisted Testing" class="w-full h-full object-cover opacity-25" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
                  </div>
                  <div class="relative z-10 flex flex-col justify-between h-full p-5 gap-3">
                    <div class="flex items-start justify-between gap-2">
                      <span class="text-[10px] font-mono text-gray-500">2026</span>
                      <div class="flex flex-col items-end">
                        <div class="flex items-center gap-1.5">
                          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                        <div class="text-[52px] font-bold leading-none select-none mt-1" style="color: rgba(255, 255, 255, 0.08);">02</div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2.5">
                      <h3 class="font-bold text-xl text-white leading-tight">AI-Assisted Testing Suite</h3>
                      <p class="text-sm text-gray-400 leading-relaxed">Utilized Google Gemini 3.5 to support AI-based automation tasks, including test data generation and log analysis.</p>
                      <div class="flex flex-wrap gap-1.5">
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Gemini 3.5</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">AI Testing</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Log Analysis</span>
                      </div>
                      <div class="carousel-actions flex gap-2 pt-1">
                        <a href="./projects.html" class="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">
                          Details →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card 2 (Right - Inactive) -->
                <div data-index="2" class="carousel-card carousel-card-inactive relative rounded-2xl overflow-hidden flex flex-col border border-dark-300 cursor-pointer">
                  <div class="carousel-top-accent hidden absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
                  <div class="absolute inset-0">
                    <img src="./assets/project-api-postman.png" alt="PDF-to-Excel Validation" class="w-full h-full object-cover opacity-25" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
                  </div>
                  <div class="relative z-10 flex flex-col justify-between h-full p-5 gap-3">
                    <div class="flex items-start justify-between gap-2">
                      <span class="text-[10px] font-mono text-gray-500">2024</span>
                      <div class="flex flex-col items-end">
                        <div class="flex items-center gap-1.5">
                          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span class="text-[10px] text-gray-400">Live</span>
                        </div>
                        <div class="text-[52px] font-bold leading-none select-none mt-1" style="color: rgba(255, 255, 255, 0.08);">03</div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2.5">
                      <h3 class="font-bold text-xl text-white leading-tight">PDF Data Extraction &amp; Postman API Suite</h3>
                      <p class="text-sm text-gray-400 leading-relaxed">Automated extraction of data from PDFs into Excel for validation and reporting, and performed API testing using Postman.</p>
                      <div class="flex flex-wrap gap-1.5">
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Postman</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">REST API</span>
                        <span class="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Excel Automation</span>
                      </div>
                      <div class="carousel-actions hidden flex gap-2 pt-1">
                        <a href="./projects.html" class="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">
                          Details →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Carousel Indicator Bars -->
              <div class="hidden md:flex justify-center gap-2 mt-2">
                <button data-dot="0" class="carousel-dot rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40 cursor-pointer" aria-label="Go to slide 1"></button>
                <button data-dot="1" class="carousel-dot rounded-full transition-all duration-300 w-6 h-1.5 bg-gold cursor-pointer" aria-label="Go to slide 2"></button>
                <button data-dot="2" class="carousel-dot rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40 cursor-pointer" aria-label="Go to slide 3"></button>
              </div>

              <!-- View all projects link -->
              <div class="flex justify-center mt-1">
                <a href="./projects.html" class="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gold transition-colors">
                  <span>View all projects</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
                </a>
              </div>

              <!-- Mobile Carousel View -->
              <div class="md:hidden flex items-center gap-3">
                <button id="mobile-prev" class="flex-shrink-0 w-10 h-10 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors" aria-label="Previous Project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"></path></svg>
                </button>
                <div id="mobile-card-container" class="flex-1 relative overflow-hidden rounded-2xl border border-gold shadow-lg shadow-gold/10" style="min-height: 360px;">
                </div>
                <button id="mobile-next" class="flex-shrink-0 w-10 h-10 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors" aria-label="Next Project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
                </button>
              </div>
            </div>

            <!-- By The Numbers Summary -->
            <div class="space-y-3 pt-4">
              <div class="text-xs font-mono tracking-widest uppercase text-gold">By the numbers</div>
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
                  <span class="text-xs text-gray-500 text-center">Technologies</span>
                </div>
              </div>
              ${getVisitorsBadge()}
            </div>

            <!-- Footer -->
            <footer class="pt-8 pb-4 border-t border-dark-300 text-center text-xs text-gray-500 font-mono">
              © 2026 Gokulraj S E · Software Test Engineer — Manual &amp; Automation Testing
            </footer>
          </div>
        </div>
      </main>
    </div>

    ${getBottomNav('home')}
    ${getFloatingWidgets()}
    ${getVisitorsModal()}

    <script src="./main.js"></script>
  </body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully written index.html matching Pic 2');
