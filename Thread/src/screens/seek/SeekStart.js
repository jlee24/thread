import React, { Component } from "react";
import { LayoutAnimation, RefreshControl, TouchableOpacity } from "react-native";
import { Button, FlatList, Image, StyleSheet, Text, View, TextInput } from 'react-native';

import UploadIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from 'react-native-paper';
import Item from "../../components/Item";
import SelectedItem from "../../components/SelectedItem";

export default class App extends React.Component {
   static navigationOptions = {
    headerRight: () => (
      <Button
        onPress={() => alert('Fix this to navigate properly!')}
        title="Next"
      />
    ),
  };

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
          </View>

          {/* Question and Search Bar */}
          <View style={styles.searchContainer}>
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
              <TouchableOpacity activeOpacity = { .3 } onPress={ this.callFun }>
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
                        isSelected={true}
                        style={[
                          item.selected ? styles.selectedBorder : styles.notSelectedBorder
                        ]}
                       />
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
    position: 'absolute',
    top: 32,
    left: 44,
    flexDirection: 'row',
  },
  searchContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
    marginBottom: 15,
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
});
