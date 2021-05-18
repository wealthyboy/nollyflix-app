import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { gStyle, colors } from '../constants';

import useApi from '../hooks/useApi';
import filmakersApi from '../api/filmakers';

// components
import AA from '../components/Casts';
import ActivityIndicator from '../components/ActivityIndicator';
import Error from '../components/Error';
import HeaderHome from '../components/HeaderHome';

function FilmMakers({ navigation }) {
  const { request: getFilmakers, data, error, loading } = useApi(
    filmakersApi.filmakers
  );

  useEffect(() => {
    getFilmakers();
  }, []);

  console.log(data, 'film');

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={gStyle.container}>
        <HeaderHome show />
        <Error
          error={error}
          onPress={getFilmakers}
          msg="Could not load Filmakers. "
        />

        <View>
          <ScrollView bounces scrollEventThrottle={16}>
            <AA
              title="Producers and Directors"
              subTitle="We have a selection of your favorite movie producers."
              data={data.data}
              navigation={navigation}
            ></AA>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingSection: {
    marginTop: 80,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FilmMakers;
