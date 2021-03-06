// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Text } from '../Fields';

import { mustBePhoneNumber, mustBeEmail } from '../../../utils/formValidation';

const ContactDetailsFragment = () => (
  <Row>
    <Col sm={4}>
      <Text
        validate={mustBePhoneNumber}
        name={`phone_number`}
        label="form.contact_details.field.mobile_phone.label"
        placeholder="form.contact_details.field.mobile_phone.placeholder"
        required
      />
    </Col>
    <Col sm={4}>
      <Text
        validate={mustBeEmail}
        name={`email`}
        label={`form.contact_details.field.email.label`}
        placeholder={`form.contact_details.field.email.placeholder`}
        required
      />
    </Col>
  </Row>
);

export default ContactDetailsFragment;
