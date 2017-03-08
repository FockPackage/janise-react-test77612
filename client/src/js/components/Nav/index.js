import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor() {
    super();
    this.handlePrePage = this.handlePrePage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);

    this.state = {
      index: 1,
      pageCount: 4,
      total: 1,
      type: 'can-click',
    };
  }
  componentWillMount() {
    this.setState({
      index: this.props.index,
      pageCount: this.props.pageCount,
      total: this.props.total,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({
        index: nextProps.index,
      });
    }
  }

  handlePrePage(e) {
    e.preventDefault();
    const num = this.state.index - 1;
    if (num === 0) {
      this.setState({
        type: 'not-click',
      });
      return;
    }
    this.props.setPage(num);
    console.log(num);
    this.setState({
      index: num,
      type: 'can-click',
    });
  }
  handleNextPage(e) {
    e.preventDefault();
    const num = this.state.index + 1;
    if (num > Math.ceil(this.state.total / this.state.pageCount)) {
      this.setState({
        type: 'not-click',
      });
      return;
    }
    this.props.setPage(num);
    console.log(num);
    this.setState({
      index: num,
      type: 'can-click',
    });
  }
  render() {
    return (
      <nav className="nav">
        <ul className="nav-wrapper">
          <li><a href onClick={this.handlePrePage}>上一页</a></li>
          <li><a href onClick={this.handleNextPage}>下一页</a></li>
          <li><Link to={"/publicsentiment"}>退出大屏</Link></li>
        </ul>
        <div className="nav-button">

        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  index: PropTypes.number,
  pageCount: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
};

Nav.defaultProps = {
  index: 1,
  pageCount: 4,
  total: 1,
};

export default Nav;
