import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('TabNavigator'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome back!
        </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          label="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
        />
        <TextInput
          secureTextEntry
          label="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
        />
        <Button mode="contained"
                color="#50CDB6"
                contentStyle={{height: 40}}
                onPress={this.handleLogin}
                style={styles.button}>
          Login
        </Button>
        <Button
          color="#50CDB6"
          onPress={() => this.props.navigation.navigate('SignUp')}
          style={styles.button}>
          Don&#39;t have an account? Sign Up
        </Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 25,
    fontFamily: 'roboto-regular',
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
    color: "#50CDB6"
  },
  textInput: {
    height: 60,
    width: '90%',
    marginTop: 8
  },
  button: {
    marginTop: 15
  },
})
