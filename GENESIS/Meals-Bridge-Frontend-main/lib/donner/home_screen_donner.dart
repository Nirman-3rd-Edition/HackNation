import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:meals_bridge_frontend/donner/donate_screen.dart';

class HomeScreenDonner extends StatefulWidget {
  const HomeScreenDonner({Key? key}) : super(key: key);

  @override
  State<HomeScreenDonner> createState() => _HomeScreenDonnerState();
}

class _HomeScreenDonnerState extends State<HomeScreenDonner> {

  late GoogleMapController googleMapController;

  static const CameraPosition initialCameraPosition = CameraPosition(target: LatLng(37.42796133580664, -122.085749655962), zoom: 14);

  // Set<Marker> markers = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.black,
      body: Stack(
        children: [

          // GoogleMap(
          //   initialCameraPosition: initialCameraPosition,
          //   // markers: markers,
          //   zoomControlsEnabled: false,
          //   mapType: MapType.normal,
          //   onMapCreated: (GoogleMapController controller) {
          //     googleMapController = controller;
          //   },
          // ),

          // Circular Avatar at the top left corner
          Positioned(
            top: MediaQuery.of(context).size.height*0.05,
            left: 20,
            child: Container(
              decoration: BoxDecoration(
                color: Color(0xFF04FC10),
                borderRadius: BorderRadius.circular(50),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black12.withOpacity(0.2),
                    spreadRadius: 2,
                    blurRadius: 10,
                    offset: Offset(0, 3),
                  ),
                ],
              ),
              child: CircleAvatar(
                radius: 25,
                backgroundImage: AssetImage('assets/profile.jpg'), // Add your image path
              ),
            ),
          ),

          // Your main content goes here

          // Bottom Navigation Bar
          Positioned(
            bottom: 30, // Adjust this value to set the height from the bottom
            left: 30,
            right: 30,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Container(
                decoration: BoxDecoration(
                  color: Color(0xFF04FC10),
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
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              IconButton(
                                icon: Icon(CupertinoIcons.home, color: Colors.white, size: 38,),
                                onPressed: () {
                                  // Add your home icon functionality here
                                },
                              ),
                              Text('Home', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                        SizedBox(width: MediaQuery.of(context).size.width*0.05,),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 5),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              IconButton(
                                icon: Icon(Icons.timelapse, color: Colors.white, size: 40,),
                                onPressed: () {
                                  // Add your archive icon functionality here
                                },
                              ),
                              Text('Archives', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            bottom: MediaQuery.of(context).size.height*0.06, // Adjust this value based on your design
            left: MediaQuery.of(context).size.width*0.42,
            child: Column(
              children: [
                Container(
                  height: 60,
                  width: 60,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white,
                  ),
                  child: IconButton(
                    icon: Icon(CupertinoIcons.cube_box, color: Color(0xFF04FC10), size: 40,),
                    onPressed: () {
                      Navigator.push(
                        context,
                        PageRouteBuilder(
                          pageBuilder: (context, animation, secondaryAnimation) => DonateScreen(), // Assuming UserRegistration is the registration screen
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
                ),
                Text('Donate', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
