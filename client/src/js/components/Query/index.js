import React, { Component, PropTypes } from 'react';
// import getIconUrl from '../../common/getIconUrl';

class Query extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    // this.handleGetYears = this.handleGetYears.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nowYear = new Date().getFullYear();
    this.state = {
      year: this.nowYear,
      month: '',
      day: '',
      years: [],
      months: [],
      days: [],
      num: 5,
      type: 1,
      radio: [
        {
          text: 'years',
          value: 'yearsType',
          checked: false,
        },
        {
          text: 'months',
          value: 'monthsType',
          checked: true,
        },
      ],
    };
  }
  componentWillMount(){
    this.setState({
      years:this.handleGetYears(this.props.year),
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.year !== this.props.year) {
      this.setState({
        years: this.handleGetYears(nextProps.year),
      })
    }
  }
  handleGetYears(year) {
    const years = [];
    // const nowYear = this.nowYear;
    const nowYear = + year;
    const year1 = nowYear - 1;
    const year2 = nowYear - 2;
    years.push(nowYear);
    years.push(year1);
    years.push(year2);

    return years;
  }
  handleChange(e) {
    e.preventDefault();
    const value = e.currentTarget.value;
    const name = e.currentTarget.getAttribute('name');
    this.setState({
      [name]: value,
    });
  }

  handleRadio(index) {
    const radioOpt = this.state.radio;
    for (let i = 0; i < radioOpt.length; i++) {
      radioOpt[i].checked = false;
    }

    radioOpt[index].checked = true;
    this.setState({
      radio: radioOpt,
      type: index,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.fun({
      type: this.state.type,
      num: this.state.num,
      year: this.state.year,
    });
  }

  renderOption(list) {
    const List = list.map((item, index) => {
      return <option key={index} value={item}>{item}</option>;
    });
    return List;
  }

  renderOption1() {
    const len = 5;
    const options = [];
    for (let i = 0; i < len; i++) {
      options.push(<option key={i} value={i + 1}>{i + 1}</option>);
    }
    return options;
  }

  render() {
    return (
      <div className="query">
        <div className="query-select">
          <div className="year-select">
            <label>
              <input
                type="radio"
                onChange={this.handleRadio.bind(this, 0)}
                checked={this.state.radio[0].checked}
              />
              年度图表(选择最近年数)
            </label>
            <select className="num" name="num" value={this.state.num} onChange={this.handleChange} >
              {this.renderOption1() }
            </select>
          </div>
          <div className="month-select">
            <label><input
              type="radio"
              onChange={this.handleRadio.bind(this, 1)}
              checked={this.state.radio[1].checked}
            />月度图表(每年每月数据)</label>
            <select className="year" name="year" value={this.state.year} onChange={this.handleChange} >
              {this.renderOption(this.state.years) }
            </select>
          </div>
          <button className="submint" type="button" onClick={this.handleSubmit}>查询</button>
        </div>
      </div>
    );
  }
}

Query.propTypes = {
  updateTimeIcon: PropTypes.string,
  updateTime: PropTypes.string,
  dataTimeIcon: PropTypes.string,
  dataTime: PropTypes.string,
  // queryIcon: PropTypes.string,
};

Query.defaultProps = {
  updateTime: '2016-05',
  updateTimeIcon: 'updateTimeIcon',
  dataTime: '6月',
  dataTimeIcon: 'dataTimeIcon',
  // queryIcon: 'queryIcon',
};

export default Query;
