// @flow
import React from 'react';
import styled from 'styled-components';

import Layout from './Layout';
import FormLegend from '../containers/FormLegendContainer';
import Steps from '../containers/StepsContainer';
import Wizard from '../forms/containers/WizardContainer';
import RegisteredBoat, { schema as registeredBoatSchema } from '../forms/fragments/RegisteredBoat';
import PrivatePerson, { schema as privatePersonSchema } from '../forms/fragments/PrivatePerson';
import Overview, { schema as overviewSchema } from '../forms/fragments/Overview';

const Content = styled.div`
  background-color: white;
  padding: 4em 8em 2em 8em;
`;

const BoatPage = () => (
  <Layout>
    <Steps />
    <FormLegend />
    <Content>
      <Wizard>
        <RegisteredBoat prefix="registeredBoat" schema={registeredBoatSchema} />
        <PrivatePerson prefix="privatePerson" schema={privatePersonSchema} />
        <Overview prefix="overview" schema={overviewSchema} />
      </Wizard>
    </Content>
  </Layout>
);

export default BoatPage;
