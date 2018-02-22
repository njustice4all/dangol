import React, { Component } from 'react';
import classNames from 'classnames';

import { ATY_URI, SITE_ID } from '../../../constants';

class AddImageButton extends Component {
  _onChange = e => {
    const { onImageChange } = this.props;
    // FIXME: real data로 바꿔야함
    const formData = new FormData(this.image);
    formData.append('siteId', SITE_ID);
    formData.append('userId', 'hyj679');
    formData.append('folder', 'all');
    formData.append('keyWord', 'ImageUpload');

    onImageChange(e, formData);
  };

  render() {
    return (
      <div className="images">
        <form ref={image => (this.image = image)} style={{ width: '100%', height: '100%' }}>
          <label>
            <h1>+</h1>
            <input
              style={{ display: 'none' }}
              id="upload-image"
              // multiple
              accept="image/*"
              name="img-upload[]"
              type="file"
              onChange={this._onChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

const ShopImage = ({ preview, image, deleteImageByIndex, index }) => {
  if (preview) {
    return (
      <div className="images" style={{ verticalAlign: 'top' }}>
        <span className="btn-delete" onClick={deleteImageByIndex(index, true)}>
          <img src="/img/icon06.png" alt="" />
        </span>
        <img src={image.get('base64')} alt="" />
      </div>
    );
  }

  return (
    <div className="images" style={{ verticalAlign: 'top' }}>
      <span className="btn-delete" onClick={deleteImageByIndex(index)}>
        <img src="/img/icon06.png" alt="" />
      </span>
      <img src={`${ATY_URI}/aty_image_view.php?siteId=${SITE_ID}&iID=${image}&thumb=1`} alt="" />
    </div>
  );
};

class Images extends Component {
  render() {
    const { preview, images, onImageChange, validateClass, deleteImageByIndex } = this.props;

    return (
      <div className="items" style={{ marginBottom: '0px', marginTop: '3px', padding: '5px 8px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>
          가맹점 이미지
        </h5>
        <div className="image__wrapper" style={{ marginTop: '10px' }}>
          <AddImageButton onImageChange={onImageChange} />
          {images.map((image, index) => (
            <ShopImage
              key={index}
              image={image}
              index={index}
              deleteImageByIndex={deleteImageByIndex}
            />
          ))}
          {preview.size > 0
            ? preview.map((previewImage, index) => (
                <ShopImage
                  key={index}
                  image={previewImage}
                  index={index}
                  deleteImageByIndex={deleteImageByIndex}
                  preview
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Images;
