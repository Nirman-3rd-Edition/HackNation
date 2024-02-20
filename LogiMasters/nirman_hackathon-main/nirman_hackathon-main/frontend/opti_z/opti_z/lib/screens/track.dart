import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:web_socket_channel/io.dart';
import 'dart:convert';

class TrackPage extends StatefulWidget {
  const TrackPage({Key? key}) : super(key: key);

  @override
  _TrackPageState createState() => _TrackPageState();
}

class _TrackPageState extends State<TrackPage> {
  late GoogleMapController mapController;
  double latitude = 0;
  double longitude = 0;

  final channel = IOWebSocketChannel.connect(
      'ws://logimasterssilicon.onrender.com/ws/fleettracking/123wert4/');

  @override
  void initState() {
    super.initState();
    streamListener();
  }

  streamListener() {
    channel.stream.listen((message) {
      try {
        print(message);
        Map<String, dynamic> data = jsonDecode(message);
        if (data.containsKey('text')) {
          Map<String, dynamic> textData = data['text'];
          String? latitudeString = textData['latitude'];
          String? longitudeString = textData['longitude'];

          if (latitudeString != null && longitudeString != null) {
            double? newLatitude = double.tryParse(latitudeString);
            double? newLongitude = double.tryParse(longitudeString);

            if (newLatitude != null && newLongitude != null) {
              setState(() {
                latitude = newLatitude;
                longitude = newLongitude;
              });

              // Move the camera position to the marker's location
              mapController.animateCamera(
                CameraUpdate.newLatLng(LatLng(latitude, longitude)),
              );
            } else {
              print('Failed to parse latitude or longitude as double.');
            }
          } else {
            print('Latitude or longitude is missing in the JSON message.');
          }
        } else {
          print('No "text" field found in the JSON message.');
        }
      } catch (e) {
        print('Error decoding JSON message: $e');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        shadowColor: Colors.transparent,
      ),
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: LatLng(latitude, longitude),
              zoom: 20,
            ),
            markers: {
              Marker(
                markerId: MarkerId('currentLocation'),
                position: LatLng(latitude, longitude),
              ),
            },
            onMapCreated: (controller) {
              mapController = controller;
            },
          ),
          Positioned(
            top: 20,
            left: 20,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Latitude: $latitude',
                  style: const TextStyle(
                      fontSize: 20, color: Color.fromARGB(255, 1, 1, 1)),
                ),
                const SizedBox(height: 10),
                Text(
                  'Longitude: $longitude',
                  style: const TextStyle(
                      fontSize: 20, color: Color.fromARGB(255, 4, 4, 4)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    channel.sink.close();
    super.dispose();
  }
}
