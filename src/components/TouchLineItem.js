import  React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Switch, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../constants';

// icons
import SvgArrowRight from './icons/Svg.ArrowRight';

const TouchLineItem = (props) => {
  const { icon, iconSize, onPress, showArrow, showBorder, showSwitch, text  } = props;

  const borderTopWidth = showBorder ? 2 : 0;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);





  const handleSwitchChange = (value) => {
    return (
      <Text style={{color: "pink", marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { borderTopWidth }]}
    >
      {icon && (
        <View style={styles.icon}>
          {React.cloneElement(icon, { size: iconSize })}
        </View>
      )}
      <Text style={styles.text}>{text}</Text>
      {showArrow && (
        <View style={styles.arrow}>
          <SvgArrowRight size={iconSize} />
        </View>
         
        
      )}

      {showSwitch && ( 
        <View style={styles.containerSwitch}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#e50914' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>
      )}
    </TouchableOpacity>
  );
};

TouchLineItem.defaultProps = {
  icon: null,
  iconSize: 20,
  showArrow: true,
  showBorder: false
};

TouchLineItem.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,

  // optional
  icon: PropTypes.element,
  iconSize: PropTypes.number,
  showArrow: PropTypes.bool,
  showBorder: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.black,
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  icon: {
    justifyContent: 'center',
    marginRight: 16
  },
  text: {
    color: colors.textGrey,
    flex: 2,
    fontFamily: fonts.regular,
    fontSize: 16
  },
  arrow: {
    justifyContent: 'center'
  }
});

export default TouchLineItem;
