import React from 'react'
import { Text, View, Image,StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../Utils/color'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();

export default function Login (){
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
      <View style={{alignItems:'center'}}>
        <Image
        source={require('../../../assets/login.png')}
        style={styles.LoginImage}
        />
        <View style={styles.subContainer}>
        <Text style={{fontSize:27,color:color.WHITE,textAlign:'center'}}>
            Let's Find <Text style={{fontWeight:'bold'}}>Professional Services</Text>
        </Text>
        <Text style={{fontSize:18,color:color.WHITE,marginTop:20,textAlign:'center'}}>Best App to find services near you</Text>
       <TouchableOpacity style={styles.button}
       onPress={onPress}
       >
       <Text style={{textAlign:'center',fontSize:17,color:color.PRIMARY}}>Let's Get Started</Text>
       </TouchableOpacity>
        </View>
      </View>
    )
}
const styles=StyleSheet.create({
LoginImage:{
    width:200,
    height:400,
    marginTop:70,
    borderWidth:4,
    borderColor:color.BLACK,
    borderRadius:10
},
subContainer:{
    width:'100%',
    backgroundColor:color.PRIMARY,
    height:'60%',
    marginTop:-20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:10
},
button:{
    padding:15,
    backgroundColor:color.WHITE,
    borderRadius:99,
    marginTop:20
}
})