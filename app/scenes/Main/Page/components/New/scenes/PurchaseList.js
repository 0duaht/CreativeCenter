import React, { Component } from 'react';
import { View, ListView, Text, Image, TouchableOpacity } from 'react-native';
import FilterContainer from 'components/filter_container';
import routes from 'constants/routes';
import Styles from 'styles';
import Swiper from 'react-native-swiper';

export class PurchaseList extends Component {
  render(){
    return (
      <View style={Styles.allScreen}>
        <View style={[Styles.purchaseBanner, Styles.addBorder]}>
        </View>
        <View style={[Styles.purchaseNewMusic, Styles.addBorder]}>
        </View>
        <View style={[Styles.purchaseHotSongs, Styles.addBorder]}>
        </View>
      </View>
    )
  }
}