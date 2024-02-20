import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class DonateScreen extends StatefulWidget {
  const DonateScreen({super.key});

  @override
  State<DonateScreen> createState() => _DonateScreenState();
}

class _DonateScreenState extends State<DonateScreen> {
  List<CardData> cardsData = [];

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
          onPressed: () {
            // Handle donate action
          },
          label: Text(
            'Donate',
            style: TextStyle(color: Color(0xFF04FC10), fontWeight: FontWeight.bold),
          ),
          icon: Icon(Icons.upload, color: Color(0xFF04FC10)),
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
