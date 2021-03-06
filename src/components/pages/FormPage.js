// @flow
import React, { PureComponent } from 'react';
import { findIndex } from 'lodash';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import FormLegend from '../legends/FormLegend';
import Steps from '../steps/Steps';
import Wizard from '../forms/Wizard';
import ApplicantDetails from '../forms/sections/ApplicantDetails';
import BoatDetails from '../forms/sections/BoatDetails';
import Overview from '../forms/sections/Overview';

type Props = any;

const FormHeaderSection = styled.div`
  background-color: ${props => props.theme.colors.helFog};
`;

const mapSteps = [
  ['registered_boat', 'unregistered_boat', 'no_boat'],
  ['private_person', 'company'],
  ['overview']
];

class BoatPage extends PureComponent<Props, any> {
  state = {
    step: 0,
    tab: '',
    tabs: ['registered_boat', 'private_person', 'overview']
  };

  componentDidMount() {
    const { tab, boatTypes, getBoatTypes } = this.props;

    if (!boatTypes) {
      getBoatTypes();
    }

    const step = Math.max(0, findIndex(mapSteps, s => s.includes(tab)));
    this.setState(() => ({ step, tab: tab || mapSteps[step][0] }));
  }

  componentDidUpdate() {
    const { tab } = this.props;
    const step = Math.max(0, findIndex(mapSteps, s => s.includes(tab)));
    this.setState(() => ({ step, tab: tab || mapSteps[step][0] }));
  }

  render() {
    const {
      initialValues,
      boatTypes,
      berths,
      selectedBerths,
      onSubmit,
      onSend,
      localePush
    } = this.props;
    const { step, tabs, tab } = this.state;
    return (
      <Layout>
        <FormHeaderSection>
          <Container>
            <Row>
              <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                <Steps
                  steps={[
                    {
                      key: 'berths',
                      completed: true,
                      current: false,
                      linkTo: `berths`
                    },
                    {
                      key: 'selected_berths',
                      completed: true,
                      current: false,
                      linkTo: `selected_berths`
                    },
                    {
                      key: 'boat_information',
                      completed: step > 0,
                      current: step === 0,
                      linkTo: step > 0 ? `form/${tabs[0]}` : undefined
                    },
                    {
                      key: 'applicant',
                      completed: step > 1,
                      current: step === 1,
                      linkTo: step > 1 ? `form/${tabs[1]}` : undefined
                    },
                    {
                      key: 'send_application',
                      completed: step > 2,
                      current: step === 2,
                      linkTo: step > 2 ? `form/${tabs[2]}` : undefined
                    }
                  ]}
                />
                <FormLegend step={step} />
              </Col>
            </Row>
          </Container>
        </FormHeaderSection>
        <Wizard
          step={step}
          initialValues={initialValues}
          goForward={async values => {
            await onSubmit(values);
            await onSend({ ...values, selectedBerths });
            tabs[step] = tab;
            this.setState(() => ({ tabs }));
            await localePush('/thank-you');
          }}
          goBackwards={async values => {
            await onSubmit(values);
            tabs[step] = tab;
            this.setState(() => ({ tabs }));
            await localePush('/selected_berths');
          }}
          nextStep={values => {
            onSubmit(values);
            tabs[step] = tab;
            this.setState(() => ({ tabs }));
            localePush(`/form/${tabs[step + 1]}`);
          }}
          prevStep={values => {
            onSubmit(values);
            tabs[step] = tab;
            this.setState(() => ({ tabs }));
            localePush(`/form/${tabs[step - 1]}`);
          }}
        >
          <BoatDetails tab={tab} values={{}} boatTypes={boatTypes} />
          <ApplicantDetails tab={tab} values={{}} />
          <Overview
            selectedBerths={selectedBerths.map(key =>
              berths.find(berth => key === berth.identifier)
            )}
            boatTypes={boatTypes}
            tabs={tabs}
            tab={tab}
            values={{}}
          />
        </Wizard>
      </Layout>
    );
  }
}
export default BoatPage;
