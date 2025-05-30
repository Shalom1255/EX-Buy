import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Splash from '../Screens/Splash'
import Onboard from '../Screens/Onboard'
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'

const Stack=createNativeStackNavigator()

const StackN = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
      <Stack.Screen name='Splash' component={Splash}/>
      <Stack.Screen name='Onboard' component={Onboard}/>
      <Stack.Screen name='SignIn' component={SignIn}/>
      <Stack.Screen name='SignUp' component={SignUp}/>
    </Stack.Navigator>
  )
}

export default StackN

const styles = StyleSheet.create({}) 