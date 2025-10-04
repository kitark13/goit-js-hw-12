import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '52479347-3848fb15c35525ad8d42cf6cd';
export async function getImagesByQuery(query, page = 1, per_page = 15) {
  const response = await axios.get(baseUrl, {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page,
    },
  });
  return response.data;
}
