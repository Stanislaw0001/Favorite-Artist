const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', () => {
  mobileMenu.classList.remove('mobmenu-hidden');
});

closeIcon.addEventListener('click', () => {
  mobileMenu.classList.add('mobmenu-hidden');
});

const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('mobmenu-hidden');
  });
});


const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const id = link.getAttribute('href');
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  });
import { initArtApp } from './js/artist-init.js';

document.addEventListener('DOMContentLoaded', () => {
  initArtApp();
});
