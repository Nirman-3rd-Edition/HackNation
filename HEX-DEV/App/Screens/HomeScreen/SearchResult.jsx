import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItemByCategory from '../BusinessListByCategory/BusinessListItemByCategory';
import color from '../../Utils/color';
import { Keyboard } from 'react-native';
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function SearchResult() {
    const navigation = useNavigation();
    const { location } = useContext(UserLocationContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true); // State to control whether to show suggestions or search results
    const [searchInitiated, setSearchInitiated] = useState(false); // State to track if the search has been initiated
    useEffect(() => {
        getSellerList();
    }, []);
    useEffect(() => {
        if (searchInitiated && location) {
            sortBusinessesByDistance();
        }
    }, [location]);
    
    const getSellerList = (keyword) => {
        GlobalApi.SearchQuery(keyword).then(resp => {
            console.log(resp.businessLists);
            setSearchResult(resp.businessLists);
            setShowSuggestions(false); // Hide suggestions and show search results
            setSearchInitiated(true); // Indicate that the search has been initiated
        }).catch(error => {
            console.error("Error fetching business lists: ", error);
            setSearchResult([]); // Resetting search result in case of error
            setSearchInitiated(true); // Indicate that the search has been initiated
        });
    };

    const generateSuggestions = (text) => {
        const suggestions = [
            'Decoration', 'Decorators', 'Wedding decoration', 'Marriage decoration', 'Marriage decorators', 'Tents', 'Tent', 'Tents for marriage', 'Tents for wedding', 'Tent decoration', 'Mandap', 'Mandap for marriage', 'Mandap for wedding', 'Marriage Mandap', 'Mandap Services', 'Photography', 'Photographer', 'Videography', 'Videographer', 'Marriage Photography', 'Wedding Photography', 'Marriage Album', 'Marriage Video', 'Catering', 'Caterers', 'Marriage catering', 'Catering for marriage', 'Marriage Food', 'Food for marriage'
        ];
        const searchText = text.toLowerCase(); // Convert search text to lowercase for case-insensitive search
    return suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchText));
    };

    const handleTextChange = (text) => {
        setSearchQuery(text);
        if (text === '') {
            setSuggestions([]); // Clear suggestions when search text is empty
            setShowSuggestions(true); // Show suggestions when search text is empty
            setSearchInitiated(false); // Reset search initiation when search text is empty
        } else {
            const newSuggestions = generateSuggestions(text);
            setSuggestions(newSuggestions);
            setShowSuggestions(newSuggestions.length > 0); // Show suggestions only if there are suggestions available
        }
    };
    const sortBusinessesByDistance = () => {
        const sortedBusinesses = [...searchResult].sort((a, b) => {
            const distanceA = calculateDistance(location.latitude, location.longitude, a.mapLocation.latitude, a.mapLocation.longitude);
            const distanceB = calculateDistance(location.latitude, location.longitude, b.mapLocation.latitude, b.mapLocation.longitude);
            return distanceA - distanceB;
        });
        setSearchResult(sortedBusinesses);
    };
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const a = 6378137; // Semi-major axis of the Earth (equatorial radius) in meters
        const b = 6356752.3142;
        const f = 1 / 298.257223563; // Flattening factor
    
        const phi1 = deg2rad(lat1);
        const phi2 = deg2rad(lat2);
        const lambda1 = deg2rad(lon1);
        const lambda2 = deg2rad(lon2);
    
        const L = lambda2 - lambda1;
        const tanU1 = (1 - f) * Math.tan(phi1);
        const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
        const sinU1 = tanU1 * cosU1;
        const tanU2 = (1 - f) * Math.tan(phi2);
        const cosU2 = 1 / Math.sqrt(1 + tanU2 * tanU2);
        const sinU2 = tanU2 * cosU2;
    
        let lambda = L;
        let prevLambda;
        const iterLimit = 100;
        let iterCount = 0;
        let cosSqAlpha;
        let sinSigma;
        let cos2SigmaM;
        let sinAlpha;
        let sigma;
        let cosSigma;
        do {
            const sinLambda = Math.sin(lambda);
            const cosLambda = Math.cos(lambda);
            sinSigma = Math.sqrt(
                (cosU2 * sinLambda) * (cosU2 * sinLambda) +
                (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
            );
    
            if (sinSigma === 0) {
                // Coincident points
                return 0;
            }
    
            cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
            sigma = Math.atan2(sinSigma, cosSigma);
            sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
            cosSqAlpha = 1 - sinAlpha * sinAlpha;
            cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
    
            prevLambda = lambda;
            lambda = L + (1 - f) * f * sinAlpha *
                (sigma + f * sinSigma * (cos2SigmaM + f * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    
            iterCount++;
        } while (Math.abs(lambda - prevLambda) > 1e-12 && iterCount < iterLimit);
    
        if (iterCount === iterLimit) {
            // Formula didn't converge
            return NaN;
        }
    
        const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
        const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 *
            (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
            B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) *
            (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    
        const distance = b * A * (sigma - deltaSigma); // Distance in meters
    
        return distance / 1000; // Convert to kilometers
    };
    
    // Helper function to convert degrees to radians
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };
    

    const handleSuggestionPress = (suggestion) => {
        setSearchQuery(suggestion);
        getSellerList(suggestion); // Fetch seller list based on the selected suggestion
        setSuggestions([]); 
        Keyboard.dismiss();
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionPress(item)}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.searchBarContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-sharp" size={30} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleTextChange}
                        
                    />
                </View>
                {showSuggestions && (
                    <FlatList
                        data={suggestions}
                        renderItem={renderSuggestionItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
            {/* Display search results */}
            {searchInitiated && searchResult.length === 0 && (
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: '50%', color: color.GRAY }}>
                    No Business Found
                </Text>
            )}
            {searchInitiated && searchResult.length > 0 && (
                <FlatList
                    style={{ marginTop: 15 }}
                    data={searchResult}
                    renderItem={({ item, index }) => (
                        <BusinessListItemByCategory business={item} />
                    )}
                    initialNumToRender={searchResult.length}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    backButton: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});
