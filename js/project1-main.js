const toggler = document.querySelector('.navbar__toggler');
const menu = document.querySelector('.navbar__menu');

toggler.addEventListener('click', () => {
  const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
  toggler.setAttribute('aria-expanded', !isExpanded);
  menu.classList.toggle('active');
});