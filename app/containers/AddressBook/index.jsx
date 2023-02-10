/**
 *
 * AddressBook
 *
 */

import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isMobileOnly } from 'utils/platform';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';

import { path } from 'routers/path';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectMyAddresses } from './selectors';
import { getMyAddressesRequest, deleteMyAddressRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import Address from './views/Address';
import { CONTEXT } from './constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f3f3f4',
    padding: isMobileOnly ? 0 : theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_root: {
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    minHeight: 400,
    backgroundColor: '#fff',
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    marginBottom: theme.spacing(4),
  },
  add_address_button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '100%',
    borderStyle: 'dashed',
    padding: 0,
  },
  plus_sign: {
    fontSize: 50,
    fontWeight: 'normal',
    padding: 0,
    marginRight: theme.spacing(5),
    marginTop: -10,
  },
}));

function AddressBook(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const history = useHistory();

  const { myAddresses = [], getMyAddresses, deleteMyAddress } = props;

  useEffect(() => {
    getMyAddresses();
  }, []);

  const addNewAddress = () => {
    history.push(path.addressBookNew);
  };

  const onDeleteMyAddress = React.useCallback(addressId => {
    deleteMyAddress({ addressId });
  });

  const title = useMemo(() => 'Địa chỉ giao hàng', []);

  return (
    <BasePageView header={<Navigation title={title} border color="light" />}>
      <DocumentHead title={title} description={title} />
      <div className={classes.root}>
        <Paper
          variant={isMobileOnly ? 'elevation' : 'outlined'}
          className={classes.paper_root}
          elevation={isMobileOnly ? 0 : 1}
        >
          <Grid container direction="column">
            {!isMobileOnly && (
              <Grid item xs>
                <Typography variant="h5" className={classes.title_text}>
                  {title.toUpperCase()}
                </Typography>
                <Divider className={classes.divider} />
              </Grid>
            )}
            <Grid item xs>
              <Button
                className={classes.add_address_button}
                variant="outlined"
                color="primary"
                component="span"
                onClick={addNewAddress}
              >
                <span className={classes.plus_sign}>+</span>
                <Typography>Thêm địa chỉ</Typography>
              </Button>
            </Grid>
            {myAddresses.map((address, index) => (
              <Grid item xs key={address.addressId || index}>
                <Address data={address} onDelete={onDeleteMyAddress} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    </BasePageView>
  );
}

AddressBook.propTypes = {
  myAddresses: PropTypes.array,
  getMyAddresses: PropTypes.func,
  deleteMyAddress: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  myAddresses: makeSelectMyAddresses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getMyAddresses: () => dispatch(getMyAddressesRequest()),
    deleteMyAddress: payload => dispatch(deleteMyAddressRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddressBook);
