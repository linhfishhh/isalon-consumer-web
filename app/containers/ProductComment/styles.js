import { makeStyles } from '@material-ui/core/styles';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginTop: theme.spacing(4),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
  },
  padding_4: {
    padding: theme.spacing(4),
  },
  averageRateRoot: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  averageRateText: {
    fontSize: 30,
    color: '#21232c',
  },
  maxRate: {
    fontSize: 16,
    color: '#808080',
  },
  star: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  gradientButton: {
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      '#f7931e',
    )}, 1) 0%, rgba(${theme.hexToRgb('#f15a24')}, 1) 100%)`,
  },
  writeCommentTitle: {
    fontSize: 18,
    color: '#21232c',
  },
  writeCommentGroup: {
    // width: 200,
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  commentItemRoot: {
    marginBottom: theme.spacing(4),
  },
  replyCommentItemRoot: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(3),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fdfdfd',
  },
  commentTitle: {
    fontWeight: 'bold',
    color: '#21232c',
    fontSize: 14,
  },
  commentDetail: {
    color: '#8e8e93',
    fontSize: 13,
  },
  commentImageContainer: {
    width: '170px !important',
    height: '130px !important',
  },
  commentImage: {
    borderRadius: 3,
  },
  gridRoot: {
    marginTop: theme.spacing(3),
    // display: 'flex',
    // flexWrap: 'nowrap',
    // justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap !important',
    transform: 'translateZ(0)',
  },
  noCommentContainer: {
    padding: theme.spacing(5),
  },
  commentAvatar: {
    width: isMobileOnly ? 40 : 60,
    height: isMobileOnly ? 40 : 60,
    borderRadius: '50%',
  },
  commentAvatarItem: {
    width: 52,
  },
}));

export default useStyles;
