import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:meals_bridge_frontend/donner/donate_screen.dart';

import 'archive_screen.dart';
import 'home_screen_donner.dart';

class BottomNavigationBarWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Container(
        decoration: BoxDecoration(
          color: Color(0xFFFFFFFF),
          borderRadius: BorderRadius.circular(50),
          boxShadow: [
            BoxShadow(
              color: Color(0xFF63FF6A).withOpacity(0.6),
              spreadRadius: 2,
              blurRadius: 20,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          children: [
            // First and Third Icons Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: Icon(CupertinoIcons.home, color: Colors.black, size: 30,),
                        onPressed: () {
                          // Navigate to HomeScreenDonner when home icon is pressed
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => HomeScreenDonner()),
                          );
                        },
                      ),
                      Text('Home', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: Icon(CupertinoIcons.cube_box, color: Colors.black, size: 30,),
                        onPressed: () {
                          // Navigate to DonateScreen when donate icon is pressed
                          Navigator.push(
                            context,
                            PageRouteBuilder(
                              pageBuilder: (context, animation, secondaryAnimation) => DonateScreen(),
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
                      ),
                      Text('Donate', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: Icon(Icons.timelapse, color: Colors.black, size: 30,),
                        onPressed: () {
                          // Navigate to ArchiveScreen when archive icon is pressed
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => ArchiveScreen()),
                          );
                        },
                      ),
                      Text('Archives', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

