import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { WapperMenu } from './styles';

function Menu(props) {
  let content = null;
  const { items, className } = props;
  // If we have items, render them
  if (items) {
    content = items.map(item => <MenuItem item={item} key={item.name} />);
  }
  return (
    <>{content && <WapperMenu className={className}>{content}</WapperMenu>}</>
  );
}

Menu.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

export default memo(Menu);
