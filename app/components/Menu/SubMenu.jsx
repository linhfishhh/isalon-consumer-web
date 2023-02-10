import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SubMenu(props) {
  const { item } = props;
  return (
    <li>
      <Link to={item.url}>{item.name}</Link>
    </li>
  );
}

SubMenu.propTypes = {
  item: PropTypes.object,
};

export default memo(SubMenu);
