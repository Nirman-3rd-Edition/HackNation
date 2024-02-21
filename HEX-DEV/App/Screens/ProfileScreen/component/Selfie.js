import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import color from '../../../Utils/color';

const { width } = Dimensions.get('window');

const SelfieScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);
   
    // Check camera permissions
    const checkCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    // Take a selfie
    const takeSelfie = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            setPhotoUri(photo.uri);
        }
    };
    const retakeSelfie = () => {
        setPhotoUri(null);
    };

    useEffect(() => {
        checkCameraPermission();
    }, []);


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
      
        <View style={styles.container}>
          
            <View style={styles.maskContainer}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.maskImage} />
                ) : (
                    <>
                        <Camera
                            style={styles.camera}
                            type={Camera.Constants.Type.front}
                            ref={(ref) => setCameraRef(ref)}
                            onFacesDetected={(faces) => {
                                setFaceDetected(faces.faces.length > 0);
                            }}
                            faceDetectorSettings={{
                                mode: FaceDetector.FaceDetectorMode.fast,
                                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                                runClassifications: FaceDetector.FaceDetectorClassifications.all,
                                minDetectionInterval: 1000,
                                tracking: true,
                            }}

                        />
                        {/* {faceDetected && timerVisible && (
                            <View style={styles.timerContainer}>
                                <Text style={styles.timerText}>{countdown}</Text>
                            </View>
                        )}*/}
                    </> 
                )}
                {!faceDetected && !photoUri && (
                    <View style={styles.circleBorderRed} />
                )}
                {faceDetected && !photoUri && (
                    <View style={styles.circleBorderGreen} />
                )}
            </View>
            <View style={styles.buttonContainer}>
                {photoUri ? (
                    <>
                        <TouchableOpacity style={styles.button} onPress={retakeSelfie}>
                            <Text style={styles.text}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                // Handle the "Next" button press, e.g., navigate to the next screen
                                navigation.replace('Authentication',{ photoUri });
                            }}
                        >
                            <Text style={styles.text}>Next</Text>
                        </TouchableOpacity>
                    </>
                     ) : faceDetected ? (
                        <TouchableOpacity style={styles.button} onPress={takeSelfie} >
                          <Text style={styles.text}>Take Selfie</Text>
                        </TouchableOpacity>
                ) : null}
            </View>
           
        </View>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maskContainer: {
        width: width,
        height: width, // Set the height to match the width for a circular shape
        overflow: 'hidden',
        borderRadius: width / 2,
        backgroundColor: 'transparent',
    },
    camera: {
        flex: 1,
    },
    maskImage: {
        width: width,
        height: width, // Set the height to match the width for a circular shape
        borderRadius: width / 2,
    },
    circleBorderRed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: width / 2,
    },
    circleBorderGreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: width / 2,
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        padding: 15,
        backgroundColor: color.PRIMARY,
        borderRadius: 50,
        marginBottom: 10,
        
    },
    text: {
        fontSize: 18,
        fontFamily:'outfit',
        color:color.WHITE
    },
    timerContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        borderRadius: 10,
        padding: 10,
    },
    timerText: {
        color: 'green',
        fontSize: 30,
    },
    timerContainer: {
        position: 'absolute',
        top: '45%',
        left: '45%',
        borderRadius: 10,
        padding: 10,
    },
    timerText: {
        color: 'green',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default SelfieScreen;