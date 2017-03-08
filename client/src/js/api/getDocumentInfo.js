import request from 'superagent';

/**
 * 获取下载文件信息
 */
export const getDocumentInfo = () => {
  return new Promise((resolve, reject) => {
    request.get('/api/documentInfo/getDocumentInfo.do')
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
