import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GlobalApi from '../Utils/GlobalApi';
import SellerNavigation from './SellerNavigation';
import TabNavigation from './TabNavigation';

export default function CheckNavigation() {
  const { user } = useUser();
  const [userEmail, setUserEmail] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    getEmail();
  }, [user]);

  const getEmail = () => {
    GlobalApi.CheckEmail(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        setUserEmail(resp?.businessLists); // Ensure userEmail is always a string
        setIsLoading(false); // Set loading state to false when data fetching is complete
      });
  };
  console.log(userEmail)
  const renderNavigation = () => {
    if (isLoading) {
      return null; // Return nothing while data is being fetched
    }
    
    if (userEmail.length > 0 && userEmail[0].verification=="Verified") {
      return (
        <NavigationContainer>
          <SellerNavigation />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      );
    }
  };

  return renderNavigation();
}
