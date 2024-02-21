import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../Services/shared_preference.dart';

class DrawerContent extends StatefulWidget {
  const DrawerContent({super.key});

  @override
  _DrawerContent createState() => _DrawerContent();
}

class _DrawerContent extends State<DrawerContent> {

  String? storedUid;
  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    await checkUserLoggedIn();
    setState(() {
      storedUid = storedUid;
    });
  }
  Future<void> checkUserLoggedIn() async {
    storedUid = await SharedPreferenceService.getUidFromLocalStorage();
  }

  void logout() async {
    await SharedPreferenceService.saveUidToLocalStorage("");
    Navigator.pushReplacementNamed(context, '/login');
  }
  @override
  Widget build(BuildContext context) {

    return Container(
      width: MediaQuery.of(context).size.width * 0.5,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF04FC10),
            Color(0xFFE1E8E2)
          ],
        ),
        borderRadius: BorderRadius.circular(10), // Adjust the radius as needed
        boxShadow: [
          BoxShadow(
            color: Colors.black12.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 10,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 40),
          Container(
            decoration: BoxDecoration(
              color: Colors.white, // Background color for the CircleAvatar
              borderRadius: BorderRadius.circular(50),
            ),
            child: CircleAvatar(
              radius: 40,
              backgroundImage: AssetImage('assets/profile.jpg'), // Add your image path
            ),
          ),
          SizedBox(height: 10),
          Text("User Id:", style: TextStyle( fontWeight: FontWeight.bold, fontSize: 25),),
          Text("${storedUid}", style: TextStyle( fontWeight: FontWeight.bold, fontSize: 20),),
          Divider(thickness: 3, height: 20,),
          ListTile(
            onTap: logout,
            leading: Icon(Icons.logout),
            title: Text("Log out", style: TextStyle(color: Colors.redAccent, fontSize: 13),),
            trailing: Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(100)
              ),
              child: IconButton(icon: Icon(Icons.arrow_forward_ios_outlined, size: 15,), onPressed: () {  },),
            ),
          )
        ],
      ),
    );
  }
}