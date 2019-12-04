import React, { Component } from "react";
import { ActivityIndicator, LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Searchbar, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip} from 'react-native';
import { Button } from 'react-native';
import SelectedItem from "../../components/SelectedItem";
import MaterialButtonGrey from "../../components/MaterialButtonGrey";
import * as firebase from 'firebase';


export default class App extends React.Component {

  state = {
    currentUser: null,
    userId: '',
    username: '',
    sizeFromProfile: '',
    selectedItems: [],
    currentSeeks: [],
    currentCoins: 0,
    // Form items
    description: '',
    size: '',
    fit: '',
    price: '',
    store: '',
    submitting: false,
  }

  writeSeekData() {
    this.setState({submitting: true});
    var newSeek = firebase.database().ref('seeks').push();
    newSeek.set({
      'userId': this.state.userId,
      'username': this.state.username,
      'title': this.props.navigation.getParam('title'),
      'description': this.state.description,
      'size': this.state.size,
      'fit': this.state.fit,
      'price': this.state.price,
      'store': this.state.store,
      'refImages': this.state.selectedItems,
    });
    this.state.currentSeeks.push(newSeek.key);
    firebase.database().ref('users/' + this.state.userId).update({
      seeks: this.state.currentSeeks,
      coins: (currentCoins - 2 > 0) ? currentCoins - 2 : 0,
    })
    .then(() => this.props.navigation.navigate('SeekSuccess', {'title': this.props.navigation.getParam('title')}))
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.setState({ userId: currentUser.uid });
    firebase.database().ref('users/' + currentUser.uid).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      sizeFromProfile = (snapshot.val() && snapshot.val().sizeLetter[0]) || 'M';
      currentSeeks = (snapshot.val() && snapshot.val().seeks) || [];
      currentCoins = (snapshot.val() && snapshot.val().coins) || 3;
    }).then( () => {
      this.setState({ username });
      this.setState({ sizeFromProfile });
      this.setState({ currentSeeks });
      this.setState({ currentCoins });
    });
    const selectedItems = this.props.navigation.getParam('items');
    this.setState({ selectedItems });

    const { navigation } = this.props;
    navigation.setParams({
        writeSeekData: () => this.writeSeekData(),
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
          <Button
           title='Finish'
           onPress={() =>
            Alert.alert('Confirm Your Seek', 'Post this seek for 2 coins? \n Your current balance is 3 coins.',
            [{text: 'Continue', onPress: navigation.getParam('writeSeekData')},
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

        { this.state.submitting ?
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          : null }

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
            onChangeText={description => this.setState({ description })}
            style={styles.textinput}/>
          <TextInput
            label = "Size"
            placeholder = {this.state.sizeFromProfile}
            onChangeText={size => this.setState({ size })}
            style={styles.textinput}/>
          <TextInput
            label = "Desired Fit"
            placeholder = "i.e. baggy, snug, slim"
            onChangeText={fit => this.setState({ fit })}
            style={styles.textinput}/>
          <TextInput
            label = "Price Cap"
            placeholder = "$5.50"
            onChangeText={price => this.setState({ price })}
            style={styles.textinput}/>
          <TextInput
            label = "Look Near"
            placeholder = "Savers RWC"
            onChangeText={store => this.setState({ store })}
            style={styles.textinput}/>

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
