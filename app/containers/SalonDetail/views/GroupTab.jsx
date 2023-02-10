/**
 *
 * GroupTab
 *
 */
import React, { memo, useEffect, useState, useRef } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

import { NAVIGATION_HEIGHT } from 'utils/constants';

const useStyle = makeStyles(theme => ({
  wrapper: {
    top: isMobileOnly
      ? `calc(${NAVIGATION_HEIGHT}px + env(safe-area-inset-top))`
      : 0,
    zIndex: 2,
    position: 'sticky',
  },
  stickyNoBorder: {
    zIndex: 3,
    '& $tabs': {
      border: 'none',
      borderRadius: 0,
    },
  },
  tabs: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderBottom: `solid 1px ${theme.palette.borderColor[1]}`,
    borderTopLeftRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    borderTopRightRadius: isMobileOnly ? 0 : theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    zIndex: 1000,
    '& button': {
      textTransform: 'uppercase',
      fontSize: 16,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  fixedView: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    height: 48,
    borderRadius: 0,
  },
  tabIndicator: {
    color: theme.palette.textColor[6],
    '& .Mui-selected': {
      zIndex: 2,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#21232c',
      height: '100%',
    },
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

function GroupTab(props) {
  const { tabs, headerHeight } = props;

  const classes = useStyle();
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    const tabsAvaliable = tabs.filter(item => item.ref.current);
    const itemRef = tabsAvaliable[newValue].ref;
    const offset = wrapper.current.offsetHeight;
    const top = itemRef.current.offsetTop - offset - headerHeight;
    window.scrollTo({
      behavior: 'smooth',
      top,
    });
  };

  const wrapper = useRef();
  const wrapperContent = useRef();
  const tabsRef = useRef();

  const handleScroll = () => {
    if (!isMobileOnly) {
      const elementWrapper = wrapper.current;
      const elementContent = wrapperContent.current;
      const elementTabs = tabsRef.current;
      if (elementContent && elementWrapper) {
        if (elementWrapper.getBoundingClientRect().top <= 0) {
          elementWrapper.classList.add(classes.stickyNoBorder);
          elementContent.classList.add(classes.fixedView);
          elementTabs.classList.add(classes.tabIndicator);
        } else {
          elementWrapper.classList.remove(classes.stickyNoBorder);
          elementContent.classList.remove(classes.fixedView);
          elementTabs.classList.remove(classes.tabIndicator);
        }
      }
    }
    reselectTab();
  };

  const reselectTab = () => {
    let contentYOffset = window.pageYOffset;

    if (isMobileOnly) {
      contentYOffset += headerHeight;
    }

    if (wrapper.current) {
      const wrapperOffset = wrapper.current.getBoundingClientRect().height;
      const tabsAvaliable = tabs.filter(item => item.ref.current);
      const offsetTopViews = tabsAvaliable.map(
        item => item.ref.current.offsetTop - wrapperOffset,
      );
      const offsets = offsetTopViews.filter(item => item <= contentYOffset);
      setActiveTab(offsets.length <= 0 ? 0 : offsets.length - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div ref={wrapper} className={classes.wrapper}>
      <div ref={wrapperContent} />
      <Paper elevation={0} square className={classes.tabs}>
        <Tabs
          ref={tabsRef}
          value={activeTab}
          onChange={handleChangeTab}
          scrollButtons="on"
        >
          {tabs
            .filter(item => item.ref.current)
            .map((item, index) => (
              <Tab
                label={item.name}
                key={item.name}
                className={
                  activeTab === index && isMobileOnly ? classes.active : ''
                }
              />
            ))}
        </Tabs>
      </Paper>
    </div>
  );
}

GroupTab.propTypes = {
  tabs: PropTypes.array,
  headerHeight: PropTypes.number,
};

export default memo(GroupTab);
