import 'package:flutter/material.dart';
import 'package:meals_bridge_frontend/donner/archive_screen.dart';

class DonationConfirm extends StatefulWidget {
  final String donationId;
  const DonationConfirm({super.key, required this.donationId});

  @override
  State<DonationConfirm> createState() => _DonationConfirmState();
}

class _DonationConfirmState extends State<DonationConfirm> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: const Text(
      //     "Donation Booked", overflow: TextOverflow.ellipsis,
      //     style: TextStyle(fontWeight: FontWeight.bold),
      //   ),
      //   centerTitle: true,
      //   automaticallyImplyLeading: false,
      //   backgroundColor: Colors.cyan,
      // ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(
              Icons.check_circle,
              color: Colors.green,
              size: MediaQuery.of(context).size.height*0.3,
            ),
            const SizedBox(height: 16.0),
            Text(
              "Donation ID: ${widget.donationId}",
              style: const TextStyle(fontSize: 18.0),
            ),

            const SizedBox(height: 16.0),
            const Text(
              "Waiting for the distributors...",
              style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 30.0),
            const Text(
              "For updates",
              style: TextStyle(fontSize: 15.0),
            ),
            const SizedBox(height: 1.0),
            ElevatedButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ArchiveScreen(),
                  ),
                );
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(Colors.black),
                shape: MaterialStateProperty.all(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
              ),
              child: const Padding(
                padding: EdgeInsets.only(top: 8, bottom: 8, right: 15, left: 15),
                child: Text(
                  "Check Here",
                  style: TextStyle(color: Colors.white, fontSize: 15.0),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
