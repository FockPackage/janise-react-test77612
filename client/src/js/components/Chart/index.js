import React, { Component, PropTypes } from 'react';
import echarts from 'echarts';

import getChartOption1 from './getChartOption1';
import getChartOption2 from './getChartOption2';

  /**
   * 通过不同图表类型和请求类型返回不同optios
   *
   * @param {any} data 原始chart数据
   * @param {any} type 后台返回的chart类型
   * @param {any} queryType 右侧请求的chart类型
   *
   */
const handleSwitchGetChartOption = (data, type, queryType) => {
    let opts = {};
    switch (type) {
      case 1: // 普通类型
        opts = getChartOption1(data, queryType);
        break;
      case 2: // 占比类型
        opts = getChartOption2(data, queryType);
        break;
      default:
        break;
    }
    return opts;
  }


class Chart extends Component {
  constructor() {
    super();

    this.state = {
      chartTypes: 0,
    };
  }
  componentDidMount() {
    this.renderChart(this.props);
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    if (prevProps.data !== this.props.data) {
      this.renderChart(this.props);
      // const {data, type, queryType} = this.props;
      // this.chart.setOption(handleSwitchGetChartOption(data, type, queryType));
    }
  }

  renderChart(props) {
    if (this.chart) {
      this.chart.dispose();
    }
    const el = document.getElementById(`chart_${props.indcId}`);
    this.chart = echarts.init(el);
    const {data, type, queryType} = this.props;
    this.chart.setOption(handleSwitchGetChartOption(data, type, queryType));
  }

  render() {
    return (
      <div className="chart" id={`chart_${this.props.indcId}`}>
        图表
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.array,
  type: PropTypes.number,
  indcId: PropTypes.number,
  queryType: PropTypes.number,
};

export default Chart;
