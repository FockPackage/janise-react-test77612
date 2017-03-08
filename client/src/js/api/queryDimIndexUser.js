import request from 'superagent';

/**
 * 用户认证接口
 * @param {object} opts
 */
export const queryDimIndexUser = (opts) => {
  return new Promise((resolve, reject) => {
    // console.log(`用户名： ${opts.user}`);
    request.post('/api/queryDimIndexUser.do')
      .send({
        // month: opts.month,
        userOA: opts.user,
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
          resolve(JSON.parse(res.text));
        }
      });
  });
};

