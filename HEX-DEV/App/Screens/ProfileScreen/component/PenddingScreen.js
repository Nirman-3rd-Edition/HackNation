import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useRoute } from "@react-navigation/native"
import color from '../../../Utils/color';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from '../../../Utils/GlobalApi';
import firebase from 'firebase/compat/app';
import * as FileSystem from 'expo-file-system';
import 'firebase/compat/storage';


export default function PenddingScreen() {
    const { user } = useUser();
    const route = useRoute();
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
    const uploadImagesAndCreateBusiness = async () => {
        try {
            // Upload photo image
            const photoDownloadURL = await uploadImageAndGetURL(photoUri);
            // Upload aadhar image
            const aadharDownloadURL = await uploadImageAndGetURL(aadharImage);
            // Upload gst image
            const gstDownloadURL = await uploadImageAndGetURL(gstImage);

            // Create business data object with image download URLs
            const data = {
                ownerName: ownerName,
                userEmail: user.primaryEmailAddress.emailAddress,
                companyName: companyName,
                phoneNumber: String(phoneNumber),
                aadharNumber: String(aadharNumber),
                gstNumber: String(gstNumber),
                serviceLocation: serviceLocation,
                locationLongitude: locationLongitude,
                locationLatitude: locationLatitude,
                photoDownloadURL: photoDownloadURL,
                aadharDownloadURL: aadharDownloadURL,
                gstDownloadURL: gstDownloadURL,
                catId:catId
            };

            // Call createBusiness function with data
            await GlobalApi.createBusines(data);
            ToastAndroid.show('Business Record Successfully', ToastAndroid.LONG);
        } catch (error) {
            if (error.message.includes('unique email constraint')) {
                ToastAndroid.show('Email address is already associated with another business.', ToastAndroid.LONG);
            } else {
                console.log(error);
                ToastAndroid.show('Error Recording Business', ToastAndroid.LONG);
            }
        }
    };

    const uploadImageAndGetURL = async (imageUri) => {
        try {
            const { uri } = await FileSystem.getInfoAsync(imageUri);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });
            const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);
            await ref.put(blob);
            // Get the download URL for the uploaded image
            return await ref.getDownloadURL();
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    // display all the data when the component mounts
    useEffect(() => {
        console.log(user.primaryEmailAddress.emailAddress);
        console.log(photoUri);
        console.log(companyName);
        console.log(ownerName);
        console.log(phoneNumber);
        console.log(aadharNumber);
        console.log(gstNumber);
        console.log(aadharImage);
        console.log(gstImage);
        console.log(serviceLocation);
        console.log(locationLongitude);
        console.log(locationLatitude);
        console.log(catId)

        // Upload images and create business
        uploadImagesAndCreateBusiness();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your Response Recorded!</Text>
            <Text style={styles.text}>Please wait for some day, we will get back to you soon after verifing your response.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:color.PRIMARY,
        padding:20
    },
    text: {
        fontSize: 18,
        color: color.WHITE,
        marginBottom: 10,
        textAlign:'center',
        fontFamily:'outfit-medium'
    }
})
