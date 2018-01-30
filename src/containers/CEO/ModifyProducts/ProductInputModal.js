import React from 'react';

const ButtonAddImage = ({ onImageChange, productIndex }) => {
  return (
    <div className="images products">
      <label>
        <h1>+</h1>
        <input
          style={{ display: 'none' }}
          multiple
          accept="image/*"
          name="photo"
          type="file"
          onChange={onImageChange(productIndex)}
        />
      </label>
    </div>
  );
};

const ProductImage = ({ deleteImageByIndex, image, imageIndex, productIndex, shopSequence }) => {
  return (
    <div
      className="images products"
      key={`productImage-${imageIndex}`}
      style={{ verticalAlign: 'top' }}>
      <span className="btn-delete" onClick={deleteImageByIndex(productIndex, imageIndex)}>
        <img src="/img/icon06.png" alt="" />
      </span>
      <img
        className="img-cover"
        src={
          image.get('imageId')
            ? image.get('image')
            : `http://van.aty.kr/image/${shopSequence}/${image.get('imageName')}`
        }
        alt=""
      />
    </div>
  );
};

const OptionWrapper = ({
  onAddOptionButtonPress,
  productIndex,
  product,
  onOptionChange,
  deleteOptionByIndex,
  uniqueId,
}) => {
  return (
    <div className="row-wrapper options" style={{ position: 'relative' }}>
      <div className="option-wrapper">
        {product.get('options').map((option, index) => (
          <div className="options" key={`option-${index}`}>
            <div className="option-name">
              <span>{`옵션 ${index + 1}`}</span>
            </div>
            <div className="option-input-name">
              <input
                type="text"
                value={product.getIn(['options', index, 'name'])}
                onChange={onOptionChange(productIndex, index, 'name')}
              />
            </div>
            <div className="option-price">
              <span>가격</span>
            </div>
            <div className="option-input-price">
              <input
                type="number"
                value={product.getIn(['options', index, 'price'])}
                onChange={onOptionChange(productIndex, index, 'price')}
                onClick={e => e.target.select()}
              />
              <span>원</span>
            </div>
            <div className="button-delete" onClick={deleteOptionByIndex(productIndex, index)}>
              <img src="/img/icon-close.png" alt="" />
            </div>
          </div>
        ))}
        <div className="btn-add-option">
          <span onClick={onAddOptionButtonPress(productIndex)}>+ 옵션 추가</span>
        </div>
      </div>
    </div>
  );
};

const ProductInputModal = ({
  product,
  productIndex,
  setStateByKey,
  removeProductByIndex,
  deleteImageByIndex,
  onImageChange,
  shopSequence,
  onAddOptionButtonPress,
  deleteOptionByIndex,
  onOptionChange,
  togglePopup,
  testConfirm,
}) => {
  const uniqueId = product.get('uniqueId');

  return (
    <div className="items products popup">
      <div className="product__wrapper popup">
        <header className="product-header center">
          <h3>{product.get('uniqueId') ? '상품 추가' : '상품 수정'}</h3>
        </header>
        <div className="wrapper-padding">
          <div className="image__wrapper" style={{ maxWidth: `${window.innerWidth - 32}px` }}>
            <ButtonAddImage onImageChange={onImageChange} productIndex={productIndex} />
            {product
              .get('images')
              .map((image, imageIndex) => (
                <ProductImage
                  image={image}
                  imageIndex={imageIndex}
                  deleteImageByIndex={deleteImageByIndex}
                  productIndex={productIndex}
                  shopSequence={shopSequence}
                  key={`productImage-${imageIndex}`}
                />
              ))}
          </div>
        </div>
        <div className="product__form__wrapper">
          <div className="wrapper-padding">
            <div className="row-wrapper">
              <span className="row-title">상품명</span>
              <input
                type="text"
                defaultValue={product.get('title')}
                placeholder="상품명을 입력하세요."
                onChange={e => setStateByKey(productIndex, 'title', e.target.value, uniqueId)}
              />
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span className="row-title">가격</span>
              <input
                type="number"
                value={product.get('price')}
                onChange={e => setStateByKey(productIndex, 'price', e.target.value, uniqueId)}
                onClick={e => e.target.select()}
              />
              <span id="currency">원</span>
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span className="row-title">설명</span>
              <input
                type="text"
                value={product.get('contents')}
                onChange={e => setStateByKey(productIndex, 'contents', e.target.value, uniqueId)}
              />
            </div>
          </div>
          <OptionWrapper
            product={product}
            onAddOptionButtonPress={onAddOptionButtonPress}
            productIndex={productIndex}
            onOptionChange={onOptionChange}
            deleteOptionByIndex={deleteOptionByIndex}
            uniqueId={uniqueId}
          />
          <div className="button-normal">
            <span className="button button-left" onClick={togglePopup(productIndex, 'close')}>
              취 소
            </span>
            <span className="button button-right" onClick={testConfirm}>
              확 인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInputModal;
