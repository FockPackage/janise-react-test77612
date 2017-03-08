/**
 * 后台返回的字段 phoneIcon 为 1 时
 * 普通单数据图表
 * 折线图
 */
const getChartOption1 = (data, queryType) => {
  let opts = {};
  switch (queryType) {
    case 0: // 年度图表
    /**
     * TODO: 年度option
     */
      // opts = {
      //   title: {
      //     text: data[0].indcNm,
      //   },
      //   tooltip: {},
      //   legend: {
      //     // data: [data[0].indcNm],
      //   },
      //   xAxis: {
      //     data: (() => {
      //       const arr = [];
      //       data.forEach(item => {
      //         arr.push(+item.statisticsDate.substr(5, 7));
      //       });
      //       return arr;
      //     })(),
      //     // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      //   },
      //   yAxis: {},
      //   series: [{
      //     name: '销量',
      //     type: 'bar',
      //     data: (() => {
      //       const arr = [];
      //       data.forEach(item => {
      //         arr.push(+item.indcValues);
      //       });
      //       return arr;
      //     })(),
      //     // data: [5, 20, 36, 10, 10, 20],
      //   }],
      // };
      break;
    case 1: // 月度图表
      opts = {
        title: {
          // text: data[0].indcNm,
          text: `单位: ${data[0].indcUnit}`,
        },
        tooltip: {},
        legend: {
          // data: [data[0].indcNm],
        },
        xAxis: {
          data: (() => {
            const arr = [];
            data.forEach(item => {
              arr.push(+item.statisticsDate.substr(5, 7));
            });
            return arr;
          })(),
          // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [{
          name: data[0].indcNm,
          type: 'bar',
          label:{
            normal: {
              show: true,
              position: 'insideTop',
            }
          },
          data: (() => {
            const arr = [];
            data.forEach(item => {
              arr.push(+item.indcValues);
            });
            return arr;
          })(),
          // data: [5, 20, 36, 10, 10, 20],
        }],
      };
      break;
    default:
      break;
  }
  // console.log(opts);
  return opts;
}

export default getChartOption1;
