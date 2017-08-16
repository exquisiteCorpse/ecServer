import React, { Component } from 'react'
import { AppRegistry, Platform } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import App from './components/App'
import AppCamera from './components/Camera/AppCamera'
import UserHome from './components/User/UserHome'
import UserEdges from './components/User/UserEdges'
import { Icon } from 'react-native-elements'
import NewCorpse from './components/NewCorpse'
import {Provider} from 'react-redux'
import store from './store'

const DrawerIcon = ({ navigate }) => {
  if (Platform.OS === 'ios') {
    return null
  } else {
    return <Icon
      name='bars'
      type='font-awesome'
      color='black'
      style={{ paddingLeft: 20 }}
      onPress={() => navigate('DrawerOpen')} />
  }
}

const WelcomeStack = StackNavigator({
  AppScreen: {
    screen: App,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const AddNewCorpseStack = StackNavigator({
  AppCameraScreen: {
    screen: AppCamera,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  },
  NewCorpseScreen: {
    screen: NewCorpse
  }
})

const AllCorpsesStack = StackNavigator({
  UserHomeScreen: { screen: UserHome,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const AllEdgesStack = StackNavigator({
  UserEdgesScreen: { screen: UserEdges,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const AppNav = DrawerNavigator({
  Home: { screen: WelcomeStack },
  Camera: { screen: AddNewCorpseStack },
  UserHome: { screen: AllCorpsesStack },
  UserEdges: { screen: AllEdgesStack }
})

class ecMobileApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppNav>
          <App />
        </AppNav>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
