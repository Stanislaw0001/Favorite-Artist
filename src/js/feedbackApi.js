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
    return data;
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
  }
}
