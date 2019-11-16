import {
  createAppContainer
} from 'react-navigation'

import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStackNavigator} from 'react-navigation-stack';

import * as iconFn from "./utils/tabBarIcon";
import { StyleSheet, Text, View } from 'react-native';

import React, { useState } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Size from "./src/screens/Size";
import Profile from "./src/screens/Profile";
import SeekScreen from './src/screens/SeekScreen';
import SpotScreen from './src/screens/SpotScreen';

const StackNavigation = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    Size: {
      screen: Size
    },
  },
  {
    initialRoute: 'Profile',
  }
);

// Create our main tab navigator for moving between the 3 views
const TabNavigator = createBottomTabNavigator(
  {
    Seek: {
      screen: SeekScreen,
      navigationOptions: {
        tabBarIcon: iconFn.seekIcon('binoculars'),
      },
    },
    Spot: {
      screen: SpotScreen,
      navigationOptions: {
        tabBarIcon: iconFn.spotIcon('location'),
      },
    },
    Profile: {
      screen: StackNavigation,
      navigationOptions: {
        tabBarIcon: iconFn.profileIcon('user'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "arial-regular": require("./assets/fonts/arial-regular.ttf"),
      "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
      "syncopate-regular": require("./assets/fonts/syncopate-regular.ttf"),
      "roboto-700": require("./assets/fonts/roboto-700.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;


// Export it as the root component

// export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
