import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image, TextInput, Text } from "react-native";
import { Center } from "@builderx/utils";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialButtonGrey from "../components/MaterialButtonGrey";
import MaterialButtonGrey1 from "../components/MaterialButtonGrey1";
import MaterialButtonGrey2 from "../components/MaterialButtonGrey2";

import { withNavigation } from 'react-navigation';

class Profile extends React.Component {
  render() {

    return (
      <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
        <View style={styles.rectStack}>
          <View style={styles.rect} />
          <Center horizontal>
            <Image
              source={require("../../assets/images/profile.jpg")}
              resizeMode="cover"
              style={styles.image}
            />
          </Center>
          <View style={styles.rect2}>
            <View style={styles.textInputRow}>
              <TextInput
                placeholder="Anika Howard"
                autoCapitalize="words"
                style={styles.textInput}
              />
              <EntypoIcon name="pencil" style={styles.icon} />
            </View>
          </View>
        </View>
        <View style={styles.icon3Row}>
          <FontAwesomeIcon name="user" style={styles.icon3} />
          <View style={styles.textInput3Stack}>
            <TextInput placeholder="heyanika" style={styles.textInput3} />
            <Text style={styles.loremIpsum}>
              Username (visible to other users)
            </Text>
          </View>
        </View>
        <View style={styles.icon2Row}>
          <IoniconsIcon name="md-mail" style={styles.icon2} />
          <View style={styles.textInput2Stack}>
            <TextInput
              placeholder="anikah@stanford.edu"
              style={styles.textInput2}
            />
            <Text style={styles.email}>Email</Text>
          </View>
        </View>
        <Text style={styles.sizeProfile}>Size Profile</Text>
        <View style={styles.clothingPreferenceColumnRow}>
          <View style={styles.clothingPreferenceColumn}>
            <Text style={styles.clothingPreference}>Clothing Preference</Text>
            <Text style={styles.noPreference}>No preference</Text>
          </View>
          <IoniconsIcon name="ios-body" style={styles.icon4} />
          <View style={styles.generalColumn}>
            <Text style={styles.general}>General</Text>
            <Text style={styles.waist}>Waist</Text>
            <Text style={styles.shoeSize} />
            <Text style={styles.shoe2}>Shoe</Text>
          </View>
          <View style={styles.noPreference2StackColumn}>
            <View style={styles.noPreference2Stack}>
              <Text style={styles.noPreference2}>S</Text>
              <Text style={styles.s3}>6</Text>
            </View>
            <Text style={styles.text4}>28</Text>
            <Text style={styles.text5}>8</Text>
          </View>
        </View>
        <MaterialButtonGrey
          // onPress={() => this.props.navigation.navigate('Size')}
          navigation={this.props.navigation}
          style={styles.materialButtonGrey}
        />
        <View style={styles.materialButtonGrey1Row}>
          <MaterialButtonGrey1 style={styles.materialButtonGrey1} />
          <MaterialButtonGrey2 style={styles.materialButtonGrey2} />
        </View>
        </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  scrollArea_contentContainerStyle: {
    width: '100%',
    height: '125%',
    flexDirection: "column"
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 325,
    justifyContent: 'flex-start',
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    overflow: "hidden",
    right: 0
  },
  image: {
    height: 350,
    // width: '100%',
    // backgroundColor: "rgba(15,15, 15,0)",
    // position: "absolute",
    overflow: "hidden",
  },
  rect2: {
    top: 325,
    left: 90,
    width: 195,
    height: 57,
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    elevation: 3,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    flexDirection: "row"
  },
  textInput: {
    width: 100,
    height: 16,
    color: "#121212",
    fontSize: 16,
    fontFamily: "roboto-regular",
    marginTop: 6
  },
  icon: {
    color: "rgba(74,74,74,1)",
    fontSize: 25,
    height: 25,
    width: 25,
    marginLeft: 7
  },
  textInputRow: {
    height: 25,
    flexDirection: "row",
    flex: 1,
    marginRight: 23,
    marginLeft: 40,
    marginTop: 14
  },
  rectStack: {
    height: 382,
    marginTop: -15
  },
  icon3: {
    color: "rgba(74,74,74,1)",
    fontSize: 52
  },
  textInput3: {
    top: 12,
    left: 0,
    width: 176,
    height: 30,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    fontFamily: "roboto-regular"
  },
  loremIpsum: {
    top: 0,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontSize: 12,
    fontFamily: "roboto-regular"
  },
  textInput3Stack: {
    width: 188,
    height: 42,
    marginLeft: 20,
    marginTop: 10
  },
  icon3Row: {
    height: 52,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 72,
    marginRight: 58
  },
  icon2: {
    color: "rgba(74,74,74,1)",
    fontSize: 50
  },
  textInput2: {
    top: 12,
    left: 0,
    width: 175,
    height: 19,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    fontFamily: "roboto-regular"
  },
  email: {
    top: 0,
    left: 0,
    color: "#121212",
    position: "absolute",
    fontSize: 12,
    fontFamily: "roboto-regular"
  },
  textInput2Stack: {
    width: 175,
    height: 31,
    marginLeft: 15,
    marginTop: 12
  },
  icon2Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 70,
    marginRight: 71
  },
  sizeProfile: {
    color: "#121212",
    fontSize: 14,
    fontFamily: "roboto-700",
    marginTop: 36,
    marginLeft: 155
  },
  clothingPreference: {
    color: "#121212",
    fontSize: 12,
    fontFamily: "roboto-regular"
  },
  noPreference: {
    width: 100,
    height: 27,
    color: "rgba(74,74,74,1)",
    fontSize: 14,
    fontFamily: "roboto-regular",
    textAlign: "center",
    marginTop: 7
  },
  clothingPreferenceColumn: {
    width: 112,
    marginTop: 5,
    marginBottom: 16
  },
  icon4: {
    color: "rgba(74,74,74,1)",
    fontSize: 65,
    marginLeft: 26
  },
  general: {
    color: "#121212",
    fontSize: 12,
    fontFamily: "roboto-regular"
  },
  waist: {
    color: "#121212",
    fontSize: 12,
    fontFamily: "roboto-regular",
    marginTop: 12,
    marginLeft: 11
  },
  shoeSize: {
    color: "#121212",
    fontSize: 12,
    fontFamily: "roboto-regular",
    marginTop: 1
  },
  shoe2: {
    color: "#121212",
    fontSize: 12,
    fontFamily: "roboto-regular",
    marginTop: 1,
    marginLeft: 13
  },
  generalColumn: {
    width: 44,
    marginLeft: 22,
    marginTop: 3,
    marginBottom: 2
  },
  noPreference2: {
    top: 0,
    left: 0,
    width: 25,
    height: 17,
    color: "rgba(74,74,74,1)",
    position: "absolute",
    fontSize: 14,
    fontFamily: "roboto-700",
    textAlign: "left"
  },
  s3: {
    top: 0,
    left: 25,
    width: 28,
    height: 17,
    color: "rgba(74,74,74,1)",
    position: "absolute",
    fontSize: 14,
    fontFamily: "roboto-700",
    textAlign: "left"
  },
  noPreference2Stack: {
    width: 53,
    height: 17
  },
  text4: {
    width: 26,
    height: 15,
    color: "rgba(74,74,74,1)",
    fontSize: 14,
    fontFamily: "roboto-700",
    textAlign: "left",
    marginTop: 8
  },
  text5: {
    width: 28,
    height: 15,
    color: "rgba(74,74,74,1)",
    fontSize: 14,
    fontFamily: "roboto-700",
    textAlign: "left",
    marginTop: 12
  },
  noPreference2StackColumn: {
    width: 53,
    marginLeft: 13
  },
  clothingPreferenceColumnRow: {
    height: 67,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 28,
    marginRight: 28
  },
  materialButtonGrey: {
    width: 88,
    height: 34,
    marginTop: 15,
    alignSelf: "center"
  },
  materialButtonGrey1: {
    width: 143,
    height: 36
  },
  materialButtonGrey2: {
    width: 147,
    height: 36,
    marginLeft: 21
  },
  materialButtonGrey1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 33,
    marginLeft: 36,
    marginRight: 28
  }
});

export default withNavigation(Profile);
