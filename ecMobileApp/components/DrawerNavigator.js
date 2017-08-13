import React, { Component } from 'react'
import { AppRegistry, Text, View, Button, StyleSheet, Image } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../public/images/chats-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../public/images/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
})

const ecMobileApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
})



AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
