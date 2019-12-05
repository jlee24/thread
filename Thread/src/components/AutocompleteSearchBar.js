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
        pickerStyle={styles.resultsContainer}
        scrollStyle={styles.scroll}
        overlayStyle={{backgroundColor: 'green'}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: "rgba(0, 256, 0, 0)",
  },
  input: {
    maxHeight: 40,
    backgroundColor: "white",
    shadowColor: '#777777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainer: {
    backgroundColor: "rgba(256, 0, 0, 0)",
  },
  resultsContainer: {
    backgroundColor: "rgba(256, 0, 0, 0)"
  },
  scroll: {
    marginLeft: -20,
    maxWidth: 366,
    backgroundColor: "white"
  }
});

export default AutocompleteSearchBar;
