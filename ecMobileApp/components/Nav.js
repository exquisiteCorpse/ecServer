import React, { Component } from 'react'
import { AppRegistry, Text, View, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CameraNavButton from './CameraNavButton'
import AppCamera from './AppCamera'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <CameraNavButton navigate={navigate}/>
      </View>
    )
  }
}

class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Camera'
  })
  render() {
    return (

        <AppCamera/>
      
    );
  }
}

const ecMobileApp = StackNavigator({
  Home: { screen: HomeScreen },
  Camera: { screen: CameraScreen }
})

AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
