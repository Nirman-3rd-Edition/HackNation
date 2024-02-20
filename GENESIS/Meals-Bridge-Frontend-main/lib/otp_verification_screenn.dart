
import 'package:flutter/material.dart';
import 'package:meals_bridge_frontend/profile_setup.dart';
import 'package:meals_bridge_frontend/user_registration.dart';
import 'package:pinput/pinput.dart';

class OtpVerification extends StatefulWidget {
  final String phoneNumber;
  const OtpVerification({super.key, required this.phoneNumber,});

  @override
  State<OtpVerification> createState() => _OtpVerificationState();
}

class _OtpVerificationState extends State<OtpVerification> {
  TextEditingController otpController = TextEditingController();

  @override
  Widget build(BuildContext context) {

    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    String ph = widget.phoneNumber;
    String modifiedPhoneNumber = '';
    if (ph.length >= 10) {
      // Replace the first 8 digits with asterisks
      String asterisks = '*' * 8;
      modifiedPhoneNumber = '$asterisks${ph.substring(ph.length - 2)}';
    } else {
      // If the phone number is less than 10 digits, display it as is
      modifiedPhoneNumber = ph;
    }

    final defaultPinTheme = PinTheme(
      width: screenHeight * 0.08,
      height: screenHeight * 0.08,
      textStyle: TextStyle(
          fontSize: screenHeight * 0.025,
          color: Color.fromRGBO(121, 243, 127, 0.7411764705882353),
          fontWeight: FontWeight.w600),
      decoration: BoxDecoration(
        border: Border.all(color: Color.fromRGBO(234, 239, 243, 1)),
        borderRadius: BorderRadius.circular(screenHeight * 0.04),
      ),
    );

    final focusedPinTheme = defaultPinTheme.copyDecorationWith(
      border: Border.all(color: Color(0xFF04FC10)),
      borderRadius: BorderRadius.circular(8),
    );

    final submittedPinTheme = defaultPinTheme.copyWith(
      decoration: defaultPinTheme.decoration?.copyWith(
        color: Color.fromRGBO(234, 239, 243, 1),
      ),
    );

    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.black,
      body: Container(
        margin: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
        alignment: Alignment.center,
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Phone Verification",
                style: TextStyle(fontSize: screenHeight * 0.035, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              SizedBox(
                height: screenHeight * 0.02,
              ),
              Text(
                "OTP has been sent to +91 $modifiedPhoneNumber",
                style: TextStyle(
                  fontSize: screenHeight * 0.015,
                  color: Colors.white54
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: screenHeight * 0.02,
              ),
              Pinput(
                length: 6,
                // defaultPinTheme: defaultPinTheme,
                focusedPinTheme: focusedPinTheme,
                submittedPinTheme: submittedPinTheme,

                showCursor: true,
                onCompleted: (pin) => otpController.text=pin,
              ),
              SizedBox(
                height: screenHeight * 0.02,
              ),
              SizedBox(
                width: double.infinity,
                height: screenHeight * 0.06,
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        primary: Colors.white,
                        // shape: RoundedRectangleBorder(
                        //   borderRadius: BorderRadius.circular(screenHeight * 0.05),
                        // )
                    ),
                    onPressed: () async {
                      Navigator.push(
                        context,
                        PageRouteBuilder(
                          pageBuilder: (context, animation, secondaryAnimation) => ProgileSetup(phoneNumber: widget.phoneNumber,), // Assuming UserRegistration is the registration screen
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
                    child: const Text("Verify Phone Number", style: TextStyle(color: Color(0xFF63FF6A), fontWeight: FontWeight.bold),)),
              ),
              Row(
                children: [
                  TextButton(
                      onPressed: () {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (context) => UserRegistration()),
                        );
                      },
                      child: Text(
                        "Edit Phone Number ?",
                        style: TextStyle(color: Colors.white54, fontSize: screenHeight * 0.015,),
                      ))
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
