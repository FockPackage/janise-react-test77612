import { IMGURL } from '../config';

/**
 * 生成icon的路径
 * @param {string} icon 图表名称字符串
 */
const getIconUrl = icon => {
  return `${IMGURL}/${icon}.png`;
};

export default getIconUrl;
