import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, Navigator } from 'react-native';
import Styles from 'styles';
import routes from 'constants/routes';
import NavBar from '../../../NavBar';
import { ConnectList } from './scenes';

export class Connect extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, {backgroundColor: 'white'}]}>
        <Navigator
          ref={(navigator) => this._navigator = navigator}
          initialRoute={{id: routes.Connect.CONNECT_LIST}}
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
      case routes.Connect.CONNECT_LIST: {
        return (
          <ScrollView style={{flex: 1}}>
            <NavBar onPress={this.props.drawer} />
            <ConnectList
              navigator={navigator}
            />
          </ScrollView>
        );
      }
    }
  }
}