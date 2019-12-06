'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button, ScrollView } from 'react-native';
import ShopHeader from "../../components/ShopHeader";
import SubmitButton from "../../components/SubmitButton";
import IconButton from "../../components/IconButton";
import * as firebase from 'firebase';

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');



  state = {
    itemID: '',
    title: '',
    username: '',
    description: '',
    price: '',
    fit: '',
    store: '',
    path: 'https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg',
    shop: ''
  }

  componentDidMount() {

    const itemID = this.props.navigation.getParam('itemID');
    const title = this.props.navigation.getParam('title');
    const username = this.props.navigation.getParam('username');
    const description = this.props.navigation.getParam('description');
    const size = this.props.navigation.getParam('size');
    const fit = this.props.navigation.getParam('fit');
    const store = this.props.navigation.getParam('store');
    const price = this.props.navigation.getParam('price');
    const path = this.props.navigation.getParam('path');

    const shop = this.props.navigation.getParam('shop');
    const seeks = this.props.navigation.getParam('seeks');

    this.setState({title});
    this.setState({username});
    this.setState({description});
    this.setState({price});
    this.setState({size});
    this.setState({fit});
    this.setState({store});
    this.setState({path});

    this.setState({shop});
    
  }

  render() {
    const { navigate } = this.props.navigation;
    const { path } = this.state;

    return (
      <ScrollView contentContainerStyle={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

      <View style={styles.header}>
          <Image
            source={require('../../../assets/images/location.png')}
            style={styles.icon}/>
           <Text style={styles.title1}>{this.state.shop}</Text>
      </View>
           <Text style={styles.username}>{this.state.username} is seeking</Text>
            
            <Image style={styles.image} 
                    source={{uri: path}}/>

            <Text style={styles.subtitle}>{this.state.title}</Text>
            <Text style={styles.desc}>{this.state.description}</Text>
            <Text style={styles.bodyText}>Fit: {this.state.fit}</Text>
            <Text style={styles.bodyText}>Price cap: {this.state.price}</Text>
            <Text style={styles.bodyText}>Size: {this.state.size}</Text>

            <IconButton caption="Spotted!" source={require('../../../assets/images/photo-camera.png')} onPress={() => navigate('CameraView')} />

      </ScrollView>
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
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subheader: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  results: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
    fontSize: 16
  },
  hours: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  username: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    width: '85%',
  },
  title1: {
    color: "#121212",
    fontSize: 20,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  subtitle: {
    color: '#50CDB6',
    width: '80%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  data: {
    marginTop: '25%'
  },
  directions: {
    backgroundColor: '#7adbc9',
    borderRadius: 10,
  },
  bodyText: {
    width: '80%',
    fontSize: 18
  },
  desc: {
    width: '80%',
    fontSize: 18,
    marginBottom: 10,
    fontStyle: 'italic'
  },
  image: {
    width: '100%', 
    height: 400,
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    height: 36,
    width: 36,
    marginRight: 5
  }

});