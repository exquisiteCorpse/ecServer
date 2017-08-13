import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class UserEdgesNavButton extends Component {
  render () {
    return (
      <View style={this.props.styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigate('Edges')}
        >
          <View style={this.props.styles.button}>
            <Text style={this.props.styles.buttonText}>EDGES</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
