// @flow
import { get } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getBerthFilterByValues = (values: any, selectedServices: any) => {
  const width = get(values, 'boat_width', '').replace(',', '.');
  const length = get(values, 'boat_length', '').replace(',', '.');
  const boatType = get(values, 'boat_type', '').replace(',', '.');
  const services = Object.entries(selectedServices.toObject())
    .filter(([, state]) => state)
    .map(([type]) => type);
  return (b: any) => {
    const filterByService = services.reduce((acc, cur) => acc && b[cur], true);
    const filterByWidth = b.maximum_width >= width;
    const filterByLenght = b.maximum_length >= length;
    const filterByBoatTypeIds = boatType ? b.suitable_boat_types.includes(boatType) : true;
    return filterByService && filterByWidth && filterByLenght && filterByBoatTypeIds;
  };
};

export const getLocalizedText = (keyId: Object, locale: string) =>
  locale === 'sv' ? keyId.sv : keyId.fi;
