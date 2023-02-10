/**
 *
 * HistorySearch
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.grey[200],
    height: 50,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.grey[900],
  },
  subTitle: {
    color: theme.palette.grey[600],
  },
  icon: {
    margin: theme.spacing(0, 2),
  },
}));

function BookingSearchSummary(props) {
  const { filter, onClick } = props;
  const classes = useStyles();

  const optionSearch = () => {
    let result = '';
    if (filter) {
      const [service] = filter.services;
      const [province] = filter.provinces;
      result += ` • ${service ? service.name : 'Tất cả dịch vụ'}`;
      result += ` • ${province ? province.name : 'Toàn quốc'}`;
    }
    return result;
  };

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Grid
      container
      className={classes.wrapper}
      alignItems="center"
      onClick={handleOnClick}
    >
      <Grid item>
        <SearchIcon color="primary" className={classes.icon} />
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography component="span" className={classes.title}>
          Tìm kiếm và đặt lịch
        </Typography>
        <Typography noWrap className={classes.subTitle}>
          {optionSearch()}
        </Typography>
      </Grid>
    </Grid>
  );
}

BookingSearchSummary.propTypes = {
  filter: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(BookingSearchSummary);
