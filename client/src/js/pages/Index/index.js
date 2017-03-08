import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';

import io from 'socket.io-client';

import { setIndex, setOrderingRule, setUserOa } from '../../actions';


const socket = io('http://localhost:8080');
socket.on('news', data => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

class Index extends Component {

  /**
   * TODO: 测试时添加的'MAYIMIN'，最后部署的时候需要去掉
   */
  componentWillMount() {
    this.props.actions.setUserOa('MAYIMIN');
  }
  componentDidMount() {
    const self = this;

    socket.on('login', data => {
      console.log(data);

      const sortList  = JSON.parse(data.sortList);
      this.props.actions.setIndex(1);
      this.props.actions.setOrderingRule(sortList);
      //this.props.actions.setUserOa(data.userOa);

      hashHistory.push({
        pathname: '/app',
      });
    });

    socket.on('logout', data => {
      console.log(data);

      this.props.actions.setIndex(1);
      this.props.actions.setOrderingRule([]);
      this.props.actions.setUserOa('');

      hashHistory.push({
        pathname: '/publicsentiment',
      });
    });

    socket.on('setIndex', data => {
      self.props.actions.setIndex(data.index);
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

Index.propTypes = {
  actions: React.PropTypes.object,
  history: React.PropTypes.object,
  children: React.PropTypes.any,
};

const mapStateToProps = () => {
  return {
    // sortList: state.sortList,
    // userOa: state.userOa,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      setIndex,
      setOrderingRule,
      setUserOa,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
