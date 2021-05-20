import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Switch,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { colors, fonts } from '../constants';

import nApi from '../api/notifications';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

// icons
import SvgArrowRight from './icons/Svg.ArrowRight';

const TouchLineItem = (props) => {
  const {
    icon,
    iconSize,
    notificationStatus,
    onPress,
    showArrow,
    showBorder,
    showSwitch,
    text
  } = props;

  const { user, logIn } = useAuth();

  const borderTopWidth = showBorder ? 2 : 0;
  const notificationsApi = useApi(nApi.notifications);
  const [isEnabled, setIsEnabled] = useState(notificationStatus);
  const toggleSwitch = async (value) => {
    setIsEnabled(value);
    const token = await registerForPushNotifications();
    const result = await notificationsApi.request(token.data, isEnabled);
    //console.log(result.data);
    logIn(result.data.data);
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }
  };

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      return token;
    } catch (error) {
      console.log(error);
    }
  };

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
            onValueChange={(val) => toggleSwitch(val)}
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
  showBorder: false,
  notificationStatus: false
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
