import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:meals_bridge_frontend/donner/track_screen.dart';

import '../Services/shared_preference.dart';
import '../config.dart';
import 'bottom_nav_bar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class ArchiveScreen extends StatefulWidget {
  const ArchiveScreen({super.key});

  @override
  State<ArchiveScreen> createState() => _ArchiveScreenState();
}

class _ArchiveScreenState extends State<ArchiveScreen> {

  int totalOrders = 1;
  bool isLoading = false;
  List<Order> orders = [];

  @override
  void initState() {
    super.initState();
    setState(() {
      isLoading = true;
    });
    fetchData().then((data) {
      setState(() {
        orders = data;
      });
    });
  }

  Future<List<Order>> fetchData() async {
    try {
      String? uid = await SharedPreferenceService.getUidFromLocalStorage();
      if (uid != null) {
        var response = await http.get(Uri.parse('${Config.allOrdersUrl}/$uid'));
        if (response.statusCode == 200) {
          List<dynamic> data = json.decode(response.body);
          List<Order> orders = data.map((item) => Order.fromJson(item)).toList();
          setState(() {
            isLoading = false;
          });
          return orders;
        } else {
          throw Exception('Failed to load data');
        }
      }
    } catch (e) {
      print('Error fetching data: $e');
      throw Exception('Failed to load data');
    }

    // Add a return statement here to satisfy the return type.
    return [];
  }



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
                CircularProgressIndicator(color: Color(0xFF04FC10)),
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
                    orders.length,
                        (index) {
                      Order order = orders[index];
                      return CardWidget(
                        orderId: order.orderId,
                        statusVariable: order.status ? 1 : 0,
                        foodNames: order.foodNames,
                        quantity: order.quantity,
                        date: order.date,
                        reciveruid: order.reciveruid,
                      );
                    },
                  ).reversed.toList(),
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
  final List<String> foodNames;
  final List<String> quantity;
  final String date;
  final String? reciveruid;

  CardWidget({
    required this.orderId,
    required this.statusVariable,
    required this.foodNames,
    required this.quantity,
    required this.date,
    required this.reciveruid
  });
  @override
  _CardWidgetState createState() => _CardWidgetState();
}

class _CardWidgetState extends State<CardWidget> {
  @override
  Widget build(BuildContext context) {
    // Create a date formatter with the desired format
    final DateFormat dateFormat = DateFormat('yyyy-MM-dd');

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
                Text("Donation ID : ${widget.orderId}", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Container(
                  height: 30.0,
                  child: PopupMenuButton(
                    icon: Icon(Icons.more_vert),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    itemBuilder: (BuildContext context) {
                      return [
                        PopupMenuItem(
                          value: 'track',
                          child: Text('Track'),
                        ),
                      ];
                    },
                    onSelected: (String value) {
                      if (value == 'track') {
                        // Check if reciveruid is not null
                        if (widget.reciveruid != null && widget.reciveruid != '') {
                          // Navigate to TrackScreen and pass the reciveruid
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TrackScreen(reciveruid: widget.reciveruid!),
                            ),
                          );
                        } else {
                          // Show toast message if reciveruid is null or empty
                          Fluttertoast.showToast(
                            msg: "Distributor is finding you",
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.BOTTOM,
                          );
                        }
                      }
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 10.0),
            Divider(
              height: 2,
              color: Colors.black12,
            ),
            SizedBox(height: 10.0),
            Text(
              widget.statusVariable == 0 ? "Let Distributor accept" : "Distributor Found",
              style: TextStyle(
                color: widget.statusVariable == 0 ? Colors.red : Colors.green,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            SizedBox(height: 10.0),
            Column(
              children: List.generate(
                widget.foodNames.length,
                    (index) => Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(widget.foodNames[index]),
                    Text('Quantity: ${widget.quantity[index]}'),
                  ],
                ),
              ),
            ),
            SizedBox(height: 10.0),
            // Format the date using dateFormat
            Text('Date: ${dateFormat.format(DateTime.parse(widget.date))}'),
          ],
        ),
      ),
    );
  }
}

class Order {
  final String orderId;
  final bool status;
  final List<String> foodNames;
  final List<String> quantity;
  final String date;
  final String? reciveruid; // Make reciveruid nullable

  Order({
    required this.orderId,
    required this.status,
    required this.foodNames,
    required this.quantity,
    required this.date,
    this.reciveruid, // Make reciveruid nullable
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      orderId: json['oid'],
      status: json['status'],
      foodNames: List<String>.from(json['foodname']),
      quantity: List<String>.from(json['quantity']),
      date: json['date'],
      reciveruid: json['reciveruid'],
    );
  }
}
