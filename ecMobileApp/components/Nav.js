import React, { Component } from 'react'
import { AppRegistry, Text, View, Button, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraNavButton from './CameraNavButton'
import AppCamera from './AppCamera'
import Home from './Home'
import HomeNavButton from './HomeNavButton'
import ButtonStyles from './ButtonStyles'

class NavScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={ButtonStyles.container}>
        <View style={ButtonStyles.buttonContainer}>
          <CameraNavButton navigate={navigate} styles={ButtonStyles}/>
        </View>
        <View style={ButtonStyles.buttonContainer}>
          <HomeNavButton navigate={navigate} styles={ButtonStyles}/>
        </View>
      </View>
    )
  }
}
//
//the way we use the nav here puts a back arrow at top
class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Camera'
  })
  render() {
    return (
        <AppCamera/>
    )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home'
  })
  render() {
    return (
        <Home/>
    )
  }
}

const ecMobileApp = StackNavigator({
  Nav: { screen: NavScreen },
  Camera: { screen:  CameraScreen },
  Home: {screen: HomeScreen}
})



AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
