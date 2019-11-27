import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, Button} from 'react-native';


export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        
    		return (

      		<View style={styles.container}>
        			
          <Text>Spot!</Text>

          <Button onPress={() => this.props.navigation.navigate('StoreView')} title="Goodwill">
          </Button>

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
  },
});
