import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, Navigator } from 'react-native';
import Styles from 'styles';
import routes from 'constants/routes';
import NavBar from 'components/navbar';
import { PurchaseList, SongPage } from './scenes';

export class New extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, {backgroundColor: 'white'}]}>
        <Navigator
          ref={(navigator) => this._navigator = navigator}
          initialRoute={{id: routes.New.PURCHASE_LIST}}
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
      case routes.New.PURCHASE_LIST: {
        return (
          <View style={{flex: 1}}>
            <NavBar onPress={this.props.drawer} />
            <PurchaseList
              navigator={navigator}
            />
          </View>
        );
      }

      case routes.New.SONG_PAGE: {
        return (
          <View style={{flex: 1}}>
            <NavBar onPress={this.props.drawer} />
            <SongPage
              {...route.passProps}
              navigator={navigator}
            />
          </View>
        );
      }
    }
  }
}