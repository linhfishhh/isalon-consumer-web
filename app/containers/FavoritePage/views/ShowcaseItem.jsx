import React, { memo, useState } from 'react';
import { v1 } from 'uuid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { ClearOutlined } from '@material-ui/icons';
import Img from 'components/Img';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  detail_container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    width: 160,
    height: 120,
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontSize: 16,
  },
}));

function ShowcaseItem(props) {
  const { data, onRemove } = props;
  const { id, showcase = {} } = data;

  const [fancybox] = useState(v1());

  const classes = useStyles();

  const onDeleteFavShowcase = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <Grid container direction="row" className={classes.root} spacing={4}>
      <Grid item>
        {!isEmpty(showcase.items) &&
          showcase.items.map((item, index) => (
            <React.Fragment key={shortid.generate()}>
              <a href={item.image} data-fancybox={fancybox}>
                {index === 0 && (
                  <Img
                    src={showcase.cover}
                    className={classes.avatar}
                    alt="Showcase thumbnail"
                  />
                )}
              </a>
            </React.Fragment>
          ))}
      </Grid>
      <Grid item xs>
        <Typography className={classes.title_text}>{showcase.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" onClick={onDeleteFavShowcase}>
          <ClearOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
}

ShowcaseItem.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
};

export default memo(ShowcaseItem);
