import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

function Size() {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <Text style={styles.text}>
            What sizes do you generally like to wear?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.xs}>XS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3}>
              <Text style={styles.s2}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.m}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button4}>
              <Text style={styles.l2}>L</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button5Row}>
            <TouchableOpacity style={styles.button5}>
              <Text style={styles.xl}>XL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button7}>
              <Text style={styles.text2}>2XL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button6}>
              <Text style={styles.text3}>3XL</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text4}>What about shoe size?</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  scrollArea: {
    width: 330,
    height: 717,
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  scrollArea_contentContainerStyle: {
    width: 330,
    height: 3583,
    flexDirection: "column"
  },
  text: {
    color: "rgba(74,74,74,1)",
    fontSize: 28,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    textAlign: "left",
    marginTop: 68,
    marginLeft: 24
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  xs: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 13
  },
  button3: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 14
  },
  s2: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 22
  },
  button2: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 14
  },
  m: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 19
  },
  button4: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 15
  },
  l2: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 18
  },
  buttonRow: {
    height: 60,
    flexDirection: "row",
    marginTop: 29,
    marginLeft: 24,
    marginRight: 23
  },
  button5: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  xl: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 14
  },
  button7: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 14
  },
  text2: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 6
  },
  button6: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 14
  },
  text3: {
    color: "rgba(74,74,74,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    marginTop: 12,
    marginLeft: 6
  },
  button5Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 24,
    marginRight: 98
  },
  text4: {
    color: "rgba(74,74,74,1)",
    fontSize: 28,
    fontFamily: "roboto-regular",
    lineHeight: 35,
    textAlign: "left",
    marginTop: 459,
    alignSelf: "center"
  }
});

export default Size;
