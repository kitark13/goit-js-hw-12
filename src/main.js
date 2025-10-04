import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('[name="search-text"]');

form.addEventListener('submit', searchImage);

function searchImage(event) {
  event.preventDefault();
  const query = input.value.toLowerCase().trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Enter your search query.',
      position: 'topRight',
    });
    return;
  }

  form.reset();
  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
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
    })
    .catch(error => {
      console.error(error);
      iziToast({
        title: 'Error',
        message: 'Something went wrong while loading the images.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
