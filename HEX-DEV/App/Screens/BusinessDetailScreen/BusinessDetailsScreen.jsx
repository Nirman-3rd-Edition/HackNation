import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import color from '../../Utils/color';
import { Feather, MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import call from 'react-native-phone-call'
import BokkingModel from './BokkingModel';


export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [business, setbusiness] = useState(param.business);
    const [isReadMore, setReadMore] = useState(false);
    const mynumber= business.contact
    const [showModal,setShowModal]=useState(false)
    
    const onMessageBtnClick=()=>{
    Linking.openURL('mailto:'+business?.email);
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
        <View>
        <ScrollView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Image
                source={{ uri: business.banner?.url }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.businessName}>{business.name}</Text>
                <View style={{ display: 'flex', gap: 4 }}>
                    <Text style={styles.owner}>{business.owner}🌟</Text>
                    <View style={styles.categoryContainer}>
                        {business.category.map((category, index) => (
                            <Text key={index} style={styles.categoryText}>
                                {category.name}
                            </Text>
                        ))}
                    </View>
                    
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={26} color={color.PRIMARY} style={{ marginRight: 7 }} />
                    <Text style={styles.address}>{business.address}</Text>
                </View>
                <View style={styles.horizontalLine} />
                {/* call section */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3, marginBottom: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="phone" size={24} color="green" style={{ marginRight: 5 }} />
                    <Text style={styles.contact}>{business.contact}</Text>
                </View>
                <TouchableOpacity style={styles.callButton} onPress={triggerCall}>
                    <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.WHITE,fontSize:16}}>Call</Text>
                </TouchableOpacity>
                </View> */}
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
                {/* about section */}
                <Text style={styles.header}> About Me </Text>
                <Text style={styles.aboutText} numberOfLines={isReadMore ? 50 : 5}>
                    {business.about}
                </Text>
                <TouchableOpacity onPress={() => setReadMore(!isReadMore)}>
                    <Text style={styles.readMoreText}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
                </TouchableOpacity>
                <View style={styles.horizontalLine} />
                <Text style={styles.header}> Posts </Text>
                {business.images.map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: item.url }}
                        style={styles.postImage}
                    />
                ))}
            </View>
        </ScrollView>
        <View style={{display:'flex',flexDirection:'row',margin:5,gap:5}}>
            <TouchableOpacity style={styles.messageButton}
            onPress={()=>onMessageBtnClick()}
            >
               <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.PRIMARY,fontSize:18}}>Message</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookingButton}
            onPress={()=>setShowModal(true)}
            >
               <Text style={{textAlign:'center',fontFamily:'outfit-medium',color:color.WHITE,fontSize:18}}>Book Now</Text> 
            </TouchableOpacity>
        </View>
        {/* booking Screen model */}
        <Modal
        animationType='slide'
        visible={showModal}>
           <BokkingModel 
           businessId={business.id}
           hideModal={()=>setShowModal(false)}/>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height:'90%'
    },
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
    contact: {
        fontFamily: 'outfit-medium',
        fontSize:16
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
    header: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom:5
    },
    aboutText: {
        fontFamily: 'outfit',
        color: color.GRAY,
        fontSize: 14,
        textAlign: 'justify',
        lineHeight: 24,
    },
    readMoreText: {
        fontSize: 16,
        color: color.PRIMARY,
        fontFamily: 'outfit',
    },
    postImage: {
        width: '100%',
        height: 160,
        marginBottom: 10,
        borderRadius:15,

    },
    messageButton:{
        padding:10,
        backgroundColor:color.WHITE,
        borderWidth:2,
        borderColor:color.PRIMARY,
        borderRadius:99,
        textAlign:'center',
        flex:1
    },
    bookingButton:{
        padding:10,
        backgroundColor:color.PRIMARY,
        borderWidth:2,
        borderColor:color.PRIMARY,
        borderRadius:99,
        textAlign:'center',
        flex:1

    },
    callButton:{
        paddingLeft:18,
        paddingTop:7,
        paddingRight:18,
        paddingBottom:7,
        borderRadius:20,
        backgroundColor:color.PRIMARY,
    }
});
