const scrollBtn = document.querySelector('#hero-scroll-btn');
const targetSection = document.querySelector('#about-artists'); 

if (scrollBtn && targetSection) {
  scrollBtn.addEventListener('click', () => {
    targetSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  });
} else {
    console.log("Кнопка:", scrollBtn);
    console.log("Секція:", targetSection);
}