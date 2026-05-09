import searchImage from './api';
import markupResult from './markupCard';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);
const gallery = document.querySelector('.gallery');

async function handleSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const formData = new FormData(e.currentTarget);
  const query = formData.get('searchQuery').trim();
  if (!query) {
    Notiflix.Notify.warning('Enter query.');
    return;
  }
  const data = await searchImage(query);
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    searchForm.reset();
    return;
  }
  searchForm.reset();
  gallery.insertAdjacentHTML('beforeend', markupResult(data.hits));
  lightbox.refresh();
}

export default handleSubmit;
