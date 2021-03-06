import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Button, StyleSheet, Text, View } from 'react-native';

import SubmitButton from "../../components/SubmitButton";

export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        const post_title = this.props.navigation.getParam('title');
        return (
        <View style={styles.container}>
            <Text style={styles.header}>{"Your seek, "}{JSON.stringify(post_title)}{", has been submitted!"}</Text>
            <Text style={styles.basic}>{"We\'ll ping you when it\'s been spotted."}</Text>
            <SubmitButton
              caption="Back to home"
              onPress={() => navigate('SeekStart', {'clearSeekStart': true})}
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
    width: '75%',
    marginBottom: 30
  },
  basic: {
    marginTop: 15
  },
  home: {
    marginTop: 30
  }

});
