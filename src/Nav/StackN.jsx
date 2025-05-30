import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Splash from '../Screens/Splash'
import Onboard from '../Screens/Onboard'
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'
import ForgotPasswordScreen from '../Screens/ForgottenPassword'
// import Home from '../Screens/Tabs/Home';
import TabLayout from '../Screens/Tabs/TabLayout';



const Stack=createNativeStackNavigator()

const StackN = () => {
  return (
    <Stack.Navigator initialRouteName='Onboard' screenOptions={{headerShown:false}}>
      
      <Stack.Screen name='Onboard' component={Onboard}/>
      <Stack.Screen name='SignIn' component={SignIn}/>
      <Stack.Screen name='SignUp' component={SignUp}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
      <Stack.Screen name='TabLayout' component={TabLayout}/>
      {/* <Stack.Screen name='Home' component={Home}/> */}
    </Stack.Navigator>
  )
}

export default StackN

const styles = StyleSheet.create({}) 