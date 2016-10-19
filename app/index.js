import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigator, UIManager, Platform } from 'react-native';
import store from './store';
import routes from 'constants/routes';
import { Home, Main, ArtistView } from './scenes';
import { checkPermission, requestPermission } from 'react-native-android-permissions';
import RNFetchBlob from 'react-native-fetch-blob';
const PERMISSION_LIST = [
  "android.permission.INTERNET",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE",
]

export default class CreativeCenter extends Component {
  constructor(props){
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount(){
    if (Platform.OS.toLowerCase() === 'ios') return;
    PERMISSION_LIST.forEach(permission => {
      setTimeout(() => {
        checkPermission(permission).then((result) => {
        }, (result) => {
          setTimeout(() => {
            requestPermission(permission)
          }, 0);
        });
      }, 0);
    });
    // console.log('starting download');
    // RNFetchBlob
    // .config({
    //   // add this option that makes response data to be stored as a file,
    //   // this is much more performant.
    //   fileCache : true,
    // })
    // .fetch('GET', 'http://www.headerhandler.com/downloads/test.mp3')
    // .then((res) => {
    //   // the temp file path
    //   console.log('The file saved to ', res.path())
    // })
    // .catch(e => console.log(e));
  }

  render(){
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{id: routes.MAIN}}
          renderScene={this.renderScene}
          configureScene={() => ({
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
            gestures: {}
          })}
        />
      </Provider>
    )
  }

  renderScene = (route, navigator) => {
    switch(route.id){
      case routes.HOME: {
        return (
          <Home
            navigator={navigator}
          />
        );
      }

      case routes.MAIN: {
        return (
          <Main />
        )
      }

      case routes.ARTIST_VIEW: {
        return (
          <ArtistView />
        )
      }
    }
  }
}
