import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: {
    border: '0.5px solid #e6e6e6',
    width: 300,
    minHeight: 500,
    backgroundColor: '#fff',
    padding: theme.spacing(4),
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
  tagList: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  tagButton: {
    height: 30,
    borderRadius: 15,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: '#e5e5e5',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tagButtonSelected: {
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const filterTitles = {
  category: 'Các ngành hàng',
  brand: 'Thương hiệu',
  price: 'Giá',
  rate: 'Xếp hạng',
  uses: 'Công dụng',
  origin: 'Xuất xứ',
};

const getFilterTitle = filterName => get(filterTitles, filterName, filterName);

export default useStyles;
export { getFilterTitle };
