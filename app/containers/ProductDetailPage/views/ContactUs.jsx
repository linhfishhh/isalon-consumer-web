import React, { memo } from 'react';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import { isMobileOnly } from 'utils/platform';
import ContactIcon from 'assets/svgIcon/ContactIcon';
import EmailIcon from 'assets/svgIcon/EmailIcon';
import ChatIcon from 'assets/images/ic_chat.svg';
import Img from 'components/Img';
import useStyles from '../styles';

const rights = [
  {
    icon: <ContactIcon />,
    title: 'Hotline đặt hàng 0914388346',
    subTitle: '(Miễn phí, 8-21h cả T7, CN)',
    link: 'tel:0914388346',
  },
  {
    icon: <EmailIcon />,
    title: 'Email: support@isalon.vn',
    link: 'mailto:support@isalon.vn',
  },
];

function ContactUs() {
  const classes = useStyles();

  const onOpenFacebookChat = React.useCallback(() => {
    if (isMobileOnly) {
      document.location = 'fb-messenger://user-thread/941543739381495';
    } else {
      window.FB.CustomerChat.showDialog();
    }
  }, []);

  return (
    <div>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <Typography className={classes.title}>Liên hệ</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={3}>
        {rights.map((item, index) => (
          <Grid item key={item.id || index}>
            <Grid container>
              <Grid item style={{ marginRight: 10 }}>
                {item.icon}
              </Grid>
              <Grid item xs>
                <Grid container direction="column">
                  <Grid item>
                    {/* <Typography display="inline">{item.title}</Typography> */}
                    <Link href={item.link} className={classes.normal}>
                      {item.title}
                    </Link>
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
        <Grid item xs={12}>
          <Button
            className={classes.chatButton}
            variant="outlined"
            onClick={onOpenFacebookChat}
          >
            <Img src={ChatIcon} className={classes.chatIcon} />
            Chat với chúng tôi
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ContactUs);
