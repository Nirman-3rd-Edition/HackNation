import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItemByCategory from './BusinessListItemByCategory';
import color from '../../Utils/color';
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function BusinessListByCategory() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [businessList, setBusinessList] = useState([]);
    const { location } = useContext(UserLocationContext); // Using context for user's location

    useEffect(() => {
        if (param) {
            getBusinessByCategory();
        }
    }, [param]);

    useEffect(() => {
        if (location) {
            sortBusinessesByDistance();
        }
    }, [location]);

    const getBusinessByCategory = () => {
        GlobalApi.getBusinessListByCategory(param.category).then(resp => {
            setBusinessList(resp.businessLists);
        });
    };

    const sortBusinessesByDistance = () => {
        const sortedBusinesses = [...businessList].sort((a, b) => {
            const distanceA = calculateDistance(location.latitude, location.longitude, a.mapLocation.latitude, a.mapLocation.longitude);
            const distanceB = calculateDistance(location.latitude, location.longitude, b.mapLocation.latitude, b.mapLocation.longitude);
            return distanceB - distanceA;
        });
        setBusinessList(sortedBusinesses);
    };

    // Function to calculate distance between two coordinates using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    return (
        <View style={{ padding: 20, paddingTop: 30 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
                <Ionicons name="arrow-back-sharp" size={30} color="black" />
                <Text style={{ fontSize: 25, fontFamily: 'outfit-medium', textTransform: 'capitalize' }}>{param?.category}</Text>
            </TouchableOpacity>

            {businessList?.length > 0 ? (
                <FlatList
                    style={{ marginTop: 15 }}
                    data={businessList}
                    renderItem={({ item, index }) => (
                        <BusinessListItemByCategory business={item} />
                    )}
                    initialNumToRender={businessList.length}
                />
            ) : (
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: '50%', color: color.GRAY }}>
                    No Business Found
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});