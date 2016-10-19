import React, { Component } from 'react';
import { View, ListView, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FilterContainer from 'components/filter_container';
import routes from 'constants/routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setPlayingTitle, setPlayingArtist, setPlayingSource,
  setPlayingShuffle, setPlayingRepeat
} from 'actions'
import Styles from 'styles';

class MusicList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      dataSource: ds.cloneWithRows([
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      {
        title: 'Friday is Forever',
        artist: 'We The Kings'
      },
      {
        title: 'You Found Me',
        artist: 'The Fray'
      },
      {
        title: 'Without Reason',
        artist: 'The Fray'
      },
      {
        title: 'No One',
        artist: 'Alicia Keys'
      },
      ])
    }
  }
  render(){
    return (
      <View style={Styles.musicList}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={[Styles.musicListView, Styles.addBorder]}
        />
      </View>
    )
  }

  renderRow = (row) => {
    return (
      <TouchableOpacity onPress={() => this.openPlayer(row)}>
        <View style={[Styles.musicListItem]}>
          <Image source={Styles.musicImage} style={Styles.musicListItemImage} />
          <View style={Styles.musicListInfoContainer}>
            <Text style={{fontFamily: 'Trebuchet MS'}}>{row.title}</Text>
            <Text style={Styles.musicListInfoArtist}>{row.artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  openPlayer = (row) => {
    this.props.setPlayingTitle(row.title);
    this.props.setPlayingSource(row.source);
    this.props.setPlayingArtist(row.artist);
    this.props.navigator.push({id: routes.MyMusic.PLAYER})
  }
}

mapStateToProps = state => {
  return {
    playingSong: state.playing.title,
    artist: state.playing.artist,
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPlayingTitle, setPlayingArtist, setPlayingSource,
    setPlayingShuffle, setPlayingRepeat
  }, dispatch)
}

export const MusicListWrapper = connect(mapStateToProps, mapDispatchToProps)(MusicList);