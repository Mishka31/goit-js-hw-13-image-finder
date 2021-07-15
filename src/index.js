import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardImagesTpl from './templates/card-images';

const refs = {
  galleryListEl: document.querySelector('.gallery'),
  formEl: document.querySelector('.search-form'),
  btnSearch: document.querySelector('.btn-search'),
  btnMore: document.querySelector('.btn-more'),
  // element: document.querySelector('#my-element-selector'),
};

const imgApiService = new ImageApiService();

refs.formEl.addEventListener('submit', onSearch);
refs.btnMore.addEventListener('click', onBtnMore, false);

function onSearch(e) {
  e.preventDefault();

  clearRequest();
  imgApiService.query = e.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}
// refs.btnMore.addEventListener('click', onScroll, false);

function onBtnMore() {
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}

function addMarkupHits(hits) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', cardImagesTpl(hits));
  omScroll();
}

function clearRequest() {
  refs.galleryListEl.innerHTML = '';
}
function omScroll() {
  if (imgApiService.page > 2) {
    const el = document.querySelector('#box');
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}
