import request from 'superagent';

export const insertQueryLog = (opts) => {
  return new Promise((resolve, reject) => {
    request.post('/api/insertQueryLog.do')
      .send({
        userOa: opts.userOa,
        statDt: opts.statDt,
        indcId: opts.indcId,
      })
      .type('form')
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
