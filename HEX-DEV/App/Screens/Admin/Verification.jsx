import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

const Verification = () => {
    const navigation=useNavigation()
const route=useRoute()
const item=route.params?.item
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const companyName = item?.name;
  const ownerName =  item?.owner;
  const selected = item?.category[0]?.name;
  const phoneNumber = item?.contact;
  const aadharNumber =  item?.aadharNumber;
  const gstNumber = item?.panNumber;
  const aadharImage =item?.aadharImageUrl;
    
  const gstImage =item?.gstImageUrl;

  const serviceLocation = item?.address;
  const photoUri =item?.userPhotoUrl
    

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const renderField = (label, value) => (
    <>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </>
  );

  const renderImage = (uri) => (
    <TouchableOpacity onPress={() => handleImageClick(uri)}>
      <Image source={{ uri }} style={styles.thumbnailImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  const handleAccept = () => {
    // Implement your logic for accepting verification
    console.log('Verification Accepted');
    navigation.goBack()

  };

  const handleReject = () => {
    // Implement your logic for rejecting verification
    console.log('Verification Rejected');
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>Verification Details</Text>

          {renderField('Company Name', companyName)}
          {renderField('Owner Name', ownerName)}
          {renderField('Category', selected)}
          {renderField('Phone Number', phoneNumber)}
          {renderField('Owner Aadhar Number', aadharNumber)}
          {renderField('GST Number', gstNumber)}
          {renderField('Company Location', serviceLocation)}

          <Text style={styles.label}>Aadhar Image:</Text>
          {renderImage(aadharImage)}

          <Text style={styles.label}>GST Image:</Text>
          {renderImage(gstImage)}

          <Text style={styles.label}>Profile Photo:</Text>
          {renderImage(photoUri)}
        </View>
      </ScrollView>

      {/* Modal for displaying enlarged image */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.enlargedImage} resizeMode="contain" />
          <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Accept and Reject Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth:2,
    padding:10,
    borderRadius:10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  thumbnailImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  enlargedImage: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Verification;