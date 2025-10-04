import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const pictureBox = new SimpleLightbox(`.gallery a`, {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
        <li class='gallery-item'>
    <a class='gallery-link' href='${image.largeImageURL}'>
    <img class='gallery-img' src='${image.webformatURL}' alt='${image.tags}' width='320'/></a>
    <div class='info'>
    <p class='info-item'><b>Likes</b><span class='info-item-current'>${image.likes}</span></p>
    <p class='info-item'><b>Views</b><span class='info-item-current'>${image.views}</span></p>
    <p class='info-item'><b>Comments</b><span class='info-item-current'>${image.comments}</span></p>
    <p class='info-item'><b>Downloads</b><span class='info-item-current'>${image.downloads}</span></p>
    </div></li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  pictureBox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-unactive');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('is-unactive');
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-btn');
  loadMoreBtn.classList.remove('is-unactive');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-btn');
  loadMoreBtn.classList.add('is-unactive');
}
