import React, { Component } from 'react';
import classNames from 'classnames';
import { List, Map, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Info from './Info';
import Images from './Images';
import Address from './Address';
import Loading from './Loading';
import Buttons from './Buttons';
import Navigator from '../Navigator';

import { validateState, createUniqueId, convertUrlToBase64 } from '../../../utils';
import { initGetShopInfo, initUploadImage, initSetShop } from '../../../actions/ceo';

import Converter from '../../../utils/Converter';

class ModifyShop extends Component {
  state = {
    preview: List(),
    images: List(),
    base64Images: List([]),
    isOpenAddress: false,
    id: '',
    category: 'restaurant',
    name: '',
    description: '',
    address: Map({
      zipCode: '',
      firstAddress: '',
      detailAddress: '',
    }),
    openDay: '',
    contact: '',
    permitNumber: '',
    openingHours: '',
    closeDays: '',
    possible: List([
      Map({ index: 0, title: '홀', isChecked: false, src: '/img/order-normal' }),
      Map({ index: 1, title: '배달', isChecked: false, src: '/img/delivery-normal' }),
      Map({ index: 2, title: '포장', isChecked: false, src: '/img/package-normal' }),
      Map({ index: 3, title: '예약', isChecked: false, src: '/img/reservation-normal' }),
      Map({ index: 4, title: '주차', isChecked: false, src: '/img/parking-normal' }),
    ]),
    errors: [],
    deleteImages: List([]),
    addImages: List([]),
  };

  componentDidMount = () => {
    let { initGetShopInfo, session, siteId } = this.props;
    const params = new URLSearchParams(this.props.location.search);

    if (params.get('siteId')) {
      siteId = params.get('siteId');
      this.props.setRequired({
        siteId: params.get('siteId'),
        userId: params.get('userId'),
        session: params.get('session'),
      });
    }

    if (session || params.get('siteId')) {
      initGetShopInfo({ session, siteId }).then(shop => {
        this.setState(prevState => ({
          images: fromJS(shop.mainImage[0] === '' ? [] : shop.mainImage),
          address: Map({
            zipCode: shop.zipCode,
            firstAddress: shop.addr1,
            detailAddress: shop.addr2,
          }),
          category: shop.category,
          name: shop.name,
          description: shop.desc,
          closeDays: shop.closeDay,
          openDay: shop.openDay,
          openingHours: shop.openTime,
          contact: shop.contacts,
          permitNumber: shop.permitNumber,
          possible: Converter.setPossible(shop.possible, prevState.possible),
          openTime: shop.openTime,
        }));
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { initGetShopInfo } = this.props;

    if (nextProps.session !== this.props.session) {
      const { session, siteId } = nextProps;
      // TODO: 배포할때 then삭제해도됨
      initGetShopInfo({ session, siteId }).then(shop => {
        this.setState(prevState => ({
          images: fromJS(shop.mainImage[0] === '' ? [] : shop.mainImage),
          address: Map({
            zipCode: shop.zipCode,
            firstAddress: shop.addr1,
            detailAddress: shop.addr2,
          }),
          category: shop.category,
          name: shop.name,
          description: shop.desc,
          closeDays: shop.closeDay,
          openDay: shop.openDay,
          openingHours: shop.openTime,
          contact: shop.contacts,
          permitNumber: shop.permitNumber,
          possible: Converter.setPossible(shop.possible, prevState.possible),
          openTime: shop.openTime,
        }));
      });
    }
  };

  setStateByKey = (key, value) => this.setState(prevState => ({ [key]: value }));

  toggleAddress = () => {
    this.setState(prevState => ({ isOpenAddress: !prevState.isOpenAddress }));
  };

  setAddress = data => () => {
    const { address } = this.state;
    this.setState({
      address: address.merge({ zipCode: data.zipNo, firstAddress: data.roadAddr }),
      isOpenAddress: false,
    });
  };

  handleDetailAddress = value => {
    const { address } = this.state;
    this.setState({ address: address.set('detailAddress', value) });
  };

  handleCategory = value => this.setState({ category: value });

  handleCheck = index => {
    const { possible } = this.state;
    this.setState({
      possible: possible.update(index, item => item.set('isChecked', !item.get('isChecked'))),
    });
  };

  onImageChange = (e, formData) => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState(prevState => ({
          preview: prevState.preview.push(Map({ base64: reader.result, formData })),
        }));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  deleteImageByIndex = (index, preview) => () => {
    if (preview) {
      this.setState(prevState => ({ preview: prevState.preview.delete(index) }));
      return;
    }

    this.setState(prevState => ({ images: prevState.images.filter((image, i) => i !== index) }));
  };

  validateClass = name => (this.state.errors.includes(name) ? true : false);

  onModifyShop = () => {
    const {
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
      permitNumber,
      preview,
      openDay,
      images,
    } = this.state;
    const { initSetShop, initGetShopLists, initUploadImage, siteId, navigateTo } = this.props;
    const { possible } = validateState(this.state);

    // TODO: immutable하게...
    const possibleData = ['0', '0', '0', '0', '0'];
    possible.forEach(data => {
      const index = data.get('index');
      possibleData[index] = '1';
    });

    const result = {
      category,
      name,
      desc: description,
      addr1: address.get('firstAddress'),
      addr2: address.get('detailAddress'),
      zipCode: address.get('zipCode'),
      contacts: contact,
      permitNumber,
      openDay,
      closeDay: closeDays,
      openTime: openingHours,
      possible: possibleData.join(''),
      mainImage: images.toJS(),
    };

    if (preview.size > 0) {
      initUploadImage({
        formData: this.state.preview
          .map(addImage => {
            return addImage.get('formData');
          })
          .toJS(),
        result,
        shop: true,
        siteId,
      });
    } else {
      this.props.initSetShop({ result, siteId });
    }

    navigateTo('/ceo/products')();
  };

  handleCancel = () => this.props.history.push('/order/reception');

  setId = e => {
    e.persist();
    this.setState(prevState => ({ id: e.target.value }));
  };

  render() {
    const {
      images,
      isOpenAddress,
      address,
      possible,
      name,
      closeDays,
      description,
      contact,
      openingHours,
      category,
      errors,
      id,
      permitNumber,
      preview,
      openDay,
    } = this.state;
    const { navigateTo, auth } = this.props;

    return (
      <div className="ceo">
        <div
          className="container"
          style={{ paddingTop: 0, paddingBottom: '5px', color: '#5f5f5f' }}>
          <Navigator />
          {/*franchise.getIn(['status', 'isFetching']) ? <Loading /> : null*/}
          <div
            className={classNames('overlay', { active: isOpenAddress })}
            onClick={this.toggleAddress}
          />
          {isOpenAddress ? (
            <Address setAddress={this.setAddress} toggleAddress={this.toggleAddress} />
          ) : null}
          <Images
            preview={preview}
            images={images}
            editMode
            onImageChange={this.onImageChange}
            validateClass={this.validateClass}
            deleteImageByIndex={this.deleteImageByIndex}
          />
          <div className="divider">
            <div />
          </div>
          <Info
            address={address}
            possible={possible}
            isOpenAddress={isOpenAddress}
            name={name}
            contact={contact}
            openingHours={openingHours}
            closeDays={closeDays}
            description={description}
            category={category}
            initiate={this.initiate}
            toggleAddress={this.toggleAddress}
            handleCheck={this.handleCheck}
            setStateByKey={this.setStateByKey}
            handleDetailAddress={this.handleDetailAddress}
            handleCategory={this.handleCategory}
            validateClass={this.validateClass}
            id={id}
            setId={this.setId}
            navigateTo={navigateTo}
            permitNumber={permitNumber}
            openDay={openDay}
          />
        </div>
        <Buttons
          editMode
          handleConfirm={this.onModifyShop}
          handleCancel={this.handleCancel}
          errors={errors.length > 0 ? true : false}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    shop: state.getIn(['ceo', 'shop']),
    auth: state.get('auth'),
    session: state.getIn(['auth', 'session']),
    siteId: state.getIn(['auth', 'siteId']),
  }),
  dispatch => ({
    initGetShopInfo: payload => dispatch(initGetShopInfo(payload)),
    navigateTo: route => () => dispatch(push(route)),
    initUploadImage: payload => dispatch(initUploadImage(payload)),
    initSetShop: payload => dispatch(initSetShop(payload)),
    setRequired: payload => dispatch({ type: 'auth/SET_REQUIRED', payload }),
  })
)(ModifyShop);
