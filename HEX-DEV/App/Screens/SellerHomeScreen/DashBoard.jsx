import React from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import color from '../../Utils/color';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function getCurrentDate(separator = '') {
    // Get the current date
    const currentDate = new Date();
  
    // Define months array for formatting
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Format the date in the required format
    const formattedDate = `${currentDate.getDate()}-${months[currentDate.getMonth()]}-${currentDate.getFullYear()}`;
    return formattedDate;
}

export default function DashBoard({ sellerList }) {
    const navigation=useNavigation();

    return (
        <FlatList
            data={sellerList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    {item.bookings.map((booking, bookingIndex) => {
                        if (booking.date === getCurrentDate()) {
                            return (
                                <TouchableOpacity key={bookingIndex} style={styles.bookingItem} onPress={() => { navigation.navigate('user-profile', { booking: booking, item: item }) }}>
                                    <Image source={{ uri: booking.userImage }} style={styles.userImage} />
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userName}>{booking.userName}</Text>
                                    <Text style={styles.date}>{getCurrentDate()}</Text>
                                    <Ionicons name="chevron-forward" size={24} color={color.PRIMARY_LIGHT} />
                                </TouchableOpacity>
                            );
                        } else {
                            <Text style={{marginTop:40,fontSize:20,fontFamily:'outfit-medium',color:color.LIGHT_GRAY}}>No Bookings For Today</Text>
                        }
                    })}
                </View>
            )}
        />
    );
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
