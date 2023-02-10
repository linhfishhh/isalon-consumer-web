/**
 *
 * ProductSearch
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import isString from 'lodash/isString';
import get from 'lodash/get';
import take from 'lodash/take';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useAuthentication } from 'utils/hooks';
import { gotoSearchResultPage } from 'utils/searchHelper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectFetched,
  makeSelectSearchHistories,
  makeSelectHotKeywords,
  makeSelectSuggestionKeywords,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getSearchHistoryRequest,
  getHotKeywordsRequest,
  getSuggestionKeywordsRequest,
  clearSearchHistoryRequest,
} from './actions';
import { CONTEXT } from './constants';

const useStyle = makeStyles(theme => ({
  wrapper: {
    background: isMobileOnly
      ? 'linear-gradient(90deg, #9E1F63 0%, #D91C5C 100%)'
      : 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  autocomplete: {
    flex: 1,
  },
  textField: {
    margin: 0,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  popoverWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#E5E5E5',
    height: 30,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderRadius: 15,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000',
    marginRight: 8,
    marginBottom: 8,
  },
  tagRoot: {
    marginBottom: theme.spacing(3),
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  historyTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexItem: {
    flex: 1,
  },
  clearButton: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.primary.main,
      )}, 0.1)`,
    },
    width: 70,
    height: 30,
    borderRadius: 15,
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: 0,
      },
      '&:hover fieldset': {
        borderWidth: 0,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 0,
      },
    },
  },
})(TextField);

const CssAutocomplete = withStyles(theme => ({
  root: {
    margin: isMobileOnly ? theme.spacing(3, 4) : theme.spacing(4, 4, 4, 0),
  },
  option: {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}))(Autocomplete);

const fakeOptions = [{ title: '' }];

const stateSelector = createStructuredSelector({
  fetched: makeSelectFetched(),
  searchHistories: makeSelectSearchHistories(),
  hotKeywords: makeSelectHotKeywords(),
  suggestionKeywords: makeSelectSuggestionKeywords(),
});

function ProductSearch(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyle();
  const history = useHistory();
  const { authenticated } = useAuthentication();

  const { onSearchKeyword, defaultKeyword = '' } = props;

  const {
    fetched,
    searchHistories = [],
    hotKeywords = [],
    suggestionKeywords = [],
  } = useSelector(stateSelector);

  const dispatch = useDispatch();

  const [inputText, setInputText] = useState(defaultKeyword);

  useEffect(() => {
    setInputText(defaultKeyword);
  }, [defaultKeyword]);

  useEffect(() => {
    if (!fetched) {
      dispatch(getHotKeywordsRequest());
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      dispatch(getSearchHistoryRequest());
    }
  }, [authenticated]);

  const onInputChange = (event, value) => {
    fakeOptions[0].title = value;
    setInputText(value);
    dispatch(getSuggestionKeywordsRequest({ keyword: value }));
  };

  const onOptionClicked = text => {
    fakeOptions[0].title = text;
    setInputText(text);
    dispatch(getSuggestionKeywordsRequest({ keyword: text }));
  };

  const onClearSearchHistory = () => {
    dispatch(clearSearchHistoryRequest());
  };

  const renderFakeOption = () => (
    <div className={classes.popoverWrapper}>
      <div className={classes.historyTitle}>
        <span className={classes.title}>Lịch sử tìm kiếm</span>
        <div className={classes.flexItem} />
        <button
          className={classes.clearButton}
          onClick={onClearSearchHistory}
          type="button"
        >
          Xóa
        </button>
      </div>
      <div className={classes.tagRoot}>
        {take(searchHistories, 15).map((item, index) => (
          <button
            key={item.id || index}
            className={classes.tag}
            onClick={() => onOptionClicked(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <span className={classes.title}>Từ khóa hot</span>
      <div className={classes.tagRoot}>
        {take(hotKeywords, 15).map((item, index) => (
          <button
            key={item.id || index}
            className={classes.tag}
            onClick={() => onOptionClicked(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSuggestionOption = option => <span>{option}</span>;

  const renderOption = (option, state) => {
    if (!inputText || inputText.length <= 0) {
      return renderFakeOption(option, state);
    }
    return renderSuggestionOption(option, state);
  };

  const getOptionLabel = option => {
    if (isString(option)) {
      return option;
    }
    return get(option, 'title', '');
  };

  const onSearchButtonClicked = () => {
    if (onSearchKeyword) {
      onSearchKeyword(inputText);
      dispatch(getSearchHistoryRequest());
    } else if (inputText && inputText.length > 0) {
      gotoSearchResultPage(history, { keyword: inputText });
    }
  };

  const handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearchButtonClicked();
    }
  };

  return (
    <div className={classes.wrapper}>
      <CssAutocomplete
        id="product-search-field"
        className={classes.autocomplete}
        options={
          !inputText || inputText.length <= 0 ? fakeOptions : suggestionKeywords
        }
        getOptionLabel={getOptionLabel}
        freeSolo
        onInputChange={onInputChange}
        renderOption={renderOption}
        inputValue={inputText}
        // defaultValue={defaultKeyword}
        renderInput={params => {
          const { InputProps, ...other } = params;
          return (
            <CssTextField
              {...other}
              className={classes.textField}
              margin="dense"
              placeholder="Tìm kiếm sản phẩm"
              variant="outlined"
              InputProps={{
                ...InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onKeyPress={handleOnKeyPress}
            />
          );
        }}
      />
      {!isMobileOnly && (
        <Button
          className={classes.searchButton}
          onClick={onSearchButtonClicked}
        >
          Tìm kiếm
        </Button>
      )}
    </div>
  );
}

ProductSearch.propTypes = {
  onSearchKeyword: PropTypes.func,
  defaultKeyword: PropTypes.string,
};

export default memo(ProductSearch);
