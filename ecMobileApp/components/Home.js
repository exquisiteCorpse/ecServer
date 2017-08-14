import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import LikeButton from './LikeButton'
export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      corpses: [
        {
          corpseId: 1,
          title: 'ShoeMash',
          images: [
            {pictureId: 1, authorName: 'Shayne', pictureUrl: require('../public/images/corpse1/1.png')},
            {pictureId: 2, authorName: 'Fara', pictureUrl: require('../public/images/corpse1/2.png')},
            {pictureId: 3, authorName: 'Kevin', pictureUrl: require('../public/images/corpse1/3.png')}
          ]
        },
        {
          corpseId: 2,
          title: 'ShoeMashBW',
          images: [
            {pictureId: 1, authorName: 'Shayne', pictureUrl: require('../public/images/corpse2/1.png')},
            {pictureId: 2, authorName: 'Fara', pictureUrl: require('../public/images/corpse2/2.png')},
            {pictureId: 3, authorName: 'Kevin', pictureUrl: require('../public/images/corpse2/3.png')}
          ]
        }

      ],
      likes: [
        { corpseId: 1, likes: 5 },
        { corpseId: 2, likes: 2 }
      ],
      userLikes: [1]
    }
    this.handleLike = this.handleLike.bind(this)
  }

  handleLike (corpseId) {
    let userLike = this.state.userLikes.includes(corpseId)
    if (userLike) {
      //remove like
      const likeArray = this.state.likes.map((like) => {
        if (like.corpseId === corpseId) {
          like.likes--
          return like
        } else {
          return like
        }
      })
      this.setState({
        userLikes: this.state.userLikes.filter((like) => { return like !== corpseId }),
        likes: likeArray
      })

    } else {
      //add likes
      const likeArray = this.state.likes.map((like) => {
        if (like.corpseId === corpseId) {
          like.likes++
          return like
        } else {
          return like
        }
      })

      this.setState({
        userLikes: [...this.state.userLikes, corpseId],
        likes: likeArray
      })
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.corpses.map((corpse) => {
            let likesAll = this.state.likes.find((like) => { return like.corpseId === corpse.corpseId })
            let userLike = this.state.userLikes.includes(corpse.corpseId)
            let authors = ''

            return (<View key={corpse.corpseId} style={styles.corpse}>
              <View style={styles.imageCorpseTop}>
                <Text style={styles.textCorpse}>{corpse.images.map((image, i) => { return image.authorName }).join('|')}</Text>
                <Text style={styles.titleCorpse}>{corpse.title}</Text>
                <Text style={styles.textCorpse}>...</Text>
              </View>
              <View style={styles.viewCorpse}>
                {corpse.images.map((image) => {

                  return (
                    <Image
                      key={image.pictureId}
                      style={styles.imageCorpse}
                      source={image.pictureUrl}
                    />
                  )
                })}
              </View>
              <View style={styles.imageCorpseBottom}>
                <LikeButton corpseId={corpse.corpseId} userLike={userLike} likes={likesAll.likes} style={styles} handleLike={this.handleLike}/>
                <Text>3 Share</Text>
              </View>
            </View>)
          })}
        </View>
      </ScrollView>
    )
  }
}

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
    height: 120,
    alignItems: 'center'
  },
  textLikedCorpse: {
    fontWeight: 'bold'
  },
  titleCorpse: {
    fontWeight: 'bold'
  }
})
