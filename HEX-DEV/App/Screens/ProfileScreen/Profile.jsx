import React from 'react'
import { Image, Text, View,StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native'

import { useAuth, useUser } from '@clerk/clerk-expo';
import color from '../../Utils/color';
import { useNavigation } from '@react-navigation/native';

export default function Profile (){
  const navigation=useNavigation();
  const {user}=useUser();
  const {isLoaded,signOut}=useAuth()
  const onMessageBtnClick=()=>{
    Linking.openURL('mailto: evehuntofficial@gmail.com');
  }
  const logoutBtnClick=()=>{
    signOut();
    return;
  }
    return (
      <View>
      <View style={{backgroundColor:color.PRIMARY}}>
      <Text style={{ padding: 20,fontFamily: 'outfit-medium', fontSize: 26,color:color.WHITE }}>
        Profile
      </Text>
        <View style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:20,  
         
      }}>
          <Image
          source={{uri:user?.imageUrl}}
          style={styles.image}
            
          
          />
          <Text style={styles.name}>{user.firstName}</Text>
          <Text style={styles.email}>{user.primaryEmailAddress.emailAddress}</Text>
        
        </View>
        
      </View>
      <View style={{display:'flex',gap:30,padding:20,paddingHorizontal:50}}>
        <TouchableOpacity onPress={()=>navigation.push('Terms And Conditions')}><Text style={styles.text}>Become our Seller</Text></TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>onMessageBtnClick()}
        ><Text style={styles.text}>Contact Us</Text></TouchableOpacity>
        <TouchableOpacity
        onPress={()=>logoutBtnClick()}
        ><Text style={styles.text}>Logout</Text></TouchableOpacity>


       
      </View>
      </View>
    )
}
const styles=StyleSheet.create({
  image:{
    width:90,
    height:90,
    borderRadius:100,
    borderWidth:2,
    borderColor:color.WHITE
  },
  name:{
    marginTop:10,
    fontSize:26,
    fontFamily:'outfit-medium',
    color:color.WHITE
  },
  email:{
    marginTop:10,
    fontSize:20,
    fontFamily:'outfit-medium',
    color:color.WHITE
  },
  text:{
    fontFamily:'outfit-medium',
    fontSize:20
  }
  
})