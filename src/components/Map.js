// @flow

import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MapMarker from './MapMarker';
import 'proj4';
import 'proj4leaflet';

import HarborMatchSelected from './common/icons/harbor-match-chosen.svg';
import HarborMatchUnselected from './common/icons/harbor-unmatch.svg';

/* eslint-disable */
delete L.Icon.Default.prototype._getIconUrl;
/* eslint-enable */

const iconSelected = new L.Icon({
  iconUrl: HarborMatchSelected,
  iconRetinaUrl: HarborMatchSelected,
  iconSize: new L.Point(25, 25),
  className: 'map-marker'
});

const iconUnselected = new L.Icon({
  iconUrl: HarborMatchUnselected,
  iconRetinaUrl: HarborMatchUnselected,
  iconSize: new L.Point(25, 42),
  className: 'map-marker'
});

const style = {
  width: '80%',
  height: '100%'
};

type State = {
  lat: number,
  lng: number,
  zoom: number
};

type Props = any;

export default class MapCanvas extends Component<Props, State> {
  state = {
    lng: 24.93,
    lat: 60.18808,
    zoom: 11.47
  };

  render() {
    const { filtered, selected, onClick } = this.props;
    const position = [this.state.lat, this.state.lng];
    const bounds = new L.LatLngBounds(filtered.map(berth => berth.location.coordinates).toArray());
    const originNw = [bounds.getSouthWest(), bounds.getNorthEast()];

    const crs = new L.Proj.CRS(
      'EPSG:3067',
      '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
      {
        transformation: new L.Transformation(1, -originNw[0], -1, originNw[1]),
        bounds,
        resolutions: [
          8192,
          4096,
          2048,
          1024,
          512,
          256,
          128,
          64,
          32,
          16,
          8,
          4,
          2,
          1,
          0.5,
          0.25,
          0.125
        ]
      }
    );

    const markerIcon = isSelected => {
      if (isSelected) {
        return iconSelected;
      }
      return iconUnselected;
    };

    return (
      <Map
        crs={crs}
        bounds={bounds}
        boundsOptions={{ padding: [50, 50] }}
        center={position}
        zoom={this.state.zoom}
        style={style}
      >
        <TileLayer url="https://geoserver.hel.fi/mapproxy/wmts/osm-sm/etrs_tm35fin/{z}/{x}/{y}.png" />
        {filtered.map(berth => {
          const isSelected = selected && selected.includes(berth.identifier);
          return (
            <MapMarker
              berth={berth}
              selected={isSelected}
              markerIcon={markerIcon(isSelected)}
              key={berth.identifier}
              position={berth.location.coordinates}
              onClick={() => onClick(berth.identifier)}
            />
          );
        })}
      </Map>
    );
  }
}
