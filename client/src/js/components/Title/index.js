import React, { PropTypes } from 'react';
import getIconUrl from '../../common/getIconUrl';

const Title = props => {
  return (
    <div className="header">
      <div className="classify left"><img className="classifyIcon" src={getIconUrl(props.classifyIcon)} alt="" />{props.classify}</div>
      <div className="center">{props.title}</div>
      <div className="right"><img className="dateIcon" src={getIconUrl(props.dateIcon)} alt="" />{props.date}<img className="helpIcon" src={getIconUrl(props.helpIcon)} alt="" /></div>
    </div>
  );
};

Title.propTypes = {
  classifyIcon: PropTypes.string,
  classify: PropTypes.string,
  title: PropTypes.string,
  dateIcon: PropTypes.string,
  date: PropTypes.string,
  helpIcon: PropTypes.string,
  help: PropTypes.string,
};

Title.defaultProps = {
  classifyIcon: 'classifyIcon',
  classify: '',
  title: '',
  dateIcon: 'dateIcon',
  date: '',
  helpIcon: 'helpIcon',
};

export default Title;
