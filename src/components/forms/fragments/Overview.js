// @flow

import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import Joi from 'joi';
import { FormattedMessage } from 'react-intl';

import { Checkbox } from '../Fields';

export const schema = Joi.object().keys({
  email: Joi.boolean(),
  sms: Joi.boolean(),
  guarantee: Joi.boolean(),

  receivable_boating_info: Joi.boolean(),
  receivable_fitness_services: Joi.boolean(),
  receivable_library_services: Joi.boolean(),
  receivable_other_cultural_services: Joi.boolean()
});

type Props = {
  prefix: string
};

const OverviewForm = ({ prefix }: Props) => (
  <Container fluid>
    <FormattedMessage tagName="h3" id="page.overview.form.section.info_options" />
    <Row>
      <Col sm={3}>
        <Checkbox
          id="form.overview.email"
          name={`${prefix}.email`}
          label="page.overview.form.section.info_options.email"
          inline={false}
        />
      </Col>
      <Col sm={3}>
        <Checkbox
          id="form.overview.sms"
          name={`${prefix}.sms`}
          label="page.overview.form.section.info_options.sms"
          inline={false}
        />
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        <Checkbox
          id="form.overview.guarantee"
          name={`${prefix}.guarantee`}
          label="page.overview.form.section.info_options.guarantee"
          inline={false}
        />
      </Col>
    </Row>

    <FormattedMessage tagName="h5" id="page.overview.form.section.info_options.receivable_items" />
    <Row>
      <Col sm={6}>
        <Checkbox
          id="form.overview.receivable_boating_info"
          name={`${prefix}.receivable_boating_info`}
          label="page.overview.form.section.info_options.receivable_items.boating_info"
          inline={false}
        />
      </Col>
    </Row>

    <FormattedMessage
      tagName="h6"
      id="page.overview.form.section.info_options.receivable_items.also"
    />

    <Row>
      <Col sm={3}>
        <Checkbox
          id="receivable_fitness_services"
          name={`${prefix}.receivable_fitness_services`}
          label="page.overview.form.section.info_options.receivable_items.fitness_services"
          inline={false}
        />
      </Col>
      <Col sm={3}>
        <Checkbox
          id="receivable_library_services"
          name={`${prefix}.receivable_library_services`}
          label="page.overview.form.section.info_options.receivable_items.library_services"
          inline={false}
        />
      </Col>
      <Col sm={3}>
        <Checkbox
          id="receivable_other_cultural_services"
          name={`${prefix}.receivable_other_cultural_services`}
          label="page.overview.form.section.info_options.receivable_items.other_cultural_services"
          inline={false}
        />
      </Col>
    </Row>
  </Container>
);

export default OverviewForm;
