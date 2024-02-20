import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:meals_bridge_frontend/donner/donate_screen.dart';

import 'bottom_nav_bar.dart';

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
            child: BottomNavigationBarWidget(),
          ),
        ],
      ),
    );
  }
}
