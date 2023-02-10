import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from '@material-ui/core';
import ShowcaseItem from './ShowcaseItem';

function ShowcaseTable(props) {
  const { data = [], onRemove } = props;
  return (
    <Grid container direction="column">
      {data.map((item, index) => (
        <Grid item xs key={item.id || index}>
          <ShowcaseItem
            key={item.id || index}
            data={item}
            onRemove={onRemove}
          />
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

ShowcaseTable.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func,
};

export default memo(ShowcaseTable);
