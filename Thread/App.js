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
import Profile from "./src/screens/Profile";

// Onboarding
import Loading from './src/screens/onboarding/Loading'
import SignUp from './src/screens/onboarding/SignUp'
import Login from './src/screens/onboarding/Login'
import BuildProfile from './src/screens/onboarding/BuildProfile'
import UpdateProfile from './src/screens/onboarding/UpdateProfile'

// Seek Flow
import SeekStart from './src/screens/seek/SeekStart';
import SeekInfo from './src/screens/seek/SeekInfo';
import SeekSuccess from './src/screens/seek/SeekSuccess';

// Browse Flow
import StoryViewPants from './src/screens/seek/StoryViewPants';
import StoryViewHoodie from './src/screens/seek/StoryViewHoodie';


import SpotStart from './src/screens/spot/SpotStart';
import StoreView from './src/screens/spot/StoreView';
import ItemView from './src/screens/spot/ItemView';
import CameraView from './src/screens/spot/CameraView';
import SpotSuccess from './src/screens/spot/SpotSuccess';
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
    UpdateProfile: {
      screen: UpdateProfile
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
    StoryViewPants: {
    	screen: StoryViewPants
    },
    StoryViewHoodie: {
    	screen: StoryViewHoodie
    }
  },
  {
    initialRoute: 'SeekStart',
  }
);

const SpotStackNavigation = createStackNavigator(
  {
    SpotStart: {
      screen: SpotStart
    },
    StoreView: {
      screen: StoreView
    },
    ItemView: {
      screen: ItemView
    },
    CameraView: {
      screen: CameraView
    },
    SpotSuccess: {
      screen: SpotSuccess
    },
  },
  {
    initialRoute: 'SpotStart',
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
      screen: SpotStackNavigation,
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
    BuildProfile,
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
