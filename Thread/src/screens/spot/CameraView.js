import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

  const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
  };

  const flashIcons = {
    off: 'flash-off',
    on: 'flash-on',
    auto: 'flash-auto',
    torch: 'highlight'
  };

export default class CameraExample extends React.Component {

   static navigationOptions = ({ navigation }) => {
    return {
          headerShown: false,
          tabBarVisible: false,
      };
    };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    newPhotos: false
  };

  toggleFlash = () => this.setState({ flash: flashModeOrder[this.state.flash] });

  zoomOut = () => this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });

  zoomIn = () => this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });



  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    this.setState({ newPhotos: true });
    this.props.navigation.navigate('Photo', {'uri': photo.uri});
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          
            <View
              style={styles.topbar}>

            
          <TouchableOpacity style={styles.toggleButton}
          onPress={() => {
            this.props.navigation.navigate('ItemView')}}>
          <Ionicons name="ios-arrow-back" size={44} color="white"/>
          </TouchableOpacity>

            <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
              <MaterialIcons name={flashIcons[this.state.flash]} size={28} color="white"/>
            </TouchableOpacity>

              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="ios-reverse-camera" size={42} color="white"/>
              </TouchableOpacity>

            </View>
            <Camera style={styles.camera} 
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          ref = {ref => {
            this.camera = ref;
          }}>
          </Camera>

            <View
              style={styles.bottombar}>
              <TouchableOpacity
                style = {styles.element}
                onPress={this.takePicture} >
                <Ionicons name="ios-radio-button-on" size={70} color="white" />
              </TouchableOpacity>
            </View>
        
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({

  bottombar: {
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'space-around',
    paddingBottom: 0,
    width: '100%',
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: .5
    },

  topbar: {
    zIndex: 3,
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
    paddingBottom: 0,
    width: '100%',
    position: 'absolute',
    top: 44,
    left: 0,
    opacity: .5
    },
  camera: {
    backgroundColor: 'green',
    height: '100%',
    justifyContent: 'space-between',
  },
  element: {
    marginBottom: 20,
    marginTop: 20
  },

  toggleButton: {
    alignItems: 'center',
    height: 90,
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  });

