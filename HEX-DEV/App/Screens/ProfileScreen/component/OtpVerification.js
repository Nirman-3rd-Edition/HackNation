import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { useRoute } from "@react-navigation/native"
import { firebaseConfig } from '../../../../firebaseConfig'
import firebase from 'firebase/compat/app';


const VerificationCodePage = ({ navigation }) => {
  // state for storing the otp value
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = useRef(null);
  const route = useRoute();
  // refs for the text inputs
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);
  //to show remaining time resend button
  const [resendButtonActive, setResendButtonActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState(179); // 3 minutes in seconds
  //storing props came from the authentication component
  const photoUri = route.params?.photoUri;
  const companyName = route.params?.companyName;
  const ownerName = route.params?.ownerName;
  const phoneNumber = route.params?.phoneNumber;
  const aadharNumber = route.params?.aadharNumber;
  const gstNumber = route.params?.gstNumber;
  const aadharImage = route.params?.aadharImage;
  const gstImage = route.params?.gstImage;
  const serviceLocation = route.params?.serviceLocation;
  const locationLongitude = route.params?.locationLongitude;
  const locationLatitude = route.params?.locationLatitude;
  const catId= route.params?.catId;
  // array of the refs for easy access
  const inputs = [input1, input2, input3, input4, input5, input6];


  const startResendTimer = () => {
    setResendButtonActive(true);
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setResendButtonActive(false);
    }, 180000); // 3 minutes in milliseconds
  };

  const handleResend = () => {
    sendVerification();
    startResendTimer();
    setRemainingTime(179);
  };

  // function to handle the text change in each input
  const handleChangeText = (text, index) => {
    // update the otp state
    const newOtp = otp.slice(0, index) + text + otp.slice(index + 1);
    setOtp(newOtp);

    // if the text is not empty, move to the next input
    if (text) {
      if (index < 5) {
        inputs[index + 1].current.focus();
      }
    }
  };

  // function to handle the backspace press in each input
  const handleKeyPress = (e, index) => {
    // if the key is backspace and the input is empty, move to the previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        inputs[index - 1].current.focus();
      }
    }
  };

  // function to render each input
  const renderInput = (index) => {
    return (
      <TextInput
        ref={inputs[index]}
        style={styles.input}
        value={otp[index]}
        onChangeText={(text) => handleChangeText(text, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        keyboardType="numeric"
        maxLength={1}
        autoFocus={index === 0}
      />
    );
  };

  // function to handle the verify button press
  const handleVerify = () => {
    // check if the otp is 6 digits long
    if (otp.length === 6) {
      setLoading(true); // Show the loading indicator
      // verify the otp
      confirmCode();

    } else {
      // show an alert with an error message
      Alert.alert("OTP Invalid", "Please enter a 6 digit OTP");
    }
  };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  }

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    firebase.auth().signInWithCredential(credential)
      .then(() => {
        Alert.alert('OTP verification is Sucesssful.');
    navigation.replace('PenddingScreen', { photoUri: photoUri, 
      companyName: companyName,
       ownerName: ownerName, 
       phoneNumber: phoneNumber,
        aadharNumber: aadharNumber, 
        gstNumber: gstNumber, 
        aadharImage: aadharImage,
         gstImage: gstImage, 
         serviceLocation: serviceLocation,
         locationLongitude:locationLongitude,
         locationLatitude:locationLatitude,
         catId:catId });
      })
      .catch((error) => {
        //show an alert in case of error
        alert(error);
      })
  }

  useEffect(() => {
    sendVerification();
    startResendTimer();
  }, []);

  return (
    <View style={styles.maincontainer}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>Verification Code Sent To {phoneNumber}</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {renderInput(0)}
          {renderInput(1)}
          {renderInput(2)}
          {renderInput(3)}
          {renderInput(4)}
          {renderInput(5)}
        </View>
        <Button title="Verify" onPress={handleVerify} color="#3CB371" />
          <Text style={styles.remainingTime}>
            Resend OTP in {Math.floor(remainingTime / 60)}:{remainingTime % 60}s
          </Text>
        <Button title="Resend OTP" onPress={handleResend} color="#3CB371" disabled={resendButtonActive} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    width: 300,
    height: 100,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    height: 60,
  },
  input: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    borderBottomWidth: 2,
    borderBottomColor: "#3CB371",
  },
  remainingTime: {
    marginTop: 10,
    color: "#333333",
  },
});

export default VerificationCodePage;
