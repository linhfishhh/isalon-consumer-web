/**
 *
 * ServiceItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import {
  Grid,
  Avatar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { currencyFormat } from 'utils/stringFormat';
import { FlashIcon } from 'assets/svgIcon';

import ImageList from 'components/ImageList';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: isMobileOnly ? theme.spacing(4, 3, 4, 4) : theme.spacing(4),
  },
  avatar: {
    width: isMobileOnly ? 45 : 50,
    height: isMobileOnly ? 45 : 50,
  },
  title: {
    fontSize: isMobileOnly ? 16 : 18,
    fontWeight: isMobileOnly ? 'normal' : theme.typography.fontWeightMedium,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  time: {
    color: theme.palette.textColor[2],
    display: isMobileOnly ? 'block' : 'inline',
  },
  detail: {
    display: 'inline',
    cursor: 'pointer',
    paddingLeft: isMobileOnly ? 0 : theme.spacing(4),
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  booking: {
    border: `solid 2px ${theme.palette.primary.main}`,
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: theme.shape.borderRadius + 2,
    fontSize: 18,
    textTransform: 'uppercase',
    width: 115,
    color: theme.palette.textColor[1],
    '&:hover': {
      color: theme.palette.textColor[6],
      backgroundColor: theme.palette.primary.main,
    },
  },
  select: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.primary.main,
  },
  price: {
    fontSize: isMobileOnly ? 16 : 23,
    fontWeight: isMobileOnly ? 'bold' : 'normal',
    color: theme.palette.primary.main,
    display: 'inline',
  },
  oldPrice: {
    paddingRight: isMobileOnly ? 0 : theme.spacing(2),
    color: theme.palette.textColor[2],
    textDecoration: 'line-through',
    display: isMobileOnly ? 'block' : 'inherit',
  },
  discount: {
    backgroundColor: theme.palette.backgroundColor[8],
    borderRadius: theme.shape.borderRadius,
    display: 'inline',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.main,
  },
  flash: {
    width: 8,
    margin: theme.spacing(1),
  },
  imageList: {
    paddingTop: theme.spacing(4),
  },
  iconButton: {
    padding: 0,
  },
}));

function ServiceItem(props) {
  const { data, isBooking, showDetail, onBooking } = props;
  const classes = useStyle();

  const handleBooking = () => {
    if (isBooking) {
      onBooking(isBooking, data);
    } else if (!isEmpty(data.options)) {
      showDetail(data, true);
    } else {
      onBooking(isBooking, data);
    }
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar src={data.cover} className={classes.avatar} />
          </Grid>
          <Grid item xs>
            <Typography
              className={classes.title}
              onClick={() => showDetail(data)}
            >
              {data.name}
            </Typography>
            <Typography className={classes.time}>{data.time}</Typography>
            <Typography
              className={classes.detail}
              onClick={() => showDetail(data)}
            >
              Xem chi tiết
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="flex-end">
          <Grid
            item
            xs
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography className={classes.price}>
                {isMobileOnly && currencyFormat(data.priceNumber)}
                {data.oldPriceNumber !== data.priceNumber && (
                  <Typography
                    component="span"
                    className={classes.oldPrice}
                    align="right"
                  >
                    {currencyFormat(data.oldPriceNumber)}
                  </Typography>
                )}
                {!isMobileOnly && currencyFormat(data.priceNumber)}
              </Typography>
            </Grid>
            {data.sale_percent !== 0 && (
              <Grid item>
                <Typography className={classes.discount}>
                  <FlashIcon className={classes.flash} />
                  {`- ${data.sale_percent}%`}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item style={{ width: isMobileOnly ? 8 : 16 }} />
          <Grid item>
            {isMobileOnly ? (
              <IconButton
                size="small"
                onClick={handleBooking}
                className={classes.iconButton}
              >
                {isBooking ? (
                  <CheckCircleRoundedIcon color="primary" fontSize="large" />
                ) : (
                  <AddCircleOutlineOutlinedIcon
                    color="primary"
                    fontSize="large"
                  />
                )}
              </IconButton>
            ) : (
              <Button
                className={`${classes.booking} ${
                  isBooking ? classes.select : ''
                }`}
                onClick={handleBooking}
              >
                {isBooking ? 'Đã chọn' : 'Đặt chỗ'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      {!isEmpty(data.images) && (
        <Grid item xs={12} className={classes.imageList}>
          <ImageList
            data={data.images}
            caption={data.name}
            numberToShow={isMobileOnly ? 4 : 5}
          />
        </Grid>
      )}
    </Grid>
  );
}

ServiceItem.propTypes = {
  data: PropTypes.object,
  isBooking: PropTypes.bool,
  showDetail: PropTypes.func,
  onBooking: PropTypes.func,
};

export default memo(ServiceItem);
