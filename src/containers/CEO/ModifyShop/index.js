import React, { Component } from 'react';
import classNames from 'classnames';
import { List, Map } from 'immutable';
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

class ModifyShop extends Component {
  state = {
    preview: List(),
    images: List([]),
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
      Map({ index: 0, title: '홀', isChecked: true, src: '/img/icon01' }),
      Map({ index: 1, title: '배달', isChecked: true, src: '/img/icon02' }),
      Map({ index: 2, title: '포장', isChecked: true, src: '/img/icon03' }),
      Map({ index: 3, title: '예약', isChecked: true, src: '/img/icon04' }),
      Map({ index: 4, title: '주차', isChecked: false, src: '/img/icon05' }),
    ]),
    errors: [],
    deleteImages: List([]),
    addImages: List([]),
  };

  // FIXME: payload = siteid
  componentDidMount = () => {
    this.props.initGetShopInfo();
  };

  componentWillReceiveProps = nextProps => {
    const { shop } = nextProps;
    // console.log(shop.toJS());
    this.setState(prevState => ({
      // images: shop.get('mainImage'),
      address: Map({
        zipCode: shop.get('zipCode'),
        firstAddress: shop.get('addr1'),
        detailAddress: shop.get('addr2'),
      }),
      category: 'restaurant',
      name: shop.get('name'),
      description: shop.get('desc'),
      openDay: shop.get('openDay'),
      contact: shop.get('contacts'),
      permitNumber: shop.get('permitNumber'),
      // possible:
      openTime: shop.get('openTime'),
    }));
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

    const deleteImage = this.state.images.get(index);
    let deleteIndexFromAddImages = null;

    if (deleteImage.get('added')) {
      this.state.addImages.forEach((image, index) => {
        if (image.get('uniqueId') === deleteImage.get('uniqueId')) {
          deleteIndexFromAddImages = index;
        }
      });
    }

    this.setState({
      images: this.state.images.delete(index),
      deleteImages: this.state.deleteImages.push(deleteImage.get('seq')),
      addImages: this.state.addImages.delete(deleteIndexFromAddImages),
    });
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
    } = this.state;
    const { initSetShop, initGetShopLists, initUploadImage } = this.props;
    const { possible } = validateState(this.state);

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
      mainImage: [],
    };

    if (preview.size > 0) {
      initUploadImage({
        formData: this.state.preview
          .map(addImage => {
            return addImage.get('formData');
          })
          .toJS(),
        idx: '10', // FIXME: 상점의 번호
        result,
        shop: true,
      });
    } else {
      // FIXME:
      // console.log('set shop here', result);
      this.props.initSetShop(result);
    }
  };

  handleCancel = () => this.props.history.push('/');

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
    const { navigateTo } = this.props;

    return (
      <div className="ceo">
        <div className="container" style={{ paddingTop: 0, color: '#5f5f5f' }}>
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
  }),
  dispatch => ({
    initGetShopInfo: payload => dispatch(initGetShopInfo(payload)),
    navigateTo: route => () => dispatch(push(route)),
    initUploadImage: payload => dispatch(initUploadImage(payload)),
    initSetShop: payload => dispatch(initSetShop(payload)),
  })
)(ModifyShop);
