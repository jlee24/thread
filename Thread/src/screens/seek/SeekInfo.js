import React, { Component } from "react";
import { ActivityIndicator, LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Searchbar, HelperText, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip} from 'react-native';
import { Button } from 'react-native';
import SelectedItem from "../../components/SelectedItem";
import MaterialButtonGrey from "../../components/MaterialButtonGrey";
import * as firebase from 'firebase';


export default class App extends React.Component {

  state = {
    shopNames: ['Goodwill of Silicon Valley', 'Goodwill Boutique', 'The Shop', 'Fillmore & 5th'],
    currentUser: null,
    userId: '',
    username: '',
    sizeFromProfileLetter: '',
    sizeFromProfileNumber: '',
    selectedItems: [],
    currentSeeks: [],
    currentCoins: '',
    // Form items
    description: null,
    size: null,
    fit: null,
    price: null,
    store: null,
    submitting: false,
    errorsRemaining: false,
    errorMessage: '',
  }

  letterSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '0X', '1X', '2X', '3X', '4X', '5X'];
  numberSizes = ['00', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32'];

  checkForErrors() {
    console.log("Checking for errors");
    values = [this.state.description, this.state.size, this.state.fit, this.state.price, this.state.store];
    if (values.includes(null)) {
      this.setState({errorsRemaining: true, errorMessage: 'More information means a more successful seek! Please fill out all fields.'});
      return true;
    }
    noError = (this.state.description.length >= 2 &&
              (this.letterSizes.includes(this.state.size) || this.numberSizes.includes(this.state.size)) &&
              !isNaN(this.state.price) &&
              this.state.shopNames.includes(this.state.store)
              )
    if (!noError) {
        this.setState({errorsRemaining: true, errorMessage: 'We want to help you find what you want! Please resolve the errors before submitting.'});
        return true;
    }
    return false;
  }

  showActivityIndicator() {
    this.setState({submitting: true});
  }

  writeSeekData() {
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
    numCoins = (currentCoins - 2 > 0) ? currentCoins - 2 : 0;
    this.setState({currentCoins: numCoins});
    firebase.database().ref('users/' + this.state.userId).update({
      seeks: this.state.currentSeeks,
      coins: this.state.currentCoins,
    })
    .then(() => this.props.navigation.navigate('SeekSuccess', {'title': this.props.navigation.getParam('title')}))
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.setState({ userId: currentUser.uid });
    firebase.database().ref('users/' + currentUser.uid).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      sizeFromProfileLetter = (snapshot.val() && snapshot.val().sizeLetter[0]) || 'M';
      sizeFromProfileNumber = (snapshot.val() && snapshot.val().sizeNumber[0]) || '4';
      currentSeeks = (snapshot.val() && snapshot.val().seeks) || [];
      currentCoins = (snapshot.val() && snapshot.val().coins) || '';
    }).then( () => {
      this.setState({ username });
      this.setState({ sizeFromProfileLetter });
      this.setState({ sizeFromProfileNumber });
      this.setState({ currentSeeks });
      this.setState({ currentCoins });
      this.props.navigation.setParams({ currentCoins: currentCoins})
    });
    const selectedItems = this.props.navigation.getParam('items');
    this.setState({ selectedItems });

    const { navigation } = this.props;
    navigation.setParams({
        checkForErrors: () => {return this.checkForErrors()},
        showActivityIndicator: () => this.showActivityIndicator(),
        writeSeekData: () => this.writeSeekData(),
    });
  }

  getCoins() {
    // firebase.database().ref('users/' + this.state.currentUser.uid).once('value').then(function(snapshot) {
    //   currentCoins = (snapshot.val() && snapshot.val().coins);
    //   console.log(currentCoins);
    //   return currentCoins;
    // }).then( () => {
    //   this.setState({ currentCoins });
    //   console.log(currentCoins);
    //   return currentCoins;
    // });
    return this.state.currentCoins;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
          <Button
           title='Finish'
           onPress={() => {
              numCoins = navigation.getParam('currentCoins');
              // console.log(numCoins);
              if (numCoins < 2) {
                Alert.alert('Need More Coins?', 'You need at least 2 to post a seek, but your current balance is ' + numCoins + '.',
                [{text: 'Go Spot', onPress: () => navigation.navigate('SpotStackNavigation')},
                {text: 'Cancel', style: 'cancel'},],
                {cancelable: true})
              } else {
                errorsRemaining = navigation.getParam('checkForErrors');
                if (!errorsRemaining) {
                  navigation.getParam('showActivityIndicator');
                  Alert.alert('Confirm Your Seek', 'Post this seek for 2 coins? \n Your current balance is ' + numCoins + ' coins.',
                  [{text: 'Continue', onPress: navigation.getParam('writeSeekData')},
                  {text: 'Cancel', style: 'cancel'},],
                  {cancelable: true})
                }
              }
            }
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

          {this.state.errorsRemaining ?
            <View style={styles.textinput}>
              <Text style={{ color: 'red', fontSize: 16 }}>
                {this.state.errorMessage}
              </Text>
            </View> : null}

          <View style={styles.textinput}>
            <TextInput label = "Description"
              multiline = {true}
              placeholder = "Briefly describe what you're looking for, i.e. 'loose-fitting jeans with rips in the knees' "
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              onChangeText={description => this.setState({ description: description.trim() })}/>
            { (this.state.description === null || this.state.description.length >= 2) ? null :
              <HelperText
                type="error"
                padding="none"
                visible={this.state.description.length < 2}
              >
                You can find your look more succesfully if you provide specific details about your seek to the community.
              </HelperText>
            }
          </View>

          <View style={styles.textinput}>
            <TextInput
              label = "Size"
              placeholder = {this.state.sizeFromProfileLetter}
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              onChangeText={size => this.setState({ size: size.trim() })}/>
            { (this.state.size === null || this.letterSizes.includes(this.state.size) || this.numberSizes.includes(this.state.size)) ? null :
              <HelperText
                type="error"
                padding="none"
                visible={!this.letterSizes.includes(this.state.size) & !this.numberSizes.includes(this.state.size)}
              >
                Try letter sizes between XXS to 5X (e.g. S, M, L) or number sizes between 00 to 32.
                This can be the same or different from the sizes in your profile.
              </HelperText>
            }
          </View>

          <View style={styles.textinput}>
            <TextInput
              label = "Desired Fit"
              placeholder = "i.e. baggy, snug, slim"
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              onChangeText={fit => this.setState({ fit: fit.trim() })}/>
            { (this.state.fit === null || this.state.fit.length >= 2) ? null :
              <HelperText
                type="info"
                padding="none"
                visible={this.state.fit.length < 2}
              >
                Specifying a fit can be helpful for spotters to keep in mind.
              </HelperText>
            }
          </View>

          <View style={styles.textinput}>
            <TextInput
              label = "Price Cap"
              placeholder = "$5.50"
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              onChangeText={price => this.setState({ price: price.replace(',','').replace('$', '').trim() })}/>
            { (this.state.price === null || !isNaN(this.state.price)) ? null :
              <HelperText
                type="error"
                padding="none"
                visible={isNaN(this.state.price)}
              >
                Price caps must contain only numbers.
              </HelperText>
            }
            { (this.state.price === null || Number(this.state.price) >= 5) ? null :
              <HelperText
                type="info"
                padding="none"
                visible={Number(this.state.price) < 5}
              >
                There may not be items for price caps that are too low.
              </HelperText>
            }
          </View>

          <View style={styles.textinput}>
            <TextInput
              label = "Look Near"
              placeholder = "Goodwill of Silicon Valley"
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              onChangeText={store => this.setState({ store: store.trim() })}/>
            { (this.state.store === null || this.state.shopNames.includes(this.state.store)) ? null :
              <HelperText
                type="error"
                padding="none"
                visible={!this.state.shopNames.includes(this.state.store)}
              >
                Choose a store near you so people know where to look: Goodwill of Silicon Valley, Goodwill Boutique, The Shop, Fillmore & 5th.
              </HelperText>
            }
          </View>

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
