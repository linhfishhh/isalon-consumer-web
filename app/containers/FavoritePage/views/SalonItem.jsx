import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  ClearOutlined,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import Img from 'components/Img';
import Link from 'components/Link';
import { convertToSlug } from 'utils/stringFormat';
import { path, createPath } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  detail_container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    width: 160,
    height: 120,
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
    fontSize: 14,
  },
  rate: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.textColor[1],
  },
  star: {
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    fontSize: 11,
    color: theme.palette.textColor[7],
  },
}));

function SalonItem(props) {
  const { data, onRemove } = props;
  const { id, salon = {} } = data;

  const classes = useStyles();

  const province = salon.address.split(',').pop();
  const link = createPath(path.salonDetail, {
    salonId: `${salon.id}`,
    salonName: convertToSlug(salon.name),
    provinceName: convertToSlug(province),
  });

  const onDeleteFavSalon = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <Grid
      container
      direction="row"
      className={classes.root}
      spacing={4}
      alignItems="center"
    >
      <Grid item>
        <Img
          src={salon.avatar}
          className={classes.avatar}
          alt="Salon thumbnail"
        />
      </Grid>
      <Grid item xs>
        <Grid container direction="column" className={classes.detail_container}>
          <Grid item xs>
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item>
                <Typography className={classes.title_text}>
                  {salon.name}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <IconButton
                  aria-label="delete"
                  onClick={onDeleteFavSalon}
                  size="small"
                >
                  <ClearOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography className={classes.detail_text}>
              {salon.address}
            </Typography>
          </Grid>
          <Grid
            item
            xs
            container
            alignItems="center"
            className={classes.rate}
            wrap="nowrap"
          >
            <Rating
              className={classes.star}
              readOnly
              value={salon.rating}
              size="small"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              precision={0.5}
            />
            <Typography className={classes.rateNumber} display="inline">{`${
              salon.ratingCount
            } đánh giá`}</Typography>
          </Grid>
          <Grid item>
            <Link to={link} color="secondary">
              Xem chi tiết
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

SalonItem.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
};

export default memo(SalonItem);
