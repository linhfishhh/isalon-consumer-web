import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { viewTypes } from 'utils/enums';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import MapIcon from '@material-ui/icons/Map';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
    height: theme.spacing(13),
    backgroundColor: '#fff',
    border: isMobileOnly ? 'none' : `solid 1px #ccc`,
    borderRadius: isMobileOnly ? 0 : theme.spacing(1),
  },
  numberResult: {
    display: 'inline',
    fontSize: 18,
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main,
    '& span': {
      fontSize: 18,
    },
  },
}));

function SearchResultHeader(props) {
  const { filter, total, onShowFilter, onChangeFilter, onShowMap } = props;
  const classes = useStyle();

  const handleChangeViewType = event => {
    const newFilter = { ...filter };
    const { value } = event.target;
    const viewType = viewTypes.typeOfValue(value);
    newFilter.viewType = viewType;
    newFilter.page = 1;
    onChangeFilter(newFilter);
  };

  return (
    <Grid
      container
      className={classes.wrapper}
      alignItems="center"
      justify="space-between"
    >
      <Grid item>
        <Hidden mdUp>
          <IconButton onClick={onShowFilter}>
            <FilterListIcon />
          </IconButton>
        </Hidden>
        {isMobileOnly ? (
          <></>
        ) : (
          <Typography className={classes.numberResult}>
            Có
            <Typography component="span" color="primary">
              {` ${total} `}
            </Typography>
            kết quả tìm kiếm
          </Typography>
        )}
      </Grid>
      <Grid item>
        <TextField
          select
          fullWidth
          margin="dense"
          variant="outlined"
          value={
            filter && filter.viewType
              ? filter.viewType.value
              : viewTypes.types[0].value
          }
          onChange={handleChangeViewType}
        >
          {viewTypes.types.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {isMobileOnly && (
        <Grid item>
          <IconButton onClick={onShowMap}>
            <MapIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}
SearchResultHeader.defaultProps = {
  total: 0,
};

SearchResultHeader.propTypes = {
  filter: PropTypes.object,
  total: PropTypes.number,
  onShowFilter: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onShowMap: PropTypes.func,
};

export default memo(SearchResultHeader);
