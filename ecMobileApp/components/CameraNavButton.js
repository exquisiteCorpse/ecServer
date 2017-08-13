import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'

export default class CameraNav extends Component {
  render () {
    return (
      <View>
        <Button
          onPress={() => this.props.navigate('Camera')}
          title="Camera"
        />
      </View>
    )
  }
}
