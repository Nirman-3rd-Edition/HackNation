import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

final _firebase = FirebaseAuth.instance;

class AuthScreen extends StatefulWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  late Color myColor;
  late Size mediaSize;
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool rememberUser = false;
  bool _login = true;
  var _enteredEmail = '';
  var _enteredPassword = '';
  var _firstName = '';
  var _lastName = '';
  var _username = '';
  var _companyName = '';
  final CollectionReference _truckowners =
      FirebaseFirestore.instance.collection('truckowners');
  final _form = GlobalKey<FormState>();

  Future<void> _loginUser() async {
    final isValid = _form.currentState!.validate();

    if (!isValid) {
      return;
    }

    _form.currentState!.save();

    try {
      final UserCredential userCredential =
          await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _enteredEmail,
        password: _enteredPassword,
      );

      // Get the user ID
      String userId = userCredential.user!.uid;
      print('User ID: $userId');

      // Navigate to home screen after successful login
    } on FirebaseAuthException catch (error) {
      ScaffoldMessenger.of(context).clearSnackBars();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(error.message ?? 'Authentication failed.'),
        ),
      );
    }
  }

  Future<void> _signUpUser() async {
    final isValid = _form.currentState!.validate();

    if (!isValid) {
      return;
    }

    _form.currentState!.save();

    try {
      final UserCredential userCredential =
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: _enteredEmail,
        password: _enteredPassword,
      );

      // Get the user ID
      String userId = userCredential.user!.uid;
      print('User ID: $userId');

      const apiUrl =
          'https://logimasterssilicon.onrender.com/api/fleetmanagerregistration/';

      final requestBody = jsonEncode({
        "first_name": _firstName,
        "last_name": _lastName,
        "username": _username,
        "CompanyName": _companyName,
        "email": _enteredEmail,
        "password": _enteredPassword,
      });

      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: requestBody,
      );

      if (response.statusCode == 201) {
        await _truckowners.doc(userId).set({
          'firstName': _firstName,
          'lastName': _lastName,
          'username': _username,
          'companyName': _companyName,
          'email': _enteredEmail,
        });

        final responseData = json.decode(response.body);
        final token = responseData['token'];
        print("Signup Successful, Token: $token");

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Registration successful!'),
            duration: Duration(seconds: 3),
          ),
        );

        // Navigate to the next screen
        // Navigator.push(...);
      }
    } on FirebaseAuthException catch (error) {
      if (error.code == 'email-already-in-use') {
        print('Error in firebase');
      }
      if (mounted) {
        // Check if the widget is still mounted
        ScaffoldMessenger.of(context).clearSnackBars();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(error.message ?? 'Authentication failed.'),
          ),
        );
      }
    } catch (error) {
      print('Error during registration: $error');
      if (mounted) {
        // Check if the widget is still mounted
        ScaffoldMessenger.of(context).clearSnackBars();
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Error during registration. Please try again.'),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    myColor = Theme.of(context).primaryColor;
    mediaSize = MediaQuery.of(context).size;

    return Container(
      decoration: BoxDecoration(
        color: myColor,
        image: const DecorationImage(
          image: AssetImage("assets/images/bg.png"),
          fit: BoxFit.cover,
          // colorFilter: ColorFilter.mode(myColor.withOpacity(0.2), BlendMode.dstATop),
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Stack(
          children: [
            Positioned(top: 80, child: _buildTop()),
            Positioned(bottom: 0, child: _buildBottom()),
          ],
        ),
      ),
    );
  }

  Widget _buildTop() {
    return SizedBox(
      width: mediaSize.width,
      child: const Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.emoji_transportation_sharp,
            size: 100,
            color: Colors.white,
          ),
          Text(
            "Roadie",
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 40,
              letterSpacing: 2,
            ),
          )
        ],
      ),
    );
  }

  Widget _buildBottom() {
    return SizedBox(
      width: mediaSize.width,
      child: Card(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(30),
            topRight: Radius.circular(30),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: _buildForm(),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return Form(
      key: _form,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            _login ? "Welcome" : "Please Sign Up",
            style: TextStyle(
              color: myColor,
              fontSize: 32,
              fontWeight: FontWeight.w500,
            ),
          ),
          _buildGreyText(
            "Please ${_login ? 'login' : 'sign up'} with your information",
          ),
          const SizedBox(height: 60),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              if (!_login)
                Expanded(
                  child: TextFormField(
                    decoration: const InputDecoration(labelText: 'First Name'),
                    keyboardType: TextInputType.text,
                    autocorrect: false,
                    textCapitalization: TextCapitalization.words,
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Please enter your first name.';
                      }
                      return null;
                    },
                    onSaved: (value) {
                      _firstName = value!;
                    },
                  ),
                ),
              const SizedBox(width: 30),
              if (!_login)
                Expanded(
                  child: TextFormField(
                    decoration: const InputDecoration(labelText: 'Last Name'),
                    keyboardType: TextInputType.text,
                    autocorrect: false,
                    textCapitalization: TextCapitalization.words,
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Please enter your last name.';
                      }
                      return null;
                    },
                    onSaved: (value) {
                      _lastName = value!;
                    },
                  ),
                ),
            ],
          ),
          if (!_login)
            TextFormField(
              decoration: const InputDecoration(labelText: 'Username'),
              keyboardType: TextInputType.text,
              autocorrect: false,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Please enter a username.';
                }
                return null;
              },
              onSaved: (value) {
                _username = value!;
              },
            ),
          if (!_login)
            TextFormField(
              decoration: const InputDecoration(labelText: 'Company Name'),
              keyboardType: TextInputType.text,
              autocorrect: false,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Please enter your company name.';
                }
                return null;
              },
              onSaved: (value) {
                _companyName = value!;
              },
            ),
          const SizedBox(height: 20),
          TextFormField(
            decoration: const InputDecoration(labelText: 'Email Address'),
            keyboardType: TextInputType.emailAddress,
            autocorrect: false,
            textCapitalization: TextCapitalization.none,
            validator: (value) {
              if (value == null ||
                  value.trim().isEmpty ||
                  !value.contains('@')) {
                return 'Please enter a valid email address.';
              }
              return null;
            },
            onSaved: (value) {
              _enteredEmail = value!;
            },
          ),
          TextFormField(
            decoration: const InputDecoration(labelText: 'Password'),
            obscureText: true,
            validator: (value) {
              if (value == null || value.trim().length < 6) {
                return 'Password must be at least 6 characters long.';
              }
              return null;
            },
            onSaved: (value) {
              _enteredPassword = value!;
            },
          ),
          const SizedBox(height: 40),
          if (_login) _buildLoginButton() else _buildSignupButton(),
          const SizedBox(height: 20),
          Center(
            child: TextButton(
              onPressed: () {
                setState(() {
                  _login = !_login;
                });
              },
              child: Text(
                _login ? "Sign Up" : "Back to Login",
                style: const TextStyle(fontSize: 16),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGreyText(String text) {
    return Text(
      text,
      style: const TextStyle(color: Colors.grey),
    );
  }

  Widget _buildLoginButton() {
    return ElevatedButton(
      onPressed: () {
        _loginUser();
      },
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        elevation: 30,
        shadowColor: myColor,
        minimumSize: const Size.fromHeight(60),
      ),
      child: const Text("LOGIN"),
    );
  }

  Widget _buildSignupButton() {
    return ElevatedButton(
      onPressed: () {
        _signUpUser();
      },
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        elevation: 30,
        shadowColor: myColor,
        minimumSize: const Size.fromHeight(60),
      ),
      child: const Text("SIGN UP"),
    );
  }
}
