import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '52479347-3848fb15c35525ad8d42cf6cd';
export function getImagesByQuery(query) {
  return axios
    .get(baseUrl, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
