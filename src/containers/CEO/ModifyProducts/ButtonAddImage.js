import React, { Component } from 'react';

import { ATY_URI, SITE_ID } from '../../../constants';

class ButtonAddImage extends Component {
  _onChange = e => {
    const { _uploadImage, idx } = this.props;
    // FIXME: userId etc... 필요
    // 이미지 업로드시 어떤 상품의 사진인가? 알아야 getProducts했을때 사진이 적용된다
    const formData = new FormData(this.image);
    formData.append('siteId', SITE_ID);
    formData.append('userId', 'hyj679');
    formData.append('folder', 'all');
    formData.append('keyWord', 'ImageUpload');

    // _uploadImage({ formData, idx });
    this.props._onChangePreview(e, formData);
  };

  render() {
    return (
      <div className="images products">
        <form ref={image => (this.image = image)} style={{ width: '100%', height: '100%' }}>
          <label>
            <h1>+</h1>
            <input
              style={{ display: 'none' }}
              multiple
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

export default ButtonAddImage;
