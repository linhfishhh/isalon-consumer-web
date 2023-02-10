import isEmpty from 'lodash/isEmpty';
import unset from 'lodash/unset';
import compact from 'lodash/compact';
import queryString from 'query-string';
import { path } from 'routers/path';
import { convertToQueryString, currencyFormat } from 'utils/stringFormat';
import { DEFAULT_PAGE_SIZE } from 'utils/constants';
import { viewTypes, searchTypes, unitSearch } from './enums';
import { getCurrentPosition } from './localStorage/location';
import { getProvinces } from './localStorage/provinces';
import { getSearchConfigs } from './localStorage/search';

// Booking search

export const defaultFilters = {
  viewType: viewTypes.types[0],
  isSale: false,
  priceFrom: 0,
  priceTo: 5000000,
  distance: 5,
  rating: 0,
  districts: [],
};

export const searchParamsDefault = (extra = {}) => {
  if (viewTypes.isNearMe(extra.viewType)) {
    unset(extra, 'location');
    unset(extra, 'location_lv');
  }
  return {
    cat: [],
    is_sale: false,
    keyword: '',
    location: false,
    location_lv: false,
    price_from: 0,
    price_to: 0,
    rating: 0,
    // search_type: 'salon', or service
    ...extra,
  };
};

export const getCoordsSearch = (
  params = {
    viewType: viewTypes.valueWithIndex(0),
  },
) => {
  const { address, viewType } = params;
  const coords = {};
  const { position } = getCurrentPosition();
  coords.from_lat = position.lat;
  coords.from_lng = position.lng;

  if (viewTypes.isNearMe(viewType)) {
    coords.address_lat = position.lat;
    coords.address_lng = position.lng;
  } else if (!isEmpty(address)) {
    coords.from_lat = address.lat;
    coords.from_lng = address.lng;
  }
  return coords;
};

export const formatPriceValue = values => {
  let result = '';
  const [priceFrom, priceTo] = values;
  if (
    priceFrom === defaultFilters.priceFrom &&
    priceTo === defaultFilters.priceTo
  ) {
    result = 'Bất Kỳ';
  } else if (priceFrom === defaultFilters.priceFrom) {
    result = `Đến ${currencyFormat(priceTo)}`;
  } else if (priceTo === defaultFilters.priceTo) {
    result = `Từ ${currencyFormat(priceFrom)}`;
  } else {
    result = `Từ ${currencyFormat(priceFrom)} đến ${currencyFormat(priceTo)}`;
  }
  return result;
};

export const queryStringToFilter = search => {
  const provinces = getProvinces();
  const searchConfig = getSearchConfigs();
  const { cats = [] } = searchConfig;

  const {
    view_type: viewType,
    search_type: searchType,
    keyword,
    cat,
    distance,
    rating,
    is_sale: isSale,
    price_to: priceTo,
    price_from: priceFrom,
    location,
    location_lv: locationLv,
    unit,
    province,
    page,
  } = queryString.parse(search, { arrayFormat: 'bracket' });

  const filter = {};
  filter.keyword = keyword || '';
  filter.viewType = viewTypes.typeOfValue(viewType) || viewTypes.types[0];
  filter.searchType =
    searchTypes.typeOfValue(searchType) || searchTypes.types[0];
  filter.rating = Number(rating) || 0;
  filter.isSale = Boolean(isSale);
  filter.distance = Number(distance) || defaultFilters.distance;
  filter.priceTo = !Number(priceTo) ? defaultFilters.priceTo : Number(priceTo);
  filter.priceFrom = !Number(priceFrom)
    ? defaultFilters.priceFrom
    : Number(priceFrom);
  if (cat) {
    const services = cats.filter(item => cat.includes(`${item.id}`));
    filter.services = services;
  } else {
    filter.services = [];
  }
  if (locationLv === '1') {
    if (location) {
      const provinceList = provinces.filter(item =>
        location.includes(`${item.provinceId}`),
      );
      filter.provinces = provinceList;
    } else {
      filter.provinces = [];
    }
    filter.locationLv = locationLv;
    filter.unit = unitSearch.typeOfValue(unit) || unitSearch.typeOfValue('all');
  } else if (locationLv === '2') {
    filter.districts = location ? location.map(item => Number(item)) : [];
    filter.locationLv = locationLv;
    filter.unit =
      unitSearch.typeOfValue(unit) || unitSearch.typeOfValue('province');
    if (province) {
      const provinceList = provinces.filter(
        item => province === `${item.provinceId}`,
      );
      filter.provinces = provinceList;
    } else {
      filter.provinces = [];
    }
  } else if (search) {
    filter.provinces = [];
    filter.districts = [];
    filter.unit = unitSearch.typeOfValue('all');
  } else {
    const { province: currentProvince } = getCurrentPosition();
    filter.provinces = [currentProvince];
    filter.locationLv = 1;
    filter.unit = unitSearch.typeOfValue('province');
  }

  if (page) {
    filter.page = Number(page) || 0;
  }
  return filter;
};

export const filterToParams = filter => {
  const {
    services,
    searchType,
    viewType,
    keyword,
    distance,
    rating,
    isSale,
    priceFrom,
    priceTo,
    provinces,
    districts,
    page,
  } = filter;

  const params = {};
  params.keyword = keyword;

  if (!isEmpty(services)) {
    const serviceIds = services.map(item => item.id);
    params.cat = serviceIds;
  }
  if (searchType) {
    params.search_type = searchType.value;
  }
  if (viewType && !viewTypes.isDefault(viewType.value)) {
    params.view_type = viewType.value;
  }
  if (distance && viewTypes.isNearMe(viewType.value)) {
    params.distance = distance;
  }
  if (rating) {
    params.rating = rating;
  }
  if (isSale) {
    params.is_sale = isSale;
  }
  params.price_from = priceFrom;
  if (priceTo === defaultFilters.priceTo) {
    params.price_to = 0;
  } else {
    params.price_to = priceTo;
  }
  if (isEmpty(districts)) {
    if (!isEmpty(provinces)) {
      params.location = provinces.map(item => item.provinceId);
      params.location_lv = 1;
    }
  } else {
    params.location = districts;
    params.location_lv = 2;
  }
  if (page) {
    params.page = page;
  }

  return params;
};

export const filterToQueryString = filter => {
  const {
    services,
    searchType,
    viewType,
    keyword,
    distance,
    rating,
    isSale,
    priceFrom,
    priceTo,
    provinces,
    districts,
    unit,
    page,
  } = filter;

  const queryStringObj = {};
  queryStringObj.keyword = keyword;

  if (!isEmpty(services)) {
    const serviceIds = services.map(item => item.id);
    queryStringObj.cat = serviceIds;
  }
  if (searchType) {
    queryStringObj.search_type = searchType.value;
  }
  if (viewType && !viewTypes.isDefault(viewType.value)) {
    queryStringObj.view_type = viewType.value;
  }
  if (distance && viewTypes.isNearMe(viewType)) {
    queryStringObj.distance = distance;
  }
  if (rating) {
    queryStringObj.rating = rating;
  }
  if (isSale) {
    queryStringObj.is_sale = isSale;
  }
  queryStringObj.price_from = priceFrom;
  if (priceTo === defaultFilters.priceTo) {
    queryStringObj.price_to = 0;
  } else {
    queryStringObj.price_to = priceTo;
  }
  if (unit) {
    queryStringObj.unit = unit.value;
  }
  if (isEmpty(districts)) {
    if (!isEmpty(provinces)) {
      queryStringObj.location = provinces.map(item => item.provinceId);
      queryStringObj.location_lv = 1;
    }
  } else {
    queryStringObj.location = districts;
    queryStringObj.location_lv = 2;
    if (!isEmpty(provinces)) {
      const [province] = provinces;
      queryStringObj.province = province.provinceId;
    }
  }
  if (page) {
    queryStringObj.page = page;
  }

  return `?${queryString.stringify(queryStringObj, {
    arrayFormat: 'bracket',
  })}`;
};

export function unitToAddress(province, district, ward) {
  const units = [ward, district, province];
  const result = compact(units).map(item => item.name);
  return result.join(', ');
}

// Product search
export function gotoSearchResultPage(history, params) {
  history.push(
    path.productSearch +
      convertToQueryString({
        ...params,
        viewType: 'grid',
        page: 0,
        limit: DEFAULT_PAGE_SIZE,
      }),
  );
}
