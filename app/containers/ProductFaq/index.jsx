import React, { memo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import globalStyles from 'assets/styles';
import get from 'lodash/get';

import { makeSelectAuthenticated } from 'containers/Authentication/selectors';
import { showDialogAction } from 'containers/Authentication/actions';
import authReducer from 'containers/Authentication/reducer';
import { CONTEXT as AUTH_CONTEXT } from 'containers/Authentication/constants';

import NoFaqIcon from 'assets/svgIcon/NoFaqIcon';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import useStyles from './styles';
import { CONTEXT } from './constants';
import { getFaqRequest, addFaqRequest } from './actions';
import { makeSelectProductFaq } from './selectors';
import WriteFaq from './views/WriteFaq';
import FaqItem from './views/FAQItem';

const writeFaqStatusMessages = [
  {
    severity: 'success',
    message:
      'Cám ơn bạn đã đặt câu hỏi về sản phẩm, chúng tôi sẽ trả lời bạn trong thời gian sớm nhất!',
  },
  {
    severity: 'error',
    message: 'Đã có lỗi xảy ra khi gửi câu hỏi, vui lòng thử lại sau!',
  },
];

function ProductFaq(props) {
  useInjectReducer({ key: AUTH_CONTEXT, reducer: authReducer });
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalClasses = globalStyles();
  const [writeFaqStatus, setWriteFaqStatus] = useState();

  const {
    data,
    getFaqs,
    addFaq,
    faqs,
    authenticated,
    showSigninDialog,
  } = props;
  const productId = get(data, 'productId');
  useEffect(() => {
    if (productId) {
      getFaqs({ productId, page: 0, limit: 5 });
    }
    setWriteFaqStatus(undefined);
  }, [productId]);

  const onChangePage = useCallback(
    (evt, page) => {
      if (productId) {
        getFaqs({ productId, page: page - 1, limit: 5 });
      }
    },
    [productId],
  );

  const onHandleAddFaq = useCallback(
    question => {
      if (productId) {
        addFaq({
          productId,
          question,
          success: () => {
            setWriteFaqStatus(writeFaqStatusMessages[0]);
          },
          fail: () => {
            setWriteFaqStatus(writeFaqStatusMessages[1]);
          },
        });
      }
    },
    [productId],
  );

  const numberOfFaqs = get(faqs, 'numberOfElements', 0);
  const content = get(faqs, 'content', []);
  const pageCount = get(faqs, 'totalPages', 1);
  return (
    <div className={`${classes.root} ${classes.padding_4}`}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography className={globalClasses.groupTitle}>
            Câu hỏi về sản phẩm này
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={globalClasses.detailText}>
            {numberOfFaqs > 0
              ? `Đã có ${numberOfFaqs} câu hỏi cho sản phẩm này`
              : 'Chưa có câu hỏi nào'}
          </Typography>
        </Grid>
        <Grid item>
          <WriteFaq
            onAddFaq={onHandleAddFaq}
            authenticated={authenticated}
            loginAction={showSigninDialog}
          />
        </Grid>
        {writeFaqStatus && (
          <Grid item>
            <Grid container justify="center">
              <Grid item xs className={classes.writeFaqMessage}>
                <Alert severity={writeFaqStatus.severity}>
                  {writeFaqStatus.message}
                </Alert>
              </Grid>
            </Grid>
          </Grid>
        )}
        {numberOfFaqs <= 0 && (
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.noFaqContainer}
            >
              <Grid item>
                <NoFaqIcon />
              </Grid>
              <Grid item>
                <Typography className={globalClasses.detailText}>
                  Chưa có câu hỏi cho sản phẩm này.
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={globalClasses.detailText}>
                  Đặt câu hỏi cho nhà bán hàng và câu trả lời sẽ được hiển thị
                  tại đây
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <Divider />
        </Grid>
        {content.map((item, index) => (
          <Grid item key={item.questionAnswerId || index} xs={12}>
            <FaqItem data={item} />
          </Grid>
        ))}
      </Grid>
      {content && content.length > 0 && (
        <Grid container justify="flex-end">
          <Grid item>
            <Pagination
              count={pageCount}
              color="primary"
              onChange={onChangePage}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

ProductFaq.propTypes = {
  data: PropTypes.object,
  getFaqs: PropTypes.func,
  addFaq: PropTypes.func,
  authenticated: PropTypes.bool,
  showSigninDialog: PropTypes.func,
  faqs: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  faqs: makeSelectProductFaq(),
  authenticated: makeSelectAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSigninDialog: () => dispatch(showDialogAction(true)),
    getFaqs: params => dispatch(getFaqRequest(params)),
    addFaq: params => dispatch(addFaqRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductFaq);
