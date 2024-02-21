import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import color from '../../Utils/color';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function BusinessListItemByCategory({ business }) {
    const navigation=useNavigation();
    return (
        <TouchableOpacity style={styles.container}
        onPress={()=>navigation.push('business-detail',
    {
        business:business
    })
    }
        >
            <Image
                source={{ uri: business?.banner?.url }}
                style={{ width: 100, height: 100, borderRadius: 15 }}
            />
            <View style={{ display: 'flex', gap: 8 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.businessName}>
                    {business?.name}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:12,fontFamily:'outfit-medium',color:color.GRAY}}>
                    {business?.owner}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={16} color={color.PRIMARY} style={{ marginRight: 7 }} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
                        {business?.address}
                    </Text>

                   
                </View>
               
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: color.WHITE,
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
    address: {
        fontFamily: 'outfit',
        color: color.GRAY,
        fontSize: 14,
        maxWidth: 200, // Adjust the maximum width as per your requirement
    },
});
