import React, { Component } from "react";
import { LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import UploadIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from 'react-native-paper';

function Item({ info }) {
  return (
      <View>
        <Image
          style={styles.itemimage}
          source={{uri: info.path }}
        />
        {/*<Text>{info.name}</Text>*/}
      </View>
  );
}

function SelectedItem({ info }) {
  return (
      <View>
        <Image
          style={styles.selecteditemimage}
          source={{uri: info.path }}
        />
      </View>
  );
}

export default class App extends React.Component {

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
		return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.next}>
            <Button
              title="Next"
              onPress={() => navigate('SeekInfo')}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.question}>what are you seeking?</Text>
            <Searchbar
              style={styles.searchbar}
              placeholder="Type here..."
              onChangeText={this.updateSearch}
              value={query}
            />
          </View>
          <View style={styles.selections}>
            <TouchableOpacity activeOpacity = { .3 } onPress={ this.callFun }>
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
                    styles.selecteditem,
                    { backgroundColor: item.selected ? '#6e3b6e' : '#f9c2ff' },
                  ]}
                >
                  <SelectedItem
                    info={item}
                   />
                 </TouchableOpacity>
               }
               keyExtractor={item => item.id}
               // horizontal={true}
               // numRows={1}
               numColumns={2}
              //  ItemSeparatorComponent={this.renderSeparator}
              //  ListHeaderComponent={this.renderHeader}
            />
          </View>
          <View style={styles.results}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => this.changeSelection(item)}
                  style={[
                    styles.item,
                    { backgroundColor: item.selected ? '#6e3b6e' : '#f9c2ff' },
                  ]}
                >
                  <Item
                    info={item}
                   />
                 </TouchableOpacity>
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
  selecteditem: {
    marginBottom: 10,
    marginLeft: 5,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selecteditemimage: {
    width: 60,
    height: 60,
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
