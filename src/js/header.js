const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', () => {
  mobileMenu.classList.remove('mobmenu-hidden');
  document.body.classList.add('no-scroll');
});

closeIcon.addEventListener('click', () => {
  mobileMenu.classList.add('mobmenu-hidden');
  document.body.classList.remove('no-scroll');
});

const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('mobmenu-hidden');
    document.body.classList.remove('no-scroll');
  });
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');

    if (id === '#') return;

    event.preventDefault();
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  });
});

const mobileLogo = document.querySelector('.mobile-menu .logo-icon');
mobileLogo.addEventListener('click', () => {
  mobileMenu.classList.add('mobmenu-hidden');
  document.body.classList.remove('no-scroll');
});
