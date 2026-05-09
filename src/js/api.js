import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '38321296-6f22805a434f6b10647c0454a';
const URL = `https://pixabay.com/api/`;

let page = 1;

async function searchImage(query, page) {
  // let totalHits = 0;
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page,
    },
  };

  const response = await axios(URL, options);
  console.log(response.data.totalHits);
  if (response.data.totalHits) {
    Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
  }

  // totalHits = response.data.totalHits;
  return response.data;
}

export default searchImage;
