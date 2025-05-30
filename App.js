import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackN from './src/Nav/StackN'

const App = () => {
  return (
   <NavigationContainer>
    <StackN/>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
   alignItems:'center',
    
    
  }
})