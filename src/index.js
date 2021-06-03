import { refs } from './js/refs';
import apiService from './js/apiService';
import { createMarkup } from './js/create-markup';
import LoadMoreBtn from './js/button';
import './styles.css';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchMoreImages);

function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.searchQuery = form.elements.query.value;

  clearGallery();
  apiService.resetPage();
  fetchMoreImages(event);
  form.reset();
}

function fetchMoreImages(event) {
  loadMoreBtn.disable();

  apiService.fetchImages().then(images => {
    if (images.length === 0) {
      refs.gallery.innerHTML =
        '<h1 class="error"><span class="smille">😔 </span>No results were found for your search</h1>';
      loadMoreBtn.hide();
      return;
    }
    createMarkup(images);
    loadMoreBtn.show();
    loadMoreBtn.enable();

    scrollBy();
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollBy() {
  loadMoreBtn.refs.button.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}
