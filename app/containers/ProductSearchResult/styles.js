import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    backgroundColor: theme.palette.backgroundColor[1],
    paddingTop: isMobileOnly ? 0 : theme.spacing(10),
    paddingBottom: isMobileOnly ? 0 : theme.spacing(10),
  },
  padding_4: {
    padding: theme.spacing(4),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.textColor[0],
  },
  normal: {
    color: theme.palette.textColor[0],
  },
  detail: {
    color: theme.palette.textColor[8],
  },
}));

export default useStyles;
