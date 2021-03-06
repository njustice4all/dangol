import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';
import { push } from 'react-router-redux';

import { initGetProducts, initDelProduct } from '../../../actions/ceo';
import { createUniqueId } from '../../../utils';

import ProductInputModal from './ProductInputModal';
import Product from './Product';
import Navigator from '../Navigator';
import { DeleteProduct } from '../../../components/Popups';

class ModifyProducts extends Component {
  state = {
    products: [],
    deletedProducts: [],
    productStack: null,
    updateFromNewProduct: false,
    showInputModal: false,
    showRemoveModal: false,
    removeIndex: null,
    product: [],
    idx: null,
    isNew: false,
  };

  componentDidMount = () => {
    const { initGetProducts, session, siteId } = this.props;
    if (session) {
      initGetProducts({ session, siteId });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initGetProducts } = this.props;

    if (nextProps.session !== this.props.session) {
      const { session, siteId } = nextProps;
      initGetProducts({ session, siteId });
    }
  };

  addProduct = () => {
    // this.setState(prevState => ({ showInputModal: true, isNew: true }));
    this.props.navigateTo(`/ceo/products/input?idx=${null}&isNew=${true}`);
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
      // showInputModal: !prevState.showInputModal,
      idx,
      isNew: false,
    }));
  };

  goProductInput = idx => {
    this.props.navigateTo(`/ceo/products/input?idx=${idx}&isNew=${false}`);
  };

  renderProducts = () => {
    const { products, siteId } = this.props;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        key={`product-${i}`}
        removeProduct={this.removeProduct}
        togglePopup={this.togglePopup}
        siteId={siteId}
        goProductInput={this.goProductInput}
      />
    ));
  };

  removeProduct = idx => e => {
    e.stopPropagation();
    this.setState(prevState => ({ removeIndex: idx, showRemoveModal: true }));
  };

  render() {
    const { authentication, franchise, editMode, initDelProduct, siteId } = this.props;
    const { showRemoveModal, showInputModal, productStack, idx, removeIndex } = this.state;

    return (
      <div
        style={{ height: '100%' }}
        className={
          showInputModal ? 'product-container-wrapper disable' : 'product-container-wrapper'
        }>
        <Navigator />
        <div style={{ padding: '10px' }}>
          <div className="btn__add-product" onClick={this.addProduct}>
            <span style={{ paddingRight: '5px' }}>
              <img src="/img/add-product.svg" />
            </span>
            <span>판매상품 추가</span>
          </div>
        </div>
        <div className="divider">
          <div />
        </div>
        <div
          className="container product"
          style={{ minHeight: 'auto', height: 'calc(100% - 125px)', overflow: 'auto' }}>
          {this.renderProducts()}
        </div>
        {showInputModal ? (
          <ProductInputModal idx={idx} isNew={this.state.isNew} togglePopup={this.togglePopup} />
        ) : null}
        {showRemoveModal ? (
          <DeleteProduct
            closeModal={() => this.setState(prevState => ({ showRemoveModal: false }))}
            remove={() => {
              initDelProduct({ idx: removeIndex, siteId });
              this.setState(prevState => ({ showRemoveModal: false }));
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
  franchise: state.get('franchise'),
  products: state.getIn(['ceo', 'products']),
  session: state.getIn(['auth', 'session']),
  siteId: state.getIn(['auth', 'siteId']),
  userId: state.getIn(['auth', 'siteUserId']),
});

const mapDispatchToProps = dispatch => ({
  initGetProducts: payload => dispatch(initGetProducts(payload)),
  initDelProduct: payload => dispatch(initDelProduct(payload)),
  navigateTo: route => dispatch(push(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProducts);
