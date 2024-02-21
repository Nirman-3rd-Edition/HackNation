// import 'dart:convert';
//
// import 'package:firebase_auth/firebase_auth.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:fluttertoast/fluttertoast.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:nirogh/Screens/post_splash_screen.dart';
// import 'package:nirogh/Screens/profile_setup.dart';
// import 'package:nirogh/Screens/user_registration.dart';
// import 'package:nirogh/Widgets/profile_menu.dart';
// import 'package:nirogh/services/auth_service.dart';
// import 'package:http/http.dart' as http;
//
// import '../services/shared_preference_services.dart';
//
// class DrawerContent extends StatefulWidget {
//   const DrawerContent({super.key});
//
//   @override
//   _DrawerContent createState() => _DrawerContent();
// }
//
// class _DrawerContent extends State<DrawerContent> {
//   // Define your variables here
//
//   String userProfilePic = '';
//   String userName = '';
//   String email = '';
//
//   @override
//   void initState() {
//     super.initState();
//     // Initialize your variables or perform any other setup operations
//     _fetchUserData();
//     // Fetch user data from cache when the widget initializes
//     loadDataFromCache();
//   }
//
//   @override
//   void dispose() {
//     super.dispose();
//     // Clean up any resources or subscriptions
//   }
//
//   Future<void> _fetchUserData() async {
//     final user = FirebaseAuth.instance.currentUser;
//     if (user != null) {
//       try {
//         // Send a GET request to your backend API to fetch user data
//         final response = await http.get(
//           Uri.parse("https://nirogh.com/bapi/user/${user.uid}"),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         );
//
//         if (response.statusCode == 200) {
//           final userData = json.decode(response.body);
//           print("Data is Fetching");
//           print(userData);
//           setState(() {
//             // Assign the retrieved data to the corresponding variables
//             userProfilePic = userData['data']['profilePictureUrl'] ?? '';
//             email = userData['data']['email'] ?? '';
//             userName = userData['data']['name'] ?? '';
//             // Add other fields if needed
//           });
//           // Save fetched data to SharedPreferences using the service class
//           await SharedPreferencesService.saveDrawerDataToCache(
//               userData['data']);
//         } else {
//           print(
//               'Failed to fetch user data. Status code: ${response.statusCode}');
//           print('Response body: ${response.body}');
//         }
//       } catch (e) {
//         print('Error fetching user data: $e');
//       }
//     }
//   }
//
//   Future<void> loadDataFromCache() async {
//     final cachedData =
//         await SharedPreferencesService.retrieveUserDataFromCache();
//     setState(() {
//       userProfilePic = cachedData['userProfilePic'].toString();
//       email = cachedData['email'].toString();
//       userName = cachedData['userName'].toString();
//       // Load other fields if needed
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     SystemChrome.setSystemUIOverlayStyle(
//         const SystemUiOverlayStyle(statusBarColor: Colors.cyan));
//     return Builder(
//       builder: (BuildContext context) {
//         // var isDarkMode = MediaQuery.of(context).platformBrightness == Brightness.dark;
//
//         return MaterialApp(
//           // theme: isDarkMode ? ThemeData.dark() : ThemeData.light(),
//           home: Directionality(
//             textDirection: TextDirection.ltr,
//             child: Scaffold(
//               // appBar: AppBar(
//               //   // backgroundColor: isDarkMode ? Colors.black : Colors.white,
//               //   leading: IconButton(
//               //     onPressed: () {},
//               //     icon: Icon(Icons.arrow_back, color: isDarkMode ? Colors.white : Colors.black),
//               //   ),
//               //   title: Text(
//               //     "Profile",
//               //     style: TextStyle(color: isDarkMode ? Colors.white : Colors.black),
//               //   ),
//               //   actions: [
//               //     IconButton(
//               //       onPressed: (){
//               //
//               //       },
//               //       icon: Icon(
//               //         isDarkMode ? Icons.light_mode : Icons.dark_mode,
//               //         color: isDarkMode ? Colors.white : Colors.black,
//               //       ),
//               //     ),
//               //   ],
//               // ),
//
//               body: Container(
//                 decoration: BoxDecoration(
//                     gradient:
//                         // !isDarkMode? LinearGradient(
//                         //     colors: [
//                         //       Colors.cyan.withOpacity(0.5),
//                         //       Colors.white70,
//                         //       Colors.white70,
//                         //       Colors.white70,
//                         //       Colors.white70
//                         //     ],
//                         //     begin: Alignment.topLeft,
//                         //     end: Alignment.bottomRight
//                         // ):
//                         const LinearGradient(colors: [
//                   Colors.white70,
//                   Colors.white70,
//                   Colors.white70,
//                   Colors.white70,
//                   Colors.white70
//                 ], begin: Alignment.topLeft, end: Alignment.bottomRight)),
//                 child: Container(
//                     padding: const EdgeInsets.all(15),
//                     child: Column(children: [
//                       const SizedBox(height: 50),
//                       Stack(
//                         children: [
//                           SizedBox(
//                             child: CircleAvatar(
//                               radius: 60.0,
//                               backgroundColor: Colors.black,
//                               child: userProfilePic.isNotEmpty
//                                   ? ClipOval(
//                                       child: Image.network(
//                                         userProfilePic,
//                                         width: 120,
//                                         height: 120,
//                                         fit: BoxFit.cover,
//                                       ),
//                                     )
//                                   : const Icon(
//                                       Icons.person,
//                                       size: 70,
//                                       color: Colors.cyan,
//                                     ),
//                             ),
//                           ),
//                         ],
//                       ),
//                       const SizedBox(height: 10),
//                       Text(
//                         userName,
//                         style: GoogleFonts.montserrat(
//                           textStyle: TextStyle(
//                             color: Colors.black,
//                             fontSize: 20,
//                           ),
//                         ),
//                       ),
//                       Text(
//                         email,
//                         style: GoogleFonts.montserrat(
//                           textStyle: TextStyle(
//                             color: Colors.black,
//                             fontSize: 20,
//                           ),
//                         ),
//                       ),
//                       const SizedBox(height: 20),
//                       ElevatedButton(
//                         onPressed: () {
//                           Navigator.push(
//                             context,
//                             PageRouteBuilder(
//                               pageBuilder:
//                                   (context, animation, secondaryAnimation) =>
//                                       const UpdateProfileScreen(
//                                 email: "",
//                                 userName: "",
//                                 userProfilePic: "",
//                                 uid: "",
//                               ),
//                               transitionsBuilder: (context, animation,
//                                   secondaryAnimation, child) {
//                                 const begin = Offset(-1.0, 0.0);
//                                 const end = Offset.zero;
//                                 const curve = Curves.easeInOut;
//
//                                 var tween = Tween(begin: begin, end: end)
//                                     .chain(CurveTween(curve: curve));
//                                 var offsetAnimation = animation.drive(tween);
//
//                                 return SlideTransition(
//                                   position: offsetAnimation,
//                                   child: child,
//                                 );
//                               },
//                             ),
//                           );
//                         },
//                         style: ElevatedButton.styleFrom(
//                             backgroundColor: Colors.black,
//                             side: BorderSide.none,
//                             shape: const StadiumBorder()),
//                         child: const Text("Edit Profile",
//                             style: TextStyle(color: Colors.white)),
//                       ),
//                       const SizedBox(height: 30),
//                       const Divider(),
//                       const SizedBox(height: 10),
//                       //MENU
//                       ProfileMenuWidget(
//                         title: "Settings",
//                         icon: Icons.settings,
//                         onPress: () {
//                           Fluttertoast.showToast(
//                             msg: 'Feature is comming soon',
//                             toastLength: Toast.LENGTH_SHORT,
//                             gravity: ToastGravity.BOTTOM,
//                             backgroundColor: Colors.grey[800],
//                             textColor: Colors.white,
//                           );
//                         },
//                       ),
//                       ProfileMenuWidget(
//                         title: "BillingDetails",
//                         icon: Icons.wallet,
//                         onPress: () {
//                           Fluttertoast.showToast(
//                             msg: 'Feature is comming soon',
//                             toastLength: Toast.LENGTH_SHORT,
//                             gravity: ToastGravity.BOTTOM,
//                             backgroundColor: Colors.grey[800],
//                             textColor: Colors.white,
//                           );
//                         },
//                       ),
//                       ProfileMenuWidget(
//                         title: "User Management",
//                         icon: Icons.verified_user,
//                         onPress: () {
//                           Fluttertoast.showToast(
//                             msg: 'Feature is comming soon',
//                             toastLength: Toast.LENGTH_SHORT,
//                             gravity: ToastGravity.BOTTOM,
//                             backgroundColor: Colors.grey[800],
//                             textColor: Colors.white,
//                           );
//                         },
//                       ),
//                       const Divider(height: 20),
//                       ProfileMenuWidget(
//                         title: "Information",
//                         icon: Icons.info_outline,
//                         onPress: () {
//                           Fluttertoast.showToast(
//                             msg: 'Feature is comming soon',
//                             toastLength: Toast.LENGTH_SHORT,
//                             gravity: ToastGravity.BOTTOM,
//                             backgroundColor: Colors.grey[800],
//                             textColor: Colors.white,
//                           );
//                         },
//                       ),
//                       ProfileMenuWidget(
//                         title: "Logout",
//                         icon: Icons.logout_outlined,
//                         textColor: Colors.red,
//                         endIcon: false,
//                         onPress: () {
//                           AuthService.signOut();
//                           Navigator.of(context).pushReplacement(
//                             MaterialPageRoute(
//                                 builder: (context) => UserRegistration()),
//                           );
//                         },
//                       ),
//                       const SizedBox()
//                     ])),
//               ),
//             ),
//           ),
//         );
//       },
//     );
//   }
// }
