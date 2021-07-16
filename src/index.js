import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardImagesTpl from './templates/card-images';
// import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');

const refs = {
  galleryListEl: document.querySelector('.gallery'),
  formEl: document.querySelector('.search-form'),
  btnSearch: document.querySelector('.btn-search'),
  btnMore: document.querySelector('.btn-more'),
  modalCloseEl: document.querySelector('.basicLightbox'),
  body: document.querySelector('body'),
};

const imgApiService = new ImageApiService();

refs.formEl.addEventListener('submit', onSearch);
refs.btnMore.addEventListener('click', onBtnMore, false);
refs.galleryListEl.addEventListener('click', onModal);

function onSearch(e) {
  e.preventDefault();

  clearRequest();
  imgApiService.query = e.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fectchArticles(searchQuery).then(addMarkupHits);
}
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

function onModal(e) {
  let instance = basicLightbox.create(`<img src=${e.target.getAttribute('data-src')}>`);
  instance.show();
  basicLightbox.visible();
}
