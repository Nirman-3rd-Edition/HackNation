import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import color from '../../Utils/color';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';

export default function SellerBookingList() {
  const {user}=useUser();
    const [activeItem, setActiveItem] = useState('Confirmed'); // State to keep track of active item
  const navigation=useNavigation();
  const [sellerList,setSellerList]=useState()
  useEffect(()=>{
    getSellerList()
  },[])
  const getSellerList=()=>{
    GlobalApi.SellerDetails(user.primaryEmailAddress.emailAddress).then(resp=>{
      setSellerList(resp.businessLists);
      })
      .finally(() => {
    });
  }
    const menuItems = [
        { key: 'confirmed', title: 'Confirmed', component: <ConfirmedComponent />, onPress: () =>{ setActiveItem('Confirmed');getSellerList()} },
        { key: 'requested', title: 'Requested', component: <RequestedComponent />, onPress: () => {setActiveItem('Requested');getSellerList()} },
    ];

    function ConfirmedComponent() {
        return (
            <FlatList
                data={sellerList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        {item.bookings.map((booking, bookingIndex) => (
                            booking.bookingStatus === "Booked" && (
                                <TouchableOpacity key={bookingIndex} style={styles.bookingItem} onPress={()=>{navigation.navigate('user-profile',{booking:booking,item:item})}}>
                                    <Image source={{ uri: booking.userImage }} style={styles.userImage} />
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userName}>{booking.userName}</Text>
                                    <Text style={styles.date}>{booking.date}</Text>
                                    <Ionicons name="chevron-forward" size={24} color={color.PRIMARY_LIGHT} />
                                </TouchableOpacity>
                            )
                        ))}
                    </View>
                )}
            />
        );
    }

    function RequestedComponent() {
        return (
          <FlatList
          data={sellerList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            
              <View style={styles.itemContainer}>

                  {item.bookings.map((booking, bookingIndex) => (
                      booking.bookingStatus === "InProgress" && (
                          <TouchableOpacity key={bookingIndex} style={styles.bookingItem} onPress={()=>{navigation.navigate('user-profile',{booking:booking,item:item})}}>
                              <Image source={{ uri: booking.userImage }} style={styles.userImage} />
                              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userName}>{booking.userName}</Text>
                              <Text style={styles.date}>{booking.date}</Text>
                              <Ionicons name="chevron-forward" size={24} color={color.PRIMARY_LIGHT} />
                          </TouchableOpacity>
                      )
                  ))}
              </View>
          )}
      />
        )
    }

    return (
      <ScrollView>

        <View >
            <View style={styles.bookigContainer}>
                <FlatList
                    horizontal={true}
                    
                    showsHorizontalScrollIndicator={false}
                    data={menuItems} // Use the menuItems array as data
                    keyExtractor={(item, index) => index.toString()} // Key extractor function
                    renderItem={({ item }) => ( // Render item function
                        <TouchableOpacity onPress={item.onPress} style={{ alignItems: 'center' }}>
                            <View style={[styles.Container, { borderColor: item.title === activeItem ? color.PRIMARY_LIGHT : color.LIGHT_GRAY }]}>
                                <Text style={{ fontFamily: 'outfit', color: item.title === activeItem ? color.PRIMARY : color.BLACK }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {menuItems.find(item => item.title === activeItem)?.component}
        </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    Container: {
        padding: 8,
        borderColor: color.PRIMARY_LIGHT,
        borderBottomWidth: 1.5,
        marginRight: 10,
        marginTop: 5
    },
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
    },
    bookigContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: color.WHITE,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
