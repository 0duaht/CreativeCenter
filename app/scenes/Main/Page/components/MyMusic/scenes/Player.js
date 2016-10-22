import React, { Component } from 'react';
import {
  View, ListView, Text, Image, TouchableOpacity,
  BackAndroid, LayoutAnimation, Slider, TouchableHighlight
} from 'react-native';
import FullContainer from 'components/full_container';
import Styles from 'styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setPlayingTitle, setPlayingArtist,
  setPlayingShuffle, setVideoSource, pauseVideo,
  playVideo, stopVideo, setVideoCurrentTime,
  toggleVideoPlay, setVideoRepeat, setVideoComponent
} from 'actions'
import RNFS from 'react-native-fs';
import UtilityMethods from 'services/utilityMethods';
// import Slider from 'react-native-slider';

class Player extends Component {
  constructor(props){
    super(props);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack)
    this.state = {
      iconPlay: true,
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

  componentWillMount(){
    if (this.props.source === ''){
      this.props.setVideoSource(UtilityMethods.mp3URL);
      if (this.props.video) this.props.video.seek(0);
    }
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack)
  }
  render(){
    return (
      <View style={Styles.allScreen}>
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
          </Image>
        </View>
        <View style={Styles.playerControl}>
          <Slider
            onValueChange={this.slideValueChange}
            onSlidingComplete={this.endSliding}
            playInBackground={true}
            playWhenInactive={true}
            value={this.props.duration ? this.props.currentTime/this.props.duration : 0}
          />

          <View style={Styles.playerButtons}>
            <Icon name="random" style={[Styles.playerIcon, (this.props.shuffle ? {color: '#1e90ff'} : {})]} onPress={this.toggleShuffle}/>
            <Icon name="step-backward" style={Styles.playerIcon} />
            <Icon name={this.props.playing ? "pause" : "play"} style={Styles.playerIcon} onPress={this.togglePlay}/>
            <Icon name="step-forward" style={Styles.playerIcon} />
            <Icon name="repeat" style={[Styles.playerIcon, (this.props.repeat ? {color: '#1e90ff'} : {})]} onPress={this.toggleRepeat}/>
          </View>
        </View>
      </View>
    )
  }

  slideValueChange = value => {
    if (this.props.playing) this.props.pauseVideo();
    const currentTime = value * this.props.duration
    this.setState({
      startedSliding: true,
    });
    this.props.video.seek(currentTime);
    this.props.setVideoCurrentTime(currentTime)
  }

  endSliding = value => {
    this.setState({startedSliding: false});
    if (this.props.playing) this.props.playVideo();
  }

  togglePlay = () => {
    if (this.props.stopped){
      this.props.setVideoSource(UtilityMethods.mp3URL);
      this.props.video.seek(0);
      this.props.playVideo();
      return;
    }
    this.setState({
      iconPlay: !this.props.playing,
      startedSliding: this.props.playing ? true : false
    });
    this.props.toggleVideoPlay();
  }

  toggleShuffle = () => {
    this.props.setPlayingShuffle(!this.props.shuffle);
  }

  toggleRepeat = () => {
    this.props.setVideoRepeat(!this.props.repeat);
  }
}

mapStateToProps = state => {
  return {
    title: state.playing.title,
    artist: state.playing.artist,
    shuffle: state.playing.shuffle,
    playing: state.video.playing,
    currentTime: state.video.currentTime,
    source: state.video.source,
    video: state.video.component,
    duration: state.video.duration,
    repeat: state.video.repeat,
    stopped: state.video.stopped
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setPlayingTitle, setPlayingArtist,
    setPlayingShuffle, setVideoSource,
    setVideoCurrentTime, toggleVideoPlay, playVideo, pauseVideo,
    setVideoRepeat, setVideoComponent
  }, dispatch)
}

export const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Player)