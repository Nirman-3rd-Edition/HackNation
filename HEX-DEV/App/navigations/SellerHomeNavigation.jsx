import { View, Text } from 'react-native'
import React from 'react'
import UserProfile from '../Screens/SellerHomeScreen/UserProfile';
import SellerHomeScreen from '../Screens/SellerHomeScreen/SellerHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SellerBookingList from '../Screens/SellerHomeScreen/SellerBookingList';

export default function SellerHomeNavigation() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false}}>
        <Stack.Screen name='homescreen' component={SellerHomeScreen}/>
        <Stack.Screen name='user-profile' component={UserProfile}/>
        

        </Stack.Navigator>
  )
}