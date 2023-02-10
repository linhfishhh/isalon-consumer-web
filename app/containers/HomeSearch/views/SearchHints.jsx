/**
 *
 * SearchHints
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@material-ui/core/Backdrop';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';

import ContentHints from './ContentHints';
import HistorySearch from './HistorySearch';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(1),
    width: 500,
    zIndex: 10,
  },
  paper: {
    overflow: 'hidden',
    minHeight: 44,
    maxHeight: '40vh',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '40vh',
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: fade(theme.palette.grey[400], 0.3),
  },
  noSuggest: {
    color: theme.palette.grey[400],
  },
}));

function SearchHints(props) {
  const {
    open,
    anchorEl,
    onClose,
    keyword,
    loading,
    searchHints,
    historySearch,
    onDeleteHistory,
  } = props;
  const classes = useStyles(props);

  const history = useHistory();

  const handleClickHint = hintPath => {
    onClose();
    history.push(hintPath);
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{
          width: anchorEl ? anchorEl.clientWidth : null,
        }}
        className={classes.wrapper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              {isEmpty(keyword) ? (
                <HistorySearch
                  historySearch={historySearch}
                  onClick={handleClickHint}
                  onDeleteHistory={onDeleteHistory}
                />
              ) : (
                <>
                  {!loading && isEmpty(searchHints) ? (
                    <List dense className={classes.list}>
                      <ListItem>
                        <ListItemText
                          className={classes.noSuggest}
                          primary="Không có kết quả gợi ý"
                        />
                      </ListItem>
                    </List>
                  ) : (
                    <List className={classes.list} subheader={<li />}>
                      {searchHints.map(section => (
                        <li key={section.type} className={classes.listSection}>
                          <ul className={classes.ul}>
                            <ListSubheader className={classes.sectionName}>
                              {section.name}
                            </ListSubheader>
                            <ContentHints
                              section={section}
                              onClick={handleClickHint}
                            />
                          </ul>
                        </li>
                      ))}
                    </List>
                  )}
                </>
              )}
              {loading && !isEmpty(keyword) && (
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="primary" size={30} />
                </Backdrop>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
}

SearchHints.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  keyword: PropTypes.string,
  loading: PropTypes.bool,
  searchHints: PropTypes.array,
  historySearch: PropTypes.array,
  onDeleteHistory: PropTypes.func,
};

export default memo(SearchHints);
