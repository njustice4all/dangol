import $ from 'jquery';

import { LOGIN } from '../constants';

export const apiReqLogin = user => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: LOGIN,
      data: user,
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};
