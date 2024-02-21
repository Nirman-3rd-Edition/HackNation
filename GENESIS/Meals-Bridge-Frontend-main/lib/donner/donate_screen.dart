import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:meals_bridge_frontend/Services/shared_preference.dart';
import 'package:meals_bridge_frontend/donner/donation_confirmation.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../config.dart';

class DonateScreen extends StatefulWidget {
  const DonateScreen({super.key});

  @override
  State<DonateScreen> createState() => _DonateScreenState();
}

class _DonateScreenState extends State<DonateScreen> {
  List<CardData> cardsData = [];
  bool isFetchingLocation = true;
  double? lat;
  double? long;
  String? address;
  List<String> locationData = [];
  String oid = '';

  @override
  void initState() {
    super.initState();
    getLatLong();
  }

  Future<void> getLatLong() async {
    setState(() {
      isFetchingLocation = true;
    });

    Position position;
    try {
      position = await _determinePosition();
      lat = position.latitude;
      long = position.longitude;
      await updateText();

      // Store lat and long in the array
      locationData = [lat.toString(), long.toString()];
    } catch (error) {
      print("Error $error");
    } finally {
      // Existing code...
    }
  }


  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw 'Location services are disabled.';
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.deniedForever) {
        throw 'Location permissions are permanently denied, we cannot request permissions.';
      }

      if (permission == LocationPermission.denied) {
        throw 'Location permissions are denied';
      }
    }
    return await Geolocator.getCurrentPosition();
  }

  Future<void> updateText() async {
    if (lat != null && long != null) {
      List<Placemark> placemarks = await placemarkFromCoordinates(lat!, long!);
      address =
      '${placemarks[0].street} ${placemarks[0].subLocality}, ${placemarks[0]
          .locality}, ${placemarks[0].administrativeArea}, PIN: ${placemarks[0]
          .postalCode}';
    }
  }

  Future<void> donateItems() async {
    try {
      String? uid = await SharedPreferenceService.getUidFromLocalStorage();

      if (uid != null) {
        List<String> foodNames = [];
        List<String> quantity = [];
        List<String> imagesBase64 = [];

        for (CardData cardData in cardsData) {
          foodNames.add(cardData.textField1Controller.text.trim());
          quantity.add(cardData.textField2Controller.text.trim());

          // Convert image to base64
          if (cardData.image != null) {
            List<int> imageBytes = await cardData.image!.readAsBytes();
            String base64Image = base64Encode(imageBytes);
            imagesBase64.add(base64Image);
          }
        }

        // Prepare the request body
        Map<String, dynamic> requestBody = {
          "uid": uid,
          "foodname": foodNames,
          "image": imagesBase64,
          "quantity": quantity,
          "location": address,
        };
        //
        // print(uid);
        // print(imagesBase64);
        // print(foodNames);
        // print(quantity);
        // print(address);

        // Make the API request
        var response = await http.post(
          Uri.parse(Config.donateUrl),
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonEncode(requestBody),
        );

        if (response.statusCode == 200) {
          // API call successful, handle the response as needed
          // Extract the oid from the response body
          Map<String, dynamic> responseBody = jsonDecode(response.body);
          String oid = responseBody['oid'];

          // Print the oid in the console
          print("OID: $oid");

          // Clear the cardsData list after successful donation
          setState(() {
            cardsData.clear();
          });

          await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => DonationConfirm(donationId: oid),
            ),
          );
        }
        else {
          // API call failed, show an error message
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Failed to donate items. Please try again.'),
            ),
          );
          print("API Error: ${response.statusCode} - ${response.body}");
        }
      }
    } catch (e) {
      print('Error donating items: $e');
      // Handle the error as needed
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 50),
            child: Text(
              'Add Items',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Expanded(
            child: ListView(
              children: [
                for (CardData cardData in cardsData)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
                    child: Container(
                      height: 0.3 * screenHeight,
                      child: Card(
                        elevation: 0,
                        color: Color(0xFF9DFCA3).withOpacity(0.2),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                          side: BorderSide(width: 1.0, color: Color(0xFF04FC10)),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Display the selected image with a custom aspect ratio
                            cardData.image != null
                                ? AspectRatio(
                              aspectRatio: 19 / 6,
                              child: Padding(
                                padding: const EdgeInsets.only(left: 10, right: 10),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(10.0),
                                  child: Image.file(
                                    cardData.image!,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            )
                                : Container(),
                            // Two text fields in a row
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: TextField(
                                        controller: cardData.textField1Controller,
                                        decoration: InputDecoration(
                                          labelStyle: TextStyle(color: Colors.black),
                                          labelText: 'Food Name',
                                          focusedBorder: OutlineInputBorder(
                                            borderSide: BorderSide(color: Colors.black, width: 1.0),
                                            borderRadius: BorderRadius.circular(10.0),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: TextField(
                                        controller: cardData.textField2Controller,
                                        decoration: InputDecoration(
                                          labelStyle: TextStyle(color: Colors.black),
                                          labelText: 'Quantity (in person)',
                                          focusedBorder: OutlineInputBorder(
                                            borderSide: BorderSide(color: Colors.black, width: 1.0),
                                            borderRadius: BorderRadius.circular(10.0),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
                  child: Container(
                    height: 0.3 * screenHeight,
                    child: Card(
                      elevation: 0,
                      color: Color(0xFF9DFCA3).withOpacity(0.2),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                        side: BorderSide(width: 1.0, color: Color(0xFF04FC10)),
                      ),
                      child: ListTile(
                        title: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Add', style: TextStyle(fontSize: 18, color: Colors.black45, fontWeight: FontWeight.bold)),
                            Icon(CupertinoIcons.add, size: 40, color: Colors.black,),
                          ],
                        ),
                        onTap: () {
                          _getImage();
                        },
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: Container(
        width: 0.4 * screenWidth,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.0),
          boxShadow: [
            BoxShadow(
              color: Color(0xFF9DFCA3), // Set your desired shadow color here
              spreadRadius: 1,
              blurRadius: 10,
              offset: Offset(0, 1), // Adjust the shadow offset as needed
            ),
          ],
        ),
        child: FloatingActionButton.extended(
          elevation: 0,
          backgroundColor: Colors.white,
          onPressed: () async {
            List<CardData> nonEmptyCards = cardsData
                .where((card) =>
            card.textField1Controller.text.trim().isNotEmpty &&
                card.textField2Controller.text.trim().isNotEmpty)
                .toList();

            if (nonEmptyCards.isNotEmpty) {
              await donateItems();

            } else {
              // Show an alert or snackbar to inform the user that at least one item is required.
              // You can customize this part based on your UI and error handling preferences.
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Please add at least one item before donating.'),
                ),
              );
            }
          },
          label: Text(
            'Donate',
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          ),
          icon: Icon(Icons.upload, color: Colors.black),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  Future<void> _getImage() async {
    final imagePicker = ImagePicker();
    final pickedFile = await imagePicker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        cardsData.add(CardData(
          image: File(pickedFile.path),
          textField1Controller: TextEditingController(),
          textField2Controller: TextEditingController(),
        ));
      });
    }
  }
}

class CardData {
  File? image;
  TextEditingController textField1Controller;
  TextEditingController textField2Controller;

  CardData({
    this.image,
    required this.textField1Controller,
    required this.textField2Controller,
  });
}
