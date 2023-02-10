import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid, Typography } from '@material-ui/core';

import Empty from 'components/TableAdvance/Empty';

import { currencyFormat } from 'utils/stringFormat';
import { bookingStatus } from 'utils/enums';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  service: {
    maxWidth: 300,
  },
  serviceTypeText: {
    fontSize: '13px',
    textAlign: 'center',
  },
  serviceTypeContainer: {
    borderRadius: 13,
    padding: theme.spacing(1, 0),
  },
  bookingType: {
    backgroundColor: '#f1592a',
  },
  header: {
    padding: theme.spacing(5),
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
  },
  normalText: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detailText: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  detail: {
    marginTop: theme.spacing(0),
  },
  idCellLabel: {
    width: 60,
  },
  dateCellLabel: {
    width: 85,
  },
}));

function OrderStatus(props) {
  const classes = useStyles();
  const { status } = props;

  const orderStatus = bookingStatus.typeOfValue(status);

  const style = makeStyles(() => ({
    additional: {
      backgroundColor: orderStatus.color,
      color: '#fff',
    },
  }))();

  return (
    <div className={`${classes.serviceTypeContainer} ${style.additional}`}>
      <Typography className={classes.serviceTypeText}>
        {orderStatus.name}
      </Typography>
    </div>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.number,
};

function HistoryCell(props) {
  const classes = useStyles();

  const { data, onClick, onCancelOrder } = props;

  const onShowDetail = () => {
    onClick(data);
  };

  const cancelOrder = () => {
    if (onCancelOrder) {
      onCancelOrder(data);
    }
  };

  return (
    <TableRow>
      <TableCell align="center">
        {
          <Button
            color="secondary"
            onClick={onShowDetail}
            className={classes.idCellLabel}
          >
            {`#${data.id}`}
          </Button>
        }
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography className={classes.dateCellLabel}>{data.date}</Typography>
      </TableCell>
      <TableCell>
        <Grid
          container
          direction="column"
          justify="flex-start"
          className={classes.service}
        >
          <Grid item xs zeroMinWidth>
            <Typography className={classes.normalText} noWrap>
              {data.service}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography className={classes.detailText}>
              {`Tại - ${data.salon.name}`}
            </Typography>
          </Grid>
          <Grid item xs className={classes.detail}>
            <Button color="secondary" onClick={onShowDetail} component="button">
              Chi tiết
            </Button>
            {data.can_cancel && (
              <Button color="primary" onClick={cancelOrder} component="button">
                Huỷ
              </Button>
            )}
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="right">
        <Typography className={classes.price}>
          {currencyFormat(data.price)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <OrderStatus status={data.status} />
      </TableCell>
    </TableRow>
  );
}

HistoryCell.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  onCancelOrder: PropTypes.func,
};

function HistoryTable(props) {
  const classes = useStyles();

  const { data = [], onShowDetail, onCancelOrder } = props;

  return (
    <Paper variant="outlined" className={classes.root}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Ngày đặt</TableCell>
            <TableCell>Dịch vụ</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <HistoryCell
                data={item}
                onClick={onShowDetail}
                key={item.id || index}
                onCancelOrder={onCancelOrder}
              />
            ))
          ) : (
            <Empty
              colSpan={5}
              title="Không có lịch sử"
              subTitle="Bạn chưa có lịch sử nào, khi nào có chúng sẽ hiển thị tại đây!"
            />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

HistoryTable.propTypes = {
  data: PropTypes.array,
  onShowDetail: PropTypes.func,
  onCancelOrder: PropTypes.func,
};

export default memo(HistoryTable);
