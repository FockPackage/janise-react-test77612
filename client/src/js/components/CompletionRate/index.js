import React, { PropTypes } from 'react';
import getIconUrl from '../../common/getIconUrl';

const CompletionRate = props => {
  return (
    <div className="completion-rate">
      <ul className="completion-block">
        <li className="text-block">
          <img className="num-icon" src={getIconUrl(props.numIcon)} alt="" />
          <div className="num">{props.num} </div>
          <div className="unit">{props.unit}</div>
        </li>
        <li className="chart-block">
          <img className="rate-icon" src={getIconUrl(props.rateIcon)} alt="" />
          <div className="progress-wrapper">
            <div className="progress-bar"><span>{`${props.rateDesc} ${props.rate}`}</span></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

CompletionRate.propTypes = {
  numIcon: PropTypes.string,
  num: PropTypes.number,
  unit: PropTypes.string,
  rateIcon: PropTypes.string,
  rate: PropTypes.string,
  rateDesc: PropTypes.string,
};

CompletionRate.defaultProps = {
  numIcon: 'numIcon',
  num: 0,
  unit: '',
  rateIcon: 'rateIcon',
  rate: '0',
  rateDesc: '',
};

export default CompletionRate;
