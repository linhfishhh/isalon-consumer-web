/**
 *
 * MobileItem
 *
 */

import React, { memo, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Typography, IconButton, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {
  LocationOn as LocationIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';
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
import MinimalServiceItem from 'components/ServiceItem/MinimalMobileItem';
import ScrollView from 'components/ScrollView';

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
  },
  cover: {
    position: 'relative',
  },
  image: {
    height: 220,
    cursor: 'pointer',
  },
  itemInfo: {
    padding: theme.spacing(3),
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
    cursor: 'pointer',
  },
  address: {
    color: theme.palette.textColor[7],
    '& svg': {
      width: 15,
    },
    '& p': {
      fontSize: 12,
    },
  },
  distance: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.textColor[1],
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.backgroundColor[8],
    borderRadius: theme.shape.borderRadius,
    display: 'inline',
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
    bottom: theme.spacing(-5),
    right: theme.spacing(2),
    color: theme.palette.textColor[6],
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#f7f6f5',
    },
  },
  highLight: {
    backgroundColor: '#f7f6f5',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  gridList: {},
}));

function MobileItem(props) {
  const { className, data, onShowServiceDetail, onShowSalonDetail } = props;

  const [liked, setLiked] = useState(data.liked);
  const dispatch = useDispatch();
  const history = useHistory();
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

  const onGotoDetail = () => {
    if (onShowSalonDetail) {
      onShowSalonDetail(data.id);
    }
    history.push(link);
  };

  const renderServiceItem = useCallback(
    (item, index) => (
      <MinimalServiceItem
        className={index % 2 > 0 ? classes.highLight : ''}
        key={item.id}
        data={item}
        onShowDetail={onShowServiceDetail}
      />
    ),
    [],
  );

  return (
    <Grid
      container
      direction="column"
      className={`${classes.wrapper} ${className}`}
    >
      <Grid item className={classes.cover}>
        <Typography component="a" onClick={onGotoDetail}>
          <Img className={classes.image} src={data.cover} />
          {data.sale_off_up_to > 0 && (
            <Typography component="span" className={classes.saleOff}>
              {`- ${data.sale_off_up_to}%`}
            </Typography>
          )}
        </Typography>
        <IconButton className={classes.favorite} onClick={handleFavorite}>
          {liked ? <FavoredIcon color="#fff" /> : <FavoriteIcon />}
        </IconButton>
      </Grid>
      <Grid item container direction="column" className={classes.itemInfo}>
        {settings.rating && (
          <Grid item className={classes.rate}>
            {/* <Typography component="span">
              {data.rating && data.rating.toFixed(1)}
            </Typography> */}
            <Rating
              className={classes.star}
              readOnly
              value={data.rating}
              size="small"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              precision={0.5}
            />
            <Typography component="span" className={classes.rateNumber}>{`(${
              data.rating_count
            })`}</Typography>
          </Grid>
        )}
        <Grid item xs>
          <Typography
            component="h4"
            noWrap
            className={classes.name}
            onClick={onGotoDetail}
          >
            {data.name}
          </Typography>
        </Grid>
        <Grid item container className={classes.address} alignItems="center">
          <Grid item xs zeroMinWidth>
            <Typography noWrap>
              <LocationIcon fontSize="small" />
              {data.address_cache || data.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.distance}>
              {distanceFormat(data.distance)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Divider className={classes.divider} />
        </Grid>
        {data.services.length > 0 ? (
          <Grid item xs>
            <ScrollView
              className={classes.gridList}
              items={data.services}
              cols={1.1}
              spacing={0}
              renderItem={renderServiceItem}
            />
          </Grid>
        ) : (
          <Grid item xs>
            <Typography className={classes.price}>{`từ ${currencyFormat(
              price,
            )}`}</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

MobileItem.defaultProps = {
  className: '',
};

MobileItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onShowServiceDetail: PropTypes.func,
  onShowSalonDetail: PropTypes.func,
};

export default memo(MobileItem);
