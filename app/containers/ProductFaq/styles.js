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
  writeFaqContainer: {
    border: '0.5px solid #d2d2d2aa',
    paddingLeft: theme.spacing(3),
    maxWidth: 600,
  },
  writeFaqButton: {
    borderRadius: 0,
    height: 50,
    width: isMobileOnly ? 125 : 150,
  },
  writeFaqMessage: {
    maxWidth: 600,
  },
  loginButton: {
    color: theme.palette.primary.main,
  },
  noFaqContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  faqItemContainer: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  faqAskText: {
    fontWeight: 'bold',
  },
  faqAnswerText: {
    color: theme.palette.primary.main,
  },
  faqItemDivier: {
    marginTop: theme.spacing(4),
  },
  faqIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
