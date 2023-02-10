import React, { memo, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { toDate } from 'date-fns-tz';
import format from 'date-fns/format';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

import Link from 'components/Link';
import Empty from 'components/TableAdvance/Empty';

import { currencyFormat, convertToSlug } from 'utils/stringFormat';
import { shoppingStatus } from 'utils/enums';
import { path, createPath } from 'routers/path';

import Img from 'components/Img';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  serviceTypeText: {
    fontSize: '13px',
    textAlign: 'center',
  },
  serviceTypeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 120,
    borderRadius: 13,
    verticalAlign: 'middle',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(5),
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  normalText: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detailText: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  boldText: {
    fontWeight: 'bold',
  },
  priceText: {
    color: theme.palette.primary.main,
    textAlign: 'left',
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(3),
  },
  thumbnail: {
    width: 90,
    height: 120,
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.shape.borderRadius,
  },
  productItem: {
    maxWidth: 350,
  },
  priceCellLabel: {
    width: 100,
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
    fontSize: 16,
  },
  idCellLabel: {
    width: 70,
  },
  dateCellLabel: {
    width: 85,
  },
}));

function OrderStatus(props) {
  const classes = useStyles();
  const { status } = props;

  const orderStatus = shoppingStatus.orderStatus(status);

  const style = makeStyles(() => ({
    additional: {
      backgroundColor: orderStatus.background,
      color: orderStatus.color,
    },
  }))();
  return (
    <div className={`${classes.serviceTypeContainer} ${style.additional}`}>
      <Typography className={classes.serviceTypeText}>
        {orderStatus.text}
      </Typography>
    </div>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.string,
};

function ProductItem(props) {
  const classes = useStyles();

  const { data } = props;
  const { product = {}, productVariant = {}, pricePerProduct, quantity } = data;

  const image = get(product, 'mainImage')
    ? get(product, 'mainImage')
    : get(productVariant, 'mainImage');

  const imageUrl = get(image, 'imageLocation');

  const link = createPath(path.productDetail, {
    productId: `${product.productId}`,
    productName: convertToSlug(product.name),
  });

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignItems="center"
      className={classes.productItem}
      wrap="nowrap"
    >
      <Grid item>
        <Link to={link}>
          <Img
            src={imageUrl}
            alt="Product thumbnail"
            className={classes.thumbnail}
            resizeMode="contain"
          />
        </Link>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Link to={link}>
              <Typography
                className={`${classes.normalText} ${classes.boldText}`}
              >
                {product.name}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.detailText}>
              {get(product, 'brand.name', '')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.priceText}>
              {currencyFormat(pricePerProduct)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.detailText}>
              {`x ${quantity}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object,
};

function HistoryCell(props) {
  const { data, onShowDetail } = props;
  const items = get(data, 'items', []);
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const showDetail = useCallback(() => {
    if (onShowDetail) {
      onShowDetail(data);
    }
  }, []);

  const handleCollapse = useCallback(() => setExpanded(!expanded), [expanded]);

  const createdAt = useMemo(() => {
    if (data.createdAt) {
      const d = toDate(data.createdAt, { timeZone: 'UTC' });
      return format(d, 'HH:mm:ss dd/MM/yyyy', new Date());
    }
    return '';
  }, [data]);

  return (
    <TableRow>
      <TableCell align="center">
        <Button
          color="secondary"
          onClick={showDetail}
          className={classes.idCellLabel}
        >
          {`#${data.orderId}`}
        </Button>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.dateCellLabel}>{createdAt}</Typography>
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        <Grid container direction="column">
          <Collapse in={expanded} timeout="auto" collapsedHeight={120}>
            <Grid item container direction="column" spacing={2}>
              {items.map((item, index) => (
                <Grid item key={item.orderId || index}>
                  <ProductItem data={item} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
          <Grid item className={classes.detail}>
            <Button color="secondary" onClick={showDetail}>
              Chi tiết
            </Button>
            {items.length > 1 && (
              <IconButton size="small" onClick={handleCollapse}>
                {expanded ? (
                  <KeyboardArrowUpRoundedIcon />
                ) : (
                  <KeyboardArrowDownRoundedIcon />
                )}
              </IconButton>
            )}
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="right">
        <Typography className={classes.priceCellLabel}>
          {currencyFormat(data.total)}
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
  onShowDetail: PropTypes.func,
};

function HistoryTable(props) {
  const classes = useStyles();

  const { data = [], onShowDetail } = props;

  return (
    <Paper variant="outlined" className={classes.root}>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Ngày đặt</TableCell>
            <TableCell align="center" component="th" scope="row">
              Sản phẩm
            </TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <HistoryCell
                data={item}
                key={item.id || index}
                onShowDetail={onShowDetail}
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
};

export default memo(HistoryTable);
