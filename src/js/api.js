import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '38321296-6f22805a434f6b10647c0454a';
const URL = `https://pixabay.com/api/`;

async function getImage(query, pageNumber) {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 20,
      page: pageNumber,
    },
  };
  try {
    const response = await axios(URL, options);

    const { totalHits, hits } = response.data;
    return { totalHits, hits };
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}

export default getImage;
