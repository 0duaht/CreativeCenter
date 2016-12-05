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
import Types from 'constants/types';
import {
  fetchNewSongs, fetchPopularSongs, fetchBannerLinks, startLoadingFirstBanner,
  finishLoadingFirstBanner, startLoadingSecondBanner, finishLoadingSecondBanner
} from 'actions';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class PurchaseList extends Component {
  constructor(props){
    super(props);
    this.data = [
      { key: Types.TRACKS, label: 'Tracks' },
      { key: Types.ALBUMS, label: 'Albums' },
      { key: Types.ARTISTS, label: 'Artists' },
      { key: Types.GENRES, label: 'Genres' }
    ];
    this.state = {
      loading: true,
      selected: 'Tracks',
      selectedIndex: 0
    }

    if (this.props.banner.links.first == undefined) this.props.fetchBannerLinks();
    if (this.props.newSongs.songs._cachedRowCount == 0) this.props.fetchNewSongs(this.state.selectedIndex);
    if (this.props.popularSongs.songs._cachedRowCount == 0) this.props.fetchPopularSongs(this.state.selectedIndex);
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ loading: false })
    }, 30);
  }

  renderRow = (row) => {
    return (
      <TouchableOpacity onPress={() => this.goToSongPage(row)}>
        <View style={Styles.musicListItem}>
          {this.contentRenderer(this.state.selectedIndex, row)}
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

  rowContentTracks = (row) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={Styles.musicImage} style={Styles.musicListItemImage} />
        <View style={Styles.musicListInfoContainer}>
          <Text style={{fontFamily: 'Trebuchet MS'}}>{row.title}</Text>
          <Text style={Styles.musicListInfoArtist}>{row.artist}</Text>
        </View>
      </View>
    )
  }

  rowContentAlbums = (row) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={Styles.musicImage} style={Styles.musicListItemImage} />
        <View style={Styles.musicListInfoContainer}>
          <Text style={{fontFamily: 'Trebuchet MS'}}>{row.name}</Text>
          <Text style={Styles.musicListInfoArtist}>{row.artist}</Text>
        </View>
      </View>
    )
  }

  contentRenderer = (requestType, row) => {
    switch(requestType){
      case Types.TRACKS: return this.rowContentTracks(row)
      case Types.ALBUMS: return this.rowContentAlbums(row)
    }
  }

  goToSongPage = (row) => {
    this.props.navigator.push({
      id: routes.New.SONG_PAGE,
      passProps: {
        title: row.title,
        artist: row.artist,
        navigator: navigator
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
        onValueChange={(option, index) => {
          this.setState({ selected: option, selectedIndex: index })
          this.props.fetchNewSongs(index);
          this.props.fetchPopularSongs(index);
        }}>
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
      onChange={(option) => {
        this.setState({ selected: option.label})
        this.props.fetchNewSongs(index);
        this.props.fetchPopularSongs(index);
      }}
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
    if (this.props.banner.loadingLinks || this.props.banner.loadingFirst || this.props.banner.loadingSecond){
      return <LoadingScreenBlank />
    }

    return (
      <MenuContext animate={false} style={Styles.allScreen}>
        <View style={Styles.purchaseBanner}>
          <Swiper autoplay={true} width={EStylesheet.value('$fullWidth')} height={EStylesheet.value('$purchaseBannerHeight')} showsButtons={false} showsPagination={false}>
            <Image
              source={{uri: this.props.banner.links.first}}
              style={{width: undefined, height: undefined, flex: 1}}
              resizeMode="cover">
            </Image>
            <Image
              source={{uri: this.props.banner.links.second}}
              style={{width: undefined, height: undefined, flex: 1}}
              resizeMode="cover">
            </Image>
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
    banner: state.banner
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchNewSongs, fetchPopularSongs, fetchBannerLinks, startLoadingFirstBanner,
    finishLoadingFirstBanner, startLoadingSecondBanner, finishLoadingSecondBanner
  }, dispatch)
}

export const PurchaseListWrapper = connect(mapStateToProps, mapDispatchToProps)(PurchaseList);