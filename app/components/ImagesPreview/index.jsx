import React, { memo, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ButtonBase, Typography } from '@material-ui/core';
import Img from 'components/Img';
import Slideshow from 'components/Slideshow';
import get from 'lodash/get';
import LoupeIcon from '@material-ui/icons/ZoomInOutlined';
import ReactImageMagnify from 'react-image-magnify';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    // border: `1px solid ${theme.palette.primary.main}`,
    width: 272,
    // overflow: 'hidden',
  },
  imageList: {
    height: 100,
    marginTop: theme.spacing(4),
  },
  selectedImage: {
    width: 256,
    height: 256,
    // margin: 'auto',
    // display: 'block',
  },
  thumbButton: {
    width: 66,
    height: 80,
    paddingLeft: 3,
    paddingRight: 3,
  },
  thumbImage: {
    width: 60,
    height: 80,
    margin: 'auto',
    display: 'block',
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
  },
  thumbImageNormal: {
    border: '1px solid #cccccc',
  },
  thumbImageSelected: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  guideGroup: {
    marginTop: theme.spacing(4),
  },
  loupeIcon: {
    color: '#333333',
    width: 20,
    height: 20,
  },
  loupeGuide: {
    fontSize: 13,
    color: theme.palette.primary.main,
  },
}));

function ImagesPreview(props) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState();

  const { data = [] } = props;
  const images = useMemo(() => {
    const r = data.map(img => ({
      id: img.imageId,
      url: img.imageLocation,
      thumbUrl: img.imageLocation,
    }));
    return r;
  }, [data]);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const smallImage = useMemo(
    () => ({
      alt: 'photo',
      isFluidWidth: true,
      // width: 256,
      // height: 256,
      src: selectedImage ? selectedImage.thumbUrl : '',
    }),
    [selectedImage],
  );
  const largeImage = useMemo(
    () => ({
      src: selectedImage ? selectedImage.url : '',
      width: 800,
      height: 800,
    }),
    [selectedImage],
  );

  const renderItem = React.useCallback(
    item => (
      <ButtonBase
        key={shortid.generate()}
        className={classes.thumbButton}
        onClick={() => setSelectedImage(item)}
      >
        <Img
          src={item.thumbUrl}
          className={
            get(selectedImage, 'id') === item.id
              ? `${classes.thumbImage} ${classes.thumbImageSelected}`
              : `${classes.thumbImage} ${classes.thumbImageNormal}`
          }
        />
      </ButtonBase>
    ),
    [],
  );

  return (
    <div className={classes.root}>
      {selectedImage && (
        <ReactImageMagnify
          smallImage={smallImage}
          largeImage={largeImage}
          className={classes.selectedImage}
          enlargedImagePosition="over"
        />
      )}
      <Grid container justify="center" className={classes.guideGroup}>
        <Grid item>
          <LoupeIcon className={classes.loupeIcon} />
        </Grid>
        <Grid item>
          <Typography display="inline" className={classes.loupeGuide}>
            Rê chuột lên hình để phóng to
          </Typography>
        </Grid>
      </Grid>
      {images && (
        <Slideshow
          items={images}
          variableWidth
          slidesToScroll={3}
          className={`${classes.imageList} slide variable-width`}
          renderItem={renderItem}
        />
      )}
    </div>
  );
}

ImagesPreview.propTypes = {
  data: PropTypes.array,
};

export default memo(ImagesPreview);
