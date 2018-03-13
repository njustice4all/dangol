import moment from 'moment';
import tz from 'moment-timezone';

export const getTime = date => {
  const test = moment(date);
  // const time = new Date(date);

  // return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return moment.tz(date, 'Asia/Seoul').format('H:mm');
};
