import request from 'superagent';

/**
 * 各业务指标每年每月数据
 * @param {object} opts 参数对象({year:string,indcId:string})
 * @returns promise 对象
 */
export const queryYearData = (opts) => {
  return new Promise((resolve, reject) => {
    request.post('/api/queryYearData.do')
      .send({
        year: opts.year,
        requestsort: 'odsphones',
        indcId: opts.indcId,
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
