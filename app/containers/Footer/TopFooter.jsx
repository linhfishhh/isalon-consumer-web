import React, { memo, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styles from 'assets/styles';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import { path } from 'routers/path';

import Img from 'components/Img';
import { Facebook, Youtube, Instagram } from 'mdi-material-ui';

import qrCode from 'assets/images/ic_qrCode.png';
import appStore from 'assets/images/ic_appStore.png';
import playStore from 'assets/images/ic_playStore.png';

import MenuFooter from './MenuFooter';

const useStyles = makeStyles(theme => ({
  viewWrapper: {
    backgroundColor: theme.palette.backgroundColor[2],
    paddingTop: 40,
    paddingBottom: 30,
  },
  store: {
    width: 300,
  },
  qrCode: {
    width: 110,
    marginRight: 20,
  },
  appStore: {
    width: 80,
  },
  playStore: {
    width: 80,
    marginTop: 8,
  },
  title: {
    marginBottom: theme.spacing(5),
    fontSize: 15,
  },
  text: {
    color: theme.palette.textColor[3],
  },
  socialLink: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: theme.palette.backgroundColor[4],
    borderRadius: 22,
    color: '#fff',
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1,
  },
  installAppContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: 20,
  },
  flexItem: {
    flex: 1,
  },
}));

const links = [
  {
    icon: <Facebook />,
    link:
      'https://www.facebook.com/iSalon-941543739381495/?modal=admin_todo_tour',
  },
  { icon: <Instagram />, link: 'https://www.instagram.com/isalon.vn/' },
  {
    icon: <Youtube />,
    link: 'https://www.youtube.com/channel/UCW2HiUsDPDzJ0hf_SGt7g-w',
  },
];

const menu = [
  {
    name: 'Thông tin chung',
    link: '/',
    sub: [
      {
        name: 'Giới thiệu',
        link: '/',
      },
      {
        name: 'Liên hệ',
        link: path.contactUs,
      },
      {
        name: 'Tin tức',
        link: path.news,
        targetBlank: true,
      },
      {
        name: 'Đăng ký chủ salon',
        link: path.becomeSalonManager,
      },
      {
        name: 'Quy chế hoạt động',
        link: path.operationRule,
        targetBlank: true,
      },
      {
        name: 'Điều khoản sử dụng',
        link: path.termOfUse,
        targetBlank: true,
      },
      {
        name: 'Chính sách bảo mật',
        link: path.privacyPolicy,
        targetBlank: true,
      },
    ],
  },
];

function TopFooter(props) {
  const classes = useStyles();
  const globalStyle = styles();

  const { serviceCategories, mngConfig, topCities } = props;
  const bookingServices = useMemo(() => {
    if (serviceCategories && serviceCategories.length > 0) {
      return {
        name: 'Dịch vụ làm đẹp',
        link: '/',
        sub: take(
          serviceCategories.map(item => ({
            name: item.name,
            link: `${path.bookingSearch}?cat[]=${item.id}`,
          })),
          7,
        ),
      };
    }
    return {
      name: 'Dịch vụ làm đẹp',
      link: '/',
      sub: [],
    };
  }, [serviceCategories]);

  const cities = useMemo(() => {
    if (topCities && topCities.length > 0) {
      return {
        name: 'Thành phố',
        link: '/',
        sub: take(
          topCities.map(item => ({
            name: item.name,
            link: `${path.bookingSearch}?location[]=${
              item.city_id
            }&location_lv=1&unit=province`,
          })),
          7,
        ),
      };
    }
    return {
      name: 'Thành phố',
      link: '/',
      sub: [],
    };
  }, [topCities]);

  return (
    <div className={classes.viewWrapper}>
      <div className={`${globalStyle.container} ${classes.container}`}>
        <div className={classes.store}>
          <span className={classes.title}>Cài đặt ứng dụng tại đây</span>
          <div className={classes.installAppContainer}>
            <Img className={classes.qrCode} src={qrCode} alt="QR" />
            <Grid item xs={6}>
              <a href={mngConfig.theme_master_mobile_app_ios}>
                <Img
                  className={classes.appStore}
                  src={appStore}
                  alt="AppStore"
                />
              </a>
              <a href={mngConfig.theme_master_mobile_app_android}>
                <Img
                  className={classes.playStore}
                  src={playStore}
                  alt="PlayStore"
                />
              </a>
            </Grid>
          </div>
          <div className={classes.installAppContainer}>
            <span display="inline">Theo dõi iSalon</span>
            {links.map((item, index) => (
              <a
                key={item.id || index}
                className={classes.socialLink}
                href={item.link}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        {/* <div className={classes.flexItem} /> */}
        <div className={classes.menu}>
          <MenuFooter data={bookingServices} />
          <MenuFooter data={menu[0]} />
          <MenuFooter data={cities} />
        </div>
      </div>
    </div>
  );
}

TopFooter.propTypes = {
  serviceCategories: PropTypes.array,
  mngConfig: PropTypes.object,
  topCities: PropTypes.array,
};

export default memo(TopFooter);
