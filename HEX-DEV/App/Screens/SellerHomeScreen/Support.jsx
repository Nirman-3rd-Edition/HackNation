import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo';

export default function Support() {
    const {isLoaded,signOut}=useAuth()
    const onMessageBtnClick=()=>{
        Linking.openURL('mailto: evehuntofficial@gmail.com');
      }
      const logoutBtnClick=()=>{
        signOut();
        return;
      }
  return (
    <View style={{display:'flex',gap:30,padding:40,paddingHorizontal:50,width:'100%'}}>
    <TouchableOpacity
    onPress={()=>onMessageBtnClick()}
    ><Text style={styles.text}>Contact Us</Text></TouchableOpacity>
    <TouchableOpacity
    onPress={()=>logoutBtnClick()}
    ><Text style={styles.text}>Logout</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        fontFamily:'outfit-medium',
        fontSize:20
      }
})