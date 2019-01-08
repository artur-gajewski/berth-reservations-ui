// @flow
import React from 'react';
import { FormGroup, Input, FormText, FormFeedback, InputGroupAddon, InputGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';
import validator, { mustBePresent } from '../../../utils/formValidation';

import Label from './Label';

const TextInput = (type: any) => ({
  id,
  name,
  label,
  required,
  prepend,
  append,
  text,
  noValidate,
  validate,
  placeholder,
  parse,
  intl: { formatMessage },
  ...rest
}: any) => (
  <Field
    name={name}
    type={type}
    parse={parse}
    required={noValidate ? false : required}
    validate={noValidate ? undefined : validator(required ? mustBePresent : null, validate || null)}
  >
    {({ input, meta }) => (
      <FormGroup>
        {label && <Label htmlFor={id} required={noValidate ? false : required} text={label} />}
        <InputGroup>
          {prepend && <InputGroupAddon addonType="prepend">{prepend}</InputGroupAddon>}
          <Input
            type={type}
            required={noValidate ? false : required}
            invalid={!!(meta.touched && meta.error)}
            placeholder={placeholder ? formatMessage({ id: placeholder }) : ''}
            {...input}
            {...rest}
          />
          {append && <InputGroupAddon addonType="append">{append}</InputGroupAddon>}{' '}
          {meta.error && (
            <FormFeedback>
              <FormattedMessage id={meta.error} />
            </FormFeedback>
          )}
          {text && (
            <FormText>
              <FormattedMessage id={text} />
            </FormText>
          )}
        </InputGroup>
      </FormGroup>
    )}
  </Field>
);

export default TextInput;
