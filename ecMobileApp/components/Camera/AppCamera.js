import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import store, { getPhoto } from '../../store'
import Camera from 'react-native-camera'

export default class AppCamera extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)} >[capture]</Text>
        </Camera>
      </View>
    )
  }

  takePicture () {
    this.camera.capture()
      .then((data) => {
        store.dispatch(getPhoto(data))
        this.props.navigation.navigate('NewCorpseScreen')
      })
      .catch(err => console.error(err))
  }
}

AppCamera.navigationOptions = ({ navigation }) => ({
  title: 'Camera'
})

const styles = StyleSheet.create({
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
