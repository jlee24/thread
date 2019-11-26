import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'

import {createBottomTabNavigator} from 'react-navigation-tabs';

import {createStackNavigator} from 'react-navigation-stack';

import * as iconFn from "./utils/tabBarIcon";
import { StyleSheet, Text, View } from 'react-native';

import React, { useState } from "react";
import { SwitchNavigator, StackNavigator, DrawerNavigator } from "react-navigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Size from "./src/screens/Size";
import Profile from "./src/screens/Profile";

// Onboarding
import Loading from './src/screens/onboarding/Loading'
import SignUp from './src/screens/onboarding/SignUp'
import Login from './src/screens/onboarding/Login'

// Seek Flow
import SeekStart from './src/screens/seek/SeekStart';
import SeekInfo from './src/screens/seek/SeekInfo';
import SeekSuccess from './src/screens/seek/SeekSuccess';

import SpotScreen from './src/screens/SpotScreen';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCfF3iTUzsqphpDyYV94Rmoz-E4drDlSuU",
    authDomain: "thread-ca0bb.firebaseapp.com",
    databaseURL: "https://thread-ca0bb.firebaseio.com",
    projectId: "thread-ca0bb",
    storageBucket: "thread-ca0bb.appspot.com",
    messagingSenderId: "642322348698",
    appId: "1:642322348698:web:2d29abda75aae0ebe2fd23",
    measurementId: "G-BSTC9VG2QX"
  };
  
firebase.initializeApp(firebaseConfig);
const ProfileStackNavigation = createStackNavigator(
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

const SeekStackNavigation = createStackNavigator(
  {
    SeekStart: {
      screen: SeekStart
    },
    SeekInfo: {
      screen: SeekInfo
    },
    SeekSuccess: {
      screen: SeekSuccess
    },
  },
  {
    initialRoute: 'SeekStart',
  }
);

// Create our main tab navigator for moving between the 3 views
const TabNavigator = createBottomTabNavigator(
  {
    SeekStart: {
      screen: SeekStackNavigation,
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
      screen: ProfileStackNavigation,
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

const Onboarding = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    TabNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)

// const AppContainer = createAppContainer(TabNavigator);
const AppContainer = createAppContainer(Onboarding);

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
      "ibm-plex-sans-regular": require("./assets/fonts/ibm-plex-sans-regular.ttf"),
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
