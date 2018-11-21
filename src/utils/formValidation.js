// @flow

export const mustBePresent = (value: any): any =>
  value ? undefined : 'validation.message.required';

export const mustBeNumber = (value: any): any =>
  Number.isNaN(value) ? 'validation.message.must_be_number' : undefined;

export const mustBePhoneNumber = (value: any): any => {
  /* eslint-disable */
  const phoneRe = /^([0-9\(\)\s\+\-])+$/im;
  /* eslint-enable */
  if (phoneRe.test(value)) {
    return undefined;
  }
  return 'validation.message.must_be_phone_number';
};

export const mustBeEmail = (value: any): any => {
  /* eslint-disable */
  const emailRe = /^.*\@.*\..*$/im;
  /* eslint-enable */
  if (emailRe.test(value)) {
    return undefined;
  }
  return 'validation.message.must_be_email';
};

export default (f1: Function | null, f2: Function | null) => (x: any): any => {
  let validated;
  if (f1) {
    validated = f1(x);
  }
  if (!validated && f2) {
    validated = f2(x);
  }
  return validated;
};
