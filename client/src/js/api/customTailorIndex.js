import request from 'superagent';
/**
 * 提交个性化选项到后台
 */
export const customTailorIndex = (opts) => {
  return new Promise((resolve, reject) => {
    request.post('/api/indexCustomTailor/customTailorIndex.do')
      .send({
        jsonStr: JSON.stringify(opts),
      })
      .type('form')
      .end((err, res) => {
        if (err) {
          // console.log(`校验错误: ${err}`);
          reject({
            message: 'false',
            msg: JSON.stringify(err),
          });
        } else {
          // console.log(`成功： ${res.text}`);
          // console.log(res.text);
          resolve(JSON.parse(res.text));
        }
      });
  });
};
