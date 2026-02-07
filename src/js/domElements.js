export function getDomElements() {
  return {
    listElement: document.querySelector('.artists__list'),
    loadMoreBtn: document.querySelector('.artists__button'),
    loader: document.querySelector('.loader-backdrop'),
  };
}
