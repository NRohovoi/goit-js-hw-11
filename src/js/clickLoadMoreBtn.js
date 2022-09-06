import { refs } from './refs';
import { lightbox } from './lightbox';
import scrollFun from './scrollFun';
import renderImageCard from './render';
import fetch from './fetch';

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