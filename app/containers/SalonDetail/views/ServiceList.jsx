/**
 *
 * Services
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import ServiceItem from 'components/ServiceItem';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(0, 4, 2, 4) : 0,
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  viewMore: {
    border: `solid 1px ${theme.palette.secondary.main}`,
    borderRadius: 30,
    margin: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1, 4),
    color: theme.palette.secondary.main,
  },
}));

const pageNumber = 10;

function ServiceList(props) {
  const { services = [], booking = [], showDetail, onBooking } = props;
  const classes = useStyle();
  const [showAll, setShowAll] = useState(true);
  const [servicesDisplay, setServicesDisplay] = useState([]);

  const handleShowAll = () => {
    setShowAll(true);
    setServicesDisplay(services);
  };

  useEffect(() => {
    if (!isEmpty(services)) {
      if (services.length > pageNumber) {
        setShowAll(false);
        setServicesDisplay(services.slice(0, pageNumber));
      } else {
        handleShowAll();
      }
    }
  }, [services]);

  return (
    <Grid container className={classes.wrapper}>
      {servicesDisplay.map(item => {
        const serviceBooking = booking.find(
          itemBooking => itemBooking.id === item.id,
        );
        return (
          <Grid key={shortid.generate()} item xs={12} className={classes.item}>
            <ServiceItem
              data={item}
              showDetail={showDetail}
              onBooking={onBooking}
              isBooking={!isEmpty(serviceBooking)}
            />
          </Grid>
        );
      })}
      {!showAll && (
        <Grid item xs={12} container justify="center">
          <Button className={classes.viewMore} onClick={handleShowAll}>
            {`Xem thêm tất cả ${services.length} dịch vụ`}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

ServiceList.propTypes = {
  services: PropTypes.array,
  booking: PropTypes.array,
  showDetail: PropTypes.func,
  onBooking: PropTypes.func,
};

export default memo(ServiceList);
