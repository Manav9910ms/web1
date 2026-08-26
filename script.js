const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

const form = document.getElementById('bookingForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const interest = String(data.get('interest') || '').trim();
  const date = String(data.get('date') || '').trim();
  const message = String(data.get('message') || '').trim();
  const text = [
    'Hi ALPS, I would like to make an enquiry.',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Interested in: ${interest}`,
    date ? `Preferred date: ${date}` : '',
    message ? `Message: ${message}` : ''
  ].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/919711913566?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Small inline SVG icons keep the site lightweight and dependency-free.
const iconPaths = {
  arrow: '<path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  pin: '<path d="M20 10c0 5.3-8 11-8 11S4 15.3 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  heart: '<path d="M20.8 8.7c0 5.4-8.8 10-8.8 10s-8.8-4.6-8.8-10A4.7 4.7 0 0 1 8 4c1.5 0 3 .8 4 2.1C13 4.8 14.5 4 16 4a4.7 4.7 0 0 1 4.8 4.7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
};

function addIcon(element, name, label = '') {
  if (!element || !iconPaths[name] || element.querySelector('.svg-icon')) return;
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('class', 'svg-icon');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = iconPaths[name];
  if (label) element.setAttribute('aria-label', label);
  element.prepend(icon);
}

document.querySelectorAll('.service-body a, .button.primary').forEach(el => addIcon(el, 'arrow'));
document.querySelectorAll('.location-actions a:first-child').forEach(el => addIcon(el, 'pin', 'Get directions'));
document.querySelectorAll('.floating-wa').forEach(el => addIcon(el, 'heart', 'Chat on WhatsApp'));
