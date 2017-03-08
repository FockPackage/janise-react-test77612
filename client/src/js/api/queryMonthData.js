import request from 'superagent';

/**
 * 各业务指标月数据
 * @param {object} opts 参数对象({month:string})
 * @returns promise 对象
 */
export const queryMonthData = (opts) => {
  return new Promise((resolve, reject) => {
    request.post('/api/queryMonthData.do')
      .send({
        month: opts.month,
        userOa: opts.userOa,
      })
      // .type('form')
      .end((err, res) => {
        if (err) {
          reject({
            message: 'false',
            msg: JSON.stringify(err),
          });
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
};
