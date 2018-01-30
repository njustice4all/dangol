import React, { Component } from 'react';
import classNames from 'classnames';

class Images extends Component {
  render() {
    const { images, onImageChange, validateClass, deleteImageByIndex, shopSequence } = this.props;

    const AddImageButton = () => (
      <div className="images">
        <label htmlFor="upload-image">
          <h1>+</h1>
        </label>
        <input
          style={{ display: 'none' }}
          id="upload-image"
          multiple
          accept="image/*"
          capture="camera"
          name="photo"
          type="file"
          onChange={e => onImageChange(e)}
        />
      </div>
    );

    return (
      <div className="items" style={{ marginBottom: '0px', marginTop: '3px', padding: '5px 8px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>
          가맹점 이미지
        </h5>
        <div className="image__wrapper" style={{ marginTop: '10px' }}>
          <AddImageButton />
          {images.map((image, index) => (
            <div className="images" key={`images-${index}`} style={{ verticalAlign: 'top' }}>
              <span className="btn-delete" onClick={deleteImageByIndex(index)}>
                <img src="/img/icon06.png" alt="" />
              </span>
              <img
                src={
                  image.get('uniqueId')
                    ? image.get('image')
                    : `http://van.aty.kr/image/${shopSequence}/${image.get('imageName')}`
                }
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Images;
