
import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferenceService {
// Function to save UID to local storage
  static Future<void> saveUidToLocalStorage(String uid) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('uid', uid);
  }

// Function to retrieve UID from local storage
  static Future<String?> getUidFromLocalStorage() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('uid');
  }
}
