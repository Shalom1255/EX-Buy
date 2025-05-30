import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {

  const navigation=useNavigation()
  useEffect(()=>{
    const timer=setTimeout(() => {
      navigation.navigate('Onboard')
    }, 3000)
    return()=>clearTimeout(timer);
  }, [navigation])
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require('../../assets/images/mylogo.png')}/>
      <Text style={styles.text} >THE COMMUNUITY FOR DEVELOPERS</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
  },
  Image:{
    width:300,
    height:300,
    marginBottom:20,
    borderRadius:150,
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    color:'green',
    leftSpacing:1.2,
  }
})