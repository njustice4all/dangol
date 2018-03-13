import moment from 'moment';

export const getTime = date => {
  const test = moment(date);

  return test.format('H:mm');

  // const time = new Date(date);

  // return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};
