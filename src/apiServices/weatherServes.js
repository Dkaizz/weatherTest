import * as request from '~/utils/requestApiWeather';

export const search = async (q, days = 3, key = 'cab5c16af79643cb8bf140748220407') => {
  try {
    const res = await request.get('forecast.json', {
      params: {
        q,
        days,
        key,
      },
    });
    return res.data;
  } catch {
    console.error('link api ko chạy hoặc code của mày sai');
  }
};
