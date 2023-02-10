/**
 *
 * HistorySearch
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import HistoryIcon from '@material-ui/icons/History';

import { path } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  sectionName: {
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(0, 4),
    lineHeight: `${theme.spacing(8)}px`,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

function HistorySearch(props) {
  const { historySearch, onClick, onDeleteHistory } = props;
  const classes = useStyles();

  const handleOnClick = history => {
    const { keyword, searchType } = history;
    onClick(
      `${path.bookingSearch}?keyword=${keyword}&search_type=${searchType}`,
    );
  };

  return (
    <>
      {isEmpty(historySearch) ? (
        <></>
      ) : (
        <List className={classes.root} subheader={<li />}>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader className={classes.sectionName}>
                Lịch sử tìm kiếm
              </ListSubheader>
              {historySearch.map((item, index) => (
                <ListItem
                  button
                  key={shortid.generate()}
                  divider
                  onClick={() => handleOnClick(item)}
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.keyword} />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      edge="end"
                      onClick={() => onDeleteHistory(index)}
                    >
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </ul>
          </li>
        </List>
      )}
    </>
  );
}

HistorySearch.propTypes = {
  historySearch: PropTypes.array,
  onClick: PropTypes.func,
  onDeleteHistory: PropTypes.func,
};

export default memo(HistorySearch);
