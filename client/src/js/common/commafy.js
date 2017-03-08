
/**
 * 数字格式转换成千分位
 * @param{Object} num
 */
const commafy = num => {
  // 1.先去除空格,判断是否空值和非数
  const str = `${num}`;
  let str1 = str.replace(/[ ]/g, ''); // 去除空格
  if (str1 === '') {
    return;
  }
  if (isNaN(str1)) {
    return;
  }
  // 2.针对是否有小数点，分情况处理
  const index = str1.indexOf('.');
  if (index === -1) { // 无小数点
    const reg = /(-?\d+)(\d{3})/;
    while (reg.test(num)) {
      str1 = str1.replace(reg, '$1,$2');
    }
  } else {
    let intPart = str1.substring(0, index);
    const pointPart = str1.substring(index + 1, num.length);
    const reg = /(-?\d+)(\d{3})/;
    while (reg.test(intPart)) {
      intPart = intPart.replace(reg, '$1,$2');
    }
    // str1 = intPart + '.' + pointPart;
    str1 = `${intPart}.${pointPart}`;
  }
  return str1;
};

export default commafy;
