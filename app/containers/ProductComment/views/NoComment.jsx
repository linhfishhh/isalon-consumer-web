import React, { memo } from 'react';

import { Grid, Typography } from '@material-ui/core';
import NoCommentIcon from 'assets/svgIcon/NoCommentIcon';
import useStyles from '../styles';

function NoComment() {
  const classes = useStyles();
  return (
    <div className={classes.noCommentContainer}>
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item>
          <NoCommentIcon />
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography>Hiện chưa có nhận xét nào cho sản phẩm.</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Cho người khác biết ý kiến của bạn và trở thành người đầu tiên
                nhận xét sản phẩm này.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(NoComment);
