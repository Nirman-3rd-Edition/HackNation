import 'dart:async';
//import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

const String googleApiKey = "AIzaSyDuhrAK2SSjkQtVeKxFLcEP-4pQiZeS5-w";

class TrackingPage extends StatefulWidget {
  const TrackingPage({Key? key}) : super(key: key);

  @override
  State<TrackingPage> createState() => TrackingPageState();
}

class TrackingPageState extends State<TrackingPage> {
  final Completer<GoogleMapController> _controller = Completer();

  static const LatLng sourceLocation =
      LatLng(20.350327751494554, 85.80576782470311);
//20.350327751494554, 85.80576782470311
  static const LatLng destination = LatLng(20.3577406448761, 85.81776325880136);
  //20.3577406448761, 85.81776325880136
  static const LatLng customMarker =
      LatLng(20.350605474234424, 85.80635606798474);
  //20.350605474234424, 85.80635606798474

  List<LatLng> polylineCoordinates = [];

  LocationData? currentLocation;

  BitmapDescriptor sourceIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor currentLocationIcon = BitmapDescriptor.defaultMarker;

  void getCurrentLocation() async {
    Location location = Location();

    location.getLocation().then(
      (location) {
        currentLocation = location;
      },
    );

    GoogleMapController googleMapController = await _controller.future;

    location.onLocationChanged.listen((newLoc) {
      currentLocation = newLoc;

      googleMapController.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
            zoom: 18,
            target: LatLng(
              newLoc.latitude!,
              newLoc.longitude!,
            ),
          ),
        ),
      );

      setState(() {});
    });
  }

  Future<void> getPolyPoints() async {
    PolylinePoints polylinePoints = PolylinePoints();

    // Fetch polyline points
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      googleApiKey, // Make sure you have your API key here
      PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
      PointLatLng(destination.latitude, destination.longitude),
    );

    if (result.points.isNotEmpty) {
      result.points.forEach(
        (PointLatLng point) {
          polylineCoordinates.add(LatLng(point.latitude, point.longitude));
        },
      );

      setState(() {});
    }
  }

  void setCustomMarkerIcon() {
    BitmapDescriptor.fromAssetImage(
            ImageConfiguration.empty, "assets/Pin_source.png")
        .then(
      (icon) {
        sourceIcon = icon;
      },
    );
    BitmapDescriptor.fromAssetImage(
            ImageConfiguration.empty, "assets/Pin_destination.png")
        .then(
      (icon) {
        destinationIcon = icon;
      },
    );
    BitmapDescriptor.fromAssetImage(
            ImageConfiguration.empty, "assets/Pin_current_location.png")
        .then(
      (icon) {
        currentLocationIcon = icon;
      },
    );
  }

  @override
  void initState() {
    setCustomMarkerIcon();
    getCurrentLocation();
    super.initState();
    getPolyPoints();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("      ALERTIFY",
            style: GoogleFonts.blackOpsOne(
                color: Colors.black,
                fontSize: 40,
                fontWeight: FontWeight.w500)),
      ),
      body: currentLocation == null
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(height: 20), // Add spacing between text and loader
                  CircularProgressIndicator(),
                  SizedBox(height: 20),
                  Text(
                    "Loading...",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ), // Circular loader
                ],
              ),
            )
          : SafeArea(
              child: GoogleMap(
                  compassEnabled: true,
                  myLocationButtonEnabled: true,
                  myLocationEnabled: true,
                  mapType: MapType.satellite, // Specify the map type
                  initialCameraPosition: CameraPosition(
                    target: LatLng(currentLocation!.latitude!,
                        currentLocation!.longitude!),
                    zoom: 16,
                  ),
                  polylines: {
                    Polyline(
                      polylineId: const PolylineId("route"),
                      color: Colors.red,
                      width: 5,
                      points: polylineCoordinates,
                    ),
                  },
                  markers: {
                    Marker(
                      markerId: const MarkerId("currentLocation"),
                      icon: currentLocationIcon,
                      position: LatLng(currentLocation!.latitude!,
                          currentLocation!.longitude!),
                    ),
                    const Marker(
                      markerId: MarkerId("source"),
                      infoWindow: InfoWindow(title: 'Source'),
                      //     icon: sourceIcon,
                      position: sourceLocation,
                    ),
                    const Marker(
                      markerId: MarkerId("destination"),
                      infoWindow: InfoWindow(title: 'Safe Zone'),
                      // icon: destinationIcon,
                      position: destination,
                    ),
                    const Marker(
                      markerId: MarkerId("customMarker"),
                      draggable: true,
                      infoWindow: InfoWindow(title: 'eg.'),
                      // icon: destinationIcon,
                      position: customMarker,
                    ),
                  },
                  onMapCreated: (googleMapController) {
                    _controller.complete(googleMapController);
                  }),
            ),
    );
  }
}
