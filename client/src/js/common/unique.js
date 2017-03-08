/**
 * 数组去重
 */
const unique = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let repeat = false;
    for (let j = 0; j < res.length; j ++) {
      if (arr[i] == res[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(arr[i]);
    }
  }
  return res;
};

export default unique;
