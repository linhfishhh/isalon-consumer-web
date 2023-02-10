import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FavoritedProductItem from './FavoritedProductItem';

const useStyles = makeStyles(() => ({
  view_more: {
    width: '100%',
    height: 40,
    fontWeight: 'normal',
  },
}));

function FavoritedProductTable(props) {
  const classes = useStyles();
  const { data = {}, onRemove, loadMore } = props;
  const { isLast = false, content = [] } = data;
  return (
    <Grid container direction="column">
      {content.map((item, index) => (
        <Grid item xs key={item.id || index}>
          <FavoritedProductItem
            key={item.id || index}
            data={item}
            onRemove={onRemove}
          />
          <Divider />
        </Grid>
      ))}
      {!isLast ? (
        <Grid item xs>
          <Button
            variant="contained"
            color="primary"
            className={classes.view_more}
            startIcon={<ArrowDropDownIcon />}
            onClick={loadMore}
          >
            Tải thêm
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
}

FavoritedProductTable.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
  loadMore: PropTypes.func,
};

export default memo(FavoritedProductTable);
