import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { initGetProducts, initDelProduct } from '../../../actions/ceo';
import {
  convertDataToState,
  createUniqueId,
  getModifyProducts,
  convertProducts,
} from '../../../utils';

import ProductInputModal from './ProductInputModal';
import Product from './Product';
import Navigator from '../Navigator';

class ModifyProducts extends Component {
  state = {
    products: List([]),
    deletedProducts: List([]),
    productStack: null,
    updateFromNewProduct: false,
    showInputModal: false,
    product: List([]),
  };

  componentDidMount = () => {
    this.props.initGetProducts();
  };

  addProduct = () => {
    this.setState(prevState => ({
      showInputModal: true,
      productStack: Map({
        images: List([]),
        deleteImages: List([]),
        addImages: List([]),
        title: '',
        price: 0,
        options: List([]),
        contents: '',
        uniqueId: createUniqueId(),
        detailMode: true,
        productSequence: 'add',
      }),
    }));
  };

  setStateByKey = (index, key, value, uniqueId) => {
    const { productStack } = this.state;
    this.setState({
      productStack: productStack.set(key, value),
    });
  };

  // FIXME: 동작확인필수
  deleteImageByIndex = (productIndex, imageIndex, uniqueId) => () => {
    const { productStack } = this.state;
    const imageIdFromProductImage = productStack.getIn(['images', imageIndex, 'imageId']);

    if (productStack.get('uniqueId')) {
      this.setState({
        productStack: productStack.withMutations(mutator =>
          mutator.deleteIn(['images', imageIndex]).deleteIn(['addImages', imageIndex])
        ),
      });
    } else {
      this.setState({
        productStack: productStack.withMutations(mutator =>
          mutator
            .deleteIn(['images', imageIndex])
            .update(
              'deleteImages',
              deleteImages =>
                productStack.getIn(['images', imageIndex, 'seq'])
                  ? deleteImages.push(productStack.getIn(['images', imageIndex, 'seq']))
                  : List([])
            )
            .deleteIn(
              'addImages',
              productStack
                .get('addImages')
                .findIndex(images => images.get('imageId') === imageIdFromProductImage)
            )
        ),
      });
    }
  };

  // FIXME: 동작확인필수
  removeProductByIndex = productIndex => e => {
    e.stopPropagation();
    const { products, deletedProducts, productStack } = this.state;
    const { initSetProducts, franchise } = this.props;
    const removeProduct = products.get(productIndex);

    if (removeProduct.get('uniqueId')) {
      this.setState({ products: products.delete(productIndex) });
    } else {
      this.setState({
        products: products.delete(productIndex),
        deletedProducts: deletedProducts.push(removeProduct.get('productSequence')),
        productStack: null,
        showInputModal: false,
      });
    }

    console.log(removeProduct.toJS());
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

  handleConfirm = () => {
    const { products, deletedProducts } = this.state;
    const { initAddProducts, initSetProducts, history, franchise, editMode } = this.props;
    const franchiseSequence = franchise.get('seq');

    if (products.size === 0) return;
    for (let i = 0; i < products.size; i++) {
      if (products.getIn([i, 'images']).size === 0) return;
      if (products.getIn([i, 'title']).trim().length === 0) return;
      // if (products.getIn([i, 'price']).trim().length === 0) return;
    }

    if (editMode) {
      const result = {
        shop_seq: franchiseSequence,
        deleteProducts: deletedProducts.toJS(),
        products: getModifyProducts(products).toJS(),
      };

      initSetProducts(result);
      history.push('/result');
    } else {
      const result = convertProducts(products);
      initAddProducts({ products: result, seq: franchiseSequence })
        .then(result => {
          if (result.error) {
            console.error('add products error');
            return;
          }
          history.push('/result');
        })
        .catch(e => console.error(e));
    }
  };

  // TODO: working...
  testConfirm = () => {
    const { franchise, initSetProducts, initAddProducts } = this.props;
    const { deletedProducts, productStack, updateFromNewProduct } = this.state;
    const result = {
      shop_seq: 14,
      deleteProducts: deletedProducts.toJS(),
      products: getModifyProducts(productStack).toJS(),
    };
    const productIndex = productStack.get('productIndex');

    if (updateFromNewProduct) {
      // 수정
      this.setState(prevState => ({
        products: prevState.products.update(productIndex, () => productStack),
        showInputModal: false,
        productStack: null,
        updateFromNewProduct: false,
      }));
    } else {
      // 새상품
      this.setState(prevState => ({
        products: prevState.products.unshift(productStack),
        showInputModal: false,
        productStack: null,
        updateFromNewProduct: false,
      }));
    }

    // initSetProducts(result).then(() => this.onEditMode());
  };

  togglePopup = (idx, type) => e => {
    if (type === 'close') {
      this.setState(prevState => ({ showInputModal: false }));
    }

    this.setState(prevState => ({
      showInputModal: !prevState.showInputModal,
      product: this.props.products.filter(product => product.get('idx') === idx),
    }));
  };

  handleCancel = () => this.props.history.push('/');

  onBackButtonPress = () => {
    this.props.history.push('/franchise/addShop');
  };

  renderProducts = () => {
    const { products } = this.props;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        productIndex={i}
        key={`product-${i}`}
        editMode
        removeProduct={this.removeProduct}
        setStateByKey={this.setStateByKey}
        removeProductByIndex={this.removeProductByIndex}
        deleteImageByIndex={this.deleteImageByIndex}
        onImageChange={this.onImageChange}
        shopSequence="14"
        onAddOptionButtonPress={this.onAddOptionButtonPress}
        deleteOptionByIndex={this.deleteOptionByIndex}
        onOptionChange={this.onOptionChange}
        togglePopup={this.togglePopup}
      />
    ));
  };

  removeProduct = idx => e => {
    e.stopPropagation();
    this.props.initDelProduct({ idx });
  };

  onOptionChange = (productIndex, optionIndex, type) => e => {
    e.persist();
    this.setState(prevState => ({
      productStack: prevState.productStack.setIn(['options', optionIndex, type], e.target.value),
    }));
  };

  onAddOptionButtonPress = productIndex => () => {
    if (this.state.productStack.get('options').size > 4) {
      return;
    }

    this.setState(prevState => ({
      productStack: prevState.productStack.update('options', options =>
        options.push(Map({ name: '', price: 0 }))
      ),
    }));
  };

  deleteOptionByIndex = (productIndex, optionIndex) => () => {
    this.setState(prevState => ({
      productStack: prevState.productStack.deleteIn(['options', optionIndex]),
    }));
  };

  render() {
    const { authentication, franchise, editMode } = this.props;
    const { showInputModal, productStack, product } = this.state;

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
          <ProductInputModal
            product={product.get(0)}
            togglePopup={this.togglePopup}
            onImageChange={this.onImageChange}
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
});

const mapDispatchToProps = dispatch => ({
  // initAddProducts: products => dispatch(initAddProducts(products)),
  initGetProducts: payload => dispatch(initGetProducts(payload)),
  initDelProduct: payload => dispatch(initDelProduct(payload)),
  // initSetProducts: products => dispatch(initSetProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyProducts);
