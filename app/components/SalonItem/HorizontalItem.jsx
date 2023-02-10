/**
 *
 * HorizontalItem
 *
 */
import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';
import {
  LocationOn as LocationIcon,
  StarBorder as StarBorderIcon,
  Map as MapIcon,
} from '@material-ui/icons';

import { convertToSlug, distanceFormat } from 'utils/stringFormat';
import { isAuthenticated, showSignInDialog } from 'utils/auth';
import { getSettings } from 'utils/localStorage/settings';

import { path, createPath } from 'routers/path';

import { FavoriteIcon, FavoredIcon } from 'assets/svgIcon/FavoriteIcon';
import Img from 'components/Img';
import MinimalServiceItem from 'components/ServiceItem/MinimalItem';
import ScrollView from 'components/ScrollView';

import { salonDetailService } from 'services';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1.5),
  },
  cover: {
    position: 'relative',
    maxHeight: 300,
  },
  info: {
    padding: theme.spacing(4),
  },
  rate: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.textColor[1],
  },
  rating: {
    fontSize: 16,
  },
  star: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    color: theme.palette.textColor[7],
  },
  name: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.textColor[1],
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  address: {
    color: theme.palette.textColor[7],
    '& svg': {
      width: 15,
    },
    '& p': {
      fontSize: 13,
    },
  },
  distance: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.textColor[1],
  },
  services: {
    paddingLeft: theme.spacing(4),
  },
  highLight: {
    backgroundColor: '#f7f6f5',
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
  viewInMap: {
    fontSize: 12,
    color: theme.palette.textColor[2],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  viewMore: {
    fontSize: 12,
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    padding: theme.spacing(2),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  favorite: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.textColor[6],
  },
  link: {
    cursor: 'pointer',
  },
  gridList: {
    height: 200,
  },
}));

function HorizontalItem(props) {
  const {
    data,
    className = '',
    showServiceNumber = 3,
    onShowMap,
    onShowServiceDetail,
    onShowSalonDetail,
  } = props;

  const [liked, setLiked] = useState(data.liked);

  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(true);
  const [servicesDisplay, setServicesDisplay] = useState([]);

  const link = useMemo(() => {
    const province = (data.address_cache || data.address).split(',').pop();
    return createPath(path.salonDetail, {
      salonId: `${data.id}`,
      salonName: convertToSlug(data.name),
      provinceName: convertToSlug(province),
    });
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
    if (showAll) {
      setServicesDisplay(data.services.slice(0, showServiceNumber));
    } else {
      setServicesDisplay(data.services);
    }
  };

  useEffect(() => {
    setLiked(data.liked);
    if (data.services.length > showServiceNumber) {
      setShowAll(false);
      setServicesDisplay(data.services.slice(0, showServiceNumber));
    } else {
      handleShowAll();
    }
  }, [data]);

  const handleFavorite = useCallback(async event => {
    event.stopPropagation();
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
    <Grid container className={`${classes.wrapper} ${className}`}>
      <Grid item xs={5}>
        <Grid container>
          <Grid item className={classes.cover}>
            <Typography
              component="a"
              title={data.name}
              onClick={onGotoDetail}
              className={classes.link}
            >
              <Img className={classes.image} src={data.cover} />
              {data.sale_off_up_to > 0 && (
                <Typography component="span" className={classes.saleOff}>
                  {`- ${data.sale_off_up_to}%`}
                </Typography>
              )}
              <IconButton className={classes.favorite} onClick={handleFavorite}>
                {liked ? <FavoredIcon /> : <FavoriteIcon color="#fff" />}
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs zeroMinWidth>
        <Grid container className={classes.info}>
          <Grid item container xs={12} justify="space-between">
            {getSettings.rating ? (
              <Grid item xs container alignItems="center">
                <Typography display="inline" className={classes.rating}>
                  {data.rating && data.rating.toFixed(1)}
                </Typography>
                <Rating
                  className={classes.star}
                  readOnly
                  value={data.rating}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  precision={0.5}
                />
                <Typography
                  className={classes.rateNumber}
                  display="inline"
                >{`(${data.rating_count})`}</Typography>
              </Grid>
            ) : (
              <Grid item xs />
            )}
            {onShowMap && (
              <Grid item>
                <Typography
                  component="span"
                  className={classes.viewInMap}
                  onClick={onShowMap}
                >
                  <MapIcon color="primary" />
                  {` Xem vị trí trên bản đồ`}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} zeroMinWidth>
            {
              <Typography
                component="a"
                title={data.name}
                onClick={onGotoDetail}
                className={classes.link}
              >
                <Typography variant="h4" noWrap className={classes.name}>
                  {data.name}
                </Typography>
              </Typography>
            }
          </Grid>
          <Grid item xs={12} container className={classes.address}>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>
                <LocationIcon />
                {data.address}
              </Typography>
            </Grid>
            {data.distance && data.distance > 0 && (
              <Grid item>
                <Typography className={classes.distance}>
                  {distanceFormat(data.distance)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        {onShowMap ? (
          <Grid container className={classes.services}>
            {servicesDisplay.map((item, index) =>
              renderServiceItem(item, index),
            )}
            {data.services.length > showServiceNumber && (
              <Grid item xs container justify="flex-end">
                <Typography
                  className={classes.viewMore}
                  onClick={handleShowAll}
                  display="inline"
                >
                  {showAll ? 'Thu gọn' : 'Xem tất cả dịch vụ'}
                </Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <ScrollView
            scrollDirection="vertical"
            className={classes.gridList}
            items={data.services}
            cols={1}
            spacing={0}
            renderItem={renderServiceItem}
          />
        )}
      </Grid>
    </Grid>
  );
}

HorizontalItem.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  showServiceNumber: PropTypes.number,
  onShowMap: PropTypes.func,
  onShowServiceDetail: PropTypes.func,
  onShowSalonDetail: PropTypes.func,
};

export default memo(HorizontalItem);
