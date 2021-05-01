import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

const SvgRent = ({ active, size }) => {
  // let fillColor = fill;

  // if (fillColor === null) {
  //   fillColor = active ? colors.white : colors.inactiveGrey;
  // }

  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M16 11V5a3 3 0 01-3-3H3a3 3 0 01-3 3v6a3 3 0 013 3h10a3 3 0 013-3zm-3-1a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h8a1 1 0 011 1v4z"
      ></Path>
    </Svg>
  );
};

SvgRent.defaultProps = {
  active: true,
  size: 20
};

SvgRent.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default React.memo(SvgRent);
