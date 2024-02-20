import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../Screens/OnBoarding/OnboardingScreen';
import { getItem } from '../Utils/asyncStorage.js';
import Login from '../Screens/LoginScreen/Login';


const Stack = createStackNavigator();


export default function AppNavigation() {

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(()=>{
    checkIfAlreadyOnboarded();
  },[])

  const checkIfAlreadyOnboarded = async ()=>{
    let onboarded = await getItem('onboarded');
    setShowOnboarding(onboarded !== '1');
  }

  if(showOnboarding==null){
    return null;
  }


  if(showOnboarding){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={showOnboarding?'Onboarding' : 'Login'}>
        <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  
}
