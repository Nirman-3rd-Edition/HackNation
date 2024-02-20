import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
export default function AppMapView() {
  const navigation = useNavigation();
  const {user}=useUser();
  const param = useRoute().params;
  const [business, setbusiness] = useState(param.business);
const {location,setLocation}=useContext(UserLocationContext)

  return location?.latitude&&(
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
        region={{
       
          latitude:business.mapLocation.latitude,
          longitude:business.mapLocation.longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker
      coordinate={{
        latitude:business.mapLocation.latitude,
        longitude:business.mapLocation.longitude,
      }}
      >
        <Image source={{uri:business?.banner.url}}
          style={styles.image}    
          />
      </Marker>
      <Marker
      coordinate={{
        latitude:location.latitude,
          longitude:location.longitude
      }}
      >
        <Image source={{uri:user?.imageUrl}}
          style={styles.image}    
          />
      </Marker>

      </MapView>
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
    height: '100%',
  },
  image:{
    width:50,
    height:50,
    borderRadius:100
  }
});
