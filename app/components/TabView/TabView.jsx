/**
 *
 * TabView
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs } from '@material-ui/core';
import TabContent from './TabContent';

const useStyles = makeStyles(theme => ({
  tabView: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabBar: {
    backgroundColor: theme.palette.backgroundColor[0],
  },
}));

function TabView(props) {
  const {
    className,
    tabs,
    variant,
    selectedTab,
    onSelectedTabChange,
    renderTab,
    renderTabContent,
  } = props;

  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    onSelectedTabChange(tabs[newValue]);
  };

  return (
    <div className={`${classes.tabView} ${className}`}>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          className={classes.tabBar}
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={variant}
        >
          {tabs.map((item, index) =>
            renderTab(item, index, index === activeTab),
          )}
        </Tabs>
      </AppBar>
      {tabs.map((item, index) => (
        <TabContent key={item.id || index} value={activeTab} index={index}>
          {renderTabContent(item, index)}
        </TabContent>
      ))}
    </div>
  );
}
TabView.defaultProps = {
  variant: 'fullWidth',
  selectedTab: 0,
  onSelectedTabChange: () => {},
};

TabView.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array.isRequired,
  variant: PropTypes.string,
  selectedTab: PropTypes.number,
  onSelectedTabChange: PropTypes.func,
  renderTab: PropTypes.func,
  renderTabContent: PropTypes.func,
};

export default memo(TabView);
