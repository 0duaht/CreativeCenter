import React, { Component} from 'react';
import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageBackground from 'components/image_background';
import FullContainer from 'components/full_container';
import VideoComponent from 'components/video';
import NavBar from 'components/navbar';
import { MyMusic, New, Connect, Forum, Playlists } from './scenes';
import { bindActionCreators } from 'redux';
import { setMainIndex } from 'actions/index';
import { connect } from 'react-redux';
const MY_MUSIC_INDEX = 0;
const PLAYLISTS_INDEX = 1;
const NEW_INDEX = 2;
const CONNECT_INDEX = 3;
const FORUM_INDEX = 4;

class Page extends Component {
  renderBasedOnIndex = index => {
    switch(index){
      case MY_MUSIC_INDEX: {
        return <MyMusic drawer={this.props.openDrawer}/>
      }
      case PLAYLISTS_INDEX: {
        return <Playlists drawer={this.props.openDrawer}/>
      }
      case NEW_INDEX: {
        return <New drawer={this.props.openDrawer}/>
      }
      case CONNECT_INDEX: {
        return <Connect drawer={this.props.openDrawer}/>
      }
      case FORUM_INDEX: {
        return <Forum drawer={this.props.openDrawer}
                resetIndex={() => this.props.setMainIndex(0)}/>
      }
    }
  }

  render() {
    return (
      <FullContainer>
        {this.renderBasedOnIndex(this.props.index)}
        <VideoComponent />
      </FullContainer>
    )
  }
}

mapStateToProps = state => {
  return {
    index: state.main.index
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setMainIndex
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
