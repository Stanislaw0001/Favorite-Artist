// import Swiper JS и необходимые модули
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fecthfeedbacks } from './feedbackApi.js';

const feedbackCards = document.querySelector('.swiper-wrapper');
let swiperInstance = null;

function createFeedbackCard(feedback) {
  const markup = feedback
    .map(
      ({ descr, name, rating }) =>
        `<div class="swiper-slide">
          <div class="feedback-card">
            <div class="rating">${'★'.repeat(rating)}${rating < 5 ? '☆'.repeat(5 - rating) : ''}</div>
            <p class="descr">"${descr}"</p>
            <h3 class="name">${name}</h3>
          </div>
        </div>`
    )
    .join('');

  return markup;
}

function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.mySwiper', {
    modules: [Navigation, Pagination, Autoplay],

    // Настройки Swiper
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    speed: 600,

    // Пагинация
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },

    // Навигация
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      //   disabledClass: 'swiper-button-disabled', // класс для отключенных кнопок
    },

    // Адаптивные настройки
    breakpoints: {
      // На мобильных (0-767)
      0: {
        navigation: false, // отключаем навигацию
      },
      // На планшетах и выше (768+)
      768: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    },

    // Дополнительные настройки
    grabCursor: true,
    watchOverflow: true,
    keyboard: { enabled: true },

    // Для мобильных устройств
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    followFinger: true,
  });
}

export async function renderAndInitSwiper() {
  try {
    const feedbacks = await fecthfeedbacks();

    if (feedbacks && feedbacks.length > 0) {
      feedbackCards.innerHTML = '';
      const markup = createFeedbackCard(feedbacks);
      feedbackCards.innerHTML = markup;

      // Инициализация после рендера
      requestAnimationFrame(() => {
        initSwiper();
      });
    } else {
      feedbackCards.innerHTML = `
        <div class="swiper-slide">
          <div class="no-feedbacks">
            <p>No feedbacks available yet</p>
          </div>
        </div>
      `;
      initSwiper();
    }
  } catch (error) {
    console.error('Error loading feedbacks:', error);
    feedbackCards.innerHTML = `
      <div class="swiper-slide">
        <div class="error-loading">
          <p>Failed to load feedbacks. Please try again later.</p>
        </div>
      </div>
    `;
    initSwiper();
  }
}
