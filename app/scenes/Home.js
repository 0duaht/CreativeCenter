/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  BackAndroid,
  Text,
  Platform,
  TextInput,
  SegmentedControlIOS,
  Image,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import routes from 'constants/routes';
import { setHomeView, setHomeBinding } from 'actions';
import styles from 'styles';
import LoadingScreen from 'components/loading_screen';
import UtilityMethods from 'services/utilityMethods';
import AuthService from 'services/auth_service';
import ImageBackground from 'components/image_background';
import FullContainer from 'components/full_container';
import InputContainer from 'components/input_container';

class Home extends Component {
  loginUser = () => {
    this.setState({
      loginErrorText: ''
    });
    const data = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    if (!Object.keys(data).every(key => data[key] !== '')){
      this.setState({
        loginErrorText: 'Please fill in all entries'
      });
      return;
    }

    this.setState({
      loadingText: 'Logging in',
      view: this.renderLoadingScreen
    });
    AuthService.loginUser(data, this.loginResponse)
  }

  registerUser = () => {
    this.setState({
      registerErrorText: ''
    });

    const data = {
      password: this.state.registerPassword,
      password_confirmation: this.state.passwordConfirm,
      email: this.state.registerEmail,
      first_name: this.state.firstName,
      last_name: this.state.lastName
    }

    if (!Object.keys(data).every(key => data[key] !== '')){
      this.setState({
        registerErrorText: 'Please fill in all entries'
      });
      return;
    }

    if (this.state.registerPassword != this.state.passwordConfirm){
      this.setState({
        registerErrorText: 'Password and Confirm Password do not match'
      });
      return;
    }

    this.setState({
      loadingText: 'Registering account',
      view: this.renderLoadingScreen
    })
    AuthService.registerUser({ user: data }, this.registerResponse)
  }

  handleResponse = (response, status, view, stateKey) => {
    if (status === undefined || status != 200){
      this.setState({
        [stateKey]: response.message || "Error with connection. Please try again",
        loadingText: '',
        view
      });
      return;
    }

    BackAndroid.removeEventListener('hardwareBackPress', this.showAuth);
    this.props.navigator.push({id: routes.MAIN});
  }

  loginResponse = (response, status) => {
    this.handleResponse(response, status, this.renderLoginView, 'loginErrorText');
  }

  registerResponse = (response, status) => {
    this.handleResponse(response, status, this.renderRegistrationView, 'registerErrorText')
  }

  renderLoadingScreen = () => {
    return(
      <LoadingScreen text={this.state.loadingText} />
    )
  }

  renderLoginView = () => {
    return (
      <ImageBackground>
        <View style={{flex: 5}}></View>
        <InputContainer style={styles.loginComponent}>
          <View style={styles.center}>
            <Image source={styles.logoImage} style={styles.logo}></Image>
            <View style={styles.buttonGroup}>
              <View style={styles.inputContainer}>
                <View style={[styles.bottomTextContainer, {marginBottom: 3}]}>
                  <Text style={[{color: 'red'}, styles.bottomText]}>{UtilityMethods.applyLetterSpacing(this.state.loginErrorText, 1)}</Text>
                </View>
                <TextInput
                  ref="loginEmail"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="Email address"
                  onChangeText={(value) => this.setState({loginEmail: value})}
                  value={this.state.loginEmail}
                  onSubmitEditing={(value) => this.refs.loginPassword.focus()}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  ref="loginPassword"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  style={styles.inputText}
                  placeholder="Password"
                  onChangeText={(value) => this.setState({loginPassword: value})}
                  onSubmitEditing={this.loginUser}
                />
              </View>

              <TouchableOpacity onPress={this.loginUser}>
                <View style={styles.buttonContainer}>
                  <Text ref="loginButton" style={styles.centerWhiteText}>Login</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.showRegister}>
                <View style={styles.bottomTextContainer}>
                  <Text style={[{color: 'cornflowerblue'}, styles.bottomText]}>{UtilityMethods.applyLetterSpacing("Don't have an account? Register here", 1)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </InputContainer>
      </ImageBackground>
    )
  }

  renderRegistrationView = () => {
    return (
      <ImageBackground>
        <View style={{flex: 5}}></View>
        <InputContainer style={styles.regComponent}>
          <View style={styles.center}>
            <Image source={styles.logoImage} style={styles.logo}></Image>
            <View style={styles.buttonGroup}>
              <View>
                <View style={styles.inputContainer}>
                  <View style={[styles.bottomTextContainer, {marginBottom: 3}]}>
                    <Text style={[{color: 'red'}, styles.bottomText]}>{UtilityMethods.applyLetterSpacing(this.state.registerErrorText, 1)}</Text>
                  </View>
                  <TextInput
                    ref="firstName"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    autoCapitalize="words"
                    style={styles.inputText}
                    placeholder="First Name" 
                    onChangeText={(value) => this.setState({firstName: value})}
                    value={this.state.firstName}
                    onSubmitEditing={(value) => this.refs.lastName.focus()}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="lastName"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    autoCapitalize="words"
                    style={styles.inputText}
                    placeholder="Last Name" 
                    onChangeText={(value) => this.setState({lastName: value})}
                    value={this.state.lastName}
                    onSubmitEditing={(value) => this.refs.registerEmail.focus()}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="registerEmail"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={styles.inputText}
                    placeholder="Email address"
                    onChangeText={(value) => this.setState({registerEmail: value})}
                    value={this.state.registerEmail}
                    onSubmitEditing={(value) => this.refs.registerPassword.focus()}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="registerPassword"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    style={styles.inputText}
                    placeholder="Password"
                    onChangeText={(value) => this.setState({registerPassword: value})}
                    onSubmitEditing={(value) => this.refs.passwordConfirm.focus()}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="passwordConfirm"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    onChangeText={(value) => this.setState({passwordConfirm: value})}
                    onSubmitEditing={(value) => this.registerUser}
                  />
                </View>

                <TouchableOpacity onPress={this.registerUser}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.centerWhiteText}>Register</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.showLogin}>
                  <View style={styles.bottomTextContainer}>
                    <Text style={[{color: 'cornflowerblue'}, styles.bottomText]}>{UtilityMethods.applyLetterSpacing("Already have an account? Login here", 1)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </InputContainer>
      </ImageBackground>
    )
  }

  showLogin = () => {
    this.setState({
      view: this.renderLoginView,
      registerErrorText: ''
    });
    this.addAndroidBinding();
  }

  showRegister = () => {
    this.setState({
      view: this.renderRegistrationView,
      loginErrorText: ''
    });
    this.addAndroidBinding();
  }

  addAndroidBinding = () => {
    if (!this.state.bindingDone){
      BackAndroid.addEventListener('hardwareBackPress', this.showAuth);
      this.setState({ bindingDone: true })
    }
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.showAuth);
  }

  showAuth = () => {
    BackAndroid.removeEventListener('hardwareBackPress', this.showAuth);
    this.setState({
      view: this.renderAuthView,
      bindingDone: true
    })
    return true;
  }

  constructor(props){
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      firstName: '',
      lastName: '',
      registerEmail: '',
      registerPassword: '',
      loginErrorText: '',
      registerErrorText: '',
      passwordConfirm: '',
      view: this.renderAuthView,
      bindingDone: false
    }
    const sprint = {
      duration: 300,
      create: {
        type: 'linear',
        property: 'opacity',
      },
      update: {
        type: 'spring',
        springDamping: 0.4,
      },
      delete: {
        type: 'linear',
        property: 'opacity',
      },
    }
    LayoutAnimation.configureNext(sprint);
  }

  renderAuthView = () => {
    return (
      <ImageBackground>
        <View style={{flex: 5}}></View>
        <View style={styles.userComponent}>
          <View style={styles.center}>
            <Image source={styles.logoImage} style={styles.logo}></Image>
            <Text style={styles.homeText}>{UtilityMethods.applyLetterSpacing("Creative Centre", 3)}</Text>
            <View style={styles.buttonGroup}>
              <View>
                <TouchableOpacity onPress={this.showLogin}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.centerWhiteText}>Login as User</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigator.push({id: routes.ARTIST_VIEW})}>
                  <View style={[styles.buttonContainer, { backgroundColor: 'cornflowerblue'}]}>
                    <Text style={styles.centerWhiteText}>Login as Artiste</Text>
                  </View>
                </TouchableOpacity>

                <View style={{marginTop: 6}}>
                  <Text style={[styles.centerWhiteText, styles.bottomText]}>{UtilityMethods.applyLetterSpacing("All the Creative Content You Want", 1)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200, 'easeInEaseOut', 'opacity'
    ));
  }

  render() {
    return (
      <FullContainer>
        {this.state.view()}
      </FullContainer>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
  }, dispatch)
}

export const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);
