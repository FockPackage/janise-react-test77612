import request from 'superagent';

/**
 * 各业务指标几年的年数据
 * @param {object} opts 参数对象({num: string, indcId: string})
 */
export const queryYearsData = opts => {
  return new Promise((resolve, reject) => {
    request.post('/api/queryYearsData.do')
      .send({
        years: opts.num,
        indcId: opts.indcId,
        requestsort: 'odsphones',
      })
      .end((err, res) => {
        if(err){
          reject({
            message: 'false',
            msg: JSON.stringify(err),
          });
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  })
}
