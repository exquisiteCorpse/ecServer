import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native'
import {connect} from 'react-redux'
import store from '../store'

export default class NewCorpse extends Component {
  constructor () {
    super()
    this.state = store.getState()
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    console.log(this.state.singlePhoto.path, this.state.singlePhoto.mediaUri)
    return (
      <View>

        <Image
          style={{width: 400, height: 300}}
          source={{uri: this.state.singlePhoto.path}}
        />
      </View>
    )
  }
}

NewCorpse.navigationOptions = ({ navigation }) => ({
  title: 'New Corpse'
})
