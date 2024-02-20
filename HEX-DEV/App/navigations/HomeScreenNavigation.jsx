import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/HomeScreen/Home';
import BusinessListByCategory from '../Screens/BusinessListByCategory/BusinessListByCategory';
import BusinessDetailsScreen from '../Screens/BusinessDetailScreen/BusinessDetailsScreen';
import AppMapView from '../Screens/BusinessDetailScreen/AppMapView';
import SearchResult from '../Screens/HomeScreen/SearchResult';

const Stack = createStackNavigator();

export function HomeScreenNavigation () {
 
    return (
      <Stack.Navigator screenOptions={{
        headerShown:false}}>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='business-detail' component={BusinessDetailsScreen}/>
        <Stack.Screen name='business-list' component={BusinessListByCategory}/>
        <Stack.Screen name='map-view' component={AppMapView}/>
        <Stack.Screen name='search-result' component={SearchResult}/>


      </Stack.Navigator>
    )
  
}

export default HomeScreenNavigation
