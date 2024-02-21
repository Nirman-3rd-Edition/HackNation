import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Book from '../Screens/BookingScreen/Book';
import ShowBookingDetailsScreen from '../Screens/BookingScreen/ShowBookingDetailsScreen';
import AppMapView from '../Screens/BusinessDetailScreen/AppMapView';
const Stack = createStackNavigator();
export function BookingScreenNavigation () {
 
    return (
      <Stack.Navigator screenOptions={{
        headerShown:false}}>
        <Stack.Screen name='book' component={Book}/>
        <Stack.Screen name='map-view' component={AppMapView}/>
        
        
        <Stack.Screen name='business-detail' component={ShowBookingDetailsScreen}/>
      </Stack.Navigator>
    )
  
}

export default BookingScreenNavigation
