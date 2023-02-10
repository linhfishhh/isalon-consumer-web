import React, { memo } from 'react';
import { isIOS } from 'react-device-detect';
import PropTypes from 'prop-types';
import 'mobile-pull-to-refresh/dist/styles/ios/style.css';
import 'mobile-pull-to-refresh/dist/styles/material/style.css';

function SpinnerPTR(props) {
  const { offsetTop } = props;
  const style = { top: offsetTop + 16 };

  return (
    <>
      {isIOS ? (
        <div className="pull-to-refresh-ios__spinner" style={style}>
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
          <div className="pull-to-refresh-ios__blade" />
        </div>
      ) : (
        <div
          className="pull-to-refresh-material__control"
          style={{ zIndex: 10 }}
        >
          <svg
            className="pull-to-refresh-material__icon"
            fill="#4285f4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>

          <svg
            className="pull-to-refresh-material__spinner"
            width="24"
            height="24"
            viewBox="25 25 50 50"
          >
            <circle
              className="pull-to-refresh-material__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#4285f4"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      )}
    </>
  );
}

SpinnerPTR.defaultProps = {
  offsetTop: 0,
};

SpinnerPTR.propTypes = {
  offsetTop: PropTypes.number,
};

export default memo(SpinnerPTR);
