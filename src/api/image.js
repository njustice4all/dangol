import $ from 'jquery';

import { ATY_URI } from '../constants';

export default formData => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: ATY_URI + '/aty_convert_image.php',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: result => {
        resolve(result);
      },
      error: () => {
        reject(new Error());
      },
    });
  });
};
