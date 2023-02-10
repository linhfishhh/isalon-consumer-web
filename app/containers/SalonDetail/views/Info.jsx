/**
 *
 * Info
 *
 */
import React, { memo, useState } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Collapse } from '@material-ui/core';
import { CheckCircleRounded as VerifiedIcon } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.spacing(1.5),
    borderBottomRightRadius: theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(3, 4) : theme.spacing(5, 8),
    marginBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(4),
  },
  addressWrapper: {
    padding: isMobileOnly ? 0 : theme.spacing(2, 0),
  },
  address: {
    display: 'inline',
    color: theme.palette.textColor[2],
    fontSize: 15,
  },
  dot: {
    display: 'inline-block',
    height: theme.spacing(2),
    width: theme.spacing(2),
    background: theme.palette.primary.main,
    borderRadius: '100%',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  detailAddress: {
    display: 'inline-block',
    color: theme.palette.primary.main,
    fontSize: 15,
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
    '&:before': {
      content: "''",
      display: 'inline-block',
      backgroundColor: theme.palette.primary.main,
      height: theme.spacing(2),
      width: theme.spacing(2),
      borderRadius: '100%',
      marginRight: theme.spacing(2),
    },
  },
  wrapperTime: {
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
  },
  expand: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'inline-block',
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  verified: {
    color: theme.palette.success.main,
    marginLeft: theme.spacing(2),
  },
}));

function Info(props) {
  const {
    name,
    verified,
    address,
    info,
    workDays,
    workTimes,
    onShowMap,
  } = props;
  const classes = useStyle();
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <Grid container className={classes.wrapper}>
      {!isMobileOnly && (
        <Grid item xs={12}>
          <Typography variant="h1">
            {name}
            {verified ? (
              <VerifiedIcon fontSize="large" className={classes.verified} />
            ) : (
              <></>
            )}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} className={classes.addressWrapper}>
        <Typography className={classes.address}>
          {address}
          <Typography
            component="span"
            className={classes.detailAddress}
            onClick={onShowMap}
          >
            Chi tiết địa điểm
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md>
            <Collapse in={expand} timeout="auto" collapsedHeight={80}>
              <Typography
                className="content"
                component="div"
                dangerouslySetInnerHTML={{ __html: info }}
              />
            </Collapse>
            <Typography className={classes.expand} onClick={toggleExpand}>
              {expand ? 'Thu gọn' : 'Xem nhiều hơn'}
            </Typography>
          </Grid>
          {!isMobileOnly && (
            <Grid item xs={12} md={3}>
              <Grid container className={classes.wrapperTime}>
                <Grid item xs={12}>
                  <Typography align="center">Thời gian mở cửa</Typography>
                  <Typography align="center">{workDays}</Typography>
                  <Typography align="center">{workTimes}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

Info.propTypes = {
  name: PropTypes.string,
  verified: PropTypes.number,
  address: PropTypes.string,
  info: PropTypes.string,
  workDays: PropTypes.string,
  workTimes: PropTypes.string,
  onShowMap: PropTypes.func,
};

export default memo(Info);
