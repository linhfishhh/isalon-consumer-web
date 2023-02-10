import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const commonStyle = makeStyles(theme => ({
  container: {
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('xs')]: {
      padding: isMobileOnly ? 0 : theme.spacing(0, 4),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1100,
      padding: 0,
    },
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.textColor[0],
  },
  normalText: {
    color: theme.palette.textColor[0],
  },
  detailText: {
    color: theme.palette.textColor[8],
  },
  xs1_5: {
    flexGrow: 0,
    maxWidth: '20%',
    flexBasis: '20%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '25%',
      flexBasis: '25%',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: isMobileOnly ? '50%' : '33.33%',
      flexBasis: isMobileOnly ? '50%' : '33.33%',
    },
  },
}));

export default commonStyle;
