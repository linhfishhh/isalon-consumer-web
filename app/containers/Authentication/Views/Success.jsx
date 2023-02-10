import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@material-ui/core';

import { HelloIcon } from 'assets/svgIcon';
import { useStyles } from '../styles';

function Entry(props) {
  const { onClose } = props;
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Grid item style={{ width: 360 }}>
          <Grid container direction="column" justify="center" spacing={2}>
            <Grid item container justify="center">
              <HelloIcon className={classes.helloIcon} />
            </Grid>
            <Grid item>
              <Typography variant="h4" align="center" className={classes.title}>
                Chúc mừng bạn!
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.text}
              >
                Chúng tôi có thể cho bạn biết khi có ai đó thông báo cho bạn
                hoặc thông báo cho bạn về các hoạt động tài khoản quan trọng
                khác.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                onClick={onClose}
                className={[
                  classes.btn,
                  classes.btnMain,
                  classes.btnMainActive,
                ].join(' ')}
              >
                Có, thông báo cho tôi
              </Button>
            </Grid>
            <Grid>
              <Button
                fullWidth
                onClick={onClose}
                className={[classes.btn, classes.btnSkip].join(' ')}
              >
                Bỏ qua
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Entry.propTypes = {
  onClose: PropTypes.func,
};
export default Entry;
