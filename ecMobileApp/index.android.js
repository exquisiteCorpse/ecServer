import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import App from './components/App'
import AppCamera from './components/Camera/AppCamera'
import UserHome from './components/User/UserHome'
import UserEdges from './components/User/UserEdges'

export default class ecMobileApp extends Component {
  render () {
    return (
      <App />
    )
  }
}

const navigator = DrawerNavigator({
  Home: { screen: App },
  Camera: { screen: AppCamera },
  UserHome: { screen: UserHome },
  UserEdges: { screen: UserEdges }
})

AppRegistry.registerComponent('ecMobileApp', () => navigator)
