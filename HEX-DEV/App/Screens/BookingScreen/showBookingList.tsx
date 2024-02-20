import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import color from '../../Utils/color';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ShowBookingList({ business, booking }) {
    const navigation = useNavigation();

    // Define background colors for each booking status
    const statusColors = {
        Booked: '#99e08b',
        InProgress: color.PRIMARY_LIGHT,
        Completed: '#ede5ad',
        Cancelled: '#cc8f8b',
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push('business-detail', {
                business: business,
                booking: booking
            })}
        >
            <Image
                source={{ uri: business?.banner?.url }}
                style={{ width: 100, height: 100, borderRadius: 15 }}
            />
            <View style={{ display: 'flex', gap: 8 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.businessName}>
                    {business?.name}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, fontFamily: 'outfit-medium', color: color.GRAY }}>
                    {business?.owner}
                </Text>

                <Text style={[styles.bookingProgress,, { backgroundColor: statusColors[booking?.bookingStatus] }]}>{booking?.bookingStatus}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:color.WHITE,
        padding: 10,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    businessName: {
        fontFamily: 'outfit',
        color: color.GRAY,
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: 220, // Adjust the maximum width as per your requirement
    },
    bookingProgress: {
        fontSize: 10,
        fontFamily: 'outfit',
        padding: 3,
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 7
    }
});
