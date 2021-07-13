import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardImagesTpl from './templates/card-images';

const refs = {
  galleryListEl: document.querySelector('.gallery'),
  formEl: document.querySelector('.search-form'),
  btnSearch: document.querySelector('.btn-search'),
  btnMore: document.querySelector('.btn-more'),
};
const imgApiService = new ImageApiService();

refs.formEl.addEventListener('submit', onSearch);
refs.btnMore.addEventListener('click', onBtnMore);

function onSearch(e) {
  e.preventDefault();

  imgApiService.query = e.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}

function onBtnMore() {
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}

function addMarkupHits(hits) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', cardImagesTpl(hits));
}
