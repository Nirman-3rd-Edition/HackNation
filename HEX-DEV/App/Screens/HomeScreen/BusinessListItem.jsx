import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import color from '../../Utils/color';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

export default function BusinessListItem({ business }) {

    const imageWidth = windowWidth * 0.45; // Adjust the percentage as needed
    
    const imageHeight = imageWidth * (9 / 16); // Assuming 16:9 aspect ratio

    const navigation=useNavigation();

    return (
        <TouchableOpacity style={styles.container}
        onPress={()=>navigation.push('business-detail',
        {
           business:business 
        }
        )}
        >
            <Image source={{ uri: business?.banner?.url }} style={[styles.image, { width: imageWidth, height: imageHeight }]} />
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.businessName}>
                    {business?.name}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:12,fontFamily:'outfit-medium',color:color.GRAY}}>
                    {business?.owner}
                </Text>
                <View style={styles.categoryContainer}>
                    {business.category.map((category, index) => (
                        <Text key={index} style={styles.categoryText}>
                            {category.name}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: color.LIGHT_GRAY,
        borderRadius: 10,
    },
    infoContainer: {
        padding: 7,
        display: 'flex',
        gap: 3,
    },
    image: {
        borderRadius: 10,
    },
    businessName: {
        fontSize: 17,
        fontFamily: 'outfit-medium',
        maxWidth: 150, // Adjust the maximum width as per your requirement
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        maxWidth: 150
    },
    categoryText: {
        fontSize: 10,
        fontFamily: 'outfit',
        padding: 3,
        color: color.PRIMARY,
        alignSelf: 'flex-start',
        backgroundColor: color.PRIMARY_LIGHT,
        paddingHorizontal: 7,
        marginRight: 2,
        marginBottom: 5,
        borderRadius: 5,
    },
});
