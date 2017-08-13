import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'

export default class UserEdges extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {[0, 1, 2].map((index) => {
            return (
              <View key={index}>
                <Image
                  style={styles.corpseEdge}
                  source={require('../../public/images/edge.jpg')}
                  resizeMode='cover'
                />
              </View>)
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  corpseEdge: {
    height: 200,
    marginTop: 15,
    marginBottom: 15
  }
})
