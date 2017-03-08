import React, { Component, PropTypes } from 'react';
import Title from '../Title';
import CompletionRate from '../CompletionRate';
import LastPeriod from '../LastPeriod';
import Chart from '../Chart';
import Query from '../Query';
import UpdateCycle from '../UpdateCycle';

import { queryYearData, queryYearsData } from '../../api';

/**
 * 获取标题props
 */
const getTitleData = data => {
  const { indcSystem, indcNm, statisticsDate, indcDfnin } = data;
  return {
    classify: indcSystem,
    title: indcNm,
    date: statisticsDate,
    help: indcDfnin,
  };
};

/**
 * 获取最近一个月的指标数据props
 */
const getCompletionRate = data => {
  const { indcValues, indcUnit, rate, rateDesc } = data;
  return {
    num: indcValues || 0,
    unit: indcUnit,
    rate,
    rateDesc,
  };
};

/**
 * 获取最近的上一个月的指标数据props
 */
const getLastPeriod = data => {
  const { statisticsDate, indcUnit, indcValues, rate, rateDesc } = data;
  return {
    date: statisticsDate || 0,
    unit: indcUnit,
    data: indcValues,
    rate,
    rateDesc,
  };
};

/**
 * 更新周期
 * @param {object} data 某月的指标对象
 */
const getUpdateCycle = data => {
  const { nextUpdateDate, indiTimes } = data;
  return {
    updateTime: nextUpdateDate,
    cycle: indiTimes,
  };
};

class SimpleData extends Component {
  constructor() {
    super();
    this.handelChartSubmit = this.handelChartSubmit.bind(this);
    this.state = {
      rows: [], // 保存通过indcId获取到的最近一年的数据
      chartData: [], // 保存通过右侧查询到的数据
      header: {
        title: {}, // 保存头部的标题
        completionRate: {}, // 保存最后的数据
        lastPeriod: {}, // 保存上一个数据
      },
      updateCycle: {}, // 保存更新周期
      lastYear: '',
      form: {
        type: 1, // 请求类型 0,年度图表 1,月度图表
        num: 5, // 年度个数，默认最近的5年数据
        year: (() => { // 请求的年份，默认从appPage传进来的最近一个月的数据中获取的年份
          return new Date().getFullYear(); // 暂时先初始化当前年份
        })(),
      }, // 保存请求的参数
      // type: 1, // 保存图表类型
    };
  }

  componentWillMount() {
    this.setHeaderState(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setHeaderState(nextProps.data);
    }
  }
  // 设置指标的静态数据
  setHeaderState(data) {
    const { indcId, statisticsDate } = data;
    queryYearData({
      indcId,
      year: statisticsDate.substr(0, 4),
      requestsort: 'odsphones',
    }).then(res => {
      if (res.code === '0') {
        const len = res.rows.length;
        const state = {
          rows: res.rows,
          header: {
            title: getTitleData(res.rows[len - 1]),
            completionRate: getCompletionRate(res.rows[len - 1]),
            lastPeriod: getLastPeriod(res.rows[len - 2]),
          },
          updateCycle: getUpdateCycle(res.rows[len - 1]),
          lastYear: statisticsDate.substr(0, 4),
          type: +data.phoneIcon,
          chartData: res.rows,
        };
        this.setState(state);
      } else {
        console.log(res.message);
      }
    });
    // .catch(err => {
    //   console.log(err);
    // });
  }

  /**
   * 从Query传过来的opts组为参数，请求chart使用的数据
   *
   * @param {any} opts
   *
   * @memberOf SimpleData
   */
  handelChartSubmit(opts) {
    console.log(opts);
    switch (opts.type) {
      case 0: // 年度图表
        queryYearsData({
          num: opts.years,
          indcId: this.props.indcId,
        }).then(res => {
          if (res.code === '0') {
            this.setState({
              chartData: res.rows,
            })
          } else {
            console.log(res.message);
          }
        });
        // .catch( err => {
        //   console.log(err);
        // });
        break;
      case 1: // 月度图表
        queryYearData({
          year: opts.year,
          indcId: this.props.indcId,
        }).then(res => {
          if (res.code === '0') {
            this.setState({
              chartData: res.rows,
            })
          } else {
            console.log(res.message);
          }
        });
        // .catch( err => {
        //   console.log(err);
        // });
        break;
      default:
        break;
    }

    this.setState({
      form: opts,
    })
  }

  render() {
    return (
      <div className="sample-data">
        <Title {...this.state.header.title} />
        <div className="two-period info-wrapper">
          <CompletionRate {...this.state.header.completionRate} />
          <LastPeriod {...this.state.header.lastPeriod} />
        </div>
        <div className="two-period chart-wrapper">
          <div className="chart-left">
            {
              this.state.chartData.length > 0 ?
                <Chart data={this.state.chartData} type={this.state.type} queryType={this.state.form.type} indcId={this.props.indcId} />
                : <div className="chart" />
              // this.renderChart(this.state.type)
            }
          </div>
          <div className="chart-right">
            <UpdateCycle {...this.state.updateCycle} />
            <Query fun={this.handelChartSubmit} year={this.state.lastYear}/>
          </div>
        </div>
      </div>
    );
  }
}

SimpleData.propTypes = {
  data: PropTypes.object,
  indcId: PropTypes.number,
  // year: PropTypes.string,
};

export default SimpleData;
