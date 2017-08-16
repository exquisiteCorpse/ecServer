import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

export default class App extends Component {

  _fbAuth () {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
      if (result.isCancelled) console.log('Login was cancelled')
      else console.log('Login was a success ' + result.grantedPermissions.toString())
    }, (error) => {
      console.log('An error occured: ' + error)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Exquisite Corpse!</Text>
        <TouchableOpacity onPress={this._fbAuth}>
          <Text>Facebook Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

App.navigationOptions = ({ navigation }) => ({
  title: 'Welcome'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
