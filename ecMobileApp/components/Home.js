import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'

export default class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {[0, 1, 2].map((index) => {
            return (<View key={index} style={styles.corpse}>
              <View style={styles.imageCorpseTop}/>
              <Image
                style={styles.imageCorpse}
                source={require('../public/images/corpse.jpg')}
              />
              <View style={styles.imageCorpseBottom}/>
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
  corpse: {
    width: 340,
    height: 400,
    backgroundColor: 'powderblue',
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  imageCorpseTop: {
    backgroundColor: 'steelblue',
    width: 340,
    height: 30
  },
  imageCorpseBottom: {
    backgroundColor: 'steelblue',
    width: 340,
    height: 30
  },
  imageCorpse: {
    width: 340,
    height: 340,
    alignItems: 'center'
  }
})
