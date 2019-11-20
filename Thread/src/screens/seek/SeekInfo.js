import React, { Component } from "react";
import { LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Searchbar, TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import SelectedItem from "../../components/SelectedItem";
import MaterialButtonGrey from "../../components/MaterialButtonGrey";


export default class App extends React.Component {
  // post_title = this.props.navigation.state.params.title;
  // items = this.props.navigation.state.params.items;
  // state = {
  //   post_title: this.props.navigation.state.params.title,
  //   items: this.props.navigation.state.params.items
  // }

render() {
        const { navigate } = this.props.navigation;
        const post_title = this.props.navigation.getParam('title');
        const items = this.props.navigation.getParam('items');
        return (
          /*Explore using ScrollView instead of View*/
        <View style={styles.container}>
        <Text style={styles.question}>create seek:</Text>
            <Searchbar 
            /* Need to get rid of the search icon */
              style={styles.searchbar}
              value={post_title}

            <FlatList
              data={items}
              style={styles.displayitems}
              renderItem={({ item }) =>
                <TouchableOpacity style={[styles.selectedItem, styles.selectedColor]}>
                  <SelectedItem info={item}/>
                </TouchableOpacity>
              }/>

            <TextInput
              multiline = {true}
              placeholder = "Briefly describe what you're looking for, i.e. 'loose-fitting jeans with rips in the knees' "
              style = {styles.paragraph}
            />
            <TextInput label = "Size" placeholder = "M" style={styles.textinput}/>
            <TextInput label = "Desired Fit" placeholder = "i.e. baggy, snug, slim" style={styles.textinput}/>
            <TextInput label = "Price Cap" placeholder = "$5.50" style={styles.textinput}/>
            <View style={styles.submit}>
            <Button
              title="Finish"
              onPress={() => navigate('SeekSuccess', {title: post_title})}
            />
            </View>
          <TextInput label = "Description"
            multiline = {true}
            placeholder = "Briefly describe what you're looking for, i.e. 'loose-fitting jeans with rips in the knees' "
            style = {styles.paragraph}/>

          <TextInput label = "Size" placeholder = "M" style={styles.textinput}/>
          <TextInput label = "Desired Fit" placeholder = "i.e. baggy, snug, slim" style={styles.textinput}/>
          <TextInput label = "Price Cap" placeholder = "$5.50" style={styles.textinput}/>
          <View style={styles.submit}>
          
          <MaterialButtonGrey
          caption = "Finish"
          navigation={this.props.navigation}
          style={styles.materialButtonGrey}
          onPress={() => navigate('SeekSuccess', {title: post_title})}/>
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
  searchbar: {
    marginTop: 15,
    width: '80%',
    borderRadius: 10,
  },
  question: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  paragraph: {
    width: '80%',
    height: 150,
    fontSize: 18,
    textAlign: 'center'
  },
  selectedColor: {
    backgroundColor: '#6e3b6e'
  },
  textinput: {
    width: '80%',
    marginTop: 15,
  },
  selectedItem: {
    marginTop: 10,
    marginLeft: 5,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayitems: {
    /* Temporary way to display a bit more nicely- can remove later*/
    height: '25%',
  }
});
