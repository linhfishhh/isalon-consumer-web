import { isNative } from 'utils/platform';

export default class ImageService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  uploadImage(folderPath, image) {
    const data = new FormData();
    data.append('file', image.file);
    data.append('folderPath', folderPath);
    data.append('isPublic', true);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.apiService.post('/images', data, config);
  }

  createCollectionImage(folderPath, images) {
    const data = new FormData();
    images.forEach((image, index) => {
      if (isNative) {
        data.append(`files[${index}]`, image.file.blob, image.file.fileName);
      } else {
        data.append(`files[${index}]`, image.file);
      }
    });
    data.append('folderPath', folderPath);
    data.append('isPublic', true);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.apiService.post('collections/create', data, config);
  }

  updateCollectionImage(collectionId, folderPath, images) {
    const data = new FormData();
    let indexNewImage = 0;
    images.forEach((image, index) => {
      if (image.new) {
        data.append(`files[${indexNewImage}]`, image.file);
        data.append(`imageOrders[${index}].index`, indexNewImage);
        indexNewImage += 1;
      } else {
        data.append(`imageOrders[${index}].imageId`, image.imageId);
      }
    });
    data.append('collectionId', collectionId);
    data.append('folderPath', folderPath);
    data.append('isPublic', true);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return this.apiService.post('/collections/update', data, config);
  }

  getImage(imageId) {
    return this.apiService.get(`/images/${imageId}/get`);
  }

  getImages(imageIds) {
    return this.apiService.get(`/images/list?imageIds=${imageIds.join(',')}`);
  }

  getImageCollection(collectionId) {
    return this.apiService.get(`/collections/${collectionId}`);
  }

  getImageCollections(collectionIds) {
    return this.apiService.get(
      `/collections/list?collectionIds=${collectionIds.join(',')}`,
    );
  }
}
