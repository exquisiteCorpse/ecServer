import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'

export default class UserEdges extends Component {
  render () {
    const baseUri = 'https://battleoftheships.herokuapp.com/images/corpse'

    return (
      <View style={styles.container}>
        <ScrollView>
          {[1, 2].map((index) => {
            return (
              <View key={index}>
                <Image
                  style={styles.corpseEdge}
                  source={{uri: `${baseUri}${index}/1.png`}}
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
    height: 120,
    width: 360,
    marginTop: 15,
    marginBottom: 15
  }
})
