import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import color from '../../Utils/color';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
    const [categories, setCategorires] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        GlobalApi.getCategories().then(resp => {
            setCategorires(resp?.categories);
        });
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.header}> Categories </Text>
        
            </View>
            <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>
                      (<View style={{marginRight:2}}>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'center' }}
                            onPress={() => navigation.push('business-list', { category: item.name })}>
                            <View style={styles.iconContainer}>
                                <Image source={{ uri: item?.icon?.url }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.categoryName}>
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
    },
    container: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginTop:10
    },
    iconContainer: {
        backgroundColor: color.LIGHT_GRAY,
        padding: 2,
        borderRadius: 100,
        borderColor:color.PRIMARY,
        borderWidth:2.5
    },
    categoryName: {
        fontFamily: 'outfit-medium',
        textTransform: 'capitalize',
        fontSize: 11,
        maxWidth: 70, // Adjust the maximum width as per your requirement
        textAlign: 'center',
    },
});
