/**
 *
 * SalonItem
 *
 */

import React, { memo, useEffect, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import RatingView from 'components/RatingView';
import { makeStyles } from '@material-ui/core/styles';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import { salonDetailService } from 'services';

import {
  currencyFormat,
  convertToSlug,
  distanceFormat,
} from 'utils/stringFormat';
import { isAuthenticated, showSignInDialog } from 'utils/auth';
import { getSettings } from 'utils/localStorage/settings';

import { FavoriteIcon, FavoredIcon } from 'assets/svgIcon/FavoriteIcon';
import Img from 'components/Img';
import { Link } from 'react-router-dom';
import { path, createPath } from 'routers/path';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    position: 'relative',
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: 165,
    [theme.breakpoints.down('xs')]: {
      height: 190,
    },
  },
  itemInfo: {
    padding: theme.spacing(2),
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderTop: 'none',
    borderBottomLeftRadius: theme.spacing(1.5),
    borderBottomRightRadius: theme.spacing(1.5),
  },
  rate: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.textColor[1],
  },
  star: {
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    fontSize: 11,
    color: theme.palette.textColor[7],
  },
  name: {
    fontFamily: theme.typography.fontMedium,
    fontSize: 17,
    color: theme.palette.textColor[1],
    marginBlockStart: 0,
    marginBlockEnd: 0,
    overflow: 'hidden',
    lineClamp: 1,
    display: '-webkit-box',
    boxOrient: 'vertical',
  },
  address: {
    color: theme.palette.textColor[7],
    marginBottom: theme.spacing(1),
    '& svg': {
      width: 15,
    },
    '& p': {
      fontSize: 12,
    },
  },
  addressText: {
    overflow: 'hidden',
    lineClamp: 1,
    display: '-webkit-box',
    boxOrient: 'vertical',
    fontSize: 12,
  },
  distance: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.textColor[1],
    flexShrink: 0,
    fontSize: 12,
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.backgroundColor[8],
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block',
    padding: `${theme.spacing(1) / 2}px ${theme.spacing(2)}px`,
  },
  saleOff: {
    width: 60,
    height: 30,
    backgroundColor: theme.palette.backgroundColor[6],
    color: theme.palette.textColor[6],
    borderBottomLeftRadius: 15,
    position: 'absolute',
    top: 0,
    right: 0,
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    fontSize: 16,
  },
  favorite: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: theme.spacing(1.5),
    borderRadius: '50%',
    color: theme.palette.textColor[6],
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function SalonItem(props) {
  const { className, data } = props;
  const [liked, setLiked] = useState(data.liked);
  const dispatch = useDispatch();
  const classes = useStyle();
  const settings = getSettings();

  useEffect(() => {
    setLiked(data.liked);
  }, [data]);

  const link = useMemo(() => {
    const province = (data.address_cache || data.address).split(',').pop();
    return createPath(path.salonDetail, {
      salonId: `${data.id}`,
      salonName: convertToSlug(data.name),
      provinceName: convertToSlug(province),
    });
  }, []);

  const price = useMemo(() => data.price_from_cache || data.price_from, []);

  const handleFavorite = useCallback(async event => {
    event.preventDefault();
    if (isAuthenticated()) {
      const likeStatus = await salonDetailService.favoriteSalon(data.id);
      setLiked(likeStatus);
    } else {
      showSignInDialog(dispatch);
    }
  }, []);

  return (
    <Link to={link} title={data.name}>
      <div className={`${classes.wrapper} ${className}`}>
        <div>
          <Img className={classes.image} src={data.cover} />
          {data.sale_off_up_to > 0 && (
            <span component="span" className={classes.saleOff}>
              {`- ${data.sale_off_up_to}%`}
            </span>
          )}
          <button
            className={classes.favorite}
            onClick={handleFavorite}
            type="button"
          >
            {liked ? <FavoredIcon /> : <FavoriteIcon color="#fff" />}
          </button>
        </div>
        <div className={`${classes.column} ${classes.itemInfo}`}>
          {settings.rating && (
            <div className={classes.rate}>
              <RatingView
                className={classes.star}
                value={data.rating}
                size="small"
              />
              <span className={classes.rateNumber}>{`(${
                data.rating_count
              })`}</span>
            </div>
          )}
          <h4 className={classes.name}>{data.name}</h4>
          <div className={`${classes.row} ${classes.address}`}>
            <div className={classes.row}>
              <LocationIcon fontSize="small" />
              <span className={classes.addressText}>
                {data.address_cache || data.address}
              </span>
            </div>
            <span className={classes.distance}>
              {distanceFormat(data.distance)}
            </span>
          </div>
          <div className={classes.row}>
            <span className={classes.price}>{`từ ${currencyFormat(
              price,
            )}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

SalonItem.defaultProps = {
  className: '',
};

SalonItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default memo(SalonItem);
