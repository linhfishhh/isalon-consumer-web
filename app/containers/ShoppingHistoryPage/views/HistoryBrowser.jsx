import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import get from 'lodash/get';
import DateFnsUtils from '@date-io/date-fns';

import Autocomplete from 'components/Autocomplete';
import HistoryTable from './HistoryTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f3f3f4',
    padding: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_root: {
    minHeight: 400,
    backgroundColor: '#fff',
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
  },
  status: {
    marginTop: theme.spacing(2),
  },
  btnSearch: {
    marginTop: theme.spacing(2),
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  view_more: {
    width: '100%',
    height: 40,
    fontWeight: 'normal',
  },
}));

function HistoryBrowser(props) {
  const {
    transactionTypes,
    shoppingHistory,
    onShowShoppingHistoryDetail,
    currentTransactionType,
    setCurrentTransactionType,
    onLoadMore,
    onSearch,
  } = props;

  const classes = useStyles();

  const getCurrentTransactionType = () =>
    transactionTypes.find(el => el.key === currentTransactionType.key);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <Paper elevation={0} className={classes.paper_root}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs>
              <Typography variant="h5" className={classes.title_text}>
                LỊCH SỬ MUA HÀNG
              </Typography>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs>
              <Grid container spacing={5}>
                <Grid item xs />
                <Grid item xs={3}>
                  <Autocomplete
                    placeholder=""
                    options={transactionTypes}
                    onChange={setCurrentTransactionType}
                    value={getCurrentTransactionType()}
                    getOptionLabel={option => option.name}
                    className={classes.status}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSearch}
                    className={classes.btnSearch}
                    disableElevation
                  >
                    TÌM KIẾM
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <HistoryTable
                data={get(shoppingHistory, 'content')}
                onShowDetail={onShowShoppingHistoryDetail}
              />
            </Grid>
            {!get(shoppingHistory, 'isLast', true) ? (
              <Grid item xs>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.view_more}
                  startIcon={<ArrowDropDownIcon />}
                  onClick={onLoadMore}
                  disableElevation
                >
                  Tải thêm
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
}

HistoryBrowser.propTypes = {
  transactionTypes: PropTypes.array,
  shoppingHistory: PropTypes.object,
  onShowShoppingHistoryDetail: PropTypes.func,
  currentTransactionType: PropTypes.any,
  setCurrentTransactionType: PropTypes.func,
  onLoadMore: PropTypes.func,
  onSearch: PropTypes.func,
};

export default memo(HistoryBrowser);
