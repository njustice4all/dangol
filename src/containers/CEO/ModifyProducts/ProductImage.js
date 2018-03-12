import React from 'react';

import { ATY_URI } from '../../../constants';

const ProductImage = ({ image, preview, index, deleteImageByIndex, siteId, session }) => {
  if (preview) {
    return (
      <div className="images products" style={{ verticalAlign: 'top' }}>
        <span className="btn-delete" onClick={deleteImageByIndex(index, true)}>
          <div className="delete-wrapper">
            <img src="/img/cancel.svg" alt="" />
          </div>
        </span>
        <img className="img-cover" src={image.get('base64')} alt="" />
      </div>
    );
  }

  return (
    <div className="images products" style={{ verticalAlign: 'top' }}>
      <span className="btn-delete" onClick={deleteImageByIndex(index)}>
        <div className="delete-wrapper">
          <img src="/img/cancel.svg" alt="" />
        </div>
      </span>
      <img
        className="img-cover"
        src={`${ATY_URI}/aty_image_view.php?siteId=${siteId}&iID=${image.get(
          'seq'
        )}&thumb=1&sessId=${session}`}
        alt=""
      />
    </div>
  );
};

export default ProductImage;
