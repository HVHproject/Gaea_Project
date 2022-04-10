import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import Logo from './assets/images/logo.png';

const AppNavigation  = createStackNavigator(
  {
  Home: HomeScreen,
  Explore: ExploreScreen
  }
);
//import * as Font from 'expo-font';



export default createAppContainer(AppNavigation);


