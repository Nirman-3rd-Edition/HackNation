import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../config.dart';

class TrackScreen extends StatefulWidget {

  final String reciveruid;

  const TrackScreen({super.key, required this.reciveruid});

  @override
  State<TrackScreen> createState() => _TrackScreenState();
}

class _TrackScreenState extends State<TrackScreen> {

  String receiverName = "";
  String receiverPhone = "";
  bool isLoading = false; // Added isLoading variable

  @override
  void initState() {
    super.initState();
    setState(() {
      isLoading = true;
    });
    receiverDetails(widget.reciveruid);
  }

  Future<void> receiverDetails(String receiverId) async {
    try {
      final response = await http.get(Uri.parse('${Config.fetchUserUrl}/$receiverId'));
      print(response.body);

      if (response.statusCode == 200) {
        final List<dynamic> responseDataList = json.decode(response.body);

        if (responseDataList.isNotEmpty) {
          final Map<String, dynamic> responseData = responseDataList.first;

          // Assign values to variables
          setState(() {
            receiverName = responseData['name'] ?? "";
            receiverPhone = responseData['phone'] ?? "";
            isLoading = false; // Set isLoading to false after successful fetch
          });
        } else {
          // Handle the case where the response is empty or not in the expected format
          print('Invalid response format');
          isLoading = false; // Set isLoading to false in case of an error
        }
      } else {
        // Handle error
        print('Failed to fetch receiver data details ${response.statusCode}');
        isLoading = false; // Set isLoading to false in case of an error
      }
    } catch (e) {
      // Handle error
      print('Error: $e');
      isLoading = false; // Set isLoading to false in case of an error
    }
  }


  Future<void> _dialNumber(String phoneNumber) async {
    final Uri launchUri = Uri(
      scheme: 'tel',
      path: phoneNumber,
    );
    await launchUrl(launchUri);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Track Screen', style: TextStyle(color: Colors.white),),
        backgroundColor: Colors.cyan,
      ),
      body: isLoading
          ? Center(
        child: Container(
          width: 200,
          height: 150,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                spreadRadius: 3,
                blurRadius: 10,
                offset: Offset(0, 3),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(color: Colors.cyan,),
              SizedBox(height: 10),
              Text('Please wait...'),
            ],
          ),
        ),
      )
          : Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/track.jpg',
              width: 200.0,
              height: 200.0,
            ),
            SizedBox(height: 20.0),
            Text(
              "Mr. $receiverName",
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20.0),
            Text(
              "Your phlebotomist is on the way.",
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20.0),
            ElevatedButton.icon(
              onPressed: () {
                _dialNumber(receiverPhone);
              },
              icon: Icon(Icons.phone, color: Colors.white),
              label: Text('Call your phlebo', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                primary: Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
