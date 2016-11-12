import React, { Component } from 'react';
import { View, ListView, Text, Image, Picker, Platform, ScrollView, TouchableOpacity } from 'react-native';
import LoadingScreenBlank from 'components/loading_screen_blank';
import routes from 'constants/routes';
import Styles from 'styles';
import EStylesheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalPicker from 'react-native-modal-picker';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestNewSongs, receiveNewSongs, newSongError, fetchNewSongs,
  requestPopularSongs, receivePopularSongs, popularSongError, fetchPopularSongs
} from 'actions';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class PurchaseList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.data = [
      { key: 0, label: 'Tracks' },
      { key: 1, label: 'Albums' },
      { key: 2, label: 'Artists' },
      { key: 3, label: 'Genres' }
    ];
    this.state = {
      loading: true,
      selected: 'Tracks',
    }

    if (this.props.newSongs.songs._cachedRowCount == 0) this.props.fetchNewSongs();
    if (this.props.popularSongs.songs._cachedRowCount == 0) this.props.fetchPopularSongs();
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ loading: false })
    }, 30);
  }

  renderRow = (row) => {
    return (
      <TouchableOpacity>
        <View style={Styles.musicListItem}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image source={Styles.musicImage} style={Styles.musicListItemImage} />
            <View style={Styles.musicListInfoContainer}>
              <Text style={{fontFamily: 'Trebuchet MS'}}>{row.title}</Text>
              <Text style={Styles.musicListInfoArtist}>{row.artist}</Text>
            </View>
          </View>
          <View style={Styles.padRight}>
            <Menu onSelect={this.setMenuSelection}>
              <MenuTrigger disabled={false} style={{padding: 10}}>
                <View><Icon name="ellipsis-v" size={25} /></View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="buy">
                  <Text>Buy Now</Text>
                </MenuOption>
                <MenuOption value="add">
                  <Text>Add to Cart</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  goToSongPage = (row) => {
    this.props.navigator.push({
      id: routes.New.SONG_PAGE,
      passProps: {
        title: row.title,
        artist: row.artist
      }
    })
  }

  selectedListing = (key) => {
    this.setState({
      selected: key
    })
  }

  setMenuSelection = (value) => {
    console.log(value);
  }

  androidPicker = () => {
    return (
      <Picker
        style={Styles.pickerWidth}
        selectedValue={this.state.selected}
        onValueChange={(option) => this.setState({ selected: option})}>
        {
          this.data.map((row, index) => {
            return <Picker.Item key={index} label={row.label} value={row.label} />    
          })
        }
      </Picker>
    )
  }

  iosPicker = () => {
    return (
      <ModalPicker
      data={this.data}
      initValue={this.state.selected}
      onChange={(option) => this.setState({ selected: option.label})}
      />
    )
  }

  renderViewForSection = (object) => {
    if (object.loading){
      return <View style={Styles.purchaseListView}><LoadingScreenBlank /></View>
    }else{
      return (
        <ListView
          dataSource={object.songs}
          renderRow={this.renderRow}
          style={Styles.purchaseListView}
          removeClippedSubviews={false}
        />
      )
    }
  }

  renderMoreViewForSection = (loading) => {
    if (!loading){
      return <Text style={Styles.musicHomeMore}>See All</Text>
    }
  }

  render(){
    if (this.state.loading){
      return <LoadingScreenBlank />
    }

    return (
      <MenuContext animate={false} style={Styles.allScreen}>
        <View style={Styles.purchaseBanner}>
          <Swiper autoplay={true} width={EStylesheet.value('$fullWidth')} height={EStylesheet.value('$purchaseBannerHeight')} showsButtons={false} showsPagination={false}>
            <Image source={Styles.bannerOne} style={{width: undefined, height: undefined, flex: 1}} resizeMode="cover"></Image>
            <Image source={Styles.bannerTwo} style={{width: undefined, height: undefined, flex: 1}} resizeMode="cover"></Image>
          </Swiper>
        </View>
        <View style={Styles.listingSelection}>
          <Text style={Styles.musicHomeHeader}>Listing for: </Text>
          {Platform.OS.toLowerCase() === 'ios' ? this.iosPicker() : this.androidPicker()}
        </View>
        <View style={[Styles.minusBanner]}>
          <ScrollView style={{height: 200}}>
            <View style={Styles.purchaseSection}>
              <View style={Styles.purchaseSectionInner}>
                <View>
                  <Text style={Styles.musicHomeHeader}>New {this.state.selected}   >>></Text>
                </View>
              </View>
            </View>
            {this.renderViewForSection(this.props.newSongs)}
            <View style={Styles.purchaseMoreView}>
              {this.renderMoreViewForSection(this.props.newSongs.loading)}
            </View>


            <View style={Styles.purchaseSection}>
              <View style={Styles.purchaseSectionInner}>
                <View>
                  <Text style={Styles.musicHomeHeader}>Popular {this.state.selected}   >>></Text>
                </View>
              </View>
            </View>
            {this.renderViewForSection(this.props.popularSongs)}
            <View style={Styles.purchaseMoreView}>
              {this.renderMoreViewForSection(this.props.popularSongs.loading)}
            </View>
          </ScrollView>
        </View>
      </MenuContext>
    )
  }
}

mapStateToProps = state => {
  return {
    newSongs: state.song_list.newSongs,
    popularSongs: state.song_list.popularSongs,
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    requestNewSongs, receiveNewSongs, newSongError, fetchNewSongs,
    requestPopularSongs, receivePopularSongs, popularSongError, fetchPopularSongs
  }, dispatch)
}

export const PurchaseListWrapper = connect(mapStateToProps, mapDispatchToProps)(PurchaseList);