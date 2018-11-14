// @flow

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Button } from 'reactstrap';
import { List } from 'immutable';

type Props = any;

export default class MapMarker extends Component<Props> {
  static defaultProps = {
    berth: Object,
    selected: List,
    onClick: Function,
    markerIcon: String,
    position: Array
  };

  render() {
    const { berth, selected, onClick, markerIcon, position } = this.props;

    return (
      <Marker icon={markerIcon} key={berth.identifier} position={position}>
        <Popup>
          <Container>
            <Row>
              <Col>
                <img alt={berth.name.fi} width="180" src={berth.image_file} />
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>{berth.name.fi}</strong>
                <div>{berth.street_address.fi}</div>
                <div>{berth.municipality.fi}</div>
                {selected ? (
                  <Button color="secondary" onClick={() => onClick(berth.identifier)}>
                    <FormattedMessage tagName="span" id="page.berths.selected" />
                  </Button>
                ) : (
                  <Button outline primary="true" onClick={() => onClick(berth.identifier)}>
                    + <FormattedMessage tagName="span" id="page.berths.select" />
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Popup>
      </Marker>
    );
  }
}