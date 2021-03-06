// @flow
import React from 'react';
import styled from 'styled-components';
import { injectIntl, type intlShape } from 'react-intl';
import Step from './Step';

const StepIndicatorSection = styled.div`
  background-color: ${props => props.theme.colors.helFog};
  padding-top: 2em;
  padding-bottom: 1em;
`;

const StepContainer = styled.div`
  display: flex;
  margin: 0 -0.25em;
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
      {steps.map(({ key, completed, current, linkTo }) => (
        <Step
          key={key}
          linkTo={linkTo}
          completed={completed}
          current={current}
          label={formatMessage({ id: `site.steps.${key}` })}
        />
      ))}
    </StepContainer>
  </StepIndicatorSection>
);

export default injectIntl(Steps);
