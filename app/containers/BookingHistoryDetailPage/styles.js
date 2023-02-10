import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  paperWrapper: {
    borderRadius: isMobileOnly ? 0 : theme.spacing(2),
    overflow: 'auto',
  },
  background: {
    width: isMobileOnly ? '100%' : 600,
    height: 'auto',
    padding: 0,
    backgroundColor: isMobileOnly ? '#000000' : 'transparent',
    display: 'flex',
  },
  wrapper: {
    width: '100%',
    borderRadius: isMobileOnly ? theme.spacing(7) : theme.spacing(2),
    margin: isMobileOnly
      ? theme.spacing(0, 3, 10, 3)
      : theme.spacing(0, 10, 10, 10),
    border: isMobileOnly ? 'none' : `1px solid ${theme.palette.borderColor[0]}`,
    overflow: 'auto',
    backgroundColor: '#ffffff',
    zIndex: 3,
  },
  body: {
    padding: isMobileOnly ? theme.spacing(0, 4) : theme.spacing(0, 6),
    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },
  header: {
    padding: isMobileOnly ? 0 : theme.spacing(0, 2),
    backgroundColor: isMobileOnly ? '#000000' : '#ffffff',
    color: isMobileOnly ? '#ffffff' : '#000000',
    flexShrink: 0,
  },
  btnClose: {
    color: isMobileOnly ? '#ffffff' : theme.palette.grey[500],
  },
  headerSticky: {
    position: 'sticky',
    backgroundColor: '#ffffff',
    borderBottom: `1px solid ${theme.palette.borderColor[0]}`,
    top: 0,
    padding: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomSticky: {
    position: 'sticky',
    backgroundColor: '#ffffff',
    borderTop: `1px solid ${theme.palette.borderColor[0]}`,
    bottom: 0,
    padding: theme.spacing(2, 0),
  },
  title: {
    fontWeight: 'bold',
  },
  booking_code: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textAlign: 'right',
    fontFamily: theme.typography.fontMedium,
  },
  coin: {
    color: theme.palette.textColor[9],
  },
  normal_text: {
    color: theme.palette.textColor[1],
  },
  detail_text: {
    color: theme.palette.textColor[2],
  },
  bold_text: {
    fontWeight: 'bold',
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  shadowView: {
    height: theme.spacing(7),
    borderBottomLeftRadius: theme.spacing(5),
    borderBottomRightRadius: theme.spacing(5),
    position: 'absolute',
  },
  shadow1: {
    backgroundColor: '#cacaca',
    bottom: theme.spacing(7),
    left: theme.spacing(5),
    right: theme.spacing(5),
    zIndex: 2,
  },
  shadow2: {
    backgroundColor: '#808080',
    bottom: theme.spacing(5),
    left: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 1,
  },
  actionsWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

export { useStyles };
