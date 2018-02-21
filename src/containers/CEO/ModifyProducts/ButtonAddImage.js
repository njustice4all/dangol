import React, { Component } from 'react';

import { ATY_URI, SITE_ID } from '../../../constants';

class ButtonAddImage extends Component {
  _onChange = e => {
    const { _onChangePreview, idx } = this.props;
    // FIXME: real data로 바꿔야함
    const formData = new FormData(this.image);
    formData.append('siteId', SITE_ID);
    formData.append('userId', 'hyj679');
    formData.append('folder', 'all');
    formData.append('keyWord', 'ImageUpload');

    _onChangePreview(e, formData);
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
