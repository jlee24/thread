import React, { Component } from "react";
import { LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Searchbar, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip} from 'react-native';
import { Button } from 'react-native';
import SelectedItem from "../../components/SelectedItem";
import MaterialButtonGrey from "../../components/MaterialButtonGrey";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";



export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
          <Button
           title='Finish'
           onPress={() => 
            Alert.alert('Confirm Your Seek', 'Post this seek for 2 coins? \n Your current balance is 3 coins.',
            [{text: 'Continue', onPress: () => navigation.navigate('SeekSuccess', {'title': navigation.getParam('title')})},
            {text: 'Cancel', style: 'cancel'},],
            {cancelable: true})
          } />
      };
    };

render() {
        const navigate = this.props.navigation;
        const post_title = this.props.navigation.getParam('title');
        const items = this.props.navigation.getParam('items');

        return (
        <View style={styles.container}>

        <Text style={styles.question}>create seek</Text>
            <Searchbar
            /* Need to get rid of the search icon */
              style={styles.searchbar}
              value={post_title} />

            <View style={styles.selections}>
            <FlatList
              data={items}
              style={styles.displayitems}
              renderItem={({ item }) =>
                <TouchableOpacity style={[styles.selectedItem,
                  item.selected ? styles.selectedBorder : styles.notSelectedBorder,]}>
                  <SelectedItem info={item}/>
                </TouchableOpacity>
              }
              keyExtractor={item => item.id}
              horizontal={true}
              numRows={1}/>
              </View>
          
          <TextInput label = "Description"
            multiline = {true}
            placeholder = "Briefly describe what you're looking for, i.e. 'loose-fitting jeans with rips in the knees' "
            style={styles.textinput}/>

          <TextInput label = "Size" placeholder = "M" style={styles.textinput}/>
          <TextInput label = "Desired Fit" placeholder = "i.e. baggy, snug, slim" style={styles.textinput}/>
          <TextInput label = "Price Cap" placeholder = "$5.50" style={styles.textinput}/>
          <TextInput label = "Look Near" placeholder = "Savers RWC" style={styles.textinput}/>

           {/*Google API key: 'AIzaSyCRe3a844-IW3tE5rhaT35Un_-NMxEqpGg'*/}

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
    textAlign: 'center',
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  paragraph: {
    width: '80%',
    height: 150,
    textAlign: 'center',
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#7adbc9',
  },
  notSelectedBorder: {
    borderWidth: 0,
  },
  textinput: {
    width: '80%',
    marginTop: 15
  },
  selectedItem: {
    marginLeft: 5,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayitems: {
    marginTop: 15
  },
  headerbutton: {
    color: "#2B8FFF"
  },
  selections: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 40,
  },
  finish: {
    backgroundColor: '#7adbc9',
    marginTop: 30,
    borderRadius: 12,
    shadowOffset: {
      height: 5,
      width: -5
    },
  shadowColor: "rgba(178,176,176,1)",
    shadowRadius: 10
  }
});
