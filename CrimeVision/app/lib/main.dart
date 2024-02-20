import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'home_page.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'crimevision', home: IntroPage());
  }
}



class IntroPage extends StatelessWidget {
  const IntroPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      
      
      body: Column(
        children: [ 
          Padding(
            padding: const EdgeInsets.only(left: 80.0, right: 80.0, bottom: 40.0, top: 160.0),
            child: Image.asset('images/cvlogo.png'),
          ),
            Padding(
            padding: const EdgeInsets.all(25.0),
            child: Text(
              'Empower Vigilance, Report with Confidence ',
              textAlign: TextAlign.center,
              style: GoogleFonts.notoSerif(
                fontSize: 36,
                fontWeight: FontWeight.bold,
              )
            ),
          ),

          const SizedBox(height: 24,),

          Text(
            '– Your City, Your Safety, Your Crime Watch Companion!',
            style: TextStyle(color: Colors.grey[600]),
          ),

          const Spacer(),
          GestureDetector(
            onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(
                builder: (context){
                  return const HomePage();
            })),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.deepPurple,
                borderRadius: BorderRadius.circular(10)
              ),
              padding: const EdgeInsets.all(20.0),
              child: const Text(
                'Get Started',
                style: TextStyle(
                    color: Colors.white
                ),
              ),
            ),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}