import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomerRightIcon from 'assets/svgIcon/CustomerRightIcon';
import CheckmarkIcon from 'assets/svgIcon/CheckmarkIcon';
import useStyles from '../styles';

const rights = [
  {
    title: 'Hoàn tiền 111% khi phát hiện hàng giả',
  },
  {
    title: 'Cam kết hàng chính hãng 100%',
  },
  {
    title: '7 ngày đổi trả cho Nhà bán hàng',
    subTitle: 'Không được đổi trả với lý do "không vừa ý"',
  },
  {
    title: 'Không áp dụng chính sách bảo hành',
  },
];

function CustomerRight() {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <CustomerRightIcon />
        </Grid>
        <Grid item xs>
          <Typography className={classes.title}>
            Quyền lợi khách hàng
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={3}>
        {rights.map((item, index) => (
          <Grid item key={item.id || index}>
            <Grid container>
              <Grid item style={{ marginRight: 10 }}>
                <CheckmarkIcon color="secondary" />
              </Grid>
              <Grid item xs>
                <Grid container direction="column">
                  <Grid item>
                    <Typography display="inline">{item.title}</Typography>
                  </Grid>
                  {item.subTitle && (
                    <Grid item>
                      <Typography display="inline" className={classes.detail}>
                        {item.subTitle}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default memo(CustomerRight);
