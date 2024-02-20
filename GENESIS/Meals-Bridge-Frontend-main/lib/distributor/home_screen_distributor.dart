import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:meals_bridge_frontend/distributor/order%20details.dart';


class HomeScreenDistributor extends StatefulWidget {
  const HomeScreenDistributor({Key? key}) : super(key: key);

  @override
  State<HomeScreenDistributor> createState() => _HomeScreenDistributor();
}

class _HomeScreenDistributor extends State<HomeScreenDistributor> {
  late Position _currentPosition;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    try {
      Position? position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: Duration(seconds: 5),
      );
      setState(() {
        _currentPosition = position!;
      });
    } catch (e) {
      print("Error: $e");
      // Handle the case when location cannot be obtained
      setState(() {
        // _currentPosition = Position(latitude: 0.0, longitude: 0.0);
      });
    }
  }


  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Column(
        children: [
          SizedBox(height: screenHeight * 0.025542784,),
          Row(
            children:[
              Container(
                padding: EdgeInsets.all(screenWidth * 0.038167939),
                alignment: Alignment.topLeft,
                child: CachedNetworkImage(
                  imageUrl: 'Image',
                  placeholder: (context, url) => CircleAvatar(
                    radius: screenWidth * 0.089058524,
                    backgroundColor: Colors.lightGreen,
                  ),
                  errorWidget: (context, url, error) => CircleAvatar(
                    radius: screenWidth * 0.089058524,
                    backgroundColor: Colors.lightGreen,
                  ),
                ),
              ),
              SizedBox(height: screenWidth * 0.025445293),
              Container(
                padding: EdgeInsets.all(16.0),
                alignment: Alignment.topLeft,
                child: Text(
                  '${_currentPosition?.latitude ?? 0.0}, ${_currentPosition?.longitude ?? 0.0}',
                  style: TextStyle(fontSize: 16.0),
                ),
              ),
            ]
          ),
          Center(child: Text('Active orders in nearby location', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),)),
          SizedBox(height: screenHeight * 0.006385696,),
          Expanded(
            child: ListView.builder(physics: BouncingScrollPhysics(),
              itemCount: 4, // Change this to the number of items in your list
              itemExtent: 180,
              itemBuilder: (BuildContext context, int index) {
                return MyCardView(
                  title: "XYZ",
                  imageUrl: "https://www.example.com/image.jpg",
                  distance: 4.5,
                  quantity: 7.9,
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: ClipRRect(
        borderRadius: BorderRadius.all(Radius.circular(100)),
        child: BottomNavigationBar(
          backgroundColor: Colors.lightGreenAccent,
          selectedItemColor: Colors.black54,
          unselectedItemColor: Colors.white,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: 'Settings',
            ),
          ],
          // onTap: (index) {
          //   // Handle navigation when a tab is tapped
          //   switch (index) {
          //     case 1:
          //       Navigator.push(
          //         context,
          //         MaterialPageRoute(builder: (context) => ..),
          //       );
          //       break;
          //   // Add cases for other tabs if needed
          //   }
          // },
        ),
      ),
    );
  }
}


class MyCardView extends StatelessWidget {
  final String title;
  final String imageUrl;
  final double distance;
  final double quantity;

  MyCardView({
    required this.title,
    required this.imageUrl,
    required this.distance,
    required this.quantity,
  });

  @override
  Widget build(BuildContext context) {

    double he = MediaQuery.of(context).size.height;
    double wi = MediaQuery.of(context).size.width;
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      elevation: 5,
      child: ListTile(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: wi * 0.203562341,
                  height: he * 0.102171137,
                  child: Image.network(
                    imageUrl,
                    fit: BoxFit.cover,
                  ),
                ),
                SizedBox(width: wi * 0.045801527),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: he * 0.022988506,
                      ),
                    ),
                    Text(
                      'Distance: $distance km',
                      style: TextStyle(fontSize: he * 0.019157088),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: he * 0.019157088),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Quantity: $quantity kg',
                  style: TextStyle(fontSize: 16.0),
                ),
                TextButton(onPressed: (){
                  Navigator.push(
                    context,
                    PageRouteBuilder(
                      pageBuilder: (context, animation, secondaryAnimation) => OrderDeatilsDistributor(),
                      transitionsBuilder: (context, animation, secondaryAnimation, child) {
                        const begin = Offset(1.0, 0.0);
                        const end = Offset.zero;
                        const curve = Curves.easeInOutQuart;

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
                    child: Text("Details", style: TextStyle(fontSize: he * 0.022988506),))
              ],
            ),
          ],
        ),
        // Add more widgets or customize as needed
      ),
    );
  }
}