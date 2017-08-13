import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class HomeNavButton extends Component {
  render () {
    return (
      <View style={this.props.styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigate('Home')}
        >
          <View style={this.props.styles.button}>
            <Text style={this.props.styles.buttonText}>HOME</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
