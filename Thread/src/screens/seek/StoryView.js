import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {

render() {
    return (

        <View style = { styles.container } >
        <ImageBackground
          style= { styles.backgroundImage } 
          source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/clothes.jpeg" }}>

            <View style= { styles.logoContainer }>
              <Text style = { styles.logoText }>
                M, $13.89
              </Text>
              <Text style = { styles.logoDescription }>
                Nice green blouse with lace design
              </Text>


            </View>
             <View style={styles.footer}>
  
             </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9
    },
    logoContainer:{
        alignItems: "center",
    },
    logoText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black'
    },
    logoDescription:{
        fontSize: 15,
        fontWeight: '600',
        color: 'black'
    },
    footer: {
        height: 100
    }
});


// import React, { Component } from "react";
// import { LayoutAnimation, RefreshControl } from "react-native";
// import { StyleSheet, Text, View } from 'react-native';
// import Background from '../../../assets/images/sweater.jpg';

// // var sectionStyle = {
// //   width: "100%",
// //   height: 400,
// //   backgroundImage: "url(" + Background + ")"
// // };


// export default class App extends React.Component {
// render() {
//     		return (

//         <View style = {styles.container}>
//           <Text style={styles.subtitle}>$13.89</Text>
//       		<Text style={styles.subtitle}>nice cable-knit sweater</Text>
//       		</View>


//     		);
//   	}
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundImage: "url(" + { Background } + ")",
//   },
// });