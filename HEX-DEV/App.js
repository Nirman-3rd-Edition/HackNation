import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import AppNavigation from './App/navigations/appNavigation';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { UserLocationContext } from './App/Context/UserLocationContext';

import CheckNavigation from './App/navigations/CheckNavigation';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);
  
const [fontsLoaded, fontError] = useFonts({
  'outfit': require('./assets/Fonts/Outfit-Regular.ttf'),
  'outfit-medium': require('./assets/Fonts/Outfit-Medium.ttf'),
  'outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
});
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_c3VidGxlLWNhbWVsLTI1LmNsZXJrLmFjY291bnRzLmRldiQ'>
    <UserLocationContext.Provider value={{location,setLocation}}>
     
      <View style={styles.container}>
        <SignedIn>
         <CheckNavigation/>
         {/* <NavigationContainer>
         <TabNavigation/>
         </NavigationContainer> */}
        </SignedIn>
        <SignedOut>
          <AppNavigation/>
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </UserLocationContext.Provider>

    </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
});
