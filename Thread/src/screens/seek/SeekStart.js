import React, { Component } from "react";
import {
  LayoutAnimation,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from "react-native";

import { Button, FlatList, Image, StyleSheet, Text, View, TextInput } from 'react-native';

import UploadIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from 'react-native-paper';
import Item from "../../components/Item";
import SelectedItem from "../../components/SelectedItem";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCfF3iTUzsqphpDyYV94Rmoz-E4drDlSuU",
    authDomain: "thread-ca0bb.firebaseapp.com",
    databaseURL: "https://thread-ca0bb.firebaseio.com",
    projectId: "thread-ca0bb",
    storageBucket: "thread-ca0bb.appspot.com",
    messagingSenderId: "642322348698",
    appId: "1:642322348698:web:2d29abda75aae0ebe2fd23",
    measurementId: "G-BSTC9VG2QX"
  };

export default class App extends React.Component {
  componentDidMount = () => {
    firebase.initializeApp(firebaseConfig);
  }

  getPermissionAsync = async (permission) => {
    const { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll or camera permissions to make this work!');
    }
  }

  uploadImage = async(uri) => {
    const name = await AsyncStorage.getItem('name');
    const response = await fetch(uri);
    const blob = await response.blob();
    let splitURI = uri.split('/');
    let filename = splitURI[splitURI.length - 1];
    var ref = firebase.storage().ref().child(name+'/'+filename);
    let task = ref.put(blob);
    return {task, ref};
  };

  uploadFromLibrary = async () => {
    await this.getPermissionAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      //uri is the local name of the image on phone
      let res = await this.uploadImage(result.uri);

      //To save where the image is, we can do 2 things.
      //1) just keep track of the url by putting it in the user data in firebase or locally
      //2) don't get the url until you need it. i.e., you know the user folder in storage, so why get url right now? Get it when you need it
      await res.task;
      let url = await res.ref.getDownloadURL();
      console.log(url);
    }
  }

  state = {
    query: '',
    data: [],
    selectedItems: [],
    error: null,
    refresh: true,
  };

  arrayholder = require('../../../assets/database.json');

  updateSearch = async (search) => {
    this.setState({ query: search });
    const newData = this.arrayholder.filter(item => {
       const itemData = `${item.name.toUpperCase()} ${item.tags.toUpperCase()}`;
       const textData = search.toUpperCase();
       return itemData.indexOf(textData) > -1;
    });
    if (!/\S/.test(search)) {
       this.setState({ data: [] });
    } else {
       this.setState({ data: newData });
    }
  };

  changeSelection = (item) => {
    const match = this.arrayholder.indexOf(item);
    const match_item = this.arrayholder[match];
    match_item['selected'] = !match_item['selected'];
    this.arrayholder[match] = match_item;
    this.setState({data: this.state.data})

    const selectedItems = this.arrayholder.filter(arrayItem => {
       return arrayItem.selected;
    });
    this.setState({selectedItems: selectedItems});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { query } = this.state;
    const { selectedItems } = this.state
		return (
        /* Outermost View */
        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* Next Button */}
          <View style={styles.next}>
            <Button
              title="Next"
              onPress={() => navigate('SeekInfo', {
                title: query,
                items: selectedItems
              })}/>
          </View>
          {/* Question and Search Bar */}
          <View style={styles.container}>
            <Text style={styles.question}>what are you seeking?</Text>
            <Searchbar
              style={styles.searchbar}
              placeholder="Type here..."
              onChangeText={this.updateSearch}
              value={query}
            />
          </View>
          {/* Upload impage icon and Selected items */}
          <View style={styles.selections}>
            <TouchableOpacity activeOpacity = { .3 } onPress={ this.uploadFromLibrary }>
              <Image
                style={styles.icon}
                source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/upload-photo-icon.png" }}
              />
            </TouchableOpacity>
            <FlatList
              data={this.state.selectedItems}
              extraData={this.state}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => this.changeSelection(item)}
                  style={[
                    styles.selectedItem,
                    item.selected ? styles.selectedColor : styles.notSelectedColor,
                  ]}
                >
                  <SelectedItem
                    info={item}
                   />
                 </TouchableOpacity>
               }
               keyExtractor={item => item.id}
               horizontal={true}
               numRows={1}
              //  ItemSeparatorComponent={this.renderSeparator}
              //  ListHeaderComponent={this.renderHeader}
            />
          </View>
          {/* Search Results */}
          <View style={styles.results}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => this.changeSelection(item)}
                  style={[
                    styles.item,
                    item.selected ? styles.selectedColor : styles.notSelectedColor,
                  ]}
                >
                  <Item
                    info={item}
                   />
                 </TouchableOpacity>
               }
               keyExtractor={item => item.id}
               numColumns={2}
              //  ItemSeparatorComponent={this.renderSeparator}
              //  ListHeaderComponent={this.renderHeader}
            />
          </View>
        </View>


		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  question: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  searchbar: {
    marginTop: 15,
    width: '80%',
    borderRadius: 10,
  },
  results: {
    flex:3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderWidth: 0,
    borderColor: '#F8D7FF',
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemimage: {
    width: 180,
    height: 180,
  },
  selections: {
    marginLeft: 40,
    width: '90%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  selectedItem: {
    marginBottom: 10,
    marginLeft: 5,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColor: {
    backgroundColor: '#6e3b6e'
  },
  notSelectedColor: {
    backgroundColor: '#f9c2ff'
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  next: {
    // top:-50,
    width: 100,
    height: "5%",
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  }
});
