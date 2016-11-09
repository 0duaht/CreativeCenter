import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, Navigator } from 'react-native';
import Styles from 'styles';
import routes from 'constants/routes';
import NavBar from 'components/navbar';
import { MusicList, Player, MusicHome } from './scenes';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import EStyleSheet from 'react-native-extended-stylesheet'

export class MyMusic extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, {backgroundColor: '#f2f2f2'}]}>
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

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: '0', title: "Suggested"},
        {key: '1', title: "Library"},
      ]
    }
  }

  handleChangeTab = (index) => {
    this.setState({ index })
  }

  renderTabScene = (route, navigator) => {
    switch(route.key){
      case '0':
        return <MusicHome navigator={navigator} />

      case '1':
        return <MusicList navigator={navigator} />
      default:
        null
    }
  }
  renderScene = (route, navigator) => {
    switch(route.id){
      case routes.MyMusic.MUSIC_LIST: {
        return (
          <View style={{flex: 1}}>
            <NavBar onPress={this.props.drawer} />
            <TabViewAnimated
              renderScene={({route}) => this.renderTabScene(route, navigator)}
              renderHeader={(props) => <TabBarTop {...props} />}
              navigationState={this.state}
              onRequestChangeTab={this.handleChangeTab}
              innerStyle={Styles.minusNavBar}
            />
          </View>
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