import React, { memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useTheme } from '@material-ui/styles';

import { useInjectReducer } from 'utils/injectReducer';

import { hideLoadingAction } from './actions';
import { CONTEXT } from './constants';
import reducer from './reducer';
import { isLoadingSelector } from './selectors';
import Wrapper, { Container, LoadingTransition } from './Wrapper';

function LoadingInPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });

  const { isLoading, hideLoading } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const location = useLocation();

  useEffect(() => {
    hideLoading();
  }, [location]);

  return ReactDOM.createPortal(
    <LoadingTransition
      in={isLoading}
      classNames="loading-in-page"
      timeout={{ enter: 0, exit: 700 }}
      unmountOnExit
    >
      <Container>
        <Wrapper>
          <BounceLoader size={isMobileOnly ? 40 : 50} color={color} />
        </Wrapper>
      </Container>
    </LoadingTransition>,
    document.getElementById('loading-in-page'),
  );
}

LoadingInPage.propTypes = {
  isLoading: PropTypes.bool,
  hideLoading: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoading: isLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    hideLoading: () => dispatch(hideLoadingAction()),
  };
}

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRedux,
  memo,
)(LoadingInPage);
