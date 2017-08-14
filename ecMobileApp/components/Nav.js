import React, { Component } from 'react'
import { AppRegistry, Text, View, Button, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import AppCamera from './AppCamera'
import Home from './Home'
import UserEdges from './User/UserEdges'
import NewCorpse from './NewCorpse'
import CameraNavButton from './CameraNavButton'
import HomeNavButton from './HomeNavButton'
import EdgesNavButton from './Navigation/EdgesNavButton'
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
        <View style={ButtonStyles.buttonContainer}>
          <EdgesNavButton navigate={navigate} styles={ButtonStyles}/>
        </View>
      </View>
    )
  }
}

// the way we use the nav here puts a back arrow at top
class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Camera'
  })
  render() {
    const {navigate} = this.props.navigation
    return (
        <AppCamera navigate={navigate}/>
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

class EdgesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edges'
  })
  render() {
    return (
        <UserEdges/>
    )
  }
}

export class NewCorpsePreview extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Preview'
  })
  render() {

    return (
      <NewCorpse />
    )
  }
}

const ecMobileApp = StackNavigator({
  Nav: { screen: NavScreen },
  Camera: { screen:  CameraScreen },
  Home: {screen: HomeScreen},
  Edges: {screen: EdgesScreen},
  NewPreview: {screen: NewCorpsePreview}
})



AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
