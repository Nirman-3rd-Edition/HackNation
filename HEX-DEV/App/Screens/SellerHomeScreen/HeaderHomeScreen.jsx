import { useUser } from '@clerk/clerk-expo';
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, SectionList } from 'react-native'
import color from '../../Utils/color';
import { Entypo } from '@expo/vector-icons';

export default function HeaderHomeScreen({sellerList}) {
    const {user}=useUser();
 
    return (
        <View>
          
            {sellerList.map((sellerList, index) => (
            <View key={index}style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                padding:20,  
               marginTop:30,
              
            }}>
            <Image
            source={{uri: sellerList?.banner?.url ? sellerList.banner.url : user.imageUrl}}
   
            style={styles.image}
            />
            <Text style={styles.Businessname}>{sellerList.name}</Text>
            <Text style={styles.Username}>{sellerList.owner}</Text>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center', paddingHorizontal:40}}>
            <Entypo name="location-pin" size={30} color={color.PRIMARY_LIGHT} />
            <Text style={styles.Userlocation}>{sellerList.address}</Text>
            </View>

            </View>
            ))}
          </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width:90,
        height:90,
        borderRadius:100,
        borderWidth:2,
        borderColor:color.PRIMARY_LIGHT
      },
      Businessname:{
        marginTop:10,
        fontSize:26,
        fontFamily:'outfit-medium',
        color:color.WHITE
      },
      Username:{
        marginTop:2,
        fontSize:15,
        fontFamily:'outfit-medium',
        color:color.WHITE,
        textAlign:'center'

      },
      Userlocation:{
        marginTop:2,
        fontSize:12,
        fontFamily:'outfit-medium',
        color:color.WHITE,
        textAlign:'center'
      }
})
