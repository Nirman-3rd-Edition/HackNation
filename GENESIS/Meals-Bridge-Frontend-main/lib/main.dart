import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:meals_bridge_frontend/check_session.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    // Create a MaterialColor from the primary color
    MaterialColor primarySwatch = MaterialColor(0xFF04FC10, {
      50: Color(0xFF04FC10),
      100: Color(0xCB04FC10),
      200: Color(0xA304FC10),
      300: Color(0x6604FC10),
      400: Color(0x5104FC10),
      500: Color(0x3404FC10),
      600: Color(0x1B04FC10),
      700: Color(0xD04FC10),
      800: Color(0xA04FC10),
    });

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MealsBridge',
      theme: ThemeData(
        primarySwatch: primarySwatch,
        textTheme: GoogleFonts.latoTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      // home: HomeScreenDistributor(),
      home: UserSession(),
    );
  }
}
