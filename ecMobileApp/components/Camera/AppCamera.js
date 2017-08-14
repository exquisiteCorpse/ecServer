import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { getPhoto } from '../store'
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
          orientation={Camera.constants.Orientation.landscapeLeft}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this) } >[capture]</Text>
        </Camera>
      </View>
    )
  }

  takePicture () {
    console.log('************camera button pressed')
    this.camera.capture()
      .then((data) => {
        console.log(data)
        this.props.navigate('NewPreview')
      })
      .catch(err => console.error(err))
  }
}

AppRegistry.registerComponent('AppCamera', () => AppCamera)

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
