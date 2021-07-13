export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fectchArticles() {
    const KEY = '22480002-eee2092533377b2ba98494930';
    const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(URL)
      .then(respons => respons.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
