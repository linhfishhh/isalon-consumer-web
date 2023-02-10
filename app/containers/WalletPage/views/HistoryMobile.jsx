import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import Transition from 'components/Transition/TransitionLeft';
import EmptyPage from 'components/EmptyPage';

import { coinFormat } from 'utils/stringFormat';
import { datetimeFormat } from 'utils/dateTime';
import { transactionTypes } from 'utils/enums';

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  cover: {
    alignSelf: 'flex-start',
  },
  title_unread: {
    color: `${theme.palette.primary.main} !important`,
  },
  title: {
    color: theme.palette.textColor[1],
    whiteSpace: 'pre-wrap',
    marginBottom: '0 !important',
  },
  date: {
    color: theme.palette.grey[500],
    display: 'inline',
    fontSize: '12px !important',
  },
  increase: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.success.main,
    fontSize: 16,
  },
  decrease: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.error.main,
    fontSize: 16,
  },
  type: {
    fontSize: 16,
  },
  description: {
    color: theme.palette.grey[500],
    fontSize: 12,
  },
  orderId: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginLeft: theme.spacing(2),
  },
}));

function HistoryMobile(props) {
  const {
    open,
    loading,
    data,
    onClose,
    isLast,
    onLoadMore,
    onShowDetailOrder,
  } = props;

  const { length } = data;
  const classes = useStyles();

  const getOrderId = useCallback(
    item =>
      item.productOrderId || item.serviceOrderId
        ? `#${item.productOrderId || item.serviceOrderId}`
        : '',
    [],
  );

  const handleShowDetailOrder = useCallback(item => {
    if (item.productOrderId) {
      onShowDetailOrder(item.productOrderId, 'shop');
    }
    if (item.serviceOrderId) {
      onShowDetailOrder(item.serviceOrderId, 'booking');
    }
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.wrapper, id: 'paper-content' }}
    >
      <BasePageView
        header={
          <Navigation
            title="Lịch sử giao dịch"
            backButtonProps={{ type: 'action', action: onClose }}
          />
        }
        contentProps={{
          cornerRadiusColor: 'primary',
          dataLength: data.length,
          onLoadMore,
          hasMore: !isLast,
          scrollableTarget: 'paper-content',
        }}
      >
        {isEmpty(data) ? (
          <>
            {loading ? (
              <>{/* placeholder */}</>
            ) : (
              <EmptyPage
                title="Không có lịch sử"
                subTitle="Bạn chưa có lịch sử nào, khi nào có chúng sẽ hiển thị tại đây!"
              />
            )}
          </>
        ) : (
          <List>
            {data.map((item, index) => (
              <React.Fragment key={shortid.generate()}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Grid container>
                        <Grid item xs>
                          <Typography className={classes.type}>
                            {transactionTypes.typeOfValue(item.type).name}
                            <Typography
                              component="span"
                              className={classes.orderId}
                              onClick={() => handleShowDetailOrder(item)}
                            >
                              {getOrderId(item)}
                            </Typography>
                          </Typography>
                          <Typography className={classes.description}>
                            {item.description}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            className={
                              item.amountCoin < 0
                                ? classes.decrease
                                : classes.increase
                            }
                          >
                            {`${item.amountCoin > 0 ? '+' : '-'}${coinFormat(
                              item.amountCoin,
                            )}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                    secondary={
                      <Typography component="span" className={classes.date}>
                        {datetimeFormat(item.createdDate)}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </BasePageView>
    </Dialog>
  );
}

HistoryMobile.defaultProps = {
  open: false,
  data: [],
  loading: false,
};

HistoryMobile.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.array,
  isLast: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onShowDetailOrder: PropTypes.func,
};

export default memo(HistoryMobile);
