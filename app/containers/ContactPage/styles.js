import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  contactUsHeadline: {
    fontSize: 50,
    color: '#fff',
    marginTop: 100,
    marginBottom: 100,
  },
  featureHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing(5),
  },
  subFeatureHeadline: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subFeatureContent: {
    fontSize: 15,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  phone: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  contactButton: {
    width: '100%',
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
}));

export default useStyles;
