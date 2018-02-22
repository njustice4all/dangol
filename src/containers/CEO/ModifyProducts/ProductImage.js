import React from 'react';

import { ATY_URI } from '../../../constants';

const ProductImage = ({ image, preview, index, deleteImageByIndex, siteId }) => {
  if (preview) {
    return (
      <div className="images products" style={{ verticalAlign: 'top' }}>
        <span className="btn-delete" onClick={deleteImageByIndex(index, true)}>
          <img src="/img/icon06.png" alt="" />
        </span>
        <img className="img-cover" src={image.get('base64')} alt="" />
      </div>
    );
  }

  return (
    <div className="images products" style={{ verticalAlign: 'top' }}>
      <span className="btn-delete" onClick={deleteImageByIndex(index)}>
        <img src="/img/icon06.png" alt="" />
      </span>
      <img
        className="img-cover"
        src={`${ATY_URI}/aty_image_view.php?siteId=${siteId}&iID=${image.get('seq')}&thumb=1`}
        alt=""
      />
    </div>
  );
};

export default ProductImage;
