import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { lightbox } from './js/lightbox';
import scrollFun from './js/scrollFun';
import renderImageCard from './js/render';
import fetch from './js/fetch';


let currentPage = 1;
let currentHits = 0;
let searchQuery = '';



refs.searchForm.addEventListener('submit', submitSearchForm);

export async function submitSearchForm(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value.trim();
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  const response = await fetch(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.endCollectionText.classList.add('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.endCollectionText.classList.remove('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.gallery.innerHTML = '';
      renderImageCard(response.hits, refs.gallery);
      scrollFun(-1000);
      lightbox.refresh();
    }

    if (response.totalHits === 0) {
      refs.gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.endCollectionText.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}



refs.loadMoreBtn.addEventListener('click', clickLoadMoreBtn);

export async function clickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetch(searchQuery, currentPage);
  renderImageCard(response.hits, refs.gallery);
  lightbox.refresh();
  currentHits += response.hits.length;

  scrollFun(2);

  if (currentHits === response.totalHits) {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.endCollectionText.classList.remove('is-hidden');
  }
}