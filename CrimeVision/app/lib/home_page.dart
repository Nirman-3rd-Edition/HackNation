import 'dart:math';
import 'package:flutter/material.dart';
import 'package:zego_uikit_prebuilt_live_streaming/zego_uikit_prebuilt_live_streaming.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('images/3.png'), 
              fit: BoxFit.cover,
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => jumpToLivePage(context, isHost: true),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 250, 253, 255), 
                    fixedSize: Size(250, 70),
                    visualDensity: VisualDensity.compact, 
                  ),
                  child: Text(
                    'LIVE',
                    style: TextStyle(
                      fontWeight: FontWeight.bold, 
                    ),
                  ),
                ),
                SizedBox(height: 16), 
                
              ],
            ),
          ),
        ),
      ),
    );
  }

  jumpToLivePage(BuildContext context, {required bool isHost}) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => LivePage(
          isHost: isHost,
        ),
      ),
    );
  }
}

final String userID = Random().nextInt(10000).toString();

class LivePage extends StatelessWidget {
  const LivePage({Key? key, this.isHost = false}) : super(key: key);
  final bool isHost;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ZegoUIKitPrebuiltLiveStreaming(
        appID: 1146248052
,
        appSign:
            '0de41c8bc6012378c7cfb91ef29de4c04406d015cf34475f4bba6a7fde94ff8c',
        userID: userID,
        userName: 'user_$userID',
        liveID: 'testLiveID',
        config: isHost
            ? ZegoUIKitPrebuiltLiveStreamingConfig.host()
            : ZegoUIKitPrebuiltLiveStreamingConfig.audience(),
      ),
    );
  }
}
