import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'components/Link';
import SubMenu from './SubMenu';

function MenuItem(props) {
  const { item } = props;
  const { targetBlank = false } = item;
  let subMenu = null;
  if (item.sub) {
    subMenu = item.sub.map(menu => <SubMenu item={menu} key={menu.id} />);
  }
  return (
    <li>
      <Link
        to={item.url}
        className={item.sub && 'hasSub'}
        exact={item.url === '/'}
        target={targetBlank ? '_blank' : undefined}
      >
        {item.name}
      </Link>
      {subMenu && <ul className="sub-menu">{subMenu}</ul>}
    </li>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object,
};

export default memo(MenuItem);
