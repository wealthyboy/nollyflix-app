import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { colors, gStyle, fonts } from '../constants';
import useApi from '../hooks/useApi';
import castsApi from '../api/casts';

// components
import AA from '../components/Casts';
import ActivityIndicator from '../components/ActivityIndicator';
import Error from '../components/Error';
import HeaderHome from '../components/HeaderHome';

function ActorsAndActress({ navigation }) {
  const { request: getCasts, data, error, loading } = useApi(castsApi.casts);

  useEffect(() => {
    getCasts();
  }, []);

  return (
    <>
      <ActivityIndicator bG={colors.black} visible={loading} />

      <View style={gStyle.container}>
        <HeaderHome show />
        <Error error={error} onPress={getCasts} msg="Could not load Casts. " />

        <View>
          <ScrollView bounces scrollEventThrottle={16}>
            <AA
              title="Actors and Actresses"
              navigation={navigation}
              subTitle="We have a selection of your favorite movie actors/actresses."
              data={data.data}
            ></AA>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingSection: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  round: {
    backgroundColor: colors.infoGrey,
    borderRadius: 75,
    height: 150,
    marginRight: 8,
    width: 150,
    marginTop: 10,
    resizeMode: 'contain'
  },
  subTile: {
    marginTop: 15
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 25
  }
});

export default ActorsAndActress;
