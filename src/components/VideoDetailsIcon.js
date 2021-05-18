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
import SvgLike from './icons/Svg.Like';
import SvgDisLike from './icons/Svg.Dislike';
import SvgLiked from './icons/Svg.Liked';
import SvgDisLiked from './icons/Svg.DisLiked';

class VideoDetailsIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      disliked: false
    };

    this.Like = this.Like.bind(this);
    this.DisLike = this.DisLike.bind(this);
  }

  Like() {
    this.setState((prevState) => ({
      liked: !prevState.liked
    }));

    this.setState({
      disliked: false
    });

    //this.DisLike();
  }

  DisLike() {
    this.setState((prevState) => ({
      disliked: !prevState.disliked
    }));

    this.setState({
      liked: false
    });
  }

  render() {
    const { liked, disliked } = this.state;

    const iconLiked = liked ? <SvgLiked size={45} /> : <SvgLike size={45} />;

    const iconDisliked = disliked ? (
      <SvgDisLiked size={45} />
    ) : (
      <SvgDisLike size={45} />
    );

    return (
      <View style={styles.container}>
        <TouchTextIcon icon={iconLiked} onPress={this.Like} text="Like" />
        <TouchTextIcon
          icon={iconDisliked}
          onPress={this.DisLike}
          text="DisLike"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

export default VideoDetailsIcon;
