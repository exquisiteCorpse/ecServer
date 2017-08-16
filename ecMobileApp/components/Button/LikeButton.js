import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default class LikesButton extends Component {
  render () {
    let like = <Text>{this.props.likes} Likes</Text>
    if (this.props.userLike) {
      like = <Text style={this.props.style.textLikedCorpse}>{this.props.likes} Likes</Text>
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.handleLike(this.props.corpseId, this.props.userId, this.props.userLike)}
        >
          <View>
            {like}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
