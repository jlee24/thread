import React, { Component } from "react";
import {
  LayoutAnimation,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from "react-native";

import { ImageBackground, TouchableOpacity, Button, FlatList, Image, StyleSheet, Text, View, TextInput, Alert } from 'react-native';

import UploadIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from 'react-native-paper';
import Item from "../../components/Item";
import CurrencyIcon from "../../components/CurrencyIcon";
import SelectedItem from "../../components/SelectedItem";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

let MAX_NUM_SEARCH_RESULTS_TO_DISPLAY = 50;

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
    quotaLeft: true,
    error: null,
    currentUser: null,
    coins: 3,
  };


  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <Button
        onPress={() =>
          navigation.navigate('SeekInfo', {
            title: navigation.getParam('title'),
            items: navigation.getParam('items'),
            currentUser: navigation.getParam('currentUser')
          }
        )}
        title="Next"
        style={styles.headerbutton} />)
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    //if updating title
    this.props.navigation.setParams({
      title: "", //or whatever the default value is
      items: [], //default value,
      currentUser: currentUser,
    });

    // Get currency
    userId = currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      coins = (snapshot.val() && snapshot.val().coins) || 3;
    }).then(() => this.setState({coins}));

    this.props.navigation.addListener(
        'willFocus',
        () => {
          userId = currentUser.uid;
          firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            coins = (snapshot.val() && snapshot.val().coins) || 3;
          }).then(() => this.setState({coins}));
        }
    )
  }

  arrayholder = require('../../../assets/database.json');

  updateSearch = async (search) => {
    this.setState({ query: search });
    this.props.navigation.setParams({
      title: search
    });
    if (search === '') {
      this.setState({ data: [] });
    }
    else if (this.state.quotaLeft) {
      var newData = [];
      search = search.toLowerCase();
      if (search.includes('graphic') || search.includes('dress') || search.includes('sweater') || search.includes('hood') || search.includes('jeans')) {
        fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyCcWSCBiwLVf2Y108sfDkpIEOsPHYB1u3E&cx=008952763162707324316:33prtpoq7jm&searchType=image&q=' + search)
          .then((response) => response.json())
          .then((responseJson) => {
            items = responseJson.items;
            if (items) {
              var newData = [];
              var i;
              for (i = 0; i < MAX_NUM_SEARCH_RESULTS_TO_DISPLAY; i++) {
                if (items[i]) {
                  obj = {
                      'id': items[i].title,
                      'name': items[i].title,
                      'tags': items[i].title + ' ' + items[i].displayLink + ' ' + search,
                      'path': items[i].link,
                      'selected': true,
                  }
                  if (this.state.selectedItems.indexOf(obj) < 0) {
                    obj.selected = false;
                    newData.push(obj);
                  }
                }
              }
              this.setState({ data: newData });
            }
          })
          .catch((error) =>{
            console.error(error);
            this.state.quotaLeft = false;
          });
        }
      }
      else {
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
      }
  };

  changeSelection = (item) => {
    if (this.arrayholder.indexOf(item) < 0) {
      this.arrayholder.push(item);
    }
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
          {/* Story Bubbles */}

          <View style={styles.seekBubbles}>

           <ImageBackground
              source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hoodiehalo.png" }}
              style={ styles.imageWrapper }>
              <TouchableOpacity
                style={ styles.button }
                onPress={ () => { navigate('StoryViewHoodie') }}>
                <Text style={ styles.text }>×</Text>
              </TouchableOpacity>
            </ImageBackground>

          <ImageBackground
              source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/leatherhalo.png" }}
              style={ styles.imageWrapper }>
              <TouchableOpacity
                style={ styles.button }
                onPress={ () => { navigate('StoryViewPants') }}>
                <Text style={ styles.text }>×</Text>
              </TouchableOpacity>
            </ImageBackground>


            <ImageBackground
              source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/greenlacenohalo.png" }}
              style={ styles.imageWrapper }>
              <TouchableOpacity
                style={ styles.button }
                onPress={ () => { alert("Your green lace shirt has not yet been spotted. We will notify you once it is!") }} >
                <Text style={ styles.text }>×</Text>
              </TouchableOpacity>
            </ImageBackground>


            <View style={ styles.spacer }/>
            <View style={ styles.currencyContainer }>
                <CurrencyIcon amount={this.state.coins}/>
            </View>
          </View>

          {/* Question and Search Bar */}
          <View style={this.state.query.length == 0 ? styles.searchContainer : styles.searchContainerWithResults}>
            <Text style={styles.question}>What are you seeking?</Text>
            <Button onPress={() => navigate('CameraView')} title="Spot"/>
            {/* Remove */}
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
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekBubbles: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 32,
    left: 32,
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
    width: 100,
    height: "5%",
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerbutton: {
    color: "#2B8FFF",
  },
  name: {
    width: 164,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  button:{
    width:78,
    height:78,
    backgroundColor:'white',
    opacity: 0,
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
    borderRadius:20,
    position:'absolute',
    left:0,
    top:0,
    marginRight:15,
  },
  imageWrapper:{
     width:78,
     height:78,
     borderRadius:0,
     marginRight:15,
  },
  text:{
    fontSize:40,
    color:'white',
    lineHeight:42
  }

});
