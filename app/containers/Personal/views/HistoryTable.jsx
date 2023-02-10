import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, Link, Typography } from '@material-ui/core';
import format from 'date-fns/format';

import { path } from 'routers/path';
import Empty from 'components/TableAdvance/Empty';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  service_type_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  service_type: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 76,
    borderRadius: 13,
    color: '#fff',
    padding: 0,
    fontSize: '13px',
    verticalAlign: 'middle',
  },
  booking_type: {
    backgroundColor: '#f1592a',
  },
  shopping_type: {
    backgroundColor: '#e882b5',
  },
  header: {
    padding: theme.spacing(5),
  },
  header_title: {
    fontWeight: 'bold',
  },
}));

function BookingService() {
  const classes = useStyles();
  return (
    <div className={classes.service_type_container}>
      <div className={`${classes.service_type} ${classes.booking_type}`}>
        <span>Đặt lịch</span>
      </div>
    </div>
  );
}

function ShoppingService() {
  const classes = useStyles();
  return (
    <div className={classes.service_type_container}>
      <div className={`${classes.service_type} ${classes.shopping_type}`}>
        <span>Mua hàng</span>
      </div>
    </div>
  );
}

function HistoryCell(props) {
  const { data, index, onClick } = props;
  const onShowDetail = () => {
    onClick(data);
  };
  return (
    <TableRow>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center" component="th" scope="row">
        {// eslint-disable-next-line no-restricted-globals
        data.date instanceof Date && !isNaN(data.date)
          ? format(data.date, 'HH:mm - dd/MM/yyyy')
          : ''}
      </TableCell>
      <TableCell align="center">
        {data.type === 'booking' ? <BookingService /> : <ShoppingService />}
      </TableCell>
      <TableCell align="center">{`#${data.id}`}</TableCell>
      <TableCell align="center">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link color="secondary" onClick={onShowDetail} component="button">
          Xem chi tiết
        </Link>
      </TableCell>
    </TableRow>
  );
}

HistoryCell.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  onClick: PropTypes.func,
};

function HistoryTable(props) {
  const classes = useStyles();

  const { data = [], onClick } = props;

  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container className={classes.header}>
        <Grid item xs>
          <Typography className={classes.header_title}>
            LỊCH SỬ TRÊN ISALON
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Typography>10 giao dịch gần đây nhất của bạn. </Typography>
          </Grid>
          <Grid item>
            <Link href={path.bookingHistory}>Xem thêm →</Link>
          </Grid>
        </Grid>
      </Grid>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Ngày giờ</TableCell>
            <TableCell align="center">Loại dịch vụ</TableCell>
            <TableCell align="center">Mã đơn hàng</TableCell>
            <TableCell align="center">Xem chi tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <HistoryCell
                key={item.id || index}
                data={item}
                index={index}
                onClick={onClick}
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
  onClick: PropTypes.func,
};

export default memo(HistoryTable);
