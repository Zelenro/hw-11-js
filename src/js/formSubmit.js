import getImage from './api';
import renderGallery from './renderGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
export const searchForm = document.querySelector('#search-form');
export const btnLoadMore = document.querySelector('.load-more');
const anchor = document.querySelector('#anchor');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

let page = 1;
let searchQuery = '';
let totalHitsLoaded = 0;
let isFetching = false;

const observer = new IntersectionObserver(
  async entries => {
    console.log(entries[0].isIntersecting);
    if (entries[0].isIntersecting && !isFetching && searchQuery !== '') {
      await handleLoadMore();
    }
  },
  { rootMargin: '400px' }
);

export async function handleSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    Notiflix.Notify.warning('Enter query.');
    return;
  }

  searchQuery = query;
  page = 1;
  totalHitsLoaded = 0;
  gallery.innerHTML = '';
  if (anchor) observer.unobserve(anchor);

  isFetching = true;

  try {
    const { totalHits, hits } = await getImage(searchQuery, page);

    if (totalHits) {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      totalHitsLoaded = hits.length;
    }

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      searchForm.reset();
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    lightbox.refresh();
    if (totalHits > totalHitsLoaded && anchor) {
      observer.observe(anchor);
    }
  } catch (error) {
    console.dir(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  } finally {
    isFetching = false;
    searchForm.reset();
  }
}

export async function handleLoadMore() {
  if (isFetching) return;
  isFetching = true;
  page += 1;

  try {
    const { totalHits, hits } = await getImage(searchQuery, page);
    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    totalHitsLoaded += hits.length;
    if (totalHits <= totalHitsLoaded) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      if (anchor) observer.unobserve(anchor);
      btnLoadMore.classList.add('hidden');
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  } finally {
    isFetching = false;
  }
}
