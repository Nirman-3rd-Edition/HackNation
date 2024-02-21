import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Profile from '../Screens/ProfileScreen/Profile';
import TermsAndConditionsPage from '../Screens/ProfileScreen/component/TermsAndConditions';
import SplashScreen from '../Screens/ProfileScreen/component/SplashScreen';
import SelfieScreen from '../Screens/ProfileScreen/component/Selfie';
import PenddingScreen from '../Screens/ProfileScreen/component/PenddingScreen';
import RegistrationForm from '../Screens/ProfileScreen/component/Authentication';
import VerificationCodePage from '../Screens/ProfileScreen/component/OtpVerification';
import GeoLocation from '../Screens/ProfileScreen/component/GeoLocation';
const Stack = createStackNavigator();
export default function ProfileScreenNavigation (){

    return (
        <Stack.Navigator screenOptions={{
            headerShown:false}}>
          <Stack.Screen name='profile' component={Profile}/>
          <Stack.Screen name="Terms And Conditions" component={TermsAndConditionsPage} />
          <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Selfie" component={SelfieScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Authentication" component={RegistrationForm} />
          <Stack.Screen name="OTP Verification" component={VerificationCodePage} />
          <Stack.Screen name="PenddingScreen" component={PenddingScreen} />
          <Stack.Screen name="GeoLocation" component={GeoLocation} />

          </Stack.Navigator>
    )
  
}

const styles = StyleSheet.create({})
