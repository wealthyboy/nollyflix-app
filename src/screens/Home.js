import React from 'react';
import { Dimensions, FlatList, Image, View, StyleSheet, StatusBar, Text} from 'react-native';
import { ScrollView } from 'react-navigation';
import { gStyle } from '../constants';
import { withNavigation } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors } from '../constants';
import client from "../api/client";







// components
import HeaderHome from '../components/HeaderHome';
import ActivityIndicator  from '../components/ActivityIndicator'
import Slider from '../components/Slider';


let deviceWidth = Dimensions.get('window').width

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      showHeader: true,
      isLoading: false,
      error: false,
      videos: [],
      featured_videos: [],
    };

    this.offset = 0;
    this.onScroll = this.onScroll.bind(this);
  }

   async componentDidMount(){
    this.setState({
      isLoading: true
    })


    
    const  res = await client.get('https://nollyflix.tv/api/browse')
    if ( !res.ok ) { this.setState({ error: true, isLoading: false}); return; }
    this.setState({ isLoading: false, videos: res.data.data, featured_videos: JSON.parse(res.data.meta.slides) });

  }


  onScroll(event) {
    const { showHeader } = this.state;

    let show = showHeader;
    const currentOffset = event.nativeEvent.contentOffset.y;
    show = currentOffset < this.offset;

    if (show !== showHeader || this.offset <= 0) {
      // account for negative value with "bounce" offset
      if (this.offset <= 0) show = true;

      this.setState({
        showHeader: show
      });
    }

    this.offset = currentOffset;
  }


  


  render() {
    const { showHeader } = this.state;
    const { navigation } = this.props;
    const type = 'rectangle'
    if ( this.state.videos.length === 0 || this.state.featured_videos.length === 0) {
      return <ActivityIndicator  visible={true}  />
    }


    return (
       <View style={[gStyle.container, ]}>
          <StatusBar
            translucent 
            backgroundColor='transparent'
          />
          { this.state.error &&
            <>
              <AppText> Couldnt get videos </AppText>
              <AppButton title="Retry"  />
            </>
          }
          <HeaderHome show={showHeader} />
            <ScrollView
              bounces
              onScroll={this.onScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
            <Slider navigation={navigation}  dataArr={this.state.featured_videos} />
            {this.state.videos.map(video => (
                <View  key={video.id}>
                    <Text key={video.id} style={gStyle.heading}>{video.name}</Text> 
                      <FlatList
                          contentContainerStyle={{ paddingHorizontal: 4 }}
                          data={video.videos}
                          horizontal
                          keyExtractor={( video ) => video.id.toString()}
                          renderItem={({ item }) => {
                            let renderItem = <View  style={styles[type]} />;
                            if (item.tn_poster) {
                              renderItem = (
                                <TouchableWithoutFeedback 
                                  onPress={() => navigation.navigate('VideoDetails',item)} 
                                >
                                    <Image
                                      source={{uri: item.tn_poster}}
                                      style={styles[`${type}Image`]} 
                                      tint="light"
                                    />
                                </TouchableWithoutFeedback>
                                
                              );
                            }
                            return renderItem;
                          }}
                        showsHorizontalScrollIndicator={false}
                    />

                </View>
            ))}
            
            <View style={gStyle.spacer24} />
          </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  rectangleFull: {
    backgroundColor: colors.infoGrey,
    height: 400,
    width: deviceWidth,

  },
  rectangleFullImage: {
    backgroundColor: colors.infoGrey,
    height: 400,
    marginRight: 8,
    resizeMode: 'contain',
    width: "100%"
  },
  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 91
  },
  round: {
    backgroundColor: colors.infoGrey,
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
    resizeMode: 'contain',
    width: 96
  }
});



export default withNavigation(Home);
