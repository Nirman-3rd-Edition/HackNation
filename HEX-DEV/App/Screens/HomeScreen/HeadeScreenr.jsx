import { useUser } from '@clerk/clerk-expo'
import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import color from '../../Utils/color';
import { FontAwesome } from '@expo/vector-icons';
import SearchResult from './SearchResult';
import { useNavigation } from '@react-navigation/native';

export default function HeaderScreen() {
  const navigation = useNavigation();
  const {user,isloading}=useUser();
    return user&&(
    <View style={styles.container}>
      {/* profile section */}
      <View style={styles.profileMainContainer}>
      <View style={styles.profileContainer}>
       <Image
       source={{uri:user?.imageUrl}}
       style={styles.userIamge}
       />
       <View>
        <Text style={{color:color.WHITE}}>Welcome </Text>
        <Text style={{color:color.WHITE,fontSize:20,fontFamily:'outfit-bold'}}>{user?.firstName}</Text>
       </View>
      </View>
      {/* <FontAwesome name="bookmark" size={24} color={color.WHITE}/> */}
      </View>
      {/* Search Bar section*/}
        <TouchableOpacity  onPress={()=>navigation.push('search-result')}>
      <View style={styles.serachBarContainer}>

        <View 
        style={styles.userInput}>
          <FontAwesome name="search" size={24} color={color.PRIMARY} />
        <Text style={{fontFamily:'outfit-medium',color:color.GRAY}}>Search...</Text></View>
      </View>

        </TouchableOpacity>
     
    </View>
    )
}

const styles = StyleSheet.create({
  container:{
paddingTop:15,
padding:5,
backgroundColor:color.PRIMARY,
borderBottomLeftRadius:25,
borderBottomRightRadius:25,
padding:20

  } ,
  profileMainContainer:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
    
  },
  profileContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10
  },
  userIamge:{
    overflow:'hidden',
        width:45,
        height:45,
        borderRadius:100,
        borderColor:color.WHITE,
        borderWidth:2
    },
    userInput:{
      display:'flex',
      flexDirection:'row',
      gap:7,
      padding:7,
      paddingHorizontal:16,
      backgroundColor:color.WHITE,
      borderRadius:7,
      width:'98%',
      height:45,
      alignItems:'center'
    },
    serachBarContainer:{
      marginTop:15,
      display:'flex',
      flexDirection:'row',
      gap:10,
      marginBottom:10

    },
 
})
