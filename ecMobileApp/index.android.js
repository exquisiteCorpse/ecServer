import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import App from './components/App'
import AppCamera from './components/Camera/AppCamera'
import UserHome from './components/User/UserHome'
import UserEdges from './components/User/UserEdges'
import NewCorpse from './components/NewCorpse'
import {Provider} from 'react-redux'
import store from './store'

export default class ecMobileApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

const navigator = DrawerNavigator({
  Home: { screen: App },
  Camera: { screen: AppCamera },
  UserHome: { screen: UserHome },
  UserEdges: { screen: UserEdges },
  NewCorpse: { screen: NewCorpse }
})

AppRegistry.registerComponent('ecMobileApp', () => navigator)
