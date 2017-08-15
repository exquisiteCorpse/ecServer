import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text } from 'react-native'
import Camera from './Camera/AppCamera'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Exquisite Corpse!
        </Text>
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
