import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import remove from 'lodash/remove';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { Grid, Typography, ButtonBase, Divider } from '@material-ui/core';
import useStyles from './styles';
/* -------------- Filter Variant Group ------------------ */
function FilterVariantGroup(props) {
  const classes = useStyles();
  const { option, onChange, selectedOptions } = props;
  const selectedTags = get(selectedOptions, 'variantValueIds', []);

  const didSelectTag = item => {
    const tags = [...selectedTags];
    if (isEmpty(remove(tags, iter => iter === item.variantValueId))) {
      tags.push(item.variantValueId);
    }
    if (onChange) {
      onChange('variantValueIds', selectedTags, tags);
    }
  };

  const isTagSelected = item =>
    find(selectedTags, t => t === item.variantValueId) !== undefined;

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.title} display="inline">
            {option.name}
          </Typography>
        </Grid>
        <Grid item className={classes.tagList}>
          <Grid container>
            {option.variantValues.map((item, index) => (
              <Grid item key={item.variantValueId || index}>
                <ButtonBase
                  className={
                    isTagSelected(item)
                      ? classes.tagButtonSelected
                      : classes.tagButton
                  }
                  onClick={() => didSelectTag(item)}
                >
                  {item.name}
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

FilterVariantGroup.propTypes = {
  option: PropTypes.object,
  onChange: PropTypes.func,
  selectedOptions: PropTypes.object,
};

export default memo(FilterVariantGroup);
