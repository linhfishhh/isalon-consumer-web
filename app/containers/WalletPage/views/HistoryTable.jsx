import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Empty from 'components/TableAdvance/Empty';

import { coinFormat } from 'utils/stringFormat';
import { datetimeFormat } from 'utils/dateTime';
import { transactionTypes } from 'utils/enums';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  header: {
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
    margin: theme.spacing(5),
  },
  datetime: {
    color: theme.palette.grey[600],
  },
  coin: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
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
  viewMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  viewMore: {
    borderRadius: 30,
    margin: theme.spacing(4, 0),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    color: theme.palette.secondary.main,
    border: `solid 1px ${theme.palette.secondary.main}`,
  },
  orderId: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginLeft: theme.spacing(2),
    cursor: 'pointer',
  },
}));

function HistoryCell(props) {
  const { data, onClick } = props;
  const classes = useStyles();

  const orderId =
    data.productOrderId || data.serviceOrderId
      ? `#${data.productOrderId || data.serviceOrderId}`
      : '';

  const handleShowDetailOrder = useCallback(() => {
    if (data.productOrderId) {
      onClick(data.productOrderId, 'shop');
    }
    if (data.serviceOrderId) {
      onClick(data.serviceOrderId, 'booking');
    }
  }, []);

  return (
    <TableRow>
      <TableCell align="center">{data.userTransactionId}</TableCell>
      <TableCell align="center">
        <Typography className={classes.datetime}>
          {datetimeFormat(data.createdDate)}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className={classes.datetime}>
          {transactionTypes.typeOfValue(data.type).name}
          <Typography
            component="span"
            className={classes.orderId}
            onClick={handleShowDetailOrder}
          >
            {orderId}
          </Typography>
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography className={classes.coin}>
          {coinFormat(data.beforeAmountCoin)}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography
          className={data.amountCoin < 0 ? classes.decrease : classes.increase}
        >
          {`${data.amountCoin > 0 ? '+' : '-'}${coinFormat(data.amountCoin)}`}
        </Typography>
      </TableCell>
      <TableCell align="center">{data.description}</TableCell>
    </TableRow>
  );
}

HistoryCell.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

function HistoryTable(props) {
  const classes = useStyles();

  const { data = [], isLast, onLoadMore, onShowDetailOrder } = props;

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.header}>LỊCH SỬ XU TRÊN ISALON</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: 80 }}>
              #
            </TableCell>
            <TableCell align="center">Ngày giờ</TableCell>
            <TableCell align="left">Loại giao dịch</TableCell>
            <TableCell align="right">Số xu trước đó</TableCell>
            <TableCell align="right">Số xu thay đổi</TableCell>
            <TableCell align="center">Ghi chú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <HistoryCell
                key={item.id || index}
                data={item}
                index={index}
                onClick={onShowDetailOrder}
              />
            ))
          ) : (
            <Empty
              colSpan={6}
              title="Không có lịch sử"
              subTitle="Bạn chưa có lịch sử nào, khi nào có chúng sẽ hiển thị tại đây!"
            />
          )}
        </TableBody>
      </Table>
      {!isLast && (
        <div className={classes.viewMoreWrapper}>
          <Button className={classes.viewMore} onClick={onLoadMore}>
            Xem nhiều hơn
          </Button>
        </div>
      )}
    </Paper>
  );
}

HistoryTable.propTypes = {
  data: PropTypes.array,
  isLast: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onShowDetailOrder: PropTypes.func,
};

export default memo(HistoryTable);
