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

export default class ecMobileApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

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

const Stack1 = StackNavigator({
  Screen1: {
    screen: App,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const Stack2 = StackNavigator({
  Screen2: {
    screen: AppCamera,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const Stack3 = StackNavigator({
  Screen3: { screen: UserHome,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const Stack4 = StackNavigator({
  Screen4: { screen: UserEdges,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const Stack5 = StackNavigator({
  Screen5: { screen: NewCorpse,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon {...navigation} />
    })
  }
})

const AppNav = DrawerNavigator({
  Home: { screen: Stack1,
    navigationOptions: {
      drawer: {
        label: 'App'
      }
    }
  },
  Camera: { screen: Stack2,
    navigationOptions: {
      drawer: {
        label: 'Camera'
      }
    }
  },
  UserHome: { screen: Stack3,
    navigationOptions: {
      drawer: {
        label: 'Home'
      }
    }
  },
  UserEdges: { screen: Stack4,
    navigationOptions: {
      drawer: {
        label: 'Edges'
      }
    }
  },
  NewCorpse: { screen: Stack5,
    navigationOptions: {
      drawer: {
        label: 'NewCorpse'
      }
    }
  }
})

AppRegistry.registerComponent('ecMobileApp', () => AppNav)
