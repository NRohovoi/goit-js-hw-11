import './sass/index.scss';
import { submitSearchForm } from './js/submitSearchForm';
import { clickLoadMoreBtn } from './js/clickLoadMoreBtn';

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

submitSearchForm();
clickLoadMoreBtn();