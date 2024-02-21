import React, { useState } from 'react';
import { View, Text, Button,ScrollView } from 'react-native';
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
        <ScrollView>

            <View>
                <Text style={{ fontSize: 24, marginBottom: 20,fontFamily:'outfit-medium' }}>
                    Terms & Conditions
                </Text>
                <Text style={{ fontFamily: 'outfit',fontSize:15,margin:3,fontWeight:'bold' }}>
                Terms and Conditions for Evehunt
        </Text>
                <Text style={{ fontFamily: 'outfit',margin:3,fontsize:15 }}>
Welcome to Evehunt! These Terms and Conditions outline the rules and regulations for the use of our application.
By accessing this application, we assume you accept these Terms and Conditions. Do not continue to use Evehunt if you do not agree to take all of the Terms and Conditions stated on this page.
</Text>
<Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
- Evehunt collects information provided by sellers during registration to facilitate transactions between users and sellers. We ensure the security and confidentiality of all entered information in accordance with our Privacy Policy.
</Text>

<Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - Images uploaded by sellers are utilized solely for the purpose of creating their profiles on Evehunt. We do not distribute, sell, or use these images for any other purpose without explicit consent from the seller.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - Sellers are responsible for the accuracy and legality of the information they provide on Evehunt. Any misleading or fraudulent information may result in the termination of their account.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - Evehunt serves as a platform for communication and transactions between users and sellers. We do not endorse, guarantee, or take responsibility for the quality, legality, or safety of the products or services offered by sellers.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - All content, including but not limited to text, graphics, logos, images, and software, used on Evehunt is the intellectual property of Evehunt and is protected by copyright laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - Evehunt, its affiliates, directors, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the use or inability to use Evehunt.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
 - Evehunt reserves the right to modify or replace these Terms and Conditions at any time. Continued use of Evehunt after any such changes shall constitute your consent to such changes.
</Text>

 <Text style={{ fontFamily: 'outfit',margin:3,fontSize:13 }}>
By using Evehunt, you agree to abide by these Terms and Conditions. If you have any questions or concerns regarding these terms, please contact us at [Your Contact Information].
These Terms and Conditions have been generated with the help of Terms and Conditions Template and should be used as a guideline only.
Evehunt
                </Text>
                
            </View>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 ,marginTop:15}}>
                    <CheckBox value={isChecked} onValueChange={handleCheckboxChange}  />
                    <Text style={{ marginLeft: 10 ,fontFamily:'outfit'}}>
                        I accept the T&C
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end',borderRadius:10}}>
                    <Button title="Next" onPress={handleNextButtonClick} disabled={!isChecked}  />
                </View>
            </View>
            </ScrollView>
            
        </View>
    );
};

export default TermsAndConditionsPage;
