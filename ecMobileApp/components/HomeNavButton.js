import React, { Component } from 'react'
import { View, Button } from 'react-native'

export default class HomeNavButton extends Component {
  render () {
    return (
      <View>
        <Button
          onPress={() => this.props.navigate('HomeView')}
          title="Home"
        />
      </View>
    )
  }
}
