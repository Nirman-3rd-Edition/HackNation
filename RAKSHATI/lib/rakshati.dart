import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:location/location.dart';


void main() {
  runApp(SOSApp());
}

class SOSApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('SOS App'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () => _callNumber('911'), // Police
                child: Text('Call Police'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => _callNumber('911'), // Emergency Home
                child: Text('Call Emergency Home'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => _callNumber('911'), // Ambulance
                child: Text('Call Ambulance'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _getCurrentLocation,
                child: Text('Get Current Location'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => _openMap(0, 0), // Open Map
                child: Text('Open Map'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _callNumber(String number) async {
    String url = 'tel:$number';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  
  }

  void _getCurrentLocation() async {
    var location = Location();
    try {
      var userLocation = await location.getLocation();
      print('Latitude: ${userLocation.latitude}, Longitude: ${userLocation.longitude}');
      // You can display the location on the UI or use it for further processing
    } catch (e) {
      print('Could not get the location: $e');
    }
  }

  void _openMap(double lat, double lng) async {
    String url = 'https://www.google.com/maps/search/?api=1&query=$lat,$lng';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not open map';
      }
  }
  
