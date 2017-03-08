import React, { PropTypes } from 'react';
import getIconUrl from '../../common/getIconUrl';

const UpdateCycle = (props) => {
  return (
    <ul className="update-cycle">
      <li>
        <img src={getIconUrl(props.updateTimeIcon)} alt="" />
        <span>{props.updateTime || '每月25日'}</span>
      </li>
      <li>
        <img src={getIconUrl(props.dataTimeIcon)} alt="" />
        <span>{props.cycle || '6月25日'}</span>
      </li>
    </ul>
  );
};

UpdateCycle.propTypes = {
  updateTime: PropTypes.string,
  updateTimeIcon: PropTypes.string,
  cycle: PropTypes.string,
  dataTimeIcon: PropTypes.string,
};

UpdateCycle.defaultProps = {
  updateTime: '2016-05',
  updateTimeIcon: 'updateTimeIcon',
  cycle: '6月',
  dataTimeIcon: 'dataTimeIcon',
};


export default UpdateCycle;
