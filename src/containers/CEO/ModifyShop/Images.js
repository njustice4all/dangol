import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { ATY_URI } from '../../../constants';

class AddImageButton extends Component {
  _onChange = e => {
    const { onImageChange, siteId, userId } = this.props;

    const formData = new FormData(this.image);

    formData.append('siteId', siteId);
    formData.append('userId', userId);
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

const ShopImage = ({ preview, image, deleteImageByIndex, index, siteId }) => {
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
      <img src={`${ATY_URI}/aty_image_view.php?siteId=${siteId}&iID=${image}&thumb=1`} alt="" />
    </div>
  );
};

class Images extends Component {
  render() {
    const {
      preview,
      images,
      onImageChange,
      validateClass,
      deleteImageByIndex,
      userId,
      siteId,
    } = this.props;

    return (
      <div className="items" style={{ marginBottom: '0px', marginTop: '3px', padding: '5px 8px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>
          가맹점 이미지
        </h5>
        <div className="image__wrapper" style={{ marginTop: '10px' }}>
          <AddImageButton onImageChange={onImageChange} siteId={siteId} userId={userId} />
          {images.map((image, index) => (
            <ShopImage
              key={index}
              image={image}
              index={index}
              deleteImageByIndex={deleteImageByIndex}
              siteId={siteId}
            />
          ))}
          {preview.size > 0
            ? preview.map((previewImage, index) => (
                <ShopImage
                  key={index}
                  image={previewImage}
                  index={index}
                  deleteImageByIndex={deleteImageByIndex}
                  siteId={siteId}
                  preview
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  userId: state.getIn(['auth', 'siteUserId']),
  siteId: state.getIn(['auth', 'siteId']),
}))(Images);
