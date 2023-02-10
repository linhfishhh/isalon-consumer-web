/**
 *
 * WriteReview
 *
 */
import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';

import { isAuthenticated } from 'utils/auth';
import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';

import DrawerView from 'components/DrawerView';
import ImagesUpload from 'components/ImagesUpload';
import { showDialogAction } from 'containers/Authentication/actions';

import { CONTEXT } from '../constants';
import { sendCommentRequest } from '../actions';
import saga from '../saga';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: isMobileOnly ? 'auto' : theme.breakpoints.values.sm,
    padding: isMobileOnly ? 0 : theme.spacing(10),
  },
  from: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius,
  },
  section: {
    padding: `${theme.spacing(3)}px ${theme.spacing(5)}px `,
  },
  rate: {
    marginTop: theme.spacing(2),
  },
  textField: {},
  button: {},
  label: {
    marginBottom: theme.spacing(1),
  },
  gradientButton: {
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      '#f7931e',
    )}, 1) 0%, rgba(${theme.hexToRgb('#f15a24')}, 1) 100%)`,
  },
}));

const dataEmpty = { title: '', comment: '' };

function WriteProductComment(props) {
  useInjectSaga({ key: CONTEXT, saga });
  const classes = useStyle();
  const [review, setReview] = useState(dataEmpty);
  const [validate, setValidate] = useState({});
  const wrapper = useRef(null);

  const { dispatch, product, sendComment } = props;
  const [open, setOpen] = useState(false);
  const title = 'Viết nhận xét';

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: review,
        keys: ['title', 'comment'],
        messages: [
          'Vui lòng nhập tiêu đề nhập xét!',
          'Vui lòng nhập nội dung nhận xét!',
        ],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const onChangeValue = name => (event, newValue) => {
    const dateField = review;
    switch (name) {
      case 'rate':
        dateField[name] = newValue;
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
      sendComment({ productId: product.productId, ...review });
      setOpen(false);
    }
  };

  const onWriteCommentClick = () => {
    if (isAuthenticated()) {
      if (product && product.isReviewable) {
        setOpen(true);
      } else {
        // setAlertDialog(true);
      }
    } else {
      dispatch(showDialogAction(true));
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        startIcon={<EditIcon />}
        className={classes.gradientButton}
        disableElevation
        onClick={onWriteCommentClick}
      >
        {title}
      </Button>
      <DrawerView open={open} onClose={onClose} title={title}>
        <Grid container className={classes.wrapper} ref={wrapper}>
          <Grid item xs className={classes.from}>
            <Grid container direction="column">
              {!isMobileOnly && (
                <>
                  <Grid item xs className={classes.section}>
                    <Typography variant="h3">{title}</Typography>
                  </Grid>
                  <Grid item xs>
                    <Divider />
                  </Grid>
                </>
              )}
              <Grid item xs className={classes.section}>
                <Typography>Xếp hạng</Typography>
                <Rating
                  className={classes.rate}
                  name="rate"
                  value={get(review, 'rate', 0)}
                  size="large"
                  onChange={onChangeValue('rate')}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs className={classes.section}>
                <Typography>Nhận xét của bạn</Typography>
                <TextField
                  fullWidth
                  placeholder="Nhập tiêu đề đánh giá tại đây"
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
                  placeholder="Nhập mô tả tại đây"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  multiline
                  rows="5"
                  onChange={onChangeValue('comment')}
                  value={review.comment}
                  inputProps={{
                    maxLength: '512',
                  }}
                  error={validate.comment && validate.comment.error}
                  helperText={
                    validate.comment && validate.comment.helperMessageText
                  }
                />
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs className={classes.section}>
                <Typography variant="h6" className={classes.label}>
                  Hình ảnh
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
                  disableElevation
                >
                  Gửi đánh giá
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DrawerView>
    </div>
  );
}

WriteProductComment.propTypes = {
  dispatch: PropTypes.func,
  product: PropTypes.object,
  sendComment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendComment: params => dispatch(sendCommentRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WriteProductComment);
