import $ from 'jquery';

import { LOGIN } from '../constants';

export const apiReqLogin = user => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: LOGIN,
      data: {
        id: user.id,
        pw: user.pw,
      },
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};
