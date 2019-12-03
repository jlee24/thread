import React from 'react';
import { ImageBackground, TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import Drawer from 'react-native-draggable-view'

export default class App extends React.Component {

render() {
    return (

        <View style = { styles.container } >

        <ImageBackground
          style= { styles.backgroundImage } 
          source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/pants.png" }}>

        <View style= { styles.header }>
        <View style={ styles.spacer }/>
          <Text style = { styles.logoDescription }>
            Goodwill Silicon Valley
          </Text>
          <Text style = { styles.logoText }>
            Size 8, $21.50
          </Text>
          <View style={ styles.spacer }/>
          <ImageBackground
              source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/unliked.png" }}
              style={ styles.imageWrapper }>
              <TouchableOpacity 
                style={ styles.button } 
                onPress={ () => { alert("Added to Your Likes") }}>
                <Text style={ styles.text }>×</Text>
              </TouchableOpacity>
            </ImageBackground>
          <View style={ styles.spacer }/>
        </View>

        <Drawer
          initialDrawerSize={0.24}
          renderContainerView={() => 
            <View style={{height: 150}}>
              
            </View>
          }
          renderDrawerView={() => 
            // <ShopsPreview shops={this.getShopsPreviewData()}/>
            // add limited size container
            // onRelease
            <Text style = { styles.logoDescriptionBlack }>
              Stretchy faux leather leggings spotted by coolgirl4:
              "Slight fraying on the left ankle but otherwise seems like a good fit for what you're looking for"
            </Text>

          }
          renderInitDrawerView={() => (
            <View style={styles.handle}>
              <Image
                style={styles.scrollIndicator}
                source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/scrollIndicator.png" }}
              />
            </View>
          )}

        />

        
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
        backgroundColor: "white",
        width: '100%',
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
        color: 'white',
        textAlign: 'center',
    },
    logoTextBlack: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    logoDescription:{
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    logoDescriptionBlack:{
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
        // padding: 12,
    },
    footer: {
        height: 100
    },
    header: {
      zIndex: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    button:{
      width:36,
      height:36,
      backgroundColor:'white',
      opacity: 0,
      alignItems:'center',
      justifyContent:'center',
      overflow:'hidden',
      borderRadius:20,
    },
    spacer: {
      height: 12,
    },
  imageWrapper:{
     flex: 1,
     width:36,
     height:36,
     borderRadius:15,
     justifyContent: "center",
     alignItems: "center",
  },
  text:{
    fontSize:40,
    color:'white',
    lineHeight:42
  },
  scrollIndicator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 4,
    width: 44,
    height: 8,
  },
  handle: {
    backgroundColor: '#FAFAFA',
    height: 60,
    width: '100%',
  }
});