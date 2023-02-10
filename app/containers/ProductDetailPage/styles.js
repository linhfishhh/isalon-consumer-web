import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginTop: isMobileOnly ? 0 : theme.spacing(4),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
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
    fontSize: 12,
    color: theme.palette.textColor[8],
  },
  shipLocation: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },
  chatButton: {
    width: '100%',
    border: '1px solid #d2d2d2',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: theme.spacing(2),
  },
  chatIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  shipPanel: {
    backgroundColor: '#fafafa',
    padding: theme.spacing(4),
  },
  productItemContainer: {
    width: 150,
    height: 300,
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  productItemInfoContainer: {
    width: 150,
    height: 150,
    paddingBottom: 10,
  },
  productItemCover: {
    width: 134,
    height: 150,
    // margin: 'auto',
    // display: 'block',
    // border: '0.5px solid #d2d2d2aa',
  },
  productName: {
    fontSize: 13,
    width: 130,
    // height: 50,
    color: theme.palette.textColor[0],
  },
  relatedList: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  productDetailContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: 3,
    overflow: 'hidden',
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
  productDescMinimize: {
    height: 200,
  },
  minimizeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItem: {
    width: isMobileOnly ? 'auto' : '194px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
  viewedProducts: {
    marginTop: theme.spacing(3),
    marginLeft: isMobileOnly ? 0 : theme.spacing(3),
    marginRight: isMobileOnly ? 0 : theme.spacing(3),
    width: '100%',
  },
  shipAddress: {
    fontSize: 14,
    color: theme.palette.textColor[1],
  },
  gridList: {
    flexWrap: 'nowrap !important',
    transform: 'translateZ(0)',
  },
  plusSign: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  relatedItem: {
    width: '190px !important',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  shipInfoWrapper: {
    width: 330,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default useStyles;
