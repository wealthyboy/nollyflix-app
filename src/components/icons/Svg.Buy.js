import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

const SvgBuy = ({ active, size }) => (
  <Svg  height={size} width={size} viewBox="0 0 24 24">
    <Path style={{ marginTop: 55 }} d="M13.781 7.25A3.96 3.96 0 0014 6a4 4 0 00-4-4C8.247 2 6.774 3.135 6.233 4.704A2.487 2.487 0 004.5 4 2.5 2.5 0 002 6.5c0 .273.055.531.135.776A3.5 3.5 0 003.5 14h9a3.5 3.5 0 003.5-3.5c0-1.48-.921-2.738-2.219-3.25zM6 11.25v-4.5L10.5 9 6 11.25z"
        fill={active ? colors.white : colors.inactiveGrey}
    ></Path>
  </Svg>
);

SvgBuy.defaultProps = {
  active: true,
  size: 34
};

SvgBuy.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default React.memo(SvgBuy);
