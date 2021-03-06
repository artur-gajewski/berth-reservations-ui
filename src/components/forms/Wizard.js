// @flow
import React, { Component, Fragment } from 'react';
import { Button, Container, Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Form from './Form';
import responsive from '../../utils/responsive';

type State = any;
type Props = any;

const ButtonWrapperWrapper = styled.div`
  background-color: ${props => props.theme.helLight};
  padding: 1em 0 3em;
`;
const ButtonWrapper = styled(Col).attrs({
  xs: 12
})`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${responsive.sm`
    flex-direction: row;
  `}
`;

class Wizard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    window.scrollTo(0, 0);
    this.state = {
      initialValues: props.initialValues,
      isSubmitting: false
    };
  }

  hasNextStep = () => {
    const { step, children } = this.props;
    return step < React.Children.count(children) - 1;
  };

  hasPreviousStep = () => {
    const { step } = this.props;
    return step > 0;
  };

  getActiveStep = () => {
    const { step, children } = this.props;
    return React.Children.toArray(children)[step];
  };

  handleSubmit = (values: any) => {
    const { nextStep, goForward } = this.props;
    if (this.hasNextStep()) {
      window.scrollTo(0, 0);
      nextStep(values);
    } else {
      this.setState({ isSubmitting: true });
      goForward(values);
    }
  };

  handlePrevious = (values: any) => {
    const { prevStep, goBackwards } = this.props;

    if (this.hasPreviousStep()) {
      prevStep(values);
    } else {
      goBackwards(values);
    }
  };

  getSubmitText = (invalid: boolean) => {
    if (this.hasNextStep()) {
      if (invalid) {
        return 'form.wizard.button.invalid';
      }
      return 'form.wizard.button.next';
    }
    return 'form.wizard.button.submit';
  };

  render() {
    const { initialValues } = this.state;
    const activePage = this.getActiveStep();

    return (
      <Form initialValues={initialValues} onSubmit={this.handleSubmit}>
        {({ invalid, values }) => (
          <Fragment>
            {activePage && React.cloneElement(activePage, { values })}
            <ButtonWrapperWrapper>
              <Container>
                <Row>
                  <ButtonWrapper>
                    <Button color="link" type="button" onClick={() => this.handlePrevious(values)}>
                      <FormattedMessage id="form.wizard.button.previous" />
                    </Button>
                    <Button
                      type="submit"
                      outline={this.hasNextStep()}
                      color="primary"
                      disabled={this.state.isSubmitting}
                    >
                      <FormattedMessage id={this.getSubmitText(invalid)} />
                    </Button>
                  </ButtonWrapper>
                </Row>
              </Container>
            </ButtonWrapperWrapper>
          </Fragment>
        )}
      </Form>
    );
  }
}

export default Wizard;
