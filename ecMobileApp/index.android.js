/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Camera from 'react-native-camera'
import AppCamera from './components/AppCamera'

export default class ecMobileApp extends Component {
  render () {
    return (
      <View style={styles.container}>
        <AppCamera/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
