import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-btn');

let query = '';
let page = 1;
const perPage = 15;

// hideLoadMoreButton();

form.addEventListener('submit', searchImage);

async function searchImage(event) {
  event.preventDefault();
  query = input.value.toLowerCase().trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Enter your search query.',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(query, page, perPage);
    const images = data.hits;

    if (!images || images.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(images);
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast({
      title: 'Error',
      message: 'Something went wrong while loading the images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    hideLoadMoreButton();

    try {
      const data = await getImagesByQuery(query, page, perPage);
      const images = data.hits;

      createGallery(images);
      smoothScrolling();

      const totalPages = Math.ceil(data.totalHits / perPage);
      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          title: 'End results',
          message: 'Were sorry, but you ve reached the end of search results',
          position: 'topRight',
        });
      }
    } catch (error) {
      console.error(error);
      iziToast({
        title: 'Error',
        message: 'Something went wrong while loading the images.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });
}

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
