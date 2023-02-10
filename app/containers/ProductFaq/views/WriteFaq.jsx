import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, Link } from '@material-ui/core';
import { isAuthenticated } from 'utils/auth';
import get from 'lodash/get';
import useStyles from '../styles';

function WriteFaq(props) {
  const classes = useStyles();
  const authenticated = isAuthenticated() || get(props, 'authenticated', false);
  const { loginAction, onAddFaq } = props;
  const onLogin = () => {
    if (loginAction) {
      loginAction();
    }
  };
  const [question, setQuestion] = useState();
  const onQuestionChange = event => {
    const q = get(event, 'target.value');
    setQuestion(q);
  };

  const onAsk = () => {
    if (onAddFaq && question && question.length > 0) {
      onAddFaq(question);
      setQuestion('');
    }
  };
  return (
    <div>
      {authenticated ? (
        <Grid container justify="center">
          <Grid item xs className={classes.writeFaqContainer}>
            <Grid container alignItems="center">
              <Grid item xs>
                <TextField
                  value={question}
                  margin="dense"
                  placeholder="Viết câu hỏi của bạn tại đây"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={onQuestionChange}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.writeFaqButton}
                  onClick={onAsk}
                >
                  ĐẶT CÂU HỎI
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} alignItems="center" wrap="nowrap">
          <Grid item>
            <div>
              {
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <Link onClick={onLogin} className={classes.loginButton}>
                  {'Đăng nhập '}
                </Link>
              }
              để đặt câu hỏi về sản phẩm và câu trả lời sẽ được hiển thị tại
              đây.
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

WriteFaq.propTypes = {
  loginAction: PropTypes.func,
  onAddFaq: PropTypes.func,
};

export default memo(WriteFaq);
