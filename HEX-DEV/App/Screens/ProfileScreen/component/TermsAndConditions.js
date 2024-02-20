import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import color from '../../../Utils/color';

const TermsAndConditionsPage = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const handleNextButtonClick = () => {
        if (isChecked) {
            navigation.navigate('Splash Screen')
        } else {
            alert('Please accept the terms and conditions to proceed.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
            <View>
                <Text style={{ fontSize: 24, marginBottom: 20,fontFamily:'outfit-medium' }}>
                    Terms & Conditions
                </Text>
                <Text style={{ fontFamily: 'outfit' }}>
                    By using this platform as a seller, you agree to abide by our terms and conditions. Please review the terms and conditions carefully before proceeding.
                </Text>
                
            </View>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <CheckBox value={isChecked} onValueChange={handleCheckboxChange}  />
                    <Text style={{ marginLeft: 10 ,fontFamily:'outfit'}}>
                        I accept the T&C
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end',borderRadius:10}}>
                    <Button title="Next" onPress={handleNextButtonClick} disabled={!isChecked}  />
                </View>
            </View>
        </View>
    );
};

export default TermsAndConditionsPage;
