/**
 *
 * UserLocation
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import Popover from 'components/Popover';
import Autocomplete from 'components/Autocomplete';
import { refreshLocationAction } from 'containers/GlobalState/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCurrentLocation } from 'utils/hooks';
import {
  getCurrentPosition,
  getAddress,
  autoFetchLocation,
} from 'utils/localStorage/location';
import { unitToAddress } from 'utils/searchHelper';

import { CONTEXT } from './constants';
import { makeSelectDistricts, makeSelectWards } from './selectors';
import {
  getAllUnitsRequest,
  getDistrictListRequest,
  getWardListRequest,
  changeLocationAction,
} from './actions';

import reducer from './reducer';
import saga from './saga';

const useStyle = makeStyles(theme => ({
  locationWrapper: {
    height: 104,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.textColor[2],
    fontSize: 12,
    marginLeft: theme.spacing(2),
  },
  currentLocation: {
    maxWidth: 250,
    color: theme.palette.textColor[1],
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  arrow: {
    height: '0',
    width: '0',
    border: '5px solid transparent',
    borderTopColor: theme.palette.textColor[2],
    marginLeft: theme.spacing(2),
    top: '50%',
  },
  popoverWrapper: {
    width: 320,
  },
  label: {
    fontSize: 15,
    color: theme.palette.textColor[1],
  },
  location: {
    fontSize: 12,
  },
  currentLocationWrapper: {
    padding: 15,
    color: theme.palette.textColor[2],
    backgroundColor: theme.palette.backgroundColor[7],
  },
  selectLocationWrapper: {
    padding: 15,
  },
  locationStatus: {
    padding: theme.spacing(1.5),
  },
}));

export function UserLocation(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyle();
  const {
    getAllUnits,
    getDistricts,
    districts,
    getWards,
    wards,
    changeLocation,
    className = classes.locationWrapper,
    refreshLocation,
  } = props;

  const { provinces, currentLocation } = useCurrentLocation();
  const { position, address, isCustom, error } = currentLocation;

  const [showPopover, setShowPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const [currentProvince, setCurrentProvince] = useState();
  const [currentDistrict, setCurrentDistrict] = useState();
  const [currentWard, setCurrentWard] = useState();

  const handleShowPopover = event => {
    setAnchorEl(event.currentTarget.parentNode);
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setAnchorEl();
    setShowPopover(false);
  };

  useEffect(() => {
    updateCurrentLocation();
  }, [position]);

  const updateCurrentLocation = () => {
    const { province, district, ward } = getCurrentPosition();
    setCurrentProvince(province);
    setCurrentDistrict(district);
    setCurrentWard(ward);
    getAllUnits({ province, district });
  };

  const didSelectProvince = (event, newProvince) => {
    if (newProvince) {
      getDistricts(newProvince.provinceId);
      const currentProvinceId = get(currentProvince, 'provinceId', -1);
      if (currentProvinceId !== newProvince.provinceId) {
        setCurrentProvince(newProvince);
        setCurrentDistrict();
        setCurrentWard();
      }
    } else {
      setCurrentProvince();
      setCurrentDistrict();
      setCurrentWard();
    }
  };

  const didSelectDistrict = (event, newDistrict) => {
    if (newDistrict) {
      getWards(newDistrict.districtId);
      const currentDistrictId = get(currentDistrict, 'districtId', -1);
      if (currentDistrictId !== newDistrict.districtId) {
        setCurrentDistrict(newDistrict);
        setCurrentWard();
      }
    } else {
      setCurrentDistrict();
      setCurrentWard();
    }
  };

  const didSelectWard = (event, newWard) => {
    if (newWard) {
      setCurrentWard(newWard);
    } else {
      setCurrentWard();
    }
  };

  const handleChangeLocation = () => {
    if (!isEmpty(currentProvince)) {
      changeLocation({
        province: currentProvince,
        district: currentDistrict,
        ward: currentWard,
      });
      setShowPopover(false);
    }
  };

  const newAddress = () => {
    const location = unitToAddress(
      currentProvince,
      currentDistrict,
      currentWard,
    );
    if (isEmpty(location)) {
      return getAddress();
    }
    return location;
  };

  const handleAutoGetPosition = () => {
    if (isCustom) {
      autoFetchLocation();
      refreshLocation();
    }
  };

  return (
    <>
      <div className={className}>
        <LocationIcon color="primary" />
        <Typography
          className={classes.currentLocation}
          onClick={handleShowPopover}
          display="inline"
        >
          {address}
        </Typography>
        <IconButton size="small" onClick={handleShowPopover}>
          {showPopover ? (
            <ArrowDropUpIcon fontSize="small" />
          ) : (
            <ArrowDropDownIcon fontSize="small" />
          )}
        </IconButton>
      </div>
      <Popover
        open={showPopover}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        align="right"
      >
        <Grid container className={classes.popoverWrapper}>
          <Grid item xs={12} className={classes.currentLocationWrapper}>
            <Grid item container alignItems="center" justify="space-between">
              <Typography className={classes.label} display="inline">
                Khu vực bạn chọn hiện tại
              </Typography>
              <Grid item>
                <Tooltip title={isCustom ? 'Lấy vị trí tự động' : ''} arrow>
                  <IconButton
                    className={classes.locationStatus}
                    onClick={handleAutoGetPosition}
                    disabled={!isCustom}
                  >
                    {isCustom ? (
                      <LocationDisabledIcon fontSize="small" />
                    ) : (
                      <LocationSearchingIcon fontSize="small" color="primary" />
                    )}
                  </IconButton>
                </Tooltip>
                {error && (
                  <Tooltip title={error} arrow>
                    <ErrorOutlineIcon fontSize="small" />
                  </Tooltip>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <LocationIcon color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography display="inline" className={classes.location}>
                  {newAddress()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.selectLocationWrapper}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography className={classes.label}>
                  Khu vực của bạn
                </Typography>
              </Grid>
              <Grid item>
                <Autocomplete
                  placeholder="Chọn tỉnh/thành phố"
                  options={provinces}
                  getOptionLabel={option => option.name}
                  onChange={didSelectProvince}
                  value={currentProvince || null}
                  getOptionSelected={(option, value) =>
                    option.provinceId === value.provinceId
                  }
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  placeholder="Chọn quận/huyện"
                  options={currentProvince ? districts : []}
                  getOptionLabel={option => option.name}
                  onChange={didSelectDistrict}
                  value={currentDistrict || null}
                  getOptionSelected={(option, value) =>
                    option.districtId === value.districtId
                  }
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  placeholder="Chọn phường/xã"
                  options={currentDistrict ? wards : []}
                  getOptionLabel={option => option.name}
                  onChange={didSelectWard}
                  value={currentWard || null}
                  getOptionSelected={(option, value) =>
                    option.wardId === value.wardId
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleChangeLocation}
                  disabled={isEmpty(currentProvince)}
                  color="primary"
                >
                  Chọn để định vị
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

UserLocation.propTypes = {
  getAllUnits: PropTypes.func,
  districts: PropTypes.array,
  getDistricts: PropTypes.func,
  wards: PropTypes.array,
  getWards: PropTypes.func,
  changeLocation: PropTypes.func,
  className: PropTypes.string,
  refreshLocation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  districts: makeSelectDistricts(),
  wards: makeSelectWards(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllUnits: payload => dispatch(getAllUnitsRequest(payload)),
    getDistricts: id => dispatch(getDistrictListRequest(id)),
    getWards: id => dispatch(getWardListRequest(id)),
    changeLocation: payload => dispatch(changeLocationAction(payload)),
    refreshLocation: () => dispatch(refreshLocationAction()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserLocation);
