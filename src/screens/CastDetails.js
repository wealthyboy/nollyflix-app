/**
 * This is for the info link
 */
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import ReadMore from 'react-native-read-more-text';
import Constants from 'expo-constants';

import { gStyle } from '../constants';
import { colors, fonts } from '../constants';

// components
import PromotionPlay from '../components/PromotionPlay';
import VideoDetailsIcon from '../components/VideoDetailsIcon';

import SvgRent from '../components/icons/Svg.Rent';
import SvgBuy from '../components/icons/Svg.Buy';
import SvgArrowLeft from '../components/icons/Svg.ArrowLeft';

function CastDetails({ navigation }) {
  const cast = navigation.state.params;
  console.log(cast);

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'pink', marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'pink', marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const marginTop =
    Platform.OS === 'ios'
      ? Constants.statusBarHeight + 10
      : Constants.statusBarHeight + 25;

  return (
    <View style={gStyle.container}>
      <ScrollView>
        <ImageBackground
          blurRadius={30}
          source={{ uri: cast.profile_picture }}
          style={[styles.imageBackground]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack(null)}
            style={{
              position: 'absolute',
              left: 0,
              top: 70
            }}
          >
            <SvgArrowLeft size={37} />
          </TouchableOpacity>

          <Image
            style={{ height: 250, width: 200, marginTop: marginTop }}
            source={{ uri: cast.profile_picture }}
          />
        </ImageBackground>
        <View style={gStyle.mV24}>
          <Text style={[gStyle.heading]}>
            {cast.name} {cast.last_name}
          </Text>
          <View style={gStyle.mV16}>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
            >
              <Text style={styles.text}>{cast.description}</Text>
            </ReadMore>
          </View>

          {cast.cast_videos && cast.cast_videos.length ? (
            <View style={{ marginBottom: 20 }}>
              <Text
                style={[
                  gStyle.heading,
                  { textTransform: 'uppercase', fontSize: 16, marginBottom: 20 }
                ]}
              >
                Movies with {cast.name} {cast.last_name}
              </Text>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 4 }}
                data={cast.cast_videos}
                horizontal
                keyExtractor={(video) => video.id.toString()}
                renderItem={({ item }) => {
                  let renderItem = <View style={styles.rectangle} />;
                  if (item.tn_poster) {
                    renderItem = (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate('VideoDetails', item)
                        }
                      >
                        <Image
                          source={{ uri: item.tn_poster }}
                          style={styles.rectangleImage}
                        />
                      </TouchableWithoutFeedback>
                    );
                  }
                  return renderItem;
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 30
  },
  back: {
    alignSelf: 'center',
    flex: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 11,
    width: '100%',
    marginVertical: 1
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  hd: {
    backgroundColor: colors.bgGrey,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 9
  },
  pg: {
    padding: 4,
    fontSize: 13,
    color: 'red'
  },
  imageBackground: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'contain',
    height: 310
  },
  image: {
    alignSelf: 'center',
    height: 69,
    marginBottom: 24,
    width: 291
  },
  genre: {
    position: 'absolute'
  },
  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 161,
    marginRight: 8,
    width: 121
  },
  rectangleImage: {
    height: 161,
    marginRight: 8,
    resizeMode: 'cover',
    width: 121
  },
  previewButton: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    padding: 2
  },
  text: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.regular,
    textAlign: 'left',
    lineHeight: 25,
    marginVertical: 1
  }
});

export default CastDetails;
