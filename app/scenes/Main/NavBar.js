import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from 'styles';
import ImageBackground from 'components/image_background'
import { connect } from 'react-redux';
import { bindActionCreators } from 'react';

class NavBar extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={[Styles.mainNavBar, {backgroundColor: 'red'}]}>
        <View style={[Styles.mainNavBarView, Styles.mainNavBarMargin]}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Icon name="bars" style={[Styles.navBarMenuIcon, {color: 'white'}]} />
          </TouchableOpacity>
          <Text style={[Styles.navBarText, {color: 'white'}]}>{this.props.title}</Text>
        </View>
        <Icon name="search" style={[Styles.navBarMenuIcon, {color: 'white'}, Styles.mainNavBarMargin]} />
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    title: state.main.title
  }
}

export default connect(mapStateToProps)(NavBar);