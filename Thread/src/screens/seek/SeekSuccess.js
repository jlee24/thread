import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Button, StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        const post_title = this.props.navigation.getParam('title');
        return (
        <View style={styles.container}>
            <Text style={styles.header}>{"Your seek, "}{JSON.stringify(post_title)}{", has been submitted!"}</Text>
            <Text style={styles.basic}>{"We\'ll ping you when it\'s been spotted."}</Text>
            <Button style={styles.basic}
              title="Back to home"
              onPress={() => navigate('SeekStart')}
            />
        </View>
        );
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
  },

  header: {
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
  },
  basic: {
    marginTop: 15
  }

});
