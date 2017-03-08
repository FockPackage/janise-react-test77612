import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getIconUrl from '../../common/getIconUrl';

class PublicSentimentPage extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    const img = document.getElementById('qrcode');
    const className = img.getAttribute('class');
    const value = /small/.test(className);
    if (value) {
      const name = className.replace(/small/, 'big');
      img.setAttribute('class', name);
    } else {
      const name = className.replace(/big/, 'small');
      img.setAttribute('class', name);
    }
  }
  render() {
    return (
      <div className="public-sentiment">
        <div className="simpleView">
          <div className="title">
            <h2>舆情监控1</h2>
          </div>
          <div className="content">
            <p>编辑器中最流行的插件之一。Emmet，前身Zen Coding也是web开发者提高生产力最有效的方法之一。按下Tab键，Emmet就能把一个缩写展开成一个HTML和CSS代码块，我想提一下Hayaku-集合了方便的层叠样式表缩写。</p>
          </div>
        </div>

        <div className="simpleView">
          <div className="title">
            <h2>舆情监控1</h2>
          </div>
          <div className="content">
            <p>编辑器中最流行的插件之一。Emmet，前身Zen Coding也是web开发者提高生产力最有效的方法之一。按下Tab键，Emmet就能把一个缩写展开成一个HTML和CSS代码块，我想提一下Hayaku-集合了方便的层叠样式表缩写。</p>
          </div>
        </div>

        <div className="simpleView">
          <div className="title">
            <h2>舆情监控1</h2>
          </div>
          <div className="content">
            <p>编辑器中最流行的插件之一。Emmet，前身Zen Coding也是web开发者提高生产力最有效的方法之一。按下Tab键，Emmet就能把一个缩写展开成一个HTML和CSS代码块，我想提一下Hayaku-集合了方便的层叠样式表缩写。</p>
          </div>
        </div>

        <div className="simpleView">
          <div className="title">
          </div>
          <div className="content">
            <div className="qr small">
              <img
                id="qrcode"
                className="qrcode"
                src={getIconUrl(this.props.qrcode)} alt=""
                onClick={this.handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PublicSentimentPage.defaultProps = {
  qrcode: 'qrcode',
};

PublicSentimentPage.propTypes = {
  qrcode: React.PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicSentimentPage);

      // <div>
      //   舆情监控
      //   <ul>
      //     <li>
      //       <Link to="/">返回到指标</Link>
      //     </li>
      //   </ul>
      // </div>
