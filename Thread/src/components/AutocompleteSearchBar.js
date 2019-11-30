import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, SafeAreaView } from 'react-native';
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";


// Takes in data with "name" property to use in autocomplete,
// along with an onItemSelection callback
function AutocompleteSearchBar(props) {

  function handleSelectItem(item, index) {
    // TODO: not sure how to use passed in index yet (currently undef)
    props.onItemSelection(item.id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Autocomplete
        key={item => item.id}
        style={styles.inputBar}
        data={props.data}
        valueExtractor={item => item.name}
        handleSelectItem={(item, id) => handleSelectItem(item, id)}
        placeholder={props.placeholder}
        minimumCharactersCount={2}
        highlightText
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
