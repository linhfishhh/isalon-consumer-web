import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import {
  Grid,
  GridListTile,
  GridListTileBar,
  Button,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import { isNative } from 'utils/platform';
import { resizeFileImage } from 'utils/images';

import { InputFile, Label, useStyles, ImageStyle } from './styles';

const ImagesUpload = props => {
  const { id, multiple, limit, type, onChangeImage } = props;

  const classes = useStyles();
  const [images, setImages] = useState([]);

  const removeImage = (e, indexRemove) => {
    e.preventDefault();
    images.splice(indexRemove, 1);
    setImages([...images]);
    onChangeImage(images);
  };

  const onChange = e => {
    e.preventDefault();
    const { files } = e.target;
    const imageFiles = Array.from(files).filter(
      file => findIndex(images, image => image.file.name === file.name) < 0,
    );
    imageFiles.splice(limit - images.length);

    const imagesSelect = [];
    imageFiles.forEach(file => {
      resizeFileImage(file, blob => {
        let newFile = new File([blob], file.name, {
          type: blob.type,
          lastModified: new Date(),
        });
        if (isNative) {
          newFile = { blob, fileName: file.name };
        }
        const image = {
          file: newFile,
          imageSource: URL.createObjectURL(blob),
        };
        imagesSelect.push(image);
        if (imagesSelect.length === imageFiles.length) {
          const newImages = [...images, ...imagesSelect];
          setImages(newImages);
          onChangeImage(newImages);
        }
      });
    });
  };

  const renderItem = (image, index) => (
    <GridListTile
      key={image.id || index}
      component="div"
      className={classes.title}
    >
      <ImageStyle
        src={image.imageSource}
        alt="uploaded"
        className={classes.image}
      />
      <GridListTileBar
        titlePosition="top"
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton size="small" onClick={e => removeImage(e, index)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </GridListTile>
  );

  return (
    <Grid container spacing={2}>
      {((multiple && images.length < limit) || !images.length) && (
        <Grid item>
          <InputFile
            type="file"
            id={id}
            onChange={e => onChange(e)}
            multiple={multiple}
            accept="image/jpeg"
          />
          {type === 'icon' ? (
            <Label htmlFor={id}>
              <figure>
                <AddPhotoAlternateOutlinedIcon className={classes.icon} />
              </figure>
            </Label>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => document.getElementById(id).click()}
              startIcon={<CloudUploadIcon />}
            >
              Tải lên
            </Button>
          )}
        </Grid>
      )}
      {images.map((item, index) => (
        <Grid item key={item.id || index}>
          {renderItem(item, index)}
        </Grid>
      ))}
    </Grid>
  );
};

ImagesUpload.defaultProps = {
  id: 'input-file',
  multiple: false,
  type: 'icon',
};

ImagesUpload.propTypes = {
  id: PropTypes.string,
  multiple: PropTypes.bool,
  limit: PropTypes.number,
  onChangeImage: PropTypes.func,
  type: PropTypes.oneOf(['icon', 'button']),
};

export default memo(ImagesUpload);
