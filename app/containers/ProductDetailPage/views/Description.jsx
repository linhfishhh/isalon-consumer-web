import React, { memo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
} from '@material-ui/core';
import map from 'lodash/map';
import { makeStyles } from '@material-ui/core/styles';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import { path } from 'routers/path';
import Rating from '@material-ui/lab/Rating';
import { FacebookShareButton } from 'react-share';

import { isAuthenticated, showSignInDialog } from 'utils/auth';
import { useAuthentication } from 'utils/hooks';
import { shareFacebook, getLinkShareProduct } from 'utils/share';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isNative, isMobileOnly } from 'utils/platform';
import { getSettings } from 'utils/localStorage/settings';
import { gotoSearchResultPage } from 'utils/searchHelper';

import ProductPrice from 'components/ProductPrice';
import QuantitySelector from 'components/QuantitySelector';
import { showCartNotificationRequest } from 'containers/Header/actions';
import headerReducer from 'containers/Header/reducer';
import { CONTEXT as HEADER_CONTEXT } from 'containers/Header/constants';
import DiscountCode from 'containers/DiscountCode';

import { FavoriteIcon, FavoredIcon } from 'assets/svgIcon/FavoriteIcon';
import ShareIcon from 'assets/svgIcon/ShareIcon';

import AddCartSuccessDialog from './AddCartSuccessDialog';
import ChooseVariant from './ChooseVariant';
import saga from '../saga';
import { CONTEXT } from '../constants';
import {
  addProductsToCartRequest,
  getProductVariantsRequest,
  likeProductRequest,
  unlikeProductRequest,
} from '../actions';
import { makeSelectProductVariants } from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.textColor[0],
  },
  rate: {
    fontSize: 16,
  },
  star: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    fontSize: 11,
    color: theme.palette.primary.main,
  },
  key: {
    color: theme.palette.textColor[8],
  },
  brand: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  infoIcon: {
    padding: 0,
  },
  discountPercent: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: theme.spacing(6),
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.secondary.main,
    paddingRight: theme.spacing(1),
    borderTopRightRadius: theme.shape.borderRadius / 2,
    borderBottomRightRadius: theme.shape.borderRadius / 2,
    height: 20,
    '&:before': {
      border: `10px solid transparent`,
      borderRightColor: theme.palette.secondary.main,
      content: "''",
      position: 'absolute',
      left: -20,
      top: 0,
    },
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    display: 'inline',
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  originPrice: {
    color: theme.palette.textColor[7],
    textDecoration: 'line-through',
    fontSize: 16,
  },
  addCartButton: {
    backgroundColor: '#f6921e',
  },
  actionButtons: {
    marginTop: theme.spacing(3),
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  share: {
    marginRight: theme.spacing(4),
  },
}));

function Description(props) {
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: HEADER_CONTEXT, reducer: headerReducer });

  const classes = useStyles();
  const {
    dispatch,
    data = {},
    addProductsToCart,
    getProductVariants,
    productVariants,
    likeProduct,
    unlikeProduct,
  } = props;
  const [quantity, setQuantity] = useState(1);
  const [openAddCartSuccessDlg, setOpenAddCartSuccessDlg] = useState(false);
  const shareUrl = window.location.href;
  const { authenticated: isLoggedIn } = useAuthentication();
  const history = useHistory();
  const settings = getSettings();

  const getRequestPayload = useCallback(() => {
    const { productId, defaultProductVariant } = data;
    let payload = {
      productId,
      quantity,
    };
    let selectedVariant = defaultProductVariant;
    if (productVariants && productVariants.length > 0) {
      [selectedVariant] = productVariants;
    }
    if (selectedVariant) {
      payload = {
        ...payload,
        productVariantId: selectedVariant.productVariantId,
        quantity,
      };
    }
    return payload;
  }, [data, quantity, productVariants]);

  const getSelectedProductVariant = () => {
    const { defaultProductVariant } = data;
    let selectedVariant = defaultProductVariant;
    if (productVariants && productVariants.length > 0) {
      [selectedVariant] = productVariants;
    }
    if (selectedVariant) {
      return selectedVariant;
    }
    return data;
  };

  const mapRequestPayloadToCartItems = payload => {
    const ret = {
      product: data,
      productVariant: getSelectedProductVariant(),
      quantity: payload.quantity,
    };
    return [ret];
  };

  const onAddProductsToCart = () => {
    if (addProductsToCart && isAuthenticated()) {
      const payload = getRequestPayload();
      addProductsToCart({
        cartItems: [payload],
        callback: () => {
          if (isMobileOnly) {
            setOpenAddCartSuccessDlg(true);
          } else {
            dispatch(showCartNotificationRequest(true));
          }
        },
      });
    } else {
      showSignInDialog(dispatch);
    }
  };

  const onClickLoggin = () => {
    showSignInDialog(dispatch);
  };

  const onSelectVariantValues = useCallback(
    opts => {
      if (data && opts && opts.length > 0) {
        const variantValueIds = map(opts, 'variantValueId').join(',');
        const { productId } = data;
        getProductVariants({ productId, variantValueIds });
      }
    },
    [data],
  );

  const onQuantityChange = useCallback(q => {
    setQuantity(q);
  }, []);

  const onLikeOrUnlike = useCallback(() => {
    if (data) {
      if (data.isFavorite === false) {
        likeProduct({ productId: data.productId });
      } else {
        unlikeProduct({ productId: data.productId });
      }
    }
  }, [data]);

  const onViewBrand = brand => {
    gotoSearchResultPage(history, { brandIds: [brand.brandId] });
  };

  const handlerShare = useCallback(() => {
    const linkShare = getLinkShareProduct(data);
    shareFacebook(linkShare);
  }, [data]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography className={classes.productName}>{data.name}</Typography>
        </Grid>
        <Grid item className={classes.rate}>
          <Grid container alignItems="center">
            {settings.rating && (
              <>
                <Grid item>
                  <Typography display="inline">
                    {data.productRate ? data.productRate.rate.toFixed(1) : 0}
                  </Typography>
                </Grid>
                <Grid item className={classes.alignCenter}>
                  <Rating
                    className={classes.star}
                    readOnly
                    value={data.productRate ? data.productRate.rate : 0}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    precision={0.5}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.rateNumber}
                    display="inline"
                  >{`(${
                    data.productRate
                      ? data.productRate.numberTotal
                      : 'Không có đánh giá'
                  })`}</Typography>
                </Grid>
                <Grid item xs />
              </>
            )}
            <Grid item>
              {isNative ? (
                <IconButton onClick={handlerShare}>
                  <ShareIcon />
                </IconButton>
              ) : (
                <FacebookShareButton className={classes.share} url={shareUrl}>
                  <ShareIcon />
                </FacebookShareButton>
              )}
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={onLikeOrUnlike}>
                {data.isFavorite ? <FavoredIcon /> : <FavoriteIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Typography display="inline" className={classes.key}>
              Thương hiệu:
            </Typography>
          </Grid>
          <Grid item>
            <MuiLink
              className={classes.brand}
              onClick={() => onViewBrand(data.brand)}
            >
              {data.brand ? data.brand.name : ''}
            </MuiLink>
          </Grid>
        </Grid>
        <Grid item>
          <Typography display="inline" className={classes.key}>
            Miễn phí vận chuyển
          </Typography>
        </Grid>
        <Grid item>
          <ProductPrice
            product={getSelectedProductVariant()}
            spaceBetween={false}
          />
        </Grid>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <Typography display="inline" className={classes.key}>
              Khuyễn mãi
            </Typography>
          </Grid>
          <Grid item>
            <DiscountCode />
          </Grid>
        </Grid>
        <Grid item>
          <QuantitySelector onChange={onQuantityChange} />
        </Grid>
        <Grid item>
          <ChooseVariant
            product={data}
            onSelectVariantValues={onSelectVariantValues}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2} className={classes.actionButtons}>
            <Grid item>
              {(!isLoggedIn && (
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  onClick={onClickLoggin}
                >
                  MUA NGAY
                </Button>
              )) || (
                <Link
                  to={{
                    pathname: path.confirmOrder,
                    state: {
                      items: [getRequestPayload()],
                    },
                  }}
                >
                  <Button color="primary" variant="contained" disableElevation>
                    MUA NGAY
                  </Button>
                </Link>
              )}
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                className={classes.addCartButton}
                disableElevation
                onClick={onAddProductsToCart}
              >
                THÊM VÀO GIỎ HÀNG
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isMobileOnly && (
        <AddCartSuccessDialog
          open={openAddCartSuccessDlg}
          items={mapRequestPayloadToCartItems(getRequestPayload())}
          onClose={() => setOpenAddCartSuccessDlg(false)}
        />
      )}
    </div>
  );
}

Description.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  addProductsToCart: PropTypes.func,
  getProductVariants: PropTypes.func,
  productVariants: PropTypes.array,
  likeProduct: PropTypes.func,
  unlikeProduct: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productVariants: makeSelectProductVariants(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addProductsToCart: params => dispatch(addProductsToCartRequest(params)),
    getProductVariants: params => dispatch(getProductVariantsRequest(params)),
    likeProduct: params => dispatch(likeProductRequest(params)),
    unlikeProduct: params => dispatch(unlikeProductRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Description);
