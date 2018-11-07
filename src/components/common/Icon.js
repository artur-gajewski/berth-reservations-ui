// @flow

import React from 'react';
import Svg from 'react-svg';
import helsinkiLogo from './icons/helsinki-logo.svg';
import globe from './icons/globe.svg';
import check from './icons/check.svg';
import registeredBoat from './icons/registered.svg';
import unregisteredBoat from './icons/unregistered.svg';
import noBoat from './icons/noboat.svg';
import business from './icons/business.svg';
import individual from './icons/individual.svg';
import pole from './icons/pole.svg';
import plug from './icons/plug.svg';
import waterTap from './icons/water-tap.svg';
import trash from './icons/trash-o.svg';
import fence from './icons/fence.svg';
import streetLight from './icons/street-light.svg';

const icons = {
  helsinkiLogo,
  globe,
  check,
  registeredBoat,
  unregisteredBoat,
  noBoat,
  business,
  individual,
  pole,
  plug,
  waterTap,
  trash,
  fence,
  streetLight
};

type Names = $Keys<typeof icons>;

type Props = {
  name: Names,
  color?: string,
  width?: string,
  height?: string,
  className?: string
};

const Icon = ({ name, color: fill, width = 'auto', height = 'auto', className }: Props) => (
  <Svg className={className} svgStyle={{ width, height, fill }} src={icons[name]} />
);

export default Icon;
