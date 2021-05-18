import React, { useRef, useState, useEffect } from 'react';
import Carousel, {
  ParallaxImage,
  Pagination
} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

import { colors, fonts, gStyle } from '../constants';
import AppText from './AppText';

const { width: screenWidth } = Dimensions.get('window');

const Slider = ({ navigation, dataArr }) => {
  const [entries, setEntries] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(dataArr);
  }, []);

  const renderItem = (video, parallaxProps) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('VideoDetails', video.item.video)}
      >
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: video.item.video.tn_poster }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />

          <View style={[styles.genre]}>
            <AppText
              otherStyle={{ fontSize: 49, fontWeight: 'bold', color: 'white' }}
              style={[gStyle.heading, gStyle.mH20]}
            >
              {video.item.video.title}
            </AppText>
          </View>

          <View style={[gStyle.flexRow, styles.genre]}>
            <View style={[gStyle.flexRow, { marginTop: 60 }]}>
              <Text style={[styles.text, gStyle.mR16]}>
                {video.item.video.year_release}{' '}
              </Text>
              <Text style={[styles.text, styles.pg, gStyle.mR16]}>
                {video.item.video.film_rating}
              </Text>
              <Text style={[styles.text, gStyle.mR16]}>
                {video.item.video.duration}
              </Text>
              <Text style={[styles.text, styles.hd]}>
                {video.item.video.resolution}
              </Text>
            </View>
          </View>

          <View style={styles.description}>
            <AppText otherStyle={{ color: 'white' }} style={[styles.text]}>
              {video.description}
            </AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={dataArr}
        renderItem={renderItem.bind(this)}
        hasParallaxImages={true}
        onSnapToItem={(index) => setActiveSlide(index)}
      />

      <Pagination
        dotsLength={dataArr.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    width: '100%',
    height: 600
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white'
  },
  button: {
    borderColor: colors.white,
    borderWidth: 2,
    justifyContent: 'center',
    padding: 13,
    marginBottom: 10,
    width: '95%',
    borderRadius: 20,
    marginHorizontal: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5%',
    flex: 1,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  description: {
    position: 'absolute',
    bottom: '15%',
    marginHorizontal: 20
  },
  genre: {
    position: 'absolute',
    top: '50%',
    marginVertical: 10,
    marginHorizontal: 20
  },
  hd: {
    backgroundColor: colors.bgGrey,
    padding: 6,
    fontSize: 13
  },
  pg: {
    padding: 4,
    fontSize: 13,
    borderColor: colors.white,
    borderWidth: 2
  },

  image: {
    ...StyleSheet.absoluteFillObject,

    resizeMode: 'contain'
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10
  }
});

export default Slider;
