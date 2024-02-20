import 'package:flutter/material.dart';

import 'bottom_nav_bar.dart';

class ArchiveScreen extends StatefulWidget {
  const ArchiveScreen({super.key});

  @override
  State<ArchiveScreen> createState() => _ArchiveScreenState();
}

class _ArchiveScreenState extends State<ArchiveScreen> {

  int totalOrders = 1;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text(
      //     'Your Booking',
      //     // style: TextStyle(color: Colors.white),
      //   ),
      //   // centerTitle: true,
      //   backgroundColor: Colors.cyan,
      // ),
      body: Stack(
        children: [isLoading
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
                CircularProgressIndicator(color: Colors.cyan),
                SizedBox(height: 10),
                Text('Please wait...'),
              ],
            ),
          ),
        )
            : totalOrders == 0
            ? Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.calendar_month,
                size: 50.0,
                color: Colors.cyan,
              ),
              SizedBox(height: 20.0),
              Text(
                'No bookings yet',
                style: TextStyle(
                  fontSize: 18.0,
                  color: Colors.cyan,
                ),
              ),
            ],
          ),
        )
            : Padding(
              padding: const EdgeInsets.only(top: 50),
              child: ListView(
          physics: BouncingScrollPhysics(),
          padding: EdgeInsets.all(15.0),
          children: List.generate(
              totalOrders,
                  (index) {
                // final booking = bookings[index];
                return CardWidget(
                  // orderId: "Order ID : ${booking.id}",
                  // statusVariable: booking.phlebotomistId ?? 0,
                  // items: testIdToNameMap[booking.id] ?? [],
                  // totalBill: booking.mrp,
                  // timeSlot: booking.timeSlot,
                  orderId: "Order ID : 1234",
                  statusVariable: 0,
                  name: "Priyanshu",
                );
              },
          ).reversed.toList(), // Display cards in descending order
        ),
            ),
          // Add the BottomNavigationBarWidget
          Positioned(
            bottom: 30, // Adjust this value to set the height from the bottom
            left: 30,
            right: 30,
            child: BottomNavigationBarWidget(),
          ),
    ]
      ),
    );
  }
}

class CardWidget extends StatefulWidget {
  final String orderId;
  final int statusVariable;
  final String name;

  CardWidget({
    required this.orderId,
    required this.statusVariable,
    required this.name,
  });

  @override
  _CardWidgetState createState() => _CardWidgetState();
}

class _CardWidgetState extends State<CardWidget> {
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Padding(
        padding: EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(widget.orderId, style:  TextStyle(fontWeight: FontWeight.bold, fontSize: 16),),
              ],
            ),
            SizedBox(height: 10.0),
            Divider(
              height: 2,
              color: Colors.black12,
            ),
            SizedBox(height: 10.0),
            Text(
              widget.statusVariable == 0
                  ? "Let Distributor accept"
                  : "Distributor Found",
              style: TextStyle(
                color: widget.statusVariable == 0 ? Colors.red : Colors.green,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            SizedBox(height: 10.0),

            SizedBox(height: 10.0),
            Text('Time slot: ${widget.name}'),
          ],
        ),
      ),
    );
  }
}
