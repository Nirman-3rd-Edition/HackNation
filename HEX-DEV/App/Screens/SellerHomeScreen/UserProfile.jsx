import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import color from '../../Utils/color';
import { Entypo, Ionicons,Zocial,FontAwesome5 } from '@expo/vector-icons';
import call from 'react-native-phone-call'
import GlobalApi from '../../Utils/GlobalApi';

export default function UserProfile() {
    const navigation=useNavigation()
    const route=useRoute();
    const booking=route.params?.booking
    const item=route.params?.item
    const mynumber=booking?.phNumber
    let date1st=booking?.date
    date_1=date1st.substring(0,6)
    date_2=date1st.substring(7,11)
    const updateBookingOnConfirm=()=>{
        const data={
            id: booking?.id,
            status:"Booked",
        }
        GlobalApi.updateBooking(data).then(resp=>{
            ToastAndroid.show('Booking Updated Succesfully', ToastAndroid.LONG)
            navigation.navigate('homescreen')
        })
    }
    const updateBookingOnCancel=()=>{
        const data={
            id: booking?.id,
            status:"Cancelled",
        }
        GlobalApi.updateBooking(data).then(resp=>{
            ToastAndroid.show('Booking Updated Succesfully', ToastAndroid.LONG)
            navigation.navigate('homescreen')
        })
    }
    const triggerCall=()=>{
        const args={
            number: mynumber.toString(),
            prompt:true,
            skipCanOpen: true
        }
        call(args).catch(console.error);
    }
  return (
    <View style={{backgroundColor:'#00457C',height:'100%'}}>
     <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:20,  
           marginTop:'25%',
          
        }}>
             <Image
            source={{uri: booking?.userImage}}
            style={styles.image}
            />
        <Text style={styles.Businessname}>{booking?.userName}</Text>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
            <Text style={{fontFamily:'outfit-bold',fontSize:12,color:color.WHITE }}>Contact:</Text>
            <Text style={{fontFamily:'outfit',fontSize:12,color:color.WHITE}}>{booking?.phNumber}</Text>
            <TouchableOpacity style={styles.callButton} onPress={triggerCall}>
            <Zocial name="call" size={15} color="#2BC923"  />
            </TouchableOpacity>
        </View>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:20,marginTop:20}}>
            <View style={{marginTop:-39}}>
            <View><Text style={{fontFamily:'outfit-bold',fontSize:18,color:'#FAFF00'}}>{date_1}</Text></View>
            <View><Text style={{fontFamily:'outfit-bold',fontSize:18,color:'#FAFF00'}}>{date_2}</Text></View>
            <View style={{alignItems:'flex-end',marginTop:5}}>
                <FontAwesome5 name="map-marker-alt" size={18} color="white" />
                </View>
            </View>
            <View style={{width:180}}>
                <Text style={{fontFamily:'outfit',fontSize:18,color:color.WHITE}}>{item?.category[0]?.name}</Text>
                <Text style={{fontFamily:'outfit-bold',fontSize:15,color:color.WHITE}}>{booking?.time}</Text>
                <Text style={{fontFamily:'outfit',fontSize:13,marginTop:13,color:color.WHITE}}>{booking?.userAddress}</Text>
                
            </View>
        </View>
        { booking.bookingStatus === "InProgress" &&(
        <View style={{flexDirection:'row',gap:30,marginTop:50}}>
            <TouchableOpacity onPress={updateBookingOnConfirm} style={[styles.button,{backgroundColor:'#209912'}]}>
                <Text style={{textAlign:'center',fontFamily:'outfit-medium'}}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateBookingOnCancel} style={[styles.button,{backgroundColor:'#7a8279'}]}>
            <Text style={{textAlign:'center',fontFamily:'outfit-medium'}}>Cancel</Text>
            </TouchableOpacity>
        </View>
        )}
    </View>
    </View>

  )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        zIndex: 10,
        padding: 20,
    },
    image:{
        width:150,
        height:150,
        borderRadius:100,
        borderWidth:2,
        borderColor:color.PRIMARY_LIGHT
      },
      Businessname:{
        fontSize:25,
        fontFamily:'outfit-medium',
        color:color.WHITE,
        textAlign:'center'
      },
      Userlocation:{
        marginTop:2,
        fontSize:12,
        fontFamily:'outfit-medium',
        color:color.PRIMARY,
        textAlign:'center',
      },
      callButton:{
        paddingLeft:18,
        paddingTop:2,
        paddingRight:18,
        paddingBottom:2,
        borderRadius:20,
        backgroundColor:color.BLACK,
        borderWidth:2,
        borderColor:'#FF4E30'
    },
    button:{
        padding:10,
        borderWidth:2,
        borderRadius:15,
        width:110
    }
})