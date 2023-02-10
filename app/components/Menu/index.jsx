import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { WrapperMenu } from './styles';

function Menu(props) {
  let content = null;
  const { className, items } = props;
  if (items) {
    content = items.map(item => <MenuItem item={item} key={item.name} />);
  }
  return (
    <>{content && <WrapperMenu className={className}>{content}</WrapperMenu>}</>
  );
}

Menu.defaultProps = {
  className: '',
};

Menu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};

export default memo(Menu);
