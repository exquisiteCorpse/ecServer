import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  corpse: {
    width: 360,
    height: 420,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  imageCorpseTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360,
    height: 30
  },
  imageCorpseBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360,
    height: 30
  },
  viewCorpse: {
    width: 360,
    height: 360,
    alignItems: 'center'
  },
  imageCorpse: {
    width: 360,
    height: 120
  },
  textLikedCorpse: {
    fontWeight: 'bold'
  },
  titleCorpse: {
    fontWeight: 'bold'
  }
})

export default styles
