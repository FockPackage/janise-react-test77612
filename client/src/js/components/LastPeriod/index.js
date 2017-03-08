import React, { PropTypes } from 'react';

const LastPeriod = props => {
  return (
    <div className="last-period">
      <ul>
        <li className="period-text"><div className="title">上期指标情况：</div><div className="data">{props.date}</div></li>
        <li className="period-desc">
          <div className="desc-one"><span className="title">{props.data}</span><span className="data">{props.unit}</span></div>
          <div className="desc-two"><span className="title">{props.rateDesc}：</span><span>{props.rate}</span><span>%</span></div>
        </li>
      </ul>
    </div>
  );
};

LastPeriod.propTypes = {
  date: PropTypes.string,
  data: PropTypes.number,
  unit: PropTypes.string,
  rate: PropTypes.string,
  rateDesc: PropTypes.string,
};

LastPeriod.defaultProps = {
  date: '',
  data: 0,
  unit: '',
  rate: '',
  rateDesc: '',
};

export default LastPeriod;
