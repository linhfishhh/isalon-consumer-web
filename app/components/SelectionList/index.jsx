/**
 *
 * SelectionList
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Radio,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  expand: {
    paddingLeft: theme.spacing(2),
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  collapse: {
    paddingLeft: theme.spacing(2),
    cursor: 'pointer',
    color: theme.palette.secondary.main,
  },
  icon: {
    minWidth: 'auto',
  },
}));

function SelectionList(props) {
  const {
    className,
    multiple,
    onlyDataField,
    dataValueField,
    data,
    selected,
    renderLabel,
    renderCaption,
    renderAction,
    onSelected,
    listItemProps,
    itemToShow,
  } = props;
  const classes = useStyle();

  const [expand, setExpand] = useState(!itemToShow);
  const [listItem, setListItem] = useState([]);
  const [listItemShow, setListItemShow] = useState([]);

  const selectList = onlyDataField
    ? data.filter(item => selected.includes(item[dataValueField]))
    : selected;

  const idSelected = onlyDataField
    ? selected
    : selected.map(item => item[dataValueField]);

  useEffect(() => {
    if (!isEmpty(data)) {
      setListItem(data);
    }
  }, [data]);

  useEffect(() => {
    if (itemToShow) {
      const unselect = differenceWith(data, selectList, isEqual);
      const allItem = selectList.concat(unselect);
      setListItem(allItem);
    }
  }, [selected, data]);

  useEffect(() => {
    if (expand) {
      setListItemShow(listItem);
    } else {
      const itemsShow = listItem.slice(0, itemToShow);
      setListItemShow(itemsShow);
    }
  }, [expand, listItem]);

  const handleSelected = (itemSelected, index) => {
    if (multiple) {
      if (idSelected.includes(itemSelected[dataValueField])) {
        const result = selectList.filter(
          item => item[dataValueField] !== itemSelected[dataValueField],
        );
        if (onlyDataField) {
          const dataFields = result.map(item => item[dataValueField]);
          onSelected(dataFields, index);
        } else {
          onSelected(result, index);
        }
      } else {
        const result = [...selectList, itemSelected];
        if (onlyDataField) {
          const dataFields = result.map(item => item[dataValueField]);
          onSelected(dataFields, index);
        } else {
          onSelected(result, index);
        }
      }
    } else if (onlyDataField) {
      onSelected([itemSelected[dataValueField]], index);
    } else {
      onSelected([itemSelected], index);
    }
  };

  return (
    <List component="div" className={`${classes.wrapper} ${className}`}>
      {listItemShow.map((item, index) => (
        <ListItem
          key={item[dataValueField] || index}
          button
          onClick={() => handleSelected(item, index)}
          {...listItemProps}
        >
          <ListItemIcon className={isMobileOnly ? classes.icon : ''}>
            {multiple ? (
              <Checkbox
                checked={idSelected.includes(item[dataValueField])}
                onChange={() => handleSelected(item, index)}
              />
            ) : (
              <Radio
                checked={idSelected.includes(item[dataValueField])}
                onClick={() => handleSelected(item, index)}
              />
            )}
          </ListItemIcon>
          <ListItemText
            primary={renderLabel(item, index)}
            secondary={renderCaption && renderCaption(item, index)}
          />
          {renderAction && (
            <ListItemSecondaryAction>
              {renderAction(item, index)}
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
      {itemToShow && (
        <Typography
          component="div"
          className={expand ? classes.collapse : classes.expand}
          onClick={() => setExpand(!expand)}
        >
          {expand ? <RemoveIcon /> : <AddIcon />}
          {expand ? `  Thu gon` : `  Nhiều hơn`}
        </Typography>
      )}
    </List>
  );
}
SelectionList.defaultProps = {
  data: [],
  selected: [],
  multiple: false,
  onlyDataField: false,
  dataValueField: 'id',
};

SelectionList.propTypes = {
  className: PropTypes.string,
  multiple: PropTypes.bool,
  onlyDataField: PropTypes.bool,
  dataValueField: PropTypes.string,
  data: PropTypes.array,
  selected: PropTypes.array,
  renderLabel: PropTypes.func,
  renderCaption: PropTypes.func,
  renderAction: PropTypes.func,
  onSelected: PropTypes.func,
  listItemProps: PropTypes.object,
  itemToShow: PropTypes.number,
};

export default memo(SelectionList);
