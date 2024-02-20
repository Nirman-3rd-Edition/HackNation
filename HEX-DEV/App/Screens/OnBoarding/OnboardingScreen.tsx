import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { setItem } from '../../Utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = async () => {
        await setItem('onboarded', '1');
        navigation.navigate('Login');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
        
    }
  return (
    <View style={styles.container}>
      <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            // bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
            pages={[
                {
                    backgroundColor: '#a7f3d0',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../../assets/animations/Welcome.json')} autoPlay loop 
                            style={styles.lottie}/>
                        </View>
                    ),
                    title: (<Text style={{fontSize:25}}><Text>Welcome to </Text><Text style={{color:'#8E3FFF',fontWeight:'bold'}}>Evehunt</Text></Text>),
                    subtitle: '',
                },
                {
                    backgroundColor: '#fef3c7',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../../assets/animations/work.json')} autoPlay loop 
                            style={styles.lottie}/>
                        </View>
                    ),
                    title: 'Work Seamlessly',
                    subtitle: 'Get your work done seamlessly without interruption',
                },
                {
                    backgroundColor: '#a78bfa',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../../assets/animations/achieve.json')} autoPlay loop 
                            style={styles.lottie}/>
                        </View>
                    ),
                    title: 'Achieve Higher Goals',
                    subtitle: 'By boosting your productivity we help you to achieve higher goals',
                },
            ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})