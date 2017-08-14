import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Camera from './Camera/AppCamera'
import { Icon } from 'react-native-elements'

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

App.navigationOptions = {
  title: 'Exquisite Corpse',
  headerleft: (
    <TouchableOpacity onPress={() => this.props.navigate('DrawerOpen')}>
      <Icon name='bars' type='font-awesome' color='#f50' />
    </TouchableOpacity>
  )
}

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
