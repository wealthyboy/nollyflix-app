import React ,  { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback ,ScrollView} from 'react-native';


import { gStyle , colors } from '../constants';

import useApi from "../hooks/useApi";
import filmakersApi from "../api/filmakers";

// components
import HeaderHome from '../components/HeaderHome';
import AA from '../components/Casts';


import ActivityIndicator from "../components/ActivityIndicator";





function FilmMakers({ navigation }) {

  const { request: getFilmakers, data, error, loading } = useApi(filmakersApi.filmakers);


  useEffect(() => {
    getFilmakers()
  },[])

  if ( data.length === 0 ) {
    return <ActivityIndicator  visible={true}  />
  }

  return (
      <>
        <View style={gStyle.container}>
          <HeaderHome show />
          <View >
            <ScrollView
              bounces
              scrollEventThrottle={16}
              >
              
              <AA title="Producers and Directors" subTitle="We have a selection of your favorite movie producers." data={data.data}></AA>

            </ScrollView>
          </View>
        </View>
    </>
  )
}


const styles = StyleSheet.create({
  headingSection: {
    marginTop: 80,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    
  },
  
  
  
});

export default FilmMakers;
