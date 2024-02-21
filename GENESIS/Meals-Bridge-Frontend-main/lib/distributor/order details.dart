import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'accept_order_distributor.dart';
import 'home_screen_distributor.dart';

class OrderDeatilsDistributor extends StatefulWidget {
  const OrderDeatilsDistributor({super.key});

  @override
  State<OrderDeatilsDistributor> createState() => _OrderDeatilsDistributorState();
}

class _OrderDeatilsDistributorState extends State<OrderDeatilsDistributor> {
  @override
  Widget build(BuildContext context) {
    double he = MediaQuery.of(context).size.height;
    double wi = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Material(
            borderRadius: BorderRadius.only(bottomRight: Radius.circular(100), bottomLeft: Radius.circular(100)),
            color: Colors.transparent,
            elevation: 10,
            child: Container(
              padding: EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                color: Colors.lightGreen.withOpacity(0.9),
                borderRadius: BorderRadius.only(bottomLeft: Radius.circular(100) , bottomRight: Radius.circular(100)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(height: 35,),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(onPressed: (){
                        Navigator.push(
                          context,
                          PageRouteBuilder(
                            pageBuilder: (context, animation, secondaryAnimation) => HomeScreenDistributor(),
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
                        icon: Icon(Icons.arrow_back, size: 30,),
                      ),
                      CachedNetworkImage(
                        imageUrl: 'Image',
                        placeholder: (context, url) => CircleAvatar(
                          radius: wi * 0.045801527,
                          backgroundColor: Colors.lightGreen,
                        ),
                        errorWidget: (context, url, error) => CircleAvatar(
                          radius: he * 0.045801527,
                          backgroundColor: Colors.red,
                        ),
                      ),
                      IconButton(onPressed: (){},
                        icon: Icon(Icons.wifi_calling, size: 30,),
                      ),
                    ],
                  ),
                  SizedBox(height: 5,),
                  Text("Silicon Institute of Technology", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10,),
                  Text("8260674950", style: TextStyle(fontSize: 20, color: Colors.black54)),
                  SizedBox(height: 10,),
                  Text("2.5 kms")

                ],
              ),
            )
          ),
          SizedBox(height: he * 0.019157088,),
          Expanded(
            child: ListView.builder(
              physics: BouncingScrollPhysics(),
              itemCount: 10,
              itemBuilder: (BuildContext context, int index) {
                return Card(
                  elevation: 4.0,
                  margin: EdgeInsets.all(8.0),
                  child: ListTile(
                    contentPadding: EdgeInsets.all(12.0),
                    leading: Container(
                      width: wi * 0.203562341,
                      height: he * 0.102171137,
                      child: Image.network(
                        'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
                        fit: BoxFit.cover,
                      ),
                    ),
                    title: Text('Item Name: XYZ'),
                    subtitle: Text('Quantity: 9 kg'),
                    onTap: () {
                      // Handle tap on the item
                    },
                  ),
                );
              },
            ),
          ),
          Container(
              padding: EdgeInsets.all(20.0),
              decoration: BoxDecoration(
                color: Colors.lightGreen.withOpacity(0.9),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(100) , topRight: Radius.circular(100)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Total Quantity", style: TextStyle(fontSize: he * 0.025542784, )),
                      SizedBox(height: 1,),
                      Text("80 persons", style: TextStyle(fontSize: he * 0.022988506, ))
                    ],
                  ),
                  ElevatedButton(onPressed: (){
                    Navigator.push(
                      context,
                      PageRouteBuilder(
                        pageBuilder: (context, animation, secondaryAnimation) => AcceptOrderDistributor(),
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
                      child: Text("Accept")
                  )
                ],
              )
          )
        ],
      )
    );
  }
}

