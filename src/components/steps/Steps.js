// @flow
import React from 'react';
import styled from 'styled-components';
import { injectIntl, type intlShape } from 'react-intl';
import { Col, Row, Container } from 'reactstrap';
import Step from './Step';
import media from '../../utils/responsive';

const StepIndicatorSection = styled.div`
  background-color: ${props => props.theme.colors.helFog};
  padding-top: 4em;
  padding-bottom: 1em;
`;

const StepContainer = styled(Container)`
  ${media.md`
    width: ${props => props.theme.maxWidth.xl};
  `};
`;
type StepProp = { key: string, completed: boolean, current: boolean, linkTo?: string };
type StepsProp = Array<StepProp>;
type Props = {
  intl: intlShape,
  steps: StepsProp
};

const Steps = ({ intl: { formatMessage }, steps }: Props) => (
  <StepIndicatorSection>
    <StepContainer>
      <Row>
        {steps.map(({ key, completed, current, linkTo }) => (
          <Col xs="2" key={key}>
            <Step
              linkTo={linkTo}
              completed={completed}
              current={current}
              label={formatMessage({ id: `site.steps.${key}` })}
            />
          </Col>
        ))}
      </Row>
    </StepContainer>
  </StepIndicatorSection>
);

export default injectIntl(Steps);
