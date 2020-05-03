import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import home from "/Users/apple/tra/src/screens/home.js"
import signUp from "./src/screens/signUp.js"
import login from "./src/screens/login.js"
import splashScreen from "./src/screens/splashScreen.js"
import reportDetails from  "./src/screens/reportDetails.js"
import medicines from "./src/screens/medicines.js"
export default class App extends React.Component {
  
  

  render() {
    return (
          <AppContainer/> 
    );
  }
}

const Login = createSwitchNavigator(
  {
    login : login ,
    signUp : signUp
  },
  {
    initialRouteName: 'login',
  }

);
const SplashNav = createSwitchNavigator(
  {
    splashScreen : splashScreen,
    Signoutnav : Login
  },
  {
    initialRouteName:'splashScreen'
  }
)
const stack = createStackNavigator(
  {
    home : {
      screen : home,
     
    },
    reportDetails : 
    {
      screen :reportDetails
    },
    medicines : {
      screen : medicines
    }
    
   
  },
  {headerMode:'none'}
)



const Base  = createSwitchNavigator(
  {
    Login : Login , 
    stack : stack
  },
  {initialRouteName : "Login"}
)




const Main = createSwitchNavigator(
  {
    SplashNav : SplashNav,
    Base :  Base 
  }
)
const AppContainer = createAppContainer(Main)
