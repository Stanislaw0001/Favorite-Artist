import axios from 'axios';
import iziToast from 'izitoast';

const API_URL = 'https://sound-wave.b.goit.study/api/feedbacks';

export async function fecthfeedbacks() {
  try {
    const { data } = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let feedbacks = data.data || [];
    // Округление рейтинга и ограничение количества отзывов
    feedbacks = feedbacks.slice(0, 10).map(item => ({
      ...item,
      rating: Math.round(item.rating),
    }));
    return feedbacks;
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
  }
}
