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
import { initGetShopInfo } from '../../../actions/ceo';

class ModifyShop extends Component {
  state = {
    images: List([]),
    base64Images: List([]),
    isOpenAddress: false,
    id: '',
    category: 'restaurant',
    name: '티바 두마리 치킨 대치점',
    description:
      '2001년부터 17년간 치킨만을 생각하고 연구해왔으며 가맹점 사장님의 작은 성공에 도움이 되도록 노력하겠습니다.',
    address: Map({
      zipCode: '419328',
      firstAddress: '서울특별시 강남구 대치동',
      detailAddress: 'ATY빌딩 401호',
    }),
    contact: '025551234',
    permitNumber: '123-4567-8901',
    openingHours: '평일 11:00 ~ 22:00 / 일요일 11:30 ~ 22:30',
    closeDays: '연중무휴',
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

  componentDidMount = () => {
    // FIXME: 상점번호
    this.props.initGetShopInfo(1);
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

  onImageChange = e => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = Map({
          image: reader.result,
          imageName: files[i].name,
          imageType: files[i].type,
          added: true,
          uniqueId: createUniqueId(),
        });
        this.setState({
          images: this.state.images.push(image),
          addImages: this.state.addImages.push(image),
        });
      };

      reader.readAsDataURL(files[i]);
    }
  };

  deleteImageByIndex = index => () => {
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
      addImages,
      deleteImages,
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
    } = this.state;
    const { initSetShop, history, authentication, franchise, initGetShopLists } = this.props;
    const { possible } = validateState(this.state);

    const result = {
      addImages: addImages.toJS(),
      deleteImages: deleteImages.toJS(),
      shop_seq: this.props.match.params.shopSequence,
      address: address.toJS(),
      possible: possible.toJS(),
      category,
      name,
      description,
      contact,
      openingHours,
      closeDays,
    };

    // initSetShop(result).then(() => {
    //   initGetShopLists(authentication.get('seq'));
    //   history.push(`/franchise/setProducts/${franchise.get('seq')}`);
    // });
    console.log(result);
  };

  handleCancel = () => this.props.history.push('/');

  addBase64Images = async result => {
    const imageData = await JSON.parse(result);
    const image = Map({
      image: `data:image/jpeg;base64, ${imageData.data}`,
      imageName: imageData.path,
      imageType: imageData.mime,
      added: true,
      uniqueId: createUniqueId(),
    });

    this.setState(prevState => ({
      images: prevState.images.push(image),
      addImages: prevState.addImages.push(image),
    }));
  };

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
            images={images}
            editMode
            onImageChange={this.onImageChange}
            validateClass={this.validateClass}
            deleteImageByIndex={this.deleteImageByIndex}
            shopSequence="14"
            addBase64Images={this.addBase64Images}
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

export default connect(null, dispatch => ({
  initGetShopInfo: shopNo => dispatch(initGetShopInfo(shopNo)),
  navigateTo: route => () => dispatch(push(route)),
}))(ModifyShop);
