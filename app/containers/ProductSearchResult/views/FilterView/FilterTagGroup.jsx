import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import remove from 'lodash/remove';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { Grid, Typography, ButtonBase, Divider } from '@material-ui/core';
import useStyles, { getFilterTitle } from './styles';
/* -------------- Filter Tag Group ------------------ */
function FilterTagGroup(props) {
  const classes = useStyles();
  const { option, onChange, selectedOptions } = props;

  const selectedTags = get(selectedOptions, 'productTagIds', []);

  const didSelectTag = item => {
    const tags = [...selectedTags];
    if (isEmpty(remove(tags, iter => iter === item.productTagId))) {
      tags.push(item.productTagId);
    }
    if (onChange) {
      onChange('productTagIds', selectedTags, tags);
    }
  };

  const isTagSelected = item =>
    find(selectedTags, t => t === item.productTagId) !== undefined;

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.title} display="inline">
            {getFilterTitle(option.filterName)}
          </Typography>
        </Grid>
        <Grid item className={classes.tagList}>
          <Grid container>
            {option.objectList.map((item, index) => (
              <Grid item key={item.productTagId || index}>
                <ButtonBase
                  className={
                    isTagSelected(item)
                      ? classes.tagButtonSelected
                      : classes.tagButton
                  }
                  onClick={() => didSelectTag(item)}
                >
                  {item.tag}
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    </div>
  );
}

FilterTagGroup.propTypes = {
  option: PropTypes.object,
  onChange: PropTypes.func,
  selectedOptions: PropTypes.object,
};

export default memo(FilterTagGroup);
