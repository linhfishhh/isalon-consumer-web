import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  title: {
    color: theme.palette.textColor[3],
    fontSize: 15,
    marginBottom: theme.spacing(4),
  },
  link: {
    color: theme.palette.textColor[4],
    display: 'block',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    flexGrow: 1,
  },
}));

function MenuFooter(props) {
  const { data } = props;
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <span className={classes.title}>{data.name}</span>
      {data.sub.map((item, index) => {
        const { targetBlank = false } = item;
        return (
          <Link
            key={item.id || index}
            to={item.link}
            className={classes.link}
            target={targetBlank ? '_blank' : undefined}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}

MenuFooter.propTypes = {
  data: PropTypes.object,
};

export default memo(MenuFooter);
