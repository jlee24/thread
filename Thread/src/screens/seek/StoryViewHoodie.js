import React from 'react';
import { ImageBackground, TouchableOpacity, Image, Platform, StyleSheet, Text, View, Button } from 'react-native';
import Drawer from 'react-native-draggable-view'

var liked

export default class App extends React.Component {

constructor(props){
 
    super(props);
 
    this.state={
      imageURL : 'http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/unliked.png',
      liked : false,
      spot : props.navigation.getParam('spot')
    }
 
  }
 
  loadNewImage= () => {

    this.setState((currentState) => ({
      liked : currentState.liked, 
    }));
    
    if (!liked) {
      alert("Added to Your Likes")
      this.setState({
        imageURL : 'http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/liked.png'
      
      });
    } else {
      this.setState({
        imageURL : 'http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/unliked.png',
      });
    }
    
  }


render() {
    const spot = this.state.spot;
    return (

        <View style = { styles.container } >

        <ImageBackground
          style= { styles.backgroundImage } 
          source={{ uri: spot.image }}>


          <View style= { styles.header }>
            <View>
              <View style={ styles.spacer }/>

              <Text style = { styles.logoDescription }>
                {spot.title}
              </Text>
              <Text style = { styles.logoDescriptionBold }>
                {spot.location} 
              </Text>
              <Text style = { styles.logoText }>
                {"Size " + spot.size + ", " + spot.price}
              </Text>

              <View style={ styles.spacer }/>
            </View>

            <View>
              <View style={ styles.sideSpacer }/>
            </View>

            <View>
              <View style={ styles.spacer }/>
              <View style={ styles.spacer }/>

              <ImageBackground
                source={{ uri: this.state.imageURL }}
                style={ styles.imageWrapper }>
                <TouchableOpacity 
                  style={ styles.button } 
                  onPress={ () => { this.loadNewImage() && !this.state.liked}}>
                  

                  <Text style={ styles.text }>×</Text>
                </TouchableOpacity>
              </ImageBackground>
              
              {!this.state.liked && this.props.imageURL}
              
              <View style={ styles.spacer }/>
            </View>

          </View>

          <View style={styles.previewPanelContainer}>
            <View style={ styles.spacer }/>
            <Text style = { styles.logoDescription }>
              Spotted by izhou:
            </Text>
            <Text style = { styles.quote }>
                "Extremely soft inner fleece lining."
            </Text>
            <View style={ styles.spacer }/>
          </View>

        
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    logoText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        left: 12,
    },
    logoDescription:{
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        left: 12,
    },
    logoDescriptionBold:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        left: 12,
    },
    quote:{
        fontSize: 20,
        fontWeight: '400',
        color: 'white',
        left: 12,
        fontStyle: 'italic',
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
      flexDirection: 'row',
      right: 200,
    },
    button:{
      width:45,
      height:45,
      backgroundColor:'white',
      opacity: 0,
      overflow:'hidden',
      borderRadius:20,
    },
    spacer: {
      height: 12,
    },
    sideSpacer: {
      width: 150,
    },
    imageWrapper:{
       flex: 1,
       width:45,
       height:45,
       borderRadius:15,
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
    },
    previewPanelContainer: {
      zIndex: 3,
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
  }
});
