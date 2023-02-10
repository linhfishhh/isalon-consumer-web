/**
 *
 * Placeholder
 *
 */

import React, { memo } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function Placeholder(props) {
  const { count, item } = props;

  return (
    <Grid container spacing={5}>
      {[...Array(count)].map(() => (
        <Grid item xs key={shortid.generate()}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
}

Placeholder.propTypes = {
  count: PropTypes.number,
  item: PropTypes.node,
};

export default memo(Placeholder);
