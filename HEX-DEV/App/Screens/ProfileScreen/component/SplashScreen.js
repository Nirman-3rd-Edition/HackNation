import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import color from '../../../Utils/color';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a 2-second delay and then navigate to the Home screen
    const timer = setTimeout(() => {
      navigation.replace('Selfie');
    }, 2500);

    return () => clearTimeout(timer); // Clear the timeout in case the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Redirect to Evehunt Seller Registration Process </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor:color.PRIMARY
  },
  text: {
    fontSize: 25,
    fontFamily:'outfit-bold',
    textAlign:'center',
    gap:10,
    color:color.WHITE
  },
});

export default SplashScreen;
