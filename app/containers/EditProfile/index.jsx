/**
 *
 * EditProfile
 *
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { get, set, unset, isEqual, isEmpty } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import validation from 'utils/validation';
import { isMobileOnly, isNative } from 'utils/platform';
import { resizeFileImage } from 'utils/images';

import ChangePhone from 'containers/ChangePhone';
import AddressPicker from 'containers/AddressPicker';
import BasePageView from 'components/BasePageView';
import Img from 'components/Img';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';

import {
  makeSelectProfile,
  makeSelectUpdateProfileErrors,
} from '../Personal/selectors';
import reducer from '../Personal/reducer';
import saga from '../Personal/saga';
import {
  getUserProfileRequest,
  updateProfileRequest,
  clearDataAction,
} from '../Personal/actions';
import { CONTEXT, UPDATE_PROFILE } from '../Personal/constants';

import InputDob from './views/InputDob';
import InputField from './views/InputField';
import SelectGender from './views/SelectGender';

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
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    minHeight: isMobileOnly ? '100%' : 400,
    backgroundColor: '#fff',
  },
  title: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
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
  avatar_group: {
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  changeButtonItem: {
    width: 100,
  },
  changeAvatarButton: {
    marginLeft: theme.spacing(2),
    color: '#417cbf',
    fontWeight: 'normal',
  },
  save_info_button: {
    color: '#fff',
    height: 50,
    width: 200,
    borderRadius: 25,
    margin: theme.spacing(8),
  },
  save_info_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'none',
  },
  messageContainer: {
    marginTop: theme.spacing(3),
  },
}));

function AvatarUpload(props) {
  const classes = useStyles();

  const [avatarData, setAvatarData] = useState();
  const { uri, onChange } = props;

  const handleSelectPhoto = ({ target }) => {
    const { files } = target;
    if (files && files.length > 0) {
      const file = files[0];
      resizeFileImage(file, blob => {
        let newFile = new File([blob], file.name, {
          type: blob.type,
          lastModified: new Date(),
        });
        if (isNative) {
          newFile = { blob, fileName: file.name };
        }
        setAvatarData(URL.createObjectURL(blob));
        onChange({
          target: {
            name: 'avatar',
            value: newFile,
          },
        });
      });
    }
  };

  return (
    <>
      <Img src={avatarData || uri} alt="avatar" className={classes.avatar} />
      <input
        color="primary"
        accept="image/png,image/jpeg"
        type="file"
        onChange={handleSelectPhoto}
        id="icon-button-file"
        className={classes.input}
      />
      <label htmlFor="icon-button-file">
        <Button component="span" className={classes.changeAvatarButton}>
          Thay đổi
        </Button>
      </label>
    </>
  );
}

AvatarUpload.propTypes = {
  uri: PropTypes.string,
  onChange: PropTypes.func,
};

function EditProfile(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading([UPDATE_PROFILE]);

  const {
    userProfile,
    getUserProfile,
    updateUserProfile,
    updateProfileErrors,
    cleanData,
  } = props;
  const [profileParams, setProfileParams] = useState({});
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [validate, setValidate] = useState({});

  const classes = useStyles();
  const title = useMemo(() => 'Chỉnh sửa thông tin cá nhân', []);
  const header = useMemo(
    () => <Navigation title={title} border color="light" />,
    [],
  );

  useEffect(() => {
    getUserProfile();
  }, []);

  const getProfileParams = useCallback(() => {
    if (isEmpty(userProfile.phone)) {
      return {};
    }
    const ret = {
      name: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email,
      dob: userProfile.birthday,
      gender: userProfile.gender === 'Nam' ? 1 : 0,
      addresses: userProfile.addresses,
    };
    if (ret.addresses && ret.addresses.length > 0) {
      ret.addresses.forEach(el => {
        unset(el, 'text');
      });
    }
    return ret;
  }, [userProfile]);

  const validateParams = params => {
    const option = [
      {
        type: 'empty',
        model: params,
        keys: ['name', 'email', 'dob', 'gender'],
        messages: [
          'Vui lòng nhập tên của bạn',
          'Vui lòng nhập email của bạn',
          'Vui lòng nhập ngày sinh của bạn',
          'Vui lòng chọn giới tính của bạn',
        ],
      },
      {
        type: 'email',
        model: params,
        keys: ['email'],
        messages: ['Địa chỉ email không đúng định dạng'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  useEffect(() => {
    if (
      !isEmpty(updateProfileErrors) &&
      get(updateProfileErrors, 'severity') === 'error'
    ) {
      const { email } = get(updateProfileErrors, 'errors', {});
      if (email && email.length > 0) {
        const emailValidation = {
          error: true,
          helperMessageText: email[0],
        };
        const v = { ...validate };
        set(v, 'email', emailValidation);
        setValidate(v);
      }
    }
  }, [updateProfileErrors]);

  useEffect(() => {
    const profileParamsOrigin = getProfileParams();
    const isEdited = !isEqual(profileParams, profileParamsOrigin);
    if (isEdited) {
      setProfileParams(profileParamsOrigin);
    }
    setAllowSubmit(false);
  }, [userProfile]);

  useEffect(() => {
    if (!isEmpty(profileParams)) {
      const checkValidate = checkValidParams();
      const profileParamsOrigin = getProfileParams();
      const isEdited = !isEqual(profileParams, profileParamsOrigin);
      setAllowSubmit(checkValidate && isEdited);
    }
  }, [profileParams]);

  const checkValidParams = useCallback(() => {
    if (!validateParams(profileParams)) return false;
    const address = get(profileParams, 'addresses');
    if (!address || address.length === 0) return false;
    const addr = address[0];
    const lv3 = get(addr, 'lv3', -1);
    if (lv3 <= 0) return false;
    if (isEmpty(addr.address)) return false;
    return true;
  }, [profileParams]);

  const extractAddress = useMemo(() => {
    const addresses = get(userProfile, 'addresses', []);
    const addr = addresses.length > 0 ? addresses[0] : {};
    return addr;
  }, [userProfile]);

  const handleInputChange = useCallback(event => {
    const { target } = event;
    const { value, name } = target;
    setProfileParams(prev => {
      set(prev, name, value);
      return { ...prev };
    });
    cleanData();
  }, []);

  const onSaveProfile = useCallback(() => {
    if (!checkValidParams()) return;
    const form = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const name in profileParams) {
      if (profileParams[name] !== undefined) {
        if (name === 'addresses') {
          const addresses = profileParams[name];
          addresses.every((item, index) => {
            form.append(`addresses[${index}][address]`, item.address);
            form.append(`addresses[${index}][lv1]`, item.lv1);
            form.append(`addresses[${index}][lv2]`, item.lv2);
            form.append(`addresses[${index}][lv3]`, item.lv3);
            return item;
          });
        } else if (name === 'avatar') {
          if (profileParams.avatar) {
            if (isNative) {
              form.append(
                'avatar',
                profileParams.avatar.blob,
                profileParams.avatar.fileName,
              );
            } else {
              form.append('avatar', profileParams.avatar);
            }
          }
        } else {
          form.append(name, profileParams[name]);
        }
      }
    }
    updateUserProfile(form);
  }, [profileParams]);

  return (
    <BasePageView header={header}>
      <DocumentHead title={title} description={title} />
      <div className={classes.root}>
        <Paper className={classes.paper_root} elevation={0}>
          <Grid container>
            {!isMobileOnly && (
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.title_text}>
                  {title}
                </Typography>
                <Divider className={classes.divider} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container className={classes.avatar_group}>
                <Grid item xs={12}>
                  <Typography className={classes.title_text}>
                    Ảnh đại diện
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <AvatarUpload
                    uri={get(userProfile, 'avatar.uri')}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title_text}>
                Thông tin cá nhân
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <InputField
                    title="Họ tên*"
                    defaultValue={profileParams.name}
                    onChange={handleInputChange}
                    name="name"
                    error={validate.name && validate.name.error}
                    helperText={
                      validate.name && validate.name.helperMessageText
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputDob
                    dob={profileParams.dob}
                    onChange={handleInputChange}
                    error={validate.dob && validate.dob.error}
                    errorMessage={
                      validate.dob && validate.dob.helperMessageText
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="flex-start"
                    wrap="nowrap"
                  >
                    <Grid item>
                      <InputField
                        title="SĐT*"
                        defaultValue={profileParams.phone}
                        onChange={handleInputChange}
                        name="phone"
                        editable={false}
                      />
                    </Grid>
                    <Grid item>
                      <ChangePhone />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    title="Email*"
                    defaultValue={profileParams.email}
                    onChange={handleInputChange}
                    name="email"
                    error={validate.email && validate.email.error}
                    helperText={
                      validate.email && validate.email.helperMessageText
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectGender
                    defaultValue={userProfile.gender}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title_text}>
                Thông tin địa chỉ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AddressPicker
                currentValue={extractAddress}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              {get(updateProfileErrors, 'severity') === 'success' && (
                <Alert severity="success" className={classes.messageContainer}>
                  {get(updateProfileErrors, 'message', '')}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <div className={classes.save_info_container}>
                <Button
                  className={classes.save_info_button}
                  variant="contained"
                  color="primary"
                  onClick={onSaveProfile}
                  disabled={!allowSubmit}
                >
                  LƯU THÔNG TIN
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </BasePageView>
  );
}

EditProfile.propTypes = {
  userProfile: PropTypes.object,
  getUserProfile: PropTypes.func,
  updateUserProfile: PropTypes.func,
  updateProfileErrors: PropTypes.object,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectProfile(),
  updateProfileErrors: makeSelectUpdateProfileErrors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserProfile: () => dispatch(getUserProfileRequest()),
    updateUserProfile: params => dispatch(updateProfileRequest(params)),
    cleanData: () => dispatch(clearDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditProfile);
