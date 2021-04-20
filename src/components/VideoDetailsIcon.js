/**
 * This is for the info link
 */

import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { gStyle, images } from '../constants';

// components
import PromotionPlay from './PromotionPlay';
import TouchTextIcon from './TouchTextIcon';

// icons
import SvgCheck from './icons/Svg.Check';
import SvgInfo from './icons/Svg.Info';
import SvgPlus from './icons/Svg.Plus';
import SvgLike from './icons/Svg.Like';
import SvgDislike from './icons/Svg.Dislike';



class VideoDetailsIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    };

    this.myListPress = this.myListPress.bind(this);
  }

  myListPress() {
    this.setState((prevState) => ({
      added: !prevState.added
    }));
  }

  render() {
    const { added } = this.state;

    const icon = added ? <SvgCheck size={45} /> : <SvgPlus size={45} />;

    return (
      
        <View >
          <View style={gStyle.flexRowSpace}>
            <TouchTextIcon
              icon={icon}
              onPress={this.myListPress}
              text="My Listings"
            />
            <TouchTextIcon
              icon={<SvgLike size={45} />}
              onPress={this.myListPress}
              text="Like"
            />
            <TouchTextIcon
              icon={<SvgDislike size={45} />}
              onPress={this.myListPress}
              text="Like"
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 480
  },
  containerContent: {
    bottom: 24,
    position: 'absolute',
    width: '100%',
    zIndex: 1
  },
  image: {
    alignSelf: 'center',
    height: 69,
    marginBottom: 24,
    width: 291
  }
});

export default VideoDetailsIcon;
