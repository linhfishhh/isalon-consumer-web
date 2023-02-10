import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cls_1: {
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.5px',
    stroke: props =>
      props.active
        ? props.activeColor || theme.palette.primary.main
        : props.color || theme.palette.grey[500],
  },
  cls_2: {
    fill: props =>
      props.active
        ? props.activeColor || theme.palette.primary.main
        : props.color || theme.palette.grey[500],
  },
  cls_3: {
    fill: 'none',
    strokeMiterlimit: 10,
    stroke: theme.palette.grey[500],
  },
  cls_4: {
    fill: 'none',
    strokeMiterlimit: 10,
    stroke: theme.palette.primary.main,
  },
  cls_5: {
    fill: props => props.color || theme.palette.primary.main,
  },
  cls_6: {
    stroke: props => props.color || theme.palette.primary.main,
  },
}));

export default useStyles;
