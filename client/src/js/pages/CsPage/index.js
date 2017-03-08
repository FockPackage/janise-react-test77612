import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CsPage extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">asdfasdf</Link></li>
          <li><Link to="/publicsentiment">asdfasdf</Link></li>
        </ul>
      </div>
    );
  }
}

CsPage.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CsPage);
