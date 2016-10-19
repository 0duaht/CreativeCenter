import React, { Component } from 'react';
import { View, ListView, Text, Image, TouchableOpacity } from 'react-native';
import FilterContainer from 'components/filter_container';
import routes from 'constants/routes';
import Styles from 'styles';

export class PlaylistsList extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, Styles.musicList]}>
      </View>
    )
  }
}