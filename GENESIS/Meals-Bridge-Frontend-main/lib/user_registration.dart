import 'package:flutter/material.dart';
import 'package:intl_phone_field/country_picker_dialog.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:meals_bridge_frontend/otp_verification_screenn.dart';

class UserRegistration extends StatefulWidget {
  const UserRegistration({super.key});

  @override
  State<UserRegistration> createState() => _UserRegistrationState();
}

class _UserRegistrationState extends State<UserRegistration> {
  double _animationValue = 1.0; // Variable to control the animation
  late TextEditingController _phoneNumberController= TextEditingController();
  // Future<void> initializeFirebase() async {
  //   await Firebase.initializeApp();
  //   // _firestore = FirebaseFirestore.instance;
  // }

  @override
  void initState() {
    super.initState();
    // initializeFirebase();
    // Start the animation when the widget is created
    startAnimation();
  }

  // Function to start the animation
  void startAnimation() async {
    // Delay the animation for 500 milliseconds
    await Future.delayed(Duration(milliseconds: 100));
    setState(() {
      _animationValue = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: <Widget>[
          CustomScrollView(
            slivers: <Widget>[
              SliverAppBar(
                expandedHeight: MediaQuery.of(context).size.height * 0.6,
                backgroundColor: Colors.black,
                flexibleSpace: FlexibleSpaceBar(
                  background: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage('assets/bg.jpg'),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.bottomRight,
                          colors: [
                            Colors.black,
                            Colors.black.withOpacity(.2),
                          ],
                        ),
                      ),
                      child: Padding(
                        padding: EdgeInsets.only(left: MediaQuery.of(context).size.width * 0.06, bottom: MediaQuery.of(context).size.height * 0.17),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: <Widget>[
                            TweenAnimationBuilder(
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeInOut,
                              tween: Tween<double>(begin: 1, end: _animationValue),
                              builder: (context, value, child) {
                                return Transform.translate(
                                  offset: Offset(
                                      0, value * MediaQuery.of(context).size.height),
                                  child: Opacity(
                                    opacity: 1 - value,
                                    child: child,
                                  ),
                                );
                              },
                              child: Text(
                                "Welcome to",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 40,
                                ),
                              ),
                            ),
                            TweenAnimationBuilder(
                              duration: const Duration(milliseconds: 600),
                              curve: Curves.easeInOut,
                              tween: Tween<double>(begin: 1, end: _animationValue),
                              builder: (context, value, child) {
                                return Transform.translate(
                                  offset: Offset(
                                      0, value * MediaQuery.of(context).size.height),
                                  child: Opacity(
                                    opacity: 1 - value,
                                    child: child,
                                  ),
                                );
                              },
                              child: Text(
                                "MealsBridge",
                                style: TextStyle(
                                  color: Color(0xFF04FC10),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 40,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              )
            ],
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: EdgeInsets.only(bottom: MediaQuery.of(context).size.height * 0.2),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  // Remove Google Sign-in Button
                  // Remove Facebook Sign-in Button

                  // Add PhoneNumberField
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20.0),
                    child: TweenAnimationBuilder(
                      // Adjust animation duration as needed
                      duration: const Duration(milliseconds: 500),
                      curve: Curves.easeInOut,
                      tween: Tween<double>(begin: 1, end: _animationValue),
                      builder: (context, value, child) {
                        return Transform.translate(
                          offset: Offset(0, value * MediaQuery.of(context).size.height),
                          child: Opacity(
                            opacity: 1 - value,
                            child: child,
                          ),
                        );
                      },
                      child: FractionallySizedBox(
                        widthFactor: 0.97,
                        child: IntlPhoneField(
                          controller: _phoneNumberController,
                          dropdownTextStyle: TextStyle(color: Colors.white),
                          dropdownIcon: Icon(Icons.arrow_drop_down_outlined, color: Color(0xFF04FC10),),
                          decoration: InputDecoration(
                            // labelText: 'Phone Number',
                            hintText: 'Phone Number',
                            hintStyle: TextStyle(color: Colors.white54),
                            enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Color(0xFF04FC10)), // Border color when not focused
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Color(0xFF04FC10)), // Border color when focused
                            ),
                            fillColor: Colors.black87, // Background color
                            filled: true,

                          ),
                          style: TextStyle(color: Colors.white), // Text color of the input number
                          cursorColor: Colors.white, // Cursor color
                          initialCountryCode: 'IN',
                          pickerDialogStyle: PickerDialogStyle(
                            listTileDivider: Divider(
                              color: Colors.white,
                            ),
                            backgroundColor: Colors.black54,
                            countryCodeStyle: TextStyle(color: Colors.white), // Set text color of the country code
                            countryNameStyle: TextStyle(color: Colors.white),
                            searchFieldCursorColor: Colors.white,
                            searchFieldInputDecoration: InputDecoration(
                              labelText: "Search Country",
                              labelStyle: TextStyle(color: Colors.white),
                              iconColor: Colors.white,
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.white), // Border color when focused
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.white), // Border color when not focused
                              ),

                            ),
                          ),
                          onChanged: (phone) {
                            // Handle phone number changes
                          },
                        ),
                      )
                    ),
                  ),
                  // Add CONTINUE Button
                  TweenAnimationBuilder(
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.easeInOut,
                    tween: Tween<double>(begin: 1, end: _animationValue),
                    builder: (context, value, child) {Color(0xFF04FC10);
                      return Transform.translate(
                        offset: Offset(0, value * MediaQuery.of(context).size.height),
                        child: Opacity(
                          opacity: 1 - value,
                          child: child,
                        ),
                      );
                    },
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          PageRouteBuilder(
                            pageBuilder: (context, animation, secondaryAnimation) => OtpVerification(phoneNumber: _phoneNumberController.text), // Assuming UserRegistration is the registration screen
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
                        backgroundColor: Colors.white,
                        elevation: 8,
                        shadowColor: const Color(0xFF63FF6A),
                      ),
                      child: SizedBox(
                        width: 0.8 * MediaQuery.of(context).size.width, // Set the width to 0.8 times the screen width
                        height: 0.065 * MediaQuery.of(context).size.height,
                        child: Center(
                          child: Text(
                            'CONTINUE',
                            style: TextStyle(color: Color(0xFF04FC10), fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.only(
                bottom: 20.0,
                left: 20.0,
                right: 20.0,
              ),
              child: TweenAnimationBuilder(
                duration: const Duration(milliseconds: 900),
                curve: Curves.easeInOut,
                tween: Tween<double>(begin: 1, end: _animationValue),
                builder: (context, value, child) {
                  return Transform.translate(
                    offset: Offset(
                      0,
                      value * MediaQuery.of(context).size.height,
                    ),
                    child: Opacity(
                      opacity: 1 - value,
                      child: child,
                    ),
                  );
                },
                child: Padding(
                  padding: EdgeInsets.only(bottom: MediaQuery.of(context).size.height*0.05),
                  child: Text(
                    "By signing in, you agree to our Terms and Conditions",
                    style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
