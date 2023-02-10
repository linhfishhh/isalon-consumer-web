import { makeStyles } from '@material-ui/core/styles';
import headerBg from 'assets/images/headerbg.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  header: {
    width: '100%',
    backgroundImage: `url('${headerBg}')`,
    backgroundSize: 'cover',
  },
  appbar: {
    backgroundColor: 'transparent',
  },
  logo: {
    width: 100,
    marginLeft: 15,
    marginRight: 15,
    marginTop: -10,
    '& img': {
      height: 30,
      verticalAlign: 'sub',
    },
  },
  headerItem: {
    color: '#fff',
  },
  startButton: {
    width: 120,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: theme.spacing(10),
    marginBottom: 15,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  writeEmailContainer: {
    // border: '0.5px solid #d2d2d2aa',
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    height: 40,
  },
  emailContainer: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailTextField: {
    fontSize: 13,
  },
  writeEmailButton: {
    borderRadius: 0,
    height: 40,
    width: 150,
  },
  subHeaderTitle2: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 20,
  },
  joinNowText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: '#fff',
  },
  arrowMore: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
  featureHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subFeatureHeadline: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 700,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  subFeatureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(4),
  },
  subFeatureTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  subFeatureContent: {
    fontSize: 13,
    textAlign: 'center',
  },
  subFeatureContent2: {
    fontSize: 13,
  },
  installAppRoot: {
    backgroundColor: '#E6E6E6',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  storeIconContent: {
    marginTop: theme.spacing(5),
  },
  storeIcon: {
    height: 30,
    display: 'block',
    margin: 'auto',
  },
  appManagerDetailRoot: {
    backgroundColor: '#F2F2F2',
  },
  appManagerFeatureIcon: {
    width: 25,
  },
  appManagerDetailColumn: {
    height: '100%',
  },
  partnerContent: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  reviewRoot: {
    backgroundColor: '#FBE7E7',
  },
  parnerAvatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
  },
  joinNowContainer: {
    width: '100%',
  },
  joinNowButton: {
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    height: 40,
    backgroundColor: '#FF5C39',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinNowButtonText: {
    color: '#fff',
  },
  footerContent: {
    backgroundColor: '#555555',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    color: '#fff',
    fontSize: 14,
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '50%': {
      transform: 'translate(0, 10px)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
  arrow: {
    animation: '$pulse 1s linear infinite',
    color: '#ffffff',
  },
}));

export default useStyles;
