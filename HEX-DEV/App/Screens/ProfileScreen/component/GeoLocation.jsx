import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { UserLocationContext } from '../../../Context/UserLocationContext';
import { useUser } from '@clerk/clerk-expo';
import color from '../../../Utils/color';

const GeoLocation = () => {
  const route = useRoute();
  const photoUri = route.params?.photoUri;
  const companyName = route.params?.companyName;
  const ownerName = route.params?.ownerName;
  const phoneNumber = route.params?.phoneNumber;
  const aadharNumber = route.params?.aadharNumber;
  const gstNumber = route.params?.gstNumber;
  const aadharImage = route.params?.aadharImage;
  const gstImage = route.params?.gstImage;
  const serviceLocation = route.params?.serviceLocation;
  const catId= route.params?.catId
  const { location, setLocation } = useContext(UserLocationContext);
  const { user } = useUser();
  const [geoServiceLocation, setGeoServiceLocation] = useState('');
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  useEffect(() => {
    if (selectedLocation) {
      console.log('Selected Location:', selectedLocation.longitude);
      console.log('Selected Location:', selectedLocation.latitude);

    }
  }, [selectedLocation]);

  const handleUseCurrentLocation = () => {
    setGeoServiceLocation(location);
    navigation.replace('OTP Verification', { photoUri: photoUri, companyName: companyName, ownerName: ownerName, phoneNumber: phoneNumber, aadharNumber: aadharNumber, gstNumber: gstNumber, aadharImage: aadharImage, gstImage: gstImage, serviceLocation: serviceLocation,locationLongitude:location.longitude,locationLatitude:location.latitude,catId:catId });

  };

  const handleSelectLocationFromMap = () => {
    if (selectedLocation) {
    navigation.replace('OTP Verification', { photoUri: photoUri,
       companyName: companyName,
        ownerName: ownerName, 
        phoneNumber: phoneNumber,
         aadharNumber: aadharNumber, 
         gstNumber: gstNumber, 
         aadharImage: aadharImage, 
         gstImage: gstImage,
          serviceLocation: serviceLocation,
          locationLongitude:selectedLocation.longitude,
          locationLatitude:selectedLocation.latitude,
          catId:catId  });
    }
  };

 return  location?.latitude&& (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onPress={handleMapPress}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        >
          <Image source={{ uri: user?.imageUrl }} style={styles.image} />
        </Marker>
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <Ionicons name="location-sharp" size={30} color="blue" />
          </Marker>
        )}
      </MapView>
      <Text style={{fontFamily:'outfit',fontSize:16,textAlign:'center'}}>Select the Service Location in the Map</Text>
      <View style={{ display: 'flex', alignItems: 'center',justifyContent:'center', marginTop: 10,flexDirection:'row',gap:4 }}>
        <TouchableOpacity onPress={handleUseCurrentLocation} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Use Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectLocationFromMap} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Use Selected Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
  },
  map: {
    width: '100%',
    height: '85%',
   
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  buttonContainer: {
    backgroundColor: color.PRIMARY,
    padding: 15,
    borderRadius: 5,
    // marginVertical: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'outfit-medium',
    color: 'white',
  },
});

export default GeoLocation;
