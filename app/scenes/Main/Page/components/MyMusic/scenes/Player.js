import React, { Component } from 'react';
import {
  View, ListView, Text, Image, TouchableOpacity,
  BackAndroid, LayoutAnimation, Slider
} from 'react-native';
import FullContainer from 'components/full_container';
import Styles from 'styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from 'react-native-video'
import {
  setPlayingTitle, setPlayingArtist, setPlayingSource,
  setPlayingShuffle, setPlayingRepeat
} from 'actions'
import RNFS from 'react-native-fs';
import UtilityMethods from 'services/utilityMethods';
// import Slider from 'react-native-slider';

class Player extends Component {
  constructor(props){
    super(props);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack)
    this.state = {
      playing: true,
      iconPlay: true,
      currentTime: 0,
      sliderValue: 0,
      startedSliding: false,
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
  render(){
    return (
      <View style={Styles.full}>
        <View style={Styles.playerHeader}>
          <View style={Styles.playerSongInfo}>
            <Text>{this.props.title}</Text>
            <Text>{this.props.artist}</Text>
          </View>
        </View>
        <View style={Styles.playerImageView}>
          <Image
            source={Styles.musicImage}
            style={Styles.playerImage}>
            <Video source={{uri: UtilityMethods.mp3URL}}
              ref={(video) => this._video = video }
              volume={1}
              rate={1}
              muted={false}
              paused={!this.state.playing}
              playInBackground={true}
              playWhenInactive={true}
              onLoad={this.onLoad}
              onProgress={this.setProgress}
              style={Styles.playerImage}
              resizeMode="cover"
              repeat={this.props.repeat}
            />
          </Image>
        </View>
        <View style={Styles.playerControl}>
          <Slider
            onValueChange={this.slideValueChange}
            onSlidingComplete={this.endSliding}
            playInBackground={true}
            playWhenInactive={true}
            value={this.state.duration ? this.state.currentTime/this.state.duration : 0}
          />

          <View style={Styles.playerButtons}>
            <TouchableOpacity onPress={this.toggleShuffle}>
              <Icon name="random" style={[Styles.playerIcon, (this.props.shuffle ? {color: '#1e90ff'} : {})]} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="step-backward" style={Styles.playerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.togglePlay}>
              <Icon name={this.state.iconPlay ? "pause" : "play"} style={Styles.playerIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="step-forward" style={Styles.playerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleRepeat}>
              <Icon name="repeat" style={[Styles.playerIcon, (this.props.repeat ? {color: '#1e90ff'} : {})]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  slideValueChange = value => {
    this.setState({
      playing: false
    })
    const currentTime = value * this.state.duration
    this.setState({
      startedSliding: true,
      currentTime: currentTime
    });
    this._video.seek(currentTime);
  }

  endSliding = value => {
    this.setState({startedSliding: false});
    this.setState({
      playing: true
    })
  }

  togglePlay = () => {
    this.setState({
      playing: !this.state.playing,
      iconPlay: !this.state.playing,
      startedSliding: this.state.playing ? true : false
    })
  }

  setProgress = (params) => {
    if (this.state.startedSliding) return
    if (!this.state.playing) return
    this.setState({
      currentTime: params.currentTime
    })
  }

  onLoad = (params) => {
    console.log('started');
    this.setState({duration: params.duration})
  }

  toggleShuffle = () => {
    this.props.setPlayingShuffle(!this.props.shuffle);
  }

  toggleRepeat = () => {
    this.props.setPlayingRepeat(!this.props.repeat);
  }
}

mapStateToProps = state => {
  return {
    title: state.playing.title,
    artist: state.playing.artist,
    source: state.playing.source,
    shuffle: state.playing.shuffle,
    repeat: state.playing.repeat
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPlayingTitle, setPlayingArtist, setPlayingSource,
    setPlayingShuffle, setPlayingRepeat
  }, dispatch)
}

export const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Player)