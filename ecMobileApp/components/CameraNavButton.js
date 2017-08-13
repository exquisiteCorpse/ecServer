import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class CameraNavButton extends Component {
  render () {
    return (
      <View style={this.props.styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigate('Camera')}
        >
          <View style={this.props.styles.button}>
            <Text style={this.props.styles.buttonText}>CAMERA</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
