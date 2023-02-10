import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/Link';
import { Badge } from '@material-ui/core';
import { get } from 'lodash';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 27,
    height: 27,
  },
}));

function MenuItem(props) {
  const { item } = props;
  const classes = useStyles();

  return (
    <li>
      <Link to={item.url} exact={item.url === '/'}>
        <Badge
          color="primary"
          badgeContent={get(item, 'count', 0)}
          overlap="circle"
        >
          <div className={classes.root}>
            <div className={classes.img}>{item.icon}</div>
            {item.name}
          </div>
        </Badge>
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object,
};

export default memo(MenuItem);
