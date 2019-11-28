import React, { Component } from "react";
import {
  LayoutAnimation,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from "react-native";
import { Button, FlatList, Image, StyleSheet, Text, View, TextInput, Alert } from 'react-native';

import UploadIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from 'react-native-paper';
import Item from "../../components/Item";
import CurrencyIcon from "../../components/CurrencyIcon";
import SelectedItem from "../../components/SelectedItem";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';


export default class App extends React.Component {

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

      const selectedItems = this.state.selectedItems;
      const userUpload = {
        "id": "user" + selectedItems.length.toString(),
        "name": "User Upload",
        "tags": "user upload",
        "path": url,
        "selected": true,
      }
      this.arrayholder.push(userUpload);

      selectedItems.unshift(userUpload)
      this.setState({selectedItems: selectedItems});
    }
  }

  state = {
    query: '',
    data: [],
    selectedItems: [],
    error: null,
    refresh: true,
    currentUser: null,
  };


  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <Button
        onPress={() =>
          navigation.navigate('SeekInfo', {
            title: navigation.getParam('title'),
            items: navigation.getParam('items')
          }
        )}
        title="Next"
        style={styles.headerbutton} />)
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    //if updating title
    this.props.navigation.setParams({
      title: "", //or whatever the default value is
      items: [], //default value
    });
  }

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
    this.props.navigation.setParams({
      title: search
    });
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
    this.props.navigation.setParams({
      items: selectedItems
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { query } = this.state;
    const { selectedItems } = this.state

		return (
        /* Outermost View */
        <View style={styles.container}>
          {/* Story Bubbles (TODO: currently placeholders) */}
          <View style={styles.seekBubbles}>
            <Image
              style={ styles.icon }
              source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/seek_bubbles/bubble1.png" }}
            />
            <Image
              style={ styles.icon }
              source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/seek_bubbles/bubble2.png" }}
            />
            <Image
              style={ styles.icon }
              source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/seek_bubbles/bubble3.png" }}
            />
            <View style={ styles.spacer }/>
            <View style={ styles.currencyContainer }>
                <CurrencyIcon amount={8}/>
            </View>
          </View>

          {/* Question and Search Bar */}
          <View style={this.state.query.length == 0 ? styles.searchContainer : styles.searchContainerWithResults}>
            <Text style={styles.question}>What are you seeking?</Text>
            <Searchbar
              style={styles.searchbar}
              placeholder="e.g. miguel graphic tee"
              onChangeText={this.updateSearch}
              value={query}
            />
          </View>
          { this.state.query.length > 0 ?
          <View style={styles.resultsContainer}>
            {/* Upload image icon and Selected items */}
            <View style={styles.selections}>
              <TouchableOpacity activeOpacity = { .3 } onPress={ this.uploadFromLibrary }>
                <Image
                  style={ styles.icon }
                  source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/upload_photo_button.png" }}
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
                      item.selected ? styles.selectedBorder : styles.notSelectedBorder,
                    ]}
                  >
                    <SelectedItem info={item}/>
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
                    >
                      <Item
                        info={item}
                        isSelected={item.selected}
                        style={[
                          item.selected ? styles.selectedBorder : styles.notSelectedBorder
                        ]}/>
                       <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                  }
                  keyExtractor={item => item.id}
                  numColumns={2}
                  //  ItemSeparatorComponent={this.renderSeparator}
                  //  ListHeaderComponent={this.renderHeader}
                />
              </View>
            </View> : null}
          </View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekBubbles: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 32,
    left: 44,
  },
  spacer: {
    width: 12,
  },
  currencyContainer: {
    marginTop: 20,
  },
  searchContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  searchContainerWithResults: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 230,
    marginBottom: 20,
  },
  question: {
    textAlign: 'center',
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
  resultsContainer: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
  },
  results: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selections: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginBottom: 24,
  },
  selectedItem: {
    marginLeft: 5,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#7adbc9',
  },
  notSelectedBorder: {
    borderWidth: 0,
  },
  icon: {
    width: 72,
    height: 72,
    marginRight: 15,
  },
  next: {
    // top:-50,
    width: 100,
    height: "5%",
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerbutton: {
    color: "#2B8FFF"
  },
  name: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5
  }
});
