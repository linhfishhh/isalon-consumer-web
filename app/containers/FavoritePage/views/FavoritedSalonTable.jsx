import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from '@material-ui/core';
import SalonItem from './SalonItem';

function FavoritedSalonTable(props) {
  const { data = [], onRemove } = props;
  return (
    <Grid container direction="column">
      {data.map((item, index) => (
        <Grid item xs key={item.id || index}>
          <SalonItem key={item.id || index} data={item} onRemove={onRemove} />
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

FavoritedSalonTable.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func,
};

export default memo(FavoritedSalonTable);
