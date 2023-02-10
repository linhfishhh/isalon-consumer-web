import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import remove from 'lodash/remove';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { Grid, Typography, ButtonBase, Divider } from '@material-ui/core';
import useStyles, { getFilterTitle } from './styles';

/* -------------- Filter Group ------------------ */
function FilterGroup(props) {
  const classes = useStyles();
  const { option, groupKey, onChange, selectedOptions } = props;

  const cachedOptions = useMemo(() => {
    const { objectList = [] } = option;
    return objectList.map(item => ({
      tagId: item.categoryId || item.brandId,
      name: item.name,
    }));
  }, [option]);

  const selectedTags = get(selectedOptions, groupKey, []);

  const didSelectTag = item => {
    const tags = [...selectedTags];
    if (isEmpty(remove(tags, iter => iter === item.tagId))) {
      tags.push(item.tagId);
    }
    if (onChange) {
      onChange(groupKey, tags);
    }
  };

  const isTagSelected = item =>
    find(selectedTags, t => t === item.tagId) !== undefined;

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
            {cachedOptions.map((item, index) => (
              <Grid item key={item.tagId || index}>
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

FilterGroup.propTypes = {
  option: PropTypes.object,
  groupKey: PropTypes.string,
  onChange: PropTypes.func,
  selectedOptions: PropTypes.object,
};

export default memo(FilterGroup);
