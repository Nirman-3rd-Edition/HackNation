import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import color from '../../Utils/color';
import { Feather, MaterialIcons,EvilIcons,FontAwesome5 } from '@expo/vector-icons';
import call from 'react-native-phone-call'
import { useState } from 'react';


export default function ShowBookingDetailsScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [business, setbusiness] = useState(param.business);
    const [booking, setBooking] = useState(param.booking);
    const mynumber= business.contact
    
    const triggerCall=()=>{
        const args={
            number: mynumber.toString(),
            prompt:true,
            skipCanOpen: true
        }
        call(args).catch(console.error);
    }
    const onMessageBtnClick=()=>{
        Linking.openURL('mailto:'+business?.email);
      }
    return (
    <View>
        <TouchableOpacity
               onPress={() => navigation.goBack()}
               style={styles.backButton}
           >
               <Ionicons name="arrow-back-sharp" size={30} color="white" />
           </TouchableOpacity>
           <Image
                source={{ uri: business?.banner?.url }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
            <Text style={styles.businessName}>{business?.name}</Text>
            <View style={{ display: 'flex', gap: 6 }}>
            <Text style={styles.owner}>{business?.owner}🌟</Text>
            <Text style={styles.bookingProgress}>{booking?.bookingStatus}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={26} color={color.PRIMARY} style={{ marginRight: 7 }} />
                    <Text style={styles.address}>{business?.address}</Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <EvilIcons name="calendar" size={24} color={color.PRIMARY} style={{ marginRight: 5 }}/>
            <Text style={{fontFamily:'outfit',color:color.GRAY,fontSize:16}}>
                {booking.date}  {booking.time}
            </Text>
            </View>
            {/* phone */}
            {booking.bookingStatus === "Booked" && (

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, marginBottom: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="phone" size={24} color="green" style={{ marginRight: 5 }} />
                    <Text style={styles.contact}>{business?.contact}</Text>
                </View>
                <TouchableOpacity style={styles.callButton} onPress={triggerCall}>
                    <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.WHITE,fontSize:16}}>Call</Text>
                </TouchableOpacity>
            </View>
            )}

            </View>
           {/* map view */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, marginBottom: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="map-marked-alt" size={24} color="blue" style={{ marginRight: 5 }} />
                    <Text style={styles.contact}>See Location</Text>
                </View>
                <TouchableOpacity style={styles.callButton} onPress={()=>navigation.push('map-view',{
                    business:business
                })}>
                    <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.WHITE,fontSize:16}}>View</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine} />
                <TouchableOpacity 
            onPress={()=>onMessageBtnClick()}
            >
               <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.PRIMARY,fontSize:18,}}>Message</Text> 
            </TouchableOpacity>
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
    image: {
        width: '100%',
        height: 250,
    },
    infoContainer: {
        padding: 20,
    },
    businessName: {
        fontFamily: 'outfit-bold',
        fontSize: 25,
    },
    owner: {
        fontFamily: 'outfit-medium',
        color: color.PRIMARY,
        fontSize: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    categoryText: {
        fontSize: 13,
        fontFamily: 'outfit',
        padding: 3,
        color: color.PRIMARY,
        backgroundColor: color.PRIMARY_LIGHT,
        paddingHorizontal: 7,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    address: {
        fontFamily: 'outfit',
        color: color.GRAY,
        fontSize: 14,
    },
    horizontalLine: {
        borderWidth: 0.4,
        borderColor: color.GRAY,
        marginTop: 15,
        marginBottom: 10,
    },
    bookingProgress:{
        fontSize:14,
        fontFamily:'outfit',
        padding:3,
        color:color.PRIMARY,
        backgroundColor:color.PRIMARY_LIGHT,
        borderRadius:3,
        alignSelf:'flex-start',
        paddingHorizontal:7
    },
    contact: {
        fontFamily: 'outfit-medium',
        fontSize:16
    },
    callButton:{
        paddingLeft:18,
        paddingTop:7,
        paddingRight:18,
        paddingBottom:7,
        borderRadius:20,
        backgroundColor:color.PRIMARY,
    }
})
