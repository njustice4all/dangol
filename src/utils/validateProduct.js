// return true여야 validate 통과
export default result => {
  // 컨텐츠, 메인이미지, 이름, 가격
  if (
    result.contents.trim() === '' ||
    result.name.trim() === '' ||
    result.price.trim() === '' ||
    result.mainImage.length === 0
  ) {
    return false;
  }

  let passOption = true;
  if (result.options.length > 0) {
    result.options.forEach(option => {
      if (option.option_name.trim() === '') {
        passOption = false;
      }

      option.list.forEach(optionList => {
        if (optionList.option_data.trim() === '' || optionList.price.trim() === '') {
          passOption = false;
        }
      });
    });
  }

  return passOption;
};
