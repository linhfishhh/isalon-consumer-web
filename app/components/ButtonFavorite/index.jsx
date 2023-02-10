/**
 *
 * ButtonFavorite
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import { FavoriteIcon } from 'assets/svgIcon/FavoriteIcon';

const useStyles = makeStyles(() => ({
  buttonFavorite: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FF5C39',
  },
  buttonUnfavorite: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
    border: '1px solid #FF5C39',
  },
}));

function ButtonFavorite(props) {
  const { className, onChange, isFavorite } = props;
  const classes = useStyles();
  return (
    <>
      {isFavorite ? (
        <ButtonBase
          className={`${classes.buttonFavorite} ${className}`}
          onClick={() => onChange(!isFavorite)}
        >
          <FavoriteIcon color="#fff" />
        </ButtonBase>
      ) : (
        <ButtonBase
          className={`${classes.buttonUnfavorite} ${className}`}
          onClick={() => onChange(!isFavorite)}
        >
          <FavoriteIcon color="#FF5C39" />
        </ButtonBase>
      )}
    </>
  );
}

ButtonFavorite.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  isFavorite: PropTypes.bool,
};

export default memo(ButtonFavorite);
