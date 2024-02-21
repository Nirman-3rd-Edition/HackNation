import React, { useEffect, useState } from 'react'
import { Text, View, Image,StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../Utils/color'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import {  Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Component from 'react-native-paper/lib/typescript/components/List/ListItem';

WebBrowser.maybeCompleteAuthSession();

export default function Login (){
  
const images = [
  require('../../../assets/images/1.jpg'),
  require('../../../assets/images/2.jpg'),
  require('../../../assets/images/3.jpg'),
  require('../../../assets/images/4.jpg'),

  // Add more images as needed
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleImageTransition();
    }, 3000); // Adjust the interval duration as needed (in milliseconds)

    return () => clearInterval(transitionInterval);
  }, [currentIndex]);

  const handleImageTransition = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true
      }
      ).start(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
        Animated.timing(
          fadeAnim,
          {
          toValue: 1,
          duration: 2000, // Adjust the duration as needed
          useNativeDriver: true
        }
        ).start();
      });
  };
  
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
      
    return (
      <View style={{flex:1}}>
      <View style={styles.container}>
      <Animated.Image
        source={images[currentIndex]}
        style={[
          styles.image,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
        resizeMode="cover"
      />
       <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        style={styles.gradient}
      />
      <Text style={{
        position: 'absolute', fontSize: 55, fontWeight: 'bold',  color: color.LIGHT_GRAY,textShadowColor: color.PRIMARY_LIGHT,
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10
        }}>EVEHUNT</Text>
    </View>
    
        <View style={{backgroundColor:'black', alignItems:'center'}}>
       <TouchableOpacity style={styles.button}
       onPress={onPress}
       >
        <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
        <Text style={{textAlign:'center',fontSize:17,color:color.WHITE,fontFamily:'outfit-medium'}}>Get Started</Text>
        <Ionicons name="arrow-forward-outline" size={24} color="white" />
        </View>
       
       </TouchableOpacity>
       </View>
      </View> 
    )
}
const styles=StyleSheet.create({

button:{
    padding:15,
    backgroundColor:color.BLACK,
    borderRadius:99,
    width:'90%',
    alignItems:'center',
    backfaceVisibility:'hidden',
    borderWidth:2,
    borderColor:color.PRIMARY_LIGHT
  
},
container: {
  flex: 1,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  height:'100%'
},
image: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
 gradient: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
},
})