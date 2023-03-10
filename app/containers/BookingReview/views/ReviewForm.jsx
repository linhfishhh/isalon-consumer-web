/**
 *
 * WriteReview
 *
 */
import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

import validation from 'utils/validation';

import DrawerView from 'components/DrawerView';
import EmptyPage from 'components/EmptyPage';
import ImagesUpload from 'components/ImagesUpload';

import Badges from './Badges';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: isMobileOnly ? '100%' : theme.breakpoints.values.sm,
    padding: isMobileOnly ? theme.spacing(0, 2) : theme.spacing(10),
  },
  from: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1),
  },
  section: {
    padding: isMobileOnly ? theme.spacing(3) : theme.spacing(3, 5),
  },
  rate: { marginRight: theme.spacing(2) },
  textField: {},
  button: {
    borderRadius: theme.spacing(4.5),
  },
  label: {
    marginBottom: theme.spacing(1),
  },
}));

const dataEmpty = { title: '', content: '', crit: [] };

function ReviewForm(props) {
  const {
    open,
    onClose,
    serviceToReview,
    crit,
    badges,
    onSendReview,
    onGetCrit,
  } = props;

  const classes = useStyle();
  const [review, setReview] = useState(dataEmpty);
  const [orderSelect, setOrderSelect] = useState({});
  const [validate, setValidate] = useState({});
  const [openBadgeDialog, setOpenBadgeDialog] = useState(false);
  const wrapper = useRef(null);

  const validateField = useCallback(() => {
    const option = [
      {
        type: 'empty',
        model: review,
        keys: ['title', 'content'],
        messages: [
          'Vui l??ng nh???p ti??u ????? nh???p x??t!',
          'Vui l??ng nh???p n???i dung nh???n x??t!',
        ],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  }, [review]);

  const setReviewDataDefault = () => {
    if (crit.length > 0) {
      dataEmpty.crit = crit.map(item => ({
        id: item.id,
        rating: 3,
        name: item.name,
      }));
      setReview({ ...dataEmpty });
    }
  };

  useEffect(() => {
    if (!open) {
      setOrderSelect({});
      setValidate({});
      setReviewDataDefault();
    }
  }, [open]);

  useEffect(() => {
    setReviewDataDefault();
  }, [crit]);

  useEffect(() => {
    if (!isEmpty(orderSelect) && isEmpty(crit) && isEmpty(badges)) {
      onGetCrit({
        id: orderSelect.orderID,
        service_id: orderSelect.serviceID,
      });
    }
  }, [orderSelect]);

  const onChangeValue = (name, index) => (event, newValue) => {
    const dateField = review;
    switch (name) {
      case 'crit':
        dateField[name][index].rating = newValue;
        break;
      case 'images':
        dateField[name] = event;
        break;
      default:
        dateField[name] = event.target.value;
        break;
    }
    setReview({ ...dateField });
  };

  const handleSendReview = () => {
    const noValidate = validateField();
    if (noValidate) {
      setOpenBadgeDialog(true);
    }
  };

  const handleSelectBadge = badge => {
    if (badge) {
      set(review, 'badge', badge);
    }
    setOpenBadgeDialog(false);
    onSendReview({ ...orderSelect, ...review });
  };

  return (
    <DrawerView
      open={open}
      onClose={onClose}
      title={
        isEmpty(orderSelect) ? 'Ch???n d???ch v??? nh???n x??t' : 'Vi???t b??i ????nh gi??'
      }
    >
      <Grid container className={classes.wrapper} ref={wrapper}>
        {isEmpty(orderSelect) ? (
          <Grid item xs className={classes.from}>
            <Grid container direction="column">
              {!isMobileOnly && (
                <>
                  <Grid item xs className={classes.section}>
                    <Typography variant="h3">Ch???n d???ch v??? nh???n x??t</Typography>
                  </Grid>
                  <Grid item xs>
                    <Divider />
                  </Grid>
                </>
              )}
              <Grid item xs>
                {isEmpty(serviceToReview) ? (
                  <EmptyPage
                    title="Kh??ng c?? d???ch v???"
                    subTitle="B???n ch??a c?? ????n ?????t ch??? n??o ho??n th??nh c?? nh???ng d???ch v??? c?? th??? vi???t nh???n x??t ????nh gi??"
                  />
                ) : (
                  <List>
                    {serviceToReview.map((item, index) => (
                      <React.Fragment key={shortid.generate()}>
                        <ListItem button onClick={() => setOrderSelect(item)}>
                          <ListItemText
                            disableTypography
                            primary={
                              <Typography color="primary" variant="h5">
                                ????n ?????t ch??? #{item.orderID}
                              </Typography>
                            }
                            secondary={
                              <Grid container justify="space-between">
                                <Typography>{item.serviceName}</Typography>
                                <Typography>{item.dateTime}</Typography>
                              </Grid>
                            }
                          />
                        </ListItem>
                        {index < serviceToReview.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs className={classes.from}>
            <Grid container direction="column">
              {!isMobileOnly && (
                <>
                  <Grid item xs className={classes.section}>
                    <Typography variant="h3">Vi???t b??i ????nh gi??</Typography>
                  </Grid>
                  <Grid item xs>
                    <Divider />
                  </Grid>
                </>
              )}
              <Grid item xs className={classes.section}>
                <Typography>X???p h???ng</Typography>
                {!isEmpty(review.crit) &&
                  review.crit.map((item, index) => (
                    <Grid container key={item.id || index} alignItems="center">
                      <Rating
                        className={classes.rate}
                        name={`rating_${index}`}
                        value={review.crit[index].rating}
                        size="large"
                        onChange={onChangeValue('crit', index)}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                      {item.name}
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs className={classes.section}>
                <Typography>Nh???n x??t c???a b???n</Typography>
                <TextField
                  fullWidth
                  placeholder="Nh???p ti??u ????? ????nh gi?? t???i ????y"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  onChange={onChangeValue('title')}
                  value={review.title}
                  inputProps={{
                    maxLength: '256',
                  }}
                  error={validate.title && validate.title.error}
                  helperText={
                    validate.title && validate.title.helperMessageText
                  }
                />
                <TextField
                  fullWidth
                  placeholder="Nh???p m?? t??? t???i ????y"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  multiline
                  rows="5"
                  onChange={onChangeValue('content')}
                  value={review.content}
                  inputProps={{
                    maxLength: '512',
                  }}
                  error={validate.content && validate.content.error}
                  helperText={
                    validate.content && validate.content.helperMessageText
                  }
                />
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs className={classes.section}>
                <Typography variant="h6" className={classes.label}>
                  H??nh ???nh
                </Typography>
                <ImagesUpload
                  multiple
                  limit={3}
                  onChangeImage={onChangeValue('images')}
                />
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item className={classes.section} container justify="center">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSendReview}
                >
                  G???I ????NH GI??
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Badges
        open={openBadgeDialog}
        onClose={handleSelectBadge}
        badges={badges}
        onSelect={handleSelectBadge}
        anchorEl={wrapper.current && wrapper.current.parentNode}
      />
    </DrawerView>
  );
}

ReviewForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  serviceToReview: PropTypes.array,
  crit: PropTypes.array,
  badges: PropTypes.array,
  onSendReview: PropTypes.func,
  onGetCrit: PropTypes.func,
};

export default memo(ReviewForm);
