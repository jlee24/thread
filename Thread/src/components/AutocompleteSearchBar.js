import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, SafeAreaView } from 'react-native';
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

function AutocompleteSearchBar(props) {

  function handleSelectItem(item, index) {
    const {onDropdownClose} = this.props;
    onDropdownClose();
    console.log(item);
  }

  const shopNames = props.data.map(shop => shop.name);
  return (
    <SafeAreaView style={styles.container}>
      <Autocomplete 
        style={styles.inputBar}
        data={shopNames} 
        valueExtractor={item => item} 
        handleSelectItem={(item, id) => handleSelectItem(item, id)}
        minimumCharactersCount={2}
        highlightText
        rightContent
        rightTextExtractor={item => item.properties}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        scrollStyle={styles.scroll}
        overlayStyle={{backgroundColor: 'green'}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: "rgba(0, 256, 0, 0)",
  },
  input: {
    padding: 0,
    maxHeight: 40,
    backgroundColor: "#FFFFFF"
  },
  inputContainer: {
    padding: 0,
    backgroundColor: "#FFFFFF"
  },
  scroll: {
    padding: 0,
    backgroundColor: "rgba(256, 0, 0, 0)",
  },
});

export default AutocompleteSearchBar;
