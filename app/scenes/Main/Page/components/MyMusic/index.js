import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, Navigator } from 'react-native';
import Styles from 'styles';
import routes from 'constants/routes';
import NavBar from '../../../NavBar';
import { MusicList, Player } from './scenes';

export class MyMusic extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, {backgroundColor: 'white'}]}>
        <Navigator
          ref={(navigator) => this._navigator = navigator}
          initialRoute={{id: routes.MyMusic.MUSIC_LIST}}
          renderScene={this.renderScene}
          configureScene={
            (route, routeStack) => {
              if (this._navigator === undefined || this._navigator.getCurrentRoutes() <= 1){
                return {
                  ...Navigator.SceneConfigs.HorizontalSwipeJump,
                  gestures: {}
                }
              }else{
                return Navigator.SceneConfigs.HorizontalSwipeJump
              }
            }
          }
        />
      </View>
    )
  }

  renderScene = (route, navigator) => {
    switch(route.id){
      case routes.MyMusic.MUSIC_LIST: {
        return (
          <ScrollView style={{flex: 1}}>
            <NavBar onPress={this.props.drawer} />
            <MusicList
              navigator={navigator}
            />
          </ScrollView>
        );
      }

      case routes.MyMusic.PLAYER: {
        return (
          <Player
            navigator={navigator}
          />
        );
      }
    }
  }
}