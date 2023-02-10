/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MuiButton, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { useIntl } from 'react-intl';
import DocumentHead from 'components/DocumentHead';
import messages from './messages';

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${props => props.theme.breakpoints.up('md')} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    minHeight: '100vh',
    margin: '0px auto',
    display: 'flex',
    alignItems: 'center',
    boxPack: 'center',
    justifyContent: 'center',
    boxAlign: 'center',
  },
}));

function NotFound() {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <DocumentHead />
      <div className={classes.root}>
        <Wrapper>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            404
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            {intl.formatMessage(messages.header)}
          </Typography>
          <Typography
            component="h2"
            variant="body1"
            align="center"
            gutterBottom
          >
            {intl.formatMessage(messages.pageRemove)}
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            mt={2}
          >
            {intl.formatMessage(messages.returnToWebsite)}
          </Button>
        </Wrapper>
      </div>
    </>
  );
}

export default memo(NotFound);
