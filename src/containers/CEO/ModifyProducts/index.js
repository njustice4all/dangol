import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';

import { initGetProducts, initDelProduct } from '../../../actions/ceo';
import { createUniqueId } from '../../../utils';

import ProductInputModal from './ProductInputModal';
import Product from './Product';
import Navigator from '../Navigator';

class ModifyProducts extends Component {
  state = {
    products: [],
    deletedProducts: [],
    productStack: null,
    updateFromNewProduct: false,
    showInputModal: false,
    product: [],
    idx: null,
    isNew: false,
  };

  componentDidMount = () => {
    this.props.initGetProducts();
  };

  addProduct = () => {
    this.setState(prevState => ({ showInputModal: true, isNew: true }));
  };

  onImageChange = productIndex => e => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = Map({
          image: reader.result,
          imageName: files[i].name,
          imageType: files[i].type,
          imageId: createUniqueId(),
        });

        this.setState(prevState => ({
          productStack: prevState.productStack.withMutations(mutator =>
            mutator
              .update('images', images => images.push(image))
              .update('addImages', addImages => addImages.push(image))
          ),
        }));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  togglePopup = (idx, type, isNew) => e => {
    this.setState(prevState => ({
      showInputModal: !prevState.showInputModal,
      idx,
      isNew: false,
    }));
  };

  renderProducts = () => {
    const { products } = this.props;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        key={`product-${i}`}
        removeProduct={this.removeProduct}
        togglePopup={this.togglePopup}
      />
    ));
  };

  removeProduct = idx => e => {
    e.stopPropagation();
    this.props.initDelProduct({ idx });
  };

  render() {
    const { authentication, franchise, editMode } = this.props;
    const { showInputModal, productStack, idx } = this.state;

    return (
      <div
        className={
          showInputModal ? 'product-container-wrapper disable' : 'product-container-wrapper'
        }>
        <Navigator />
        <div className="container product">
          <div>
            <div style={{ padding: '10px' }}>
              <div className="btn__add-product" onClick={this.addProduct}>
                <span id="icon-plus">+</span>
                <span>판매상품 추가</span>
              </div>
            </div>
            <div className="divider">
              <div />
            </div>
            {this.renderProducts()}
          </div>
        </div>
        {showInputModal ? (
          <ProductInputModal idx={idx} isNew={this.state.isNew} togglePopup={this.togglePopup} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
  franchise: state.get('franchise'),
  products: state.getIn(['ceo', 'products']),
});

const mapDispatchToProps = dispatch => ({
  initGetProducts: payload => dispatch(initGetProducts(payload)),
  initDelProduct: payload => dispatch(initDelProduct(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProducts);
