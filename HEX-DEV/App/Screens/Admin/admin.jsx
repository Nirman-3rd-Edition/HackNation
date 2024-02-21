import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi';
import color from '../../Utils/color';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function admin() {
    const navigation=useNavigation()
  const [sellerList,setSellerList]=useState([]);
    
  useEffect(()=>{
    getSellerList();
  },[]);
  
  const getSellerList=()=>{
    GlobalApi.SellerVerification().then(resp=>{
      setSellerList(resp.businessLists);
      }) 
  }
  console.log(sellerList)
  return (
    <SafeAreaView>
   <FlatList
            data={sellerList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                                <TouchableOpacity style={styles.bookingItem} onPress={()=>navigation.navigate("next_screen",{item})} >
                                    <Image source={{ uri: item.userPhotoUrl }} style={styles.userImage} />
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userName}>{item.name}</Text>
                            
                                    <Ionicons name="chevron-forward" size={24} color={color.PRIMARY_LIGHT} />
                                </TouchableOpacity>
                </View>
            )}
        />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 10,
        display: 'flex',
        gap: 10
    },
    bookingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        padding: 6,
        borderColor: color.LIGHT_GRAY,
        borderRadius: 15
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    userName: {
        width: 120,
        fontFamily: 'outfit'
    },
    date: {
        fontFamily: 'outfit-bold',
        color: color.PRIMARY
    }
});
