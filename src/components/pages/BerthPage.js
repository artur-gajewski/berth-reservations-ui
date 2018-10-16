// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../LocalizedLink';
import Page from '../Page';

const BerthPage = () => (
  <Page>
    <h2>
      <FormattedMessage id="page.berths.title" />
    </h2>
    <LocalizedLink to={'/boat'}>
      <FormattedMessage id="page.berths.link.boat_information" />
    </LocalizedLink>
  </Page>
);

export default BerthPage;