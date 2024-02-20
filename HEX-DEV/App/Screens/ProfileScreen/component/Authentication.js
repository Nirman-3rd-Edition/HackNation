import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import color from '../../../Utils/color';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const RegistrationForm = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [selected, setSelected] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [aadharImage, setAadharImage] = useState(null);
  const [gstImage, setGstImage] = useState(null);
  const route = useRoute();
  const [highlightedFields, setHighlightedFields] = useState([]);
  const photoUri = route.params?.photoUri;
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: 'IN', // Default to India
    callingCode: '91',
  });
  const data = [
    { label: 'Venu', value: 'cls737l9411u409o4ckj8ez7r' },
    { label: 'Decorations', value: 'cls734k9a11rj0apk9vx224yp' },
    { label: 'Catering ', value: 'cls735ses11qv09o4rqvjtwrd' },
    { label: 'Photography', value: 'cls736is711s409o49w5r17aq' },
    { label: 'Package Deals', value: 'clse7ch3i181j0bo1ady7pv5f' },
    { label: 'Hotel', value: 'clstze83a0wnd0dpoqmlem9of' },
    { label: 'Tents', value: 'clsu1i6bb0ykc0dpoeb3j7ncf' },
  ];
  const formatAadharNumber = (text) => {
    const numericValue = text.replace(/\D/g, '');
    const formattedAadhar = numericValue.replace(/(.{4})/g, '$1 ');
    setAadharNumber(formattedAadhar.trim());
  };

  const handleRegister = () => {
    // Validate and highlight fields
    const missingFields = [];

    if (!companyName) {
      missingFields.push('companyName');
    }
    
    if (!ownerName) {
      missingFields.push('ownerName');
    }
    if (!selected) {
      missingFields.push('selected');
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      missingFields.push('phoneNumber');
    }

    if (!aadharNumber || aadharNumber.replace(/\D/g, '').length !== 12) {
      missingFields.push('aadharNumber');
    }

    if (!aadharImage) {
      missingFields.push('aadharImage');
    }

    if (!gstNumber || gstNumber.length !== 15) {
      missingFields.push('gstNumber');
    }

    if (!gstImage) {
      missingFields.push('gstImage');
    }

    if (!serviceLocation.trim()) {
      missingFields.push('serviceLocation');
    }

    setHighlightedFields(missingFields);

    if (missingFields.length === 0) {
      // All fields are filled, proceed with registration or API call
      navigation.replace('GeoLocation', {
        photoUri: photoUri,
        companyName: companyName,
        ownerName: ownerName,
        phoneNumber: ('+'+ selectedCountry.callingCode + phoneNumber),
        aadharNumber: aadharNumber,
        gstNumber: gstNumber,
        aadharImage: aadharImage,
        gstImage: gstImage,
        serviceLocation: serviceLocation,
        catId: selected,
      });
      // navigation.navigate('OTP Verification', { phoneNumber });
    }
  };

  const handleImageUpload = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.assets[0].canceled) {
      if (type === 'aadhar') {
        setAadharImage(result.assets[0].uri);
      } else if (type === 'gst') {
        setGstImage(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 26 }}>
          Registration Form
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            {/* company name field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('companyName') ? 'red' : color.PRIMARY }]}>
                Company Name{highlightedFields.includes('companyName') && ' *'}:
              </Text>
              <TextInput
                style={[styles.input, highlightedFields.includes('companyName') && styles.highlightedInput]}
                placeholder="Enter Company Name"
                maxLength={50}
                value={companyName}
                onChangeText={(text) => {
                  setCompanyName(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            {/* company owner name field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('ownerName') ? 'red' : color.PRIMARY }]}>
                Company Owner Name{highlightedFields.includes('ownerName') && ' *'}:
              </Text>
              <TextInput
                style={[styles.input, highlightedFields.includes('ownerName') && styles.highlightedInput]}
                placeholder="Owner Name As per Aadhar"
                maxLength={40}
                value={ownerName}
                onChangeText={(text) => {
                  setOwnerName(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            {/* categories */}
            <View style={styles.fieldContainer}>
              <Dropdown
                style={[styles.dropdown, { color: highlightedFields.includes('selected') ? 'red' : 'black' }, { borderBottomColor: highlightedFields.includes('selected') ? 'red' : 'black' }]}
                // style={styles.dropdown}
                placeholderStyle={[styles.placeholderStyle, { color: highlightedFields.includes('selected') ? 'red' : 'black' }]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item => {
                  setSelected(item.value);
                  setHighlightedFields([]);
                }}

                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={10}
                  />
                )}
                selectedStyle={styles.selectedStyle}
              />
            </View>
            {/* phone number field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('phoneNumber') ? 'red' : color.PRIMARY }]}>
                Phone Number{highlightedFields.includes('phoneNumber') && ' *'}:
              </Text>
              <View style={styles.phno}>
                <CountryPicker
                  withFlag
                  withFilter
                  withCallingCode
                  onSelect={(country) => setSelectedCountry(country)}
                  countryCode={selectedCountry.cca2}
                />
              <TextInput
                style={[styles.input, highlightedFields.includes('phoneNumber') && styles.highlightedInput]}
                placeholder="Enter Phone Number"
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            </View>
            {/* aadhar number field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('aadharNumber') ? 'red' : color.PRIMARY }]}>
                Aadhar Number{highlightedFields.includes('aadharNumber') && ' *'}:
              </Text>
              <TextInput
                style={[styles.input, highlightedFields.includes('aadharNumber') && styles.highlightedInput]}
                placeholder="Enter Aadhar Number"
                keyboardType="numeric"
                maxLength={14}
                value={aadharNumber}
                onChangeText={(text) => {
                  formatAadharNumber(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            {/* gst number field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('gstNumber') ? 'red' : color.PRIMARY }]}>
                GST Number{highlightedFields.includes('gstNumber') && ' *'}:
              </Text>
              <TextInput
                style={[styles.input, highlightedFields.includes('gstNumber') && styles.highlightedInput]}
                placeholder="Enter GST Number"
                maxLength={15}
                
                autoCapitalize="characters"
                value={gstNumber}
                onChangeText={(text) => {
                  setGstNumber(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            {/* gst image field */}
            <View style={styles.imageUploadContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('gstImage') ? 'red' : color.PRIMARY }]}>
                Upload GST Bill{highlightedFields.includes('gstImage') && ' *'}:
              </Text>
              {gstImage && <Image source={{ uri: gstImage }} style={styles.uploadedImage} resizeMode="cover" />}
              <TouchableOpacity onPress={() => handleImageUpload('gst')}>
                <Feather name="upload" size={28} color={color.PRIMARY_LIGHT} style={{ marginBottom: 10 }} />
              </TouchableOpacity>
            </View>
            {/* aadhar image field */}
            <View style={styles.imageUploadContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('aadharImage') ? 'red' : color.PRIMARY }]}>
                Upload Aadhar Image{highlightedFields.includes('aadharImage') && ' *'}:
              </Text>
              {aadharImage && (
                <Image source={{ uri: aadharImage }} style={styles.uploadedImage} resizeMode="cover" />
              )}
              <TouchableOpacity onPress={() => handleImageUpload('aadhar')}>
                <Feather name="upload" size={28} color={color.PRIMARY_LIGHT} style={{ marginBottom: 10 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: highlightedFields.includes('serviceLocation') ? 'red' : color.PRIMARY }]}>
                Service Location{highlightedFields.includes('serviceLocation') && ' *'}:
              </Text>
              <TextInput
                style={[styles.input, highlightedFields.includes('serviceLocation') && styles.highlightedInput]}
                placeholder="Enter Service Location"
                value={serviceLocation}
                onChangeText={(text) => {
                  setServiceLocation(text);
                  setHighlightedFields([]);
                }}
              />
            </View>
            <Button title="Submit" onPress={handleRegister} />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    margin: 10,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  imageUploadContainer: {
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'outfit',
  },
  input: {
    borderBottomWidth: 2,
    padding: 8,
    borderColor: color.PRIMARY_LIGHT,
    color: color.PRIMARY
  },
  highlightedInput: {
    borderColor: 'red',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 5,
  },
  phno: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});

export default RegistrationForm;
