import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';

import { useAuthentication } from 'utils/hooks';

import CommentItem from './CommentItem';
import ReplyCommentItem from './ReplyCommentItem';

function Comments(props) {
  const {
    data,
    onChangePage,
    onLikeOrUnlikeReview,
    onLikeOrUnlikeReviewReply,
  } = props;
  const content = get(data, 'content', []);
  const pageCount = get(data, 'totalPages', 1);

  const { authenticated, showSignInDialog } = useAuthentication();

  return (
    <div>
      {content.map((item, index) => (
        <div key={item.id || index}>
          <CommentItem
            data={item}
            onLikeOrUnlikeReview={onLikeOrUnlikeReview}
            authenticated={authenticated}
            showSignInDialog={showSignInDialog}
          />
          {item.productReviewMessage && (
            <ReplyCommentItem
              data={item.productReviewMessage}
              onLikeOrUnlikeReviewReply={onLikeOrUnlikeReviewReply}
              authenticated={authenticated}
              showSignInDialog={showSignInDialog}
            />
          )}
        </div>
      ))}
      <Grid container justify="flex-end">
        <Grid item>
          <Pagination
            count={pageCount}
            color="primary"
            onChange={onChangePage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Comments.propTypes = {
  data: PropTypes.object,
  onChangePage: PropTypes.func,
  onLikeOrUnlikeReview: PropTypes.func,
  onLikeOrUnlikeReviewReply: PropTypes.func,
};

export default memo(Comments);
