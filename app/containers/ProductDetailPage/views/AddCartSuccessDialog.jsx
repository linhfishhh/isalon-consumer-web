import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import CartItem from 'components/CartItem';

import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

const useStyle = makeStyles(theme => ({
  wrapperTitle: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  title: {
    flexGrow: 1,
    margin: 0,
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

function AddCartSuccessDialog(props) {
  const { items, open, onClose } = props;
  const classes = useStyle();

  const history = useHistory();

  const onViewCart = () => {
    history.push(path.cart);
    if (onClose) {
      onClose();
    }
  };

  return (
    (items && (
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle className={classes.wrapperTitle}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                Thêm vào giỏ hàng thành công
              </Typography>
            </Grid>
            <Grid item>
              {onClose ? (
                <IconButton aria-label="close" onClick={onClose} size="small">
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider color="#f0f0f0" className={classes.divider} />
        <DialogContent>
          <div className={classes.content}>
            <List className={classes.list} component="div">
              {items.map((item, index) => (
                <div key={item.cartItemId || index}>
                  <CartItem
                    data={item}
                    // onClickRemove={removeItem}
                    // onClickAddProduct={addProduct}
                    // onClickRemoveProduct={removeProduct}
                    editable={false}
                  />
                  {index < items.length - 1 && (
                    <Divider className={classes.line} />
                  )}
                </div>
              ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={onViewCart}
            fullWidth
          >
            XEM GIỎ HÀNG
          </Button>
        </DialogActions>
      </Dialog>
    )) || <div />
  );
}

AddCartSuccessDialog.propTypes = {
  items: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default memo(AddCartSuccessDialog);
