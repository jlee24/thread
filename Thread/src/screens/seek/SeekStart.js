import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
// import { ListItem } from 'react-native-elements';

import { Searchbar } from 'react-native-paper';

// <Image
//   style={{width: 50, height: 50}}
//   source={require({ path })}
// />

function Item({ info }) {
  return (
    <View style={styles.item}>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: info.path }}
      />
      <Text>{info.name}</Text>
    </View>
  );
}

export default class App extends React.Component {

  state = {
    query: '',
    data: [],
    error: null,
  };

  arrayholder = [
    {
      'id': '0',
      'name': 'Miguel War & Leisure',
      'tags': 'graphic tee',
      'path': 'https://cdn.shopify.com/s/files/1/0023/1184/8006/products/GraphicTee-1.jpg'
    },
    {
      'id': '1',
      'name': 'Fresh Pinch',
      'tags': 'graphic tee',
      'path': 'https://cdn.shopify.com/s/files/1/1845/1285/products/FreshPinch_White.gif'
    },
    {
      'id': '2',
      'name': 'Y3',
      'tags': 'graphic tee',
      'path': 'https://media.yoox.biz/items/12/12330633dm_14g_f.jpg'
    },
    {
      'id': '3',
      'name': 'Matilda',
      'tags': 'graphic tee',
      'path': 'http://peanutsausage.com/wp-content/uploads/2017/09/Mathilda-Leon-The-Professional.jpg'
    },
  ];

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

  render() {
    const { query } = this.state;
		return (

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.container}>
            <Text style={styles.question}>what are you seeking?</Text>
            <Searchbar
              style={styles.searchbar}
              placeholder="Type here..."
              onChangeText={this.updateSearch}
              value={query}
            />
          </View>
          <View style={styles.results}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) =>
                <Item
                  info={item}
                 />
               }
               keyExtractor={item => item.id}
               horizontal={false}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 100,
  },
  question: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    // top: 50,
    // width: 300,
    // height: 50,
    width: '80%',
  },
  searchbar: {
    marginTop: 15,
    // width: 300,
    width: '80%',
    borderRadius: 10,
  },
  results: {
    marginLeft: 5,
    // marginTop:50,
    // height: 300,
    // width: 400,
    flex:1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    // width: '40%',
    margin: 10,
    width: 125,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
