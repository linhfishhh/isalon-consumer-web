import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { Popover, Grid, Typography, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: isMobileOnly ? '100%' : 500,
    padding: theme.spacing(10),
    transition: 'all 0.3s ease 0s',
  },
  title: {},
  subTitle: {},
  item: {
    cursor: 'pointer',
    '&:hover p': {
      color: theme.palette.primary.main,
    },
  },
  img: {
    width: 50,
    height: 50,
  },
  button: {
    borderRadius: theme.spacing(4.5),
  },
}));

const Badges = props => {
  const { open, onClose, anchorEl, badges = [], onSelect } = props;

  const classes = useStyle();

  return (
    <Popover
      open={open}
      // onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <Grid
        container
        className={classes.wrapper}
        spacing={4}
        direction="column"
      >
        <Grid item xs>
          <Typography variant="h5" className={classes.title}>
            Bạn có hài lòng?
          </Typography>
          <Typography className={classes.subTitle}>
            Hãy chọn một trong những thông điệp sau{'\n'}
            coi như một lời cảm ơn tới Salon
          </Typography>
        </Grid>
        <Grid item xs>
          <Grid container spacing={4}>
            {badges.map((item, index) => (
              <Grid
                key={item.id || index}
                item
                xs={4}
                container
                justify="center"
                className={classes.item}
                onClick={() => onSelect(item)}
              >
                <Avatar src={item.image} className={classes.img} />
                <Typography align="center">{item.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => onClose()}
          >
            KHÔNG QUAN TÂM
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

Badges.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchorEl: PropTypes.any,
  badges: PropTypes.array,
  onSelect: PropTypes.func,
};

export default memo(Badges);
