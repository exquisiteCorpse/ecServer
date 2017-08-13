import React, { Component } from 'react'
import { AppRegistry, Text, View, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraNavButton from './CameraNavButton'
import AppCamera from './AppCamera'
import Home from './Home'
import HomeNavButton from './HomeNavButton'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <CameraNavButton navigate={navigate}/>
        <HomeNavButton navigate={navigate}/>
      </View>
    )
  }
}

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

class HomeView extends React.Component {
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
  Home: { screen: HomeScreen },
  Camera: { screen:  CameraScreen },
  HomeView: {screen: HomeView}
})

AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
