// @flow

import React from 'react';
import { Row, Col } from 'reactstrap';

import { Number } from '../Fields';
import { BoatType } from '../Selects';
import type { FormFragmentProps } from '../../../types/form';
import { mustBePositiveNumber } from '../../../utils/formValidation';
import type { WithBoatType } from '../Selects';

const UnRegisteredBoatDetailsFragment = ({
  prefix,
  noValidate = false,
  boatTypes
}: FormFragmentProps & WithBoatType) => (
  <Row>
    <Col sm={4}>
      <BoatType prefix={prefix} noValidate={noValidate} boatTypes={boatTypes} />
    </Col>
    <Col sm={4}>
      <Number
        noValidate={noValidate}
        validate={mustBePositiveNumber}
        name={`${prefix}.width`}
        label="form.no_boat.field.width.label"
        placeholder="form.no_boat.field.width.placeholder"
        append="m"
        min="0"
        required
      />
    </Col>
    <Col sm={4}>
      <Number
        noValidate={noValidate}
        validate={mustBePositiveNumber}
        name={`${prefix}.length`}
        label="form.no_boat.field.length.label"
        placeholder="form.no_boat.field.length.placeholder"
        append="m"
        min="0"
        required
      />
    </Col>
  </Row>
);

export default UnRegisteredBoatDetailsFragment;
