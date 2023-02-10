/**
 *
 * BecomeSalonManager
 *
 */

import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import shortid from 'shortid';

import styles from 'assets/styles';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { makeSelectHelp } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getHelpRequest } from './actions';
import { CONTEXT } from './constants';
import HelpItem from './views/HelpItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  mainContent: {
    padding: theme.spacing(6, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
    },
  },
}));

const stateSelector = createStructuredSelector({
  help: makeSelectHelp(),
});

export function HelpPage() {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalStyle = styles();

  const dispatch = useDispatch();
  const { help = [] } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(getHelpRequest());
  }, []);

  return (
    <BasePageView header={<Navigation color="primary" title="Trợ giúp" />}>
      <DocumentHead title="Trợ giúp" description="Trợ giúp" />
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <List component="nav" className={classes.root}>
            {help.map(item => (
              <HelpItem data={item} key={shortid()} />
            ))}
          </List>
        </div>
      </div>
    </BasePageView>
  );
}

export default memo(HelpPage);
