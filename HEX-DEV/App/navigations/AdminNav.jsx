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
import admin from '../Screens/Admin/admin';
import Verification from '../Screens/Admin/Verification';
const Stack = createStackNavigator();
export default function AdminNav (){

    return (
        <Stack.Navigator screenOptions={{
            headerShown:false}}>
          <Stack.Screen name='profile' component={admin}/>
       
          <Stack.Screen name='next_screen' component={Verification}/>

          </Stack.Navigator>
    )
  
}

const styles = StyleSheet.create({})
