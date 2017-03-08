import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SimpleData from '../../components/SimpleData';
import Nav from '../../components/Nav';

import { setIndex, setMonth } from '../../actions';

import { queryMonthData } from '../../api';

class AppPage extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
    };
  }
  componentWillMount() {
    this.doQuery(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userOa !== this.props.userOa) {
      this.doQuery(nextProps);
    }
  }

  /**
   * 获取经过个性化排序的最近每月数据
   *
   * @param {array} rows 从后台返回的未处理的数据
   * @param {array} orderingRule 手机端发送过来的排序规则
   * @returns
   *
   * @memberOf AppPage
   */
  getOrderRows(rows, orderingRule) {
    // 如果排序规则不存在则直接返回未处理的数据
    if (typeof orderingRule === 'undefined' || orderingRule.length === 0) {
      return rows;
    }

    const rule = orderingRule.sort((a, b) => {
      return a.sortNo - b.sortNo;
    });

    const arr = [];
    rule.forEach(item => {
      const element = rows.find(ele => {
        return ele.indcId === item.indcId && item.isShow === 1;
      });
      if (element) {
        arr.push(element);
      }
    });
    return arr;
  }

  /**
   * 生成当前页的指标数组
   * @param {array} list 月数据数组
   * @param {number} index 当前页数
   * @param {number} pageCount 每页指标个数
   * @returns
   */
  getHasOrderRowsOfPage(list, index, pageCount) {
    if (!list) {
      return [];
    }
    if (!list.length > 0) {
      return [];
    }
    const arr = [];
    for (let i = (index - 1) * pageCount; i < index * pageCount; i++) {
      arr.push(list[i]);
    }
    return arr;
  }

  doQuery(props) {
    // const { queryMonthData } = props.actions;
    const { userOa } = props;
    const form = {
      userOa,
    };
    queryMonthData(form).then(res => {
      console.log(res);
      if (!res.code === '0') {
        console.log(res.message);
        return;
      }
      this.setState({
        rows: res.rows,
      });
    })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  render() {
    const list = this.getOrderRows(this.state.rows, this.props.orderingRule);
    const arr = this.getHasOrderRowsOfPage(list, this.props.index, this.props.pageCount);
    console.log(arr);
    if (arr.length > 0) {
      return (
        <div className="app-wrapper">
          {
            arr[0] ?
              <SimpleData data={arr[0]} indcId={arr[0].indcId} /> : null
          }
          {
            arr[1] ?
              <SimpleData data={arr[1]} indcId={arr[1].indcId} /> : null
          }
          {
            arr[2] ?
              <SimpleData data={arr[2]} indcId={arr[2].indcId} /> : null
          }
          {
            arr[3] ?
              <SimpleData data={arr[3]} indcId={arr[3].indcId} /> : null
          }
          <Nav
            index={this.props.index}
            pageCount={this.props.pageCount}
            total={list.length}
            setPage={this.props.actions.setIndex}
          />
        </div>
      );
    }

    return (
      <div>
        <Nav
          index={this.props.index}
          pageCount={this.props.pageCount}
          total={list.length}
          setPage={this.props.actions.setIndex}
        />
      </div>
    );
  }
}

AppPage.propTypes = {
  monthData: PropTypes.array,
  month: PropTypes.string,
  userOa: PropTypes.string,
  index: PropTypes.number,
  pageCount: PropTypes.number,
  orderingRule: PropTypes.array,
  actions: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { monthData, index, month, pageCount, total, userOa, orderingRule } = state.app;
  return {
    monthData,
    index,
    month,
    pageCount,
    total,
    userOa,
    orderingRule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      // queryMonthData,
      setIndex,
      setMonth,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
