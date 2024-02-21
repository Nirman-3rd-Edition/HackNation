import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:opti_z/screens/truck_list.dart';
import 'package:http/http.dart' as http;

class AddTruck extends StatefulWidget {
  const AddTruck({super.key});

  @override
  _AddTruckState createState() => _AddTruckState();
}

class _AddTruckState extends State<AddTruck> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _truckNameController = TextEditingController();
  final TextEditingController _raspberryPiIdController =
      TextEditingController();
  final TextEditingController _registrationNumberController =
      TextEditingController();

  Future<void> _saveTruck() async {
    // Validate the form
    if (!_formKey.currentState!.validate()) {
      return;
    }

    try {
      // Get the user ID of the current logged-in user
      String? userId = FirebaseAuth.instance.currentUser?.uid;

      if (userId != null) {
        DocumentSnapshot userSnapshot = await FirebaseFirestore.instance
            .collection('truckowners')
            .doc(userId)
            .get();

        String companyName = userSnapshot.get('companyName');
        print(companyName);

        // Save truck information to Firestore
        await FirebaseFirestore.instance
            .collection('truckowners')
            .doc(userId)
            .collection('trucklist')
            .add({
          'truckName': _truckNameController.text,
          'raspberryPiId': _raspberryPiIdController.text,
          'registrationNumber': _registrationNumberController.text,
        });

        await _sendHttpRequest(companyName);
      } else {
        // Handle case where user is not logged in
        print('User is not logged in.');
      }
    } catch (error) {
      // Handle error
      print('Error saving truck: $error');
    }
  }

  Future<void> _sendHttpRequest(String companyName) async {
    try {
      // Get the values from the controllers
      String raspberryPiId = _raspberryPiIdController.text;
      String registrationNumber = _registrationNumberController.text;
      String mobileNumber = "1234";

      const apiUrl =
          'https://logimasterssilicon.onrender.com/api/fleetregistration/';

      // Prepare the request body

      final requestBody = jsonEncode({
        "companyName": companyName,
        "hardware_id": raspberryPiId,
        "registration_no": registrationNumber,
        "mobile_no": mobileNumber,
      });

      // Send POST request to the Django backend
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: requestBody,
      );

      // Check if the request was successful
      if (response.statusCode == 201) {
        print('Truck registration successful.');
        _truckNameController.clear();
        _raspberryPiIdController.clear();
        _registrationNumberController.clear();

        // Navigate to TruckScreen
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const TruckScreen()),
        );
      } else {
        print('Failed to register truck: ${response.statusCode}');
      }
    } catch (error) {
      // Handle error
      print('Error sending HTTP request: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Truck'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _truckNameController,
                decoration: const InputDecoration(labelText: 'Truck Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter truck name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _raspberryPiIdController,
                decoration: const InputDecoration(labelText: 'Raspberry Pi ID'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter Raspberry Pi ID';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _registrationNumberController,
                decoration:
                    const InputDecoration(labelText: 'Registration Number'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter registration number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _saveTruck();
                  }
                },
                child: const Center(child: Text('Save Truck')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
