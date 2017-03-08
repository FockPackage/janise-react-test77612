import unique from '../../common/unique';

/**
 * 生成operator数组
 */
const getOperators = data => {
  let arr = [];
  data.forEach(item => {
    arr.push(item.operator);
  });

  console.log(unique(arr));
  return unique(arr);
}
const getLegendData = (data, operators) => {
  const months = [];
  data.forEach(item => {
    if(operators[0] === item.operator) {
      months.push(item.statisticsDate.substr(5, 7));
    }
  });
  return months;
}
const getSeriseData = (data, operators) => {
  const arr = [];
  for (let i = 0; i < operators.length; i++) {
    // const months = [];
    const percent = [];
    data.forEach(item => {
      if (operators[i] === item.operator) {
        percent.push(item.percent)
      }
    });

    arr.push({
      name: operators[i],
      type: 'bar',
      stack: '总量',
      label: {
        normal:{
          show: true,
          position: 'insideTop',
        },
      },
      data: percent,
      // data: [5, 20, 36, 10, 10, 20],
    })
  }
  return arr;
}

/**
 * 后台返回的字段 phoneIcon 为 2 时
 * 普通单数据图表
 * 折线图
 */
const getChartOption2 = (data, queryType) => {
  let opts = {};
  const operators = getOperators(data);
  switch (queryType) {
    case 0:
      /**
       *  TODO: 年度option
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
    case 1:
      // 月度数据
      opts = {
        title: {
          text: `单位: %`,
        },
        tooltip: {},
        legend: {
          data: operators,
        },
        xAxis: {
          data: getLegendData(data, operators),
          // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: getSeriseData(data, operators),
      };
      break;
    default:
      break;
  }
  console.log(opts);
  return opts;
}

export default getChartOption2;
