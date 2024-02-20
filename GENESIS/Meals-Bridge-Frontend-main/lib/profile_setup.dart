
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import 'package:meals_bridge_frontend/donner/home_screen_donner.dart';

class ProgileSetup extends StatefulWidget {
  final String phoneNumber;
  const ProgileSetup({super.key, required this.phoneNumber,});

  @override
  State<ProgileSetup> createState() => _ProgileSetupState();
}

class _ProgileSetupState extends State<ProgileSetup> {

  String email = '';
  String userProfilePic = '';
  String userName = '';
  String uid = '';
  String phoneNumber = '';
  String selectedType = '';
  String selectedRole = '';
  // late bool isDarkMode;
  bool isFetchingLocation = true;
  late List<String> choices = [];

  // TextEditingController _phoneNumberController = TextEditingController();
  TextEditingController _nameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _addressController = TextEditingController();
  // File? _image;
  // late AuthService authService;
  // Define a boolean variable to track whether data is being fetched
  bool isLoading = false;
  double? lat;
  double? long;
  String? address;

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
    } catch (error) {
      print("Error $error");
    } finally {
      setState(() {
        isFetchingLocation = false;
      });
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

  Future _getImage(ImageSource source) async {
    try {
      final image = await ImagePicker().pickImage(source: source);
      if (image == null) return;

      File? img = File(image.path);
      img = await _cropImage(imageFile: img);

      if (img != null) {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return WillPopScope(
              onWillPop: () async => false, // Disable popping with back button
              child: Container(
                width: 200,
                height: 150,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      spreadRadius: 3,
                      blurRadius: 10,
                      offset: Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(color: Color(0xFF04FC10)),
                    SizedBox(height: 10),
                    Text('Please wait...'),
                  ],
                ),
              ),
            );
          },
        );
        // // Upload image to Firebase Cloud Storage
        // String imageName = DateTime.now().millisecondsSinceEpoch.toString(); // Generating a unique name for the image
        // firebase_storage.Reference ref =
        // firebase_storage.FirebaseStorage.instance.ref().child(imageName);
        //
        // firebase_storage.UploadTask uploadTask = ref.putFile(img);
        // firebase_storage.TaskSnapshot taskSnapshot = await uploadTask;

        // Get the download URL from the uploaded image
        // String imageUrl = await taskSnapshot.ref.getDownloadURL();

        setState(() {
          // userProfilePic = imageUrl; // Update the userProfilePic variable
        });
      }
      Navigator.of(context).pop();
    } on PlatformException catch (e) {
      print(e);
      Navigator.of(context).pop();
    }
  }


  Future<File?> _cropImage({required File imageFile}) async {
    CroppedFile? croppedImage =
    await ImageCropper().cropImage(sourcePath: imageFile.path);
    if(croppedImage == null) return null;
    return File(croppedImage.path);
  }


  void openImageBottomSheet() {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
      ),
      backgroundColor: Colors.transparent, // Set the background color to transparent
      builder: (BuildContext context) {
        return Stack(
          children: [
            // The blurred content of the background page
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5), // Adjust the sigma values for the blur effect
              child: Container(
                color: Colors.transparent,
              ),
            ),
            // The bottom sheet content
            Container(
              padding: EdgeInsets.all(screenWidth * 0.05),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Select Image Source',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: screenWidth * 0.06,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: screenWidth * 0.05),
                  ElevatedButton.icon(
                    onPressed: () {
                      // Send the image
                      _getImage(ImageSource.camera);
                      Navigator.pop(context);
                    },
                    icon: Icon(
                      CupertinoIcons.camera,
                      color: Colors.white,
                      size: screenWidth * 0.05,
                    ),
                    label: const Text('Camera', style: TextStyle(color: Colors.white, fontSize: 15)),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Colors.black),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(screenWidth * 0.15),
                        ),
                      ),
                      minimumSize: MaterialStateProperty.all<Size>(Size(screenHeight * 0.13, screenWidth * 0.13)),
                    ),
                  ),
                  SizedBox(height: screenHeight * 0.01),
                  ElevatedButton.icon(
                    onPressed: () {
                      // Send the image
                      _getImage(ImageSource.gallery);
                      Navigator.pop(context);
                    },
                    icon: Icon(CupertinoIcons.photo, color: Colors.white,
                        size: screenWidth * 0.05),
                    label: const Text('Gallery', style: TextStyle(color: Colors.white, fontSize: 15),),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(Colors.black),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(screenWidth * 0.15),
                        ),
                      ),
                      minimumSize: MaterialStateProperty.all<Size>(Size(screenHeight * 0.13, screenWidth * 0.13)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  void _showChoiceBottomSheet(BuildContext context, int c, String ctext) async {
    String? tempSelectedValue;

    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    // Adjust container height and text size based on screen width
    double containerHeight = screenWidth > 400 ? 400 : screenWidth * 0.9;
    double fontSize = screenWidth > 400 ? 18 : 16;

    tempSelectedValue = await showModalBottomSheet(
      backgroundColor: Colors.transparent,
      context: context,
      builder: (BuildContext context) {
        return Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(70)),
                color: Color(0xFF04FC10).withOpacity(0.5),
                border: Border.all(
                  style: BorderStyle.solid,
                  color: Color(0xFF04FC10),
                  width: MediaQuery.of(context).size.width * 0.01,
                ),
              ),
              height: 400,
              child: Padding(
                padding: const EdgeInsets.only(top: 40.0),
                child: CupertinoPicker(
                  scrollController: FixedExtentScrollController(initialItem: 3),
                  itemExtent: 50,
                  onSelectedItemChanged: (index) {
                    setState(() {
                      tempSelectedValue = choices[index];
                    });
                  },
                  children: choices.map((choice) {
                    return Container(
                      width: screenWidth > 400 ? 400 : screenWidth * 0.9,
                      padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.02),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.black, width:2),
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(100),
                      ),
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.04),
                        child: Center(
                          child: Text(
                            choice,
                            style: TextStyle(
                              fontSize: fontSize,
                              color: Colors.black,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            Positioned(
              bottom: screenHeight*0.005,
              left: screenWidth*0.1,
              right: screenWidth*0.1,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context, tempSelectedValue);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  side: BorderSide.none,
                  shape: const StadiumBorder(),
                ),
                child: const Text(
                  'OK',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
            ),
            Positioned(
              child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.15,
                width: MediaQuery.of(context).size.width,
                child: Center(
                  child: Text(
                    ctext,
                    style: const TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );

    if (tempSelectedValue != null) {
      if (c == 1) {
        setState(() {
          selectedType = tempSelectedValue!;
        });
      } else if (c == 2) {
        setState(() {
          selectedRole = tempSelectedValue!;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      // appBar: AppBar(
      //   backgroundColor: Colors.white,
      //   // leading: IconButton(
      //   //   onPressed: () {
      //   //     // Navigator.of(context).pushReplacement(
      //   //     //   MaterialPageRoute(
      //   //     //     builder: (context) => HomeScreen(),
      //   //     //   ),
      //   //     // );
      //   //   },
      //   //   icon: const Icon(
      //   //     Icons.arrow_back,
      //   //     color: Colors.black,
      //   //   ),
      //   // ),
      //   title: const Text(
      //     "Profile",
      //     style: TextStyle(
      //       color: Colors.black,
      //     ),
      //   ),
      //   centerTitle: true,
      // ),
      body: isLoading
          ? Center(
        child: Container(
          width: 200,
          height: 150,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                spreadRadius: 3,
                blurRadius: 10,
                offset: Offset(0, 3),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(color: Color(0xFF04FC10)),
              SizedBox(height: 10),
              Text('Please wait...'),
            ],
          ),
        ),
      )
          : Container(
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFF04FC10).withOpacity(0.5),
              Colors.white70,
              Colors.white70,
              Colors.white70,
              Color(0xFF04FC10).withOpacity(0.5)
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        padding: const EdgeInsets.only(left: 16, right: 16, top: 60, bottom: 16), // Adjust padding based on screen width
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            children: [
              Text("Profile", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 20),),
              const SizedBox(height: 30),
              Stack(
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.32, // Adjust width based on screen width
                    height: MediaQuery.of(context).size.width * 0.32,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.5), // Adjust borderRadius based on screen width
                      child: userProfilePic.isNotEmpty
                          ? Image.network(
                        userProfilePic,
                        fit: BoxFit.cover,
                      )
                          : Transform.scale(
                        scale: 7.0, // Adjust this value to increase or decrease the icon size
                        child: const Icon(CupertinoIcons.person_crop_circle_fill),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: CircleAvatar(
                      backgroundColor: Colors.white,
                      radius: MediaQuery.of(context).size.width * 0.05, // Adjust radius based on screen width
                      child: IconButton(
                        onPressed: () => openImageBottomSheet(),
                        color: Colors.black,
                        icon: const Icon(
                          Icons.camera_alt_outlined,
                          size: 20,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 15),
              Column(
                children: [
                  const SizedBox(height: 10),
                  TextField(
                    readOnly: true,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: 'Register as',
                      labelStyle: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      prefixIcon: const Icon(Icons.transgender_outlined),
                      prefixIconColor: Colors.black,
                    ),
                    controller: TextEditingController(text: selectedType),
                    onTap: () {
                      selectedType = '';
                      choices.clear();
                      choices = ["Indivisual", "Organisation"];
                      _showChoiceBottomSheet(context, 1, "Select Type");
                    },
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    readOnly: true,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: 'Role',
                      labelStyle: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      prefixIcon: const Icon(Icons.transgender_outlined),
                      prefixIconColor: Colors.black,
                    ),
                    controller: TextEditingController(text: selectedRole),
                    onTap: () {
                      selectedRole = '';
                      choices.clear();
                      choices = ["Donner", "Distributor"];
                      _showChoiceBottomSheet(context, 2, "Select Role");
                    },
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    readOnly: false,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: "Full Name",
                      labelStyle: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      prefixIcon: const Icon(Icons.person_2_outlined),
                      prefixIconColor: Colors.black,
                    ),
                    controller: TextEditingController(text: userName),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    readOnly: false,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25), // Adjust borderRadius based on screen width
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25), // Adjust borderRadius based on screen width
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: "Email-Id",
                      labelStyle: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      prefixIcon: const Icon(Icons.person_2_outlined),
                      prefixIconColor: Colors.black,
                    ),
                    controller: TextEditingController(text: email),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    readOnly: false,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.25),
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: 'Phone number',
                      labelStyle: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      prefixIcon: const Icon(Icons.phone),
                      prefixIconColor: Colors.black,
                    ),
                    controller: TextEditingController(text: widget.phoneNumber), // Use the _phoneNumberController here
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    readOnly: false,
                    cursorColor: Colors.black,
                    decoration: InputDecoration(
                      contentPadding: EdgeInsets.symmetric(
                          vertical: MediaQuery.of(context).size.width * 0.045),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                            MediaQuery.of(context).size.width * 0.25),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                            MediaQuery.of(context).size.width * 0.25),
                        borderSide: const BorderSide(
                          width: 2,
                          color: Colors.black,
                        ),
                      ),
                      labelText: "Address",
                      labelStyle: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                        fontSize: MediaQuery.of(context).size.width * 0.035,
                      ),
                      prefixIcon: const Icon(Icons.add_location),
                      prefixIconColor: Colors.black,
                      suffixIcon: FutureBuilder(
                        future: isFetchingLocation ? getLatLong() : null,
                        builder: (context, snapshot) {
                          if (snapshot.connectionState == ConnectionState.waiting) {
                            return Icon(Icons.my_location);
                          } else if (snapshot.hasError) {
                            return Icon(Icons.error);
                          } else {
                            return IconButton(
                              icon: const Icon(Icons.my_location),
                              onPressed: () {
                                if (address != null) {
                                  _addressController.text = address!;
                                }
                              },
                              color: Colors.black,
                            );
                          }
                        },
                      ),
                    ),
                    controller: _addressController,
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 42,
                    child: ElevatedButton(
                      onPressed: () {
                        // Add your logic here
                        Navigator.push(
                          context,
                          PageRouteBuilder(
                            pageBuilder: (context, animation, secondaryAnimation) => HomeScreenDonner(), // Assuming UserRegistration is the registration screen
                            transitionsBuilder: (context, animation, secondaryAnimation, child) {
                              const begin = Offset(0.0, 1.0);
                              const end = Offset.zero;
                              const curve = Curves.easeInOut;

                              var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                              var offsetAnimation = animation.drive(tween);

                              return SlideTransition(
                                position: offsetAnimation,
                                child: child,
                              );
                            },
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black,
                        side: BorderSide.none,
                        // shape: const StadiumBorder(),
                        minimumSize: Size(double.infinity, 70), // Set the height to 50 (adjust as needed)
                      ),
                      child: const Text(
                        "Save Profile",
                        style: TextStyle(color: Color(0xFF04FC10), fontSize: 20),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
