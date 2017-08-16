import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import LikeButton from '../Button/LikeButton'
import styles from '../Style/UserHomeStyles'
import {connect} from 'react-redux'
import { fetchLikes, fetchCorpes, destroyLike, postNewLike } from '../../store'
import { imageUrl } from '../../store/url'
class UserHome extends Component {
  componentDidMount () {
    this.props.fetchData()
  }

  render () {
    ///likes set up for render will move to its own file
    const userLikes = []
    const likesCorpse = {}
    if (this.props.likes) {
      this.props.likes.forEach((like) => {
        if (like.userId === 1) {
          userLikes.push(like.corpseId)
        }
        if (likesCorpse[like.corpseId]) {
          likesCorpse[like.corpseId]++
        } else {
          likesCorpse[like.corpseId] = 1
        }
      })
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.corpses.map((corpse) => {
            if (corpse.complete) {
              let userLike = userLikes.includes(corpse.id)
              return (<View key={corpse.id} style={styles.corpse}>
                <View style={styles.imageCorpseTop}>
                  <Text style={styles.textCorpse}>{corpse.photos.map((photo, i) => { return photo.user.username }).join('|')}</Text>
                  <Text style={styles.titleCorpse}>{corpse.title}</Text>
                  <Text style={styles.textCorpse}>...</Text>
                </View>
                <View style={styles.viewCorpse}>
                  {corpse.photos.map((photo) => {
                    return (
                      <Image
                        key={photo.id}
                        style={styles.imageCorpse}
                        source={{uri: `${imageUrl}/${photo.imgUrl}`}}
                      />
                    )
                  }).reverse()}
                </View>
                <View style={styles.imageCorpseBottom}>
                  <LikeButton corpseId={corpse.id} userLike={userLike} userId='1' likes={likesCorpse[corpse.id]} style={styles} handleLike={this.props.handleLike} />
                  <Text>3 Share</Text>
                </View>
              </View>)
            }
          })}
        </View>
      </ScrollView>
    )
  }
}

UserHome.navigationOptions = ({ navigation }) => ({
  title: 'Home'
})

const mapStateToProps = (state) => {
  return {
    likes: state.likes,
    corpses: state.corpses
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchCorpes())
      .then(() => {
        dispatch(fetchLikes())
      })
  },
  handleLike (corpseId, userId, userLike) {
    const like = {
      corpseId: +corpseId,
      userId: +userId
    }
    if (userLike) {
      console.log('drop', corpseId, userId, userLike)
      dispatch(destroyLike(like))
    } else {
      console.log('post', corpseId, userId, userLike)
      dispatch(postNewLike(like))
    }
    console.log(corpseId, userId, userLike)
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
