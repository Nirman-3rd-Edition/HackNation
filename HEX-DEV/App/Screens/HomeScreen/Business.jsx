import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';

export default function Business() {
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        BusinessName();
    }, []);

    const BusinessName = () => {
        GlobalApi.BusinessName().then(resp => {
            // Shuffle the fetched businessList array
            const shuffledList = shuffleArray(resp.businessLists);
            setBusinessList(shuffledList);
        });
    };

    // Function to shuffle an array
    const shuffleArray = array => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.header}> Recommendations </Text>
                {/* <Text>View All</Text> */}
            </View>
            <ScrollView horizontal>
                <View style={styles.businessListContainer}>
                    {businessList.map((business, index) => (
                        <View key={index} style={styles.businessItem}>
                            <BusinessListItem business={business} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
    },
    container: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    businessListContainer: {
        flexDirection: 'row',
    },
    businessItem: {
        marginRight: 10,
    },
});
