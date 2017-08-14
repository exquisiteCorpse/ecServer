import React, { Component } from 'react'
import { AppRegistry, Text, View, Button } from 'react-native'
import { TabNavigator } from 'react-navigation'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  })
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    )

  }
}

class AllContactsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Jane' })}
          title="Chat with Jane"
        />
      </View>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
})

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
}

const ecMobileApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen }
})

AppRegistry.registerComponent('ecMobileApp', () => ecMobileApp)
