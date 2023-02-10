import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';
import bgImage from 'assets/images/bg_sign_in.jpg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: isMobileOnly ? 'none' : `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center',
    paddingTop: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 0,
  },
  wrapper: {
    maxWidth: 520,
    minHeight: '100%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobileOnly ? 'flex-start' : 'center',
    boxPack: 'center',
    justifyContent: isMobileOnly ? 'flex-start' : 'center',
    boxAlign: 'center',
  },
  paper: {
    width: '100%',
    padding: isMobileOnly ? theme.spacing(0, 10) : 50,
    borderRadius: isMobileOnly ? 0 : 30,
    boxShadow: isMobileOnly ? 'none' : '0 32px 24px -24px #333',
  },
  btnClose: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: theme.palette.textColor[6],
  },
  btn: {
    height: isMobileOnly ? 54 : 70,
    marginTop: 25,
    borderRadius: isMobileOnly ? 27 : 35,
  },
  btnMain: {
    fontSize: isMobileOnly
      ? theme.typography.h4.fontSize
      : theme.typography.h3.fontSize,
    color: '#fff',
    backgroundColor: '#B0B0B0',
    '&:hover': {
      backgroundColor: '#B0B0B0',
    },
    transition: 'all 0.3s ease 0s',
  },
  btnMainActive: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 15px 5px rgba(255, 92, 57, 0.2)',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnFacebook: {
    fontSize: theme.typography.h3.fontSize,
    color: isMobileOnly ? '#fff' : '#567DBF',
    border: 'solid 2px #567DBF',
    width: isMobileOnly ? 54 : '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: isMobileOnly ? '#567DBF' : '#fff',
    outline: 'none',
  },
  btnResend: {
    fontSize: theme.typography.h5.fontSize,
    color: '#333333',
    border: isMobileOnly ? ' none' : 'solid 2px #969696',
    padding: theme.spacing(0, 8),
    marginTop: isMobileOnly ? 0 : 25,
  },
  btnSkip: {
    fontSize: theme.typography.h5.fontSize,
    color: '#969696',
    backgroundColor: '#e3e3e3',
  },
  btnSkipSmall: {
    border: 'solid 1px #969696',
    color: '#969696',
    height: 36,
    borderRadius: 18,
    padding: theme.spacing(0, 4),
    marginTop: theme.spacing(6),
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
  },
  title: {
    margin: '10px 0 10px 0',
    fontWeight: 'bold',
  },
  subTitle: {},
  input: {
    borderRadius: 35,
    textAlign: 'center',
    backgroundColor: '#F7F5F5',
    padding: 0,
    color: '#808080',
    height: isMobileOnly ? 54 : 70,
    fontSize: theme.typography.h4.fontSize,
    width: '100%',
    outline: 'none',
    border: 'none',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  phoneIcon: {
    position: 'absolute',
    width: 20,
    top: '50%',
    left: theme.spacing(4),
    transform: 'translate(0%, -50%)',
  },
  text: {
    color: theme.palette.textColor[1],
  },
  textError: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  phoneNumber: {
    color: theme.palette.primary.main,
  },
  shieldIcon: {
    width: 230,
    height: 130,
  },
  helloIcon: {
    width: 245,
    height: 175,
  },
  centerText: {
    textAlign: 'center',
  },
  logo: {
    width: 120,
    margin: theme.spacing(4),
  },
  validatePhone: {
    position: 'absolute',
    top: 0,
    color: theme.palette.error.main,
    fontSize: 12,
    width: '100%',
  },
}));

export { useStyles };
