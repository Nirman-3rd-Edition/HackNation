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
                    backgroundColor: '#FFFFFF',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../../assets/animations/Welcom.json')} autoPlay loop 
                            style={styles.lottie}/>
                        </View>
                    ),
                    title: (<Text style={{fontSize:25}}></Text>),
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
                    title: 'Grab Your Dates',
                    subtitle: 'Plan your events seemlessly with EVEHUNT',
                },
                {
                    backgroundColor: '#a78bfa',
                    image: (
                        <View style={styles.lottie}>
                            <Lottie source={require('../../../assets/animations/achieve.json')} autoPlay loop 
                            style={styles.lottie}/>
                        </View>
                    ),
                    title: 'Be A Part Of Our Family',
                    
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
        width: width*1.5,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})