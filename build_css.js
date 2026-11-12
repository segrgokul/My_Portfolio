const https = require('https');
const fs = require('fs');

function extractBaseCssFallback() {
  if (fs.existsSync('base_style.css')) {
    return fs.readFileSync('base_style.css', 'utf8');
  }
  if (fs.existsSync('style.css')) {
    const existing = fs.readFileSync('style.css', 'utf8');
    const marker = '\nhtml {\n';
    const idx = existing.indexOf(marker);
    if (idx > 0) {
      const extracted = existing.slice(0, idx).replace(/@import\s+url\([^)]+\);?\r?\n?/g, '').trim();
      fs.writeFileSync('base_style.css', extracted, 'utf8');
      return extracted;
    }
  }
  return '';
}

function buildCss(rawBaseCss) {
  const fontImports = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');\n`;
  const cleanBaseCss = rawBaseCss.replace(/@import\s+url\([^)]+\);?/g, '').trim();

  const customAdditions = String.raw`
html {
  scroll-behavior: smooth;
  scrollbar-color: #f5a623 #0a0a0a;
  scrollbar-width: thin;
}

body {
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

/* Custom Gold Scrollbar matching Pic 2 */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #f5a623;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #e59815;
}

/* Perspective & 3D Card Flips */
.perspective-1000 {
  perspective: 1000px;
}
.perspective-1200 {
  perspective: 1200px;
}
.preserve-3d {
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Gold Underline */
.gold-underline {
  position: relative;
}
.gold-underline:after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #f5a623;
}

/* Desktop Sidebar transitions */
.sidebar-container {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: width;
}

/* Shimmer animation for skeletons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer {
  background: linear-gradient(90deg, #1a1a1a 0%, #262626 50%, #1a1a1a 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

/* Monogram entrance loader */
#portfolio-loader {
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
}
#portfolio-loader.loader-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Terminal drawer */
#terminal-drawer {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
#terminal-drawer.terminal-closed {
  transform: translateY(110%);
  opacity: 0;
  pointer-events: none;
}

/* Glow effects */
.glow-gold {
  box-shadow: 0 0 25px rgba(245, 166, 35, 0.25);
}
.glow-gold-lg {
  box-shadow: 0 0 40px rgba(245, 166, 35, 0.35);
}
.text-glow-gold {
  text-shadow: 0 0 12px rgba(245, 166, 35, 0.7);
}

/* Carousel Card Transitions matching Pic 2 */
.carousel-card {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}
.carousel-card.active-card {
  transform: scale(1) !important;
  opacity: 1 !important;
  border-color: #f5a623 !important;
  box-shadow: 0 0 25px rgba(245, 166, 35, 0.15) !important;
  min-height: 420px;
}
.carousel-card.inactive-card {
  transform: scale(0.93) !important;
  opacity: 0.45 !important;
  border-color: #262626 !important;
  box-shadow: none !important;
  min-height: 360px;
}
.carousel-card.inactive-card:hover,
.carousel-card.carousel-card-inactive:hover {
  opacity: 0.85 !important;
  border-color: rgba(245, 166, 35, 0.45) !important;
}
.carousel-card.carousel-card-active {
  opacity: 1 !important;
  border-color: #f5a623 !important;
  box-shadow: 0 0 28px rgba(245, 166, 35, 0.16) !important;
}
.carousel-card.carousel-card-inactive {
  opacity: 0.55 !important;
  border-color: #262626 !important;
  box-shadow: none !important;
}

/* Visitor Geography Badge & Modal */
.bg-white\/4 { background-color: hsla(0, 0%, 100%, 0.04); }
.bg-white\/6 { background-color: hsla(0, 0%, 100%, 0.06); }
.bg-white\/8 { background-color: hsla(0, 0%, 100%, 0.08); }
.border-white\/6 { border-color: hsla(0, 0%, 100%, 0.06); }
.border-white\/8 { border-color: hsla(0, 0%, 100%, 0.08); }
.h-4\.5 { height: 1.125rem; }

#visitor-badge-wrap:hover #visitor-tooltip,
#visitor-badge-wrap:focus-within #visitor-tooltip {
  opacity: 1;
  transform: translateY(0);
}
#visitor-badge-btn {
  transition: transform 0.22s ease-out, border-color 0.3s ease;
}
#visitor-badge-btn:hover {
  transform: translateY(-2px) scale(1.01);
}
#visitor-badge-btn:active {
  transform: scale(0.98);
}

#visitor-geography-modal {
  z-index: 9999;
  transition: opacity 0.2s ease-out;
}
#visitor-geography-modal.is-open {
  opacity: 1;
  pointer-events: auto;
}
#visitor-geography-dialog {
  transition: opacity 0.22s ease-out, transform 0.22s ease-out;
  transform: scale(0.96) translateY(14px);
  opacity: 0;
}
#visitor-geography-modal.is-open #visitor-geography-dialog {
  opacity: 1;
  transform: scale(1) translateY(0);
}

#visitor-modal-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}
@media (min-width: 1024px) {
  #visitor-modal-body {
    grid-template-columns: 0.86fr 1.14fr;
  }
}

.geo-bar-fill {
  transition: width 0.5s ease-out;
}
.state-row[data-expanded="true"] .state-chevron {
  transform: rotate(180deg);
}
.geo-tab-btn.is-active {
  background-color: #f5a623;
  color: #0a0a0a;
  font-weight: 600;
}

/* Missing Tailwind utilities & interactive refinements for Projects, Cards, and Terminal */
.min-h-0 { min-height: 0; }
.text-\[60px\] { font-size: 60px; }
.text-white\/\[0\.04\] { color: rgba(255, 255, 255, 0.04); }
.bg-dark-200\/95 { background-color: rgba(45, 45, 45, 0.96); }
.via-dark-100\/75 {
  --tw-gradient-to: rgba(36, 36, 36, 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), rgba(36, 36, 36, 0.75) var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.to-dark-200\/40 {
  --tw-gradient-to: rgba(45, 45, 45, 0.4) var(--tw-gradient-to-position);
}
.scale-x-0 {
  --tw-scale-x: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.group:hover .group-hover\:scale-x-100 {
  --tw-scale-x: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.list-disc { list-style-type: disc; }
.list-inside { list-style-position: inside; }
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.text-emerald-400 { color: rgb(52, 211, 153); }
.group\/connect:hover .group-hover\/connect\:opacity-100 { opacity: 1; }
.rounded-t-2xl {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}
@media (min-width: 768px) {
  .md\:p-6 { padding: 1.5rem; }
}
.bg-red-500\/80 { background-color: rgba(239, 68, 68, 0.8); }
.bg-yellow-500\/80 { background-color: rgba(234, 179, 8, 0.8); }
.bg-green-500\/80 { background-color: rgba(34, 197, 94, 0.8); }
.ml-2 { margin-left: 0.5rem; }
.h-\[360px\] { height: 360px; }
.top-9 { top: 2.25rem; }
.top-12 { top: 3rem; }
.w-\[calc\(100\%-1rem\)\] { width: calc(100% - 1rem); }
.border-\[\#f5a623\]\/30 { border-color: rgba(245, 166, 35, 0.3); }
.border-\[\#f5a623\]\/60 { border-color: rgba(245, 166, 35, 0.6); }
.hover\:border-\[\#f5a623\]:hover { border-color: rgb(245, 166, 35); }
.text-\[\#f5a623\] { color: rgb(245, 166, 35); }
.shadow-\[\#f5a623\]\/20 { --tw-shadow-color: rgba(245, 166, 35, 0.2); --tw-shadow: var(--tw-shadow-colored); }
.from-\[\#f5a623\]\/20 { --tw-gradient-from: rgba(245, 166, 35, 0.2) var(--tw-gradient-from-position); --tw-gradient-to: rgba(245, 166, 35, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.hover\:from-\[\#f5a623\]\/30:hover { --tw-gradient-from: rgba(245, 166, 35, 0.3) var(--tw-gradient-from-position); --tw-gradient-to: rgba(245, 166, 35, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-\[\#f5a623\]\/10 { --tw-gradient-to: rgba(245, 166, 35, 0.1) var(--tw-gradient-to-position); }
.hover\:to-\[\#f5a623\]\/20:hover { --tw-gradient-to: rgba(245, 166, 35, 0.2) var(--tw-gradient-to-position); }
.placeholder-gray-600::placeholder {
  color: rgb(75, 85, 99);
  opacity: 1;
}
.flip-card-container:focus-visible {
  outline: 2px solid #f5a623;
  outline-offset: 2px;
  border-radius: 1rem;
}

/* Prevent active gold filter button from turning text white on hover */
.filter-btn.bg-gold,
.filter-btn.bg-gold:hover {
  background-color: #f5a623;
  border-color: #f5a623;
  color: #1a1a1a;
  font-weight: 600;
}

/* Keep only the visible face interactive during 3D card flips */
.flip-card-inner.rotate-y-180 .flip-card-front {
  pointer-events: none;
}
.flip-card-inner:not(.rotate-y-180) .flip-card-back {
  pointer-events: none;
}

/* Credentials timeline & modal utilities (Pic 1, 2, 3 design) */
.opacity-75 { opacity: 0.75; }
.inset-x-0 { left: 0; right: 0; }
.pt-10 { padding-top: 2.5rem; }
.pt-20 { padding-top: 5rem; }
.pb-3 { padding-bottom: 0.75rem; }
.pb-4 { padding-bottom: 1rem; }
.px-3\.5 { padding-left: 0.875rem; padding-right: 0.875rem; }
.mb-1\.5 { margin-bottom: 0.375rem; }
.w-4\.5 { width: 1.125rem; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-\[0\.12em\] { letter-spacing: 0.12em; }
.tracking-\[0\.14em\] { letter-spacing: 0.14em; }
.text-left { text-align: left; }
.bg-black\/65 { background-color: rgba(0, 0, 0, 0.65); }
.max-h-\[56vh\] { max-height: 56vh; }
@media (min-width: 768px) {
  .md\:pt-20 { padding-top: 5rem; }
  .md\:pb-8 { padding-bottom: 2rem; }
}
@media (min-width: 640px) {
  .sm\:p-4 { padding: 1rem; }
  .sm\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .sm\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
}

.cred-flip-inner {
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}
.cred-flip-card:focus-visible {
  outline: 2px solid #f5a623;
  outline-offset: 3px;
  border-radius: 1rem;
}
.cred-face-back {
  pointer-events: none;
}
@media (hover: hover) {
  .cred-timeline-row:has(.cred-flip-card:hover) .cred-flip-inner {
    transform: rotateY(180deg);
  }
  .cred-timeline-row:has(.cred-flip-card:hover) .cred-face-front {
    pointer-events: none;
  }
  .cred-timeline-row:has(.cred-flip-card:hover) .cred-face-back {
    pointer-events: auto;
  }
  .cred-timeline-row:has(.cred-flip-card:hover) .cred-node-outer {
    background-color: #f5a623;
    border-color: #f5a623;
    box-shadow: 0 0 18px rgba(245, 166, 35, 0.45);
  }
  .cred-timeline-row:has(.cred-flip-card:hover) .cred-node-inner {
    background-color: #1a1a1a;
  }
}
.cred-timeline-row.is-flipped .cred-flip-inner,
.cred-timeline-row:focus-within .cred-flip-inner {
  transform: rotateY(180deg);
}
.cred-timeline-row.is-flipped .cred-face-front,
.cred-timeline-row:focus-within .cred-face-front {
  pointer-events: none;
}
.cred-timeline-row.is-flipped .cred-face-back,
.cred-timeline-row:focus-within .cred-face-back {
  pointer-events: auto;
}
.cred-timeline-row.is-active .cred-node-outer,
.cred-timeline-row.is-flipped .cred-node-outer,
.cred-timeline-row:focus-within .cred-node-outer {
  background-color: #f5a623;
  border-color: #f5a623;
  box-shadow: 0 0 18px rgba(245, 166, 35, 0.45);
}
.cred-timeline-row.is-active .cred-node-inner,
.cred-timeline-row.is-flipped .cred-node-inner,
.cred-timeline-row:focus-within .cred-node-inner {
  background-color: #1a1a1a;
}

#cred-modal.is-open,
#phone-contact-modal.is-open,
#contact-send-modal.is-open {
  opacity: 1;
  pointer-events: auto;
}
#cred-modal-dialog,
#phone-modal-dialog,
#contact-send-dialog {
  transform: scale(0.96) translateY(10px);
  opacity: 0;
  transition: transform 0.22s ease-out, opacity 0.22s ease-out;
}
#cred-modal.is-open #cred-modal-dialog,
#phone-contact-modal.is-open #phone-modal-dialog,
#contact-send-modal.is-open #contact-send-dialog {
  transform: scale(1) translateY(0);
  opacity: 1;
}
`;

  fs.writeFileSync('style.css', fontImports + cleanBaseCss + '\n' + customAdditions, 'utf8');
  console.log('Successfully written style.css!');
}

const localBase = extractBaseCssFallback();
if (localBase) {
  buildCss(localBase);
} else {
  https.get('https://ankit-roy.netlify.app/_next/static/css/c69241a2ea532381.css', res => {
    let baseCss = '';
    res.on('data', c => baseCss += c);
    res.on('end', () => {
      fs.writeFileSync('base_style.css', baseCss, 'utf8');
      buildCss(baseCss);
    });
  }).on('error', err => {
    console.error('Failed to build style.css:', err.message);
    process.exit(1);
  });
}
