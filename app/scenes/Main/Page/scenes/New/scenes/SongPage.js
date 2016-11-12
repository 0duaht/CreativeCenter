import React, { Component } from 'react';
import { View, ListView, Text, Image, Picker, Platform, ScrollView, TouchableOpacity, BackAndroid } from 'react-native';
import LoadingScreenBlank from 'components/loading_screen_blank';
import routes from 'constants/routes';
import Styles from 'styles';
import EStylesheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalPicker from 'react-native-modal-picker';
import Swiper from 'react-native-swiper';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

export class SongPage extends Component {
  constructor(props){
    super(props);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack)
    this.state = {
      loading: true
    }
  }

  goBack = () => {
    if (this.props.navigator.getCurrentRoutes().length > 1){
      this.props.navigator.pop();
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack)
      return true;
    }
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack)
  }
  
  componentDidMount(){
    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000);
  }

  render(){
    if (this.state.loading){
      return <LoadingScreenBlank />
    }

    return (
      <View style={Styles.allScreen}>
        <View style={Styles.songBanner}>
          <View width={EStylesheet.value('$fullWidth')} height={EStylesheet.value('$songBannerHeight')}>
            <Image source={Styles.bannerThree} style={{width: undefined, height: undefined, flex: 1}} resizeMode="cover"></Image>
          </View>
        </View>
        <View style={Styles.songRest}>
          <View style={Styles.songPurchaseHeaderSection}>
            <View>
              <Text style={Styles.songPageTitle}>{this.props.title}</Text>
              <Text style={Styles.songPageArtist}>{this.props.artist}</Text>
            </View>
            <TouchableOpacity style={Styles.buyButton}>
              <Text>Buy Now</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.songDetails}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={Styles.purchaseRowKey}>Price:</Text><Text>N250</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={Styles.purchaseRowKey}>Label:</Text><Text>Stormboy Records</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={Styles.purchaseRowKey}>Release Date:</Text><Text>October 7, 2015</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={Styles.purchaseRowKey}>Duration:</Text><Text>3:46</Text>
            </View>
          </View>
          <View style={Styles.songPurchaseRow}>
          </View>
        </View>
      </View>
    )
  }
}