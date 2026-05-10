import { handleSubmit } from './js/formSubmit';
import { handleLoadMore } from './js/formSubmit';
import { btnLoadMore } from './js/formSubmit';
import { searchForm } from './js/formSubmit';

btnLoadMore.classList.add('hidden');

searchForm.addEventListener('submit', handleSubmit);
btnLoadMore.addEventListener('click', handleLoadMore);
