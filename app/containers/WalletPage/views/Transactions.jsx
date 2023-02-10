import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import { isMobileOnly } from 'utils/platform';
import { useQueryString } from 'utils/hooks';

import HistoryTable from './HistoryTable';
import HistoryMobile from './HistoryMobile';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4),
    color: theme.palette.grey[500],
    backgroundColor: '#fff',
  },
  name: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    fontFamily: theme.typography.fontMedium,
    fontSize: 16,
    color: theme.palette.grey[900],
  },
}));

function Transactions(props) {
  const { data, isLast, onLoadMore, onShowOrderDetail } = props;
  const classes = useStyles();
  const [historyOpen, setHistoryOpen] = useState(false);

  const { queryString } = useQueryString();

  useEffect(() => {
    if (!isEmpty(queryString)) {
      const { snap } = queryString;
      if (snap === 'history') {
        setHistoryOpen(true);
      }
    }
  }, [queryString]);

  const handleOpenHistory = useCallback(() => setHistoryOpen(true), []);
  const handleCloseHistory = useCallback(() => setHistoryOpen(false), []);

  return (
    <>
      {isMobileOnly ? (
        <>
          <div className={classes.root}>
            <HistoryRoundedIcon />
            <Typography className={classes.name} onClick={handleOpenHistory}>
              Lịch sử giao dịch
            </Typography>
            <ArrowForwardIosRoundedIcon />
          </div>
          <HistoryMobile
            data={data}
            open={historyOpen}
            onClose={handleCloseHistory}
            isLast={isLast}
            onLoadMore={onLoadMore}
            onShowDetailOrder={onShowOrderDetail}
          />
        </>
      ) : (
        <HistoryTable
          data={data}
          isLast={isLast}
          onLoadMore={onLoadMore}
          onShowDetailOrder={onShowOrderDetail}
        />
      )}
    </>
  );
}

Transactions.propTypes = {
  data: PropTypes.array,
  isLast: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onShowOrderDetail: PropTypes.func,
};

export default memo(Transactions);
