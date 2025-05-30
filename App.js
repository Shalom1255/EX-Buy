import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackN from './src/Nav/StackN'
import { CartProvider } from './src/Components/CartContext' // Adjust path as needed
import { ProductsProvider } from './src/Components/ProductsContext';

const App = () => {
  return (
    
    // 
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