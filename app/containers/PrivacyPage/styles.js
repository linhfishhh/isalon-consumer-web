import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    padding: isMobileOnly ? 0 : theme.spacing(6, 0),
  },
  tosContent: {
    minHeight: '100vh',
    padding: theme.spacing(4),
    '& *': {
      fontFamily: 'San Francisco Text !important',
    },
  },
}));

export default useStyles;
