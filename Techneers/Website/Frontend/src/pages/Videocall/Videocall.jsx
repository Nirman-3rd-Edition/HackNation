import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const Videocall = () => {
  const [zoomLink, setZoomLink] = useState("");
  const [socket, setSocket] = useState(null);

  //   const getroomid = (roomID) => {
  //     console.log("hi");
  //     const newSocket = new WebSocket("ws://localhost:5001");

  //     newSocket.onopen = () => {
  //       console.log("WebSocket connection opened");
  //     };

  //     setSocket(newSocket);
  //     const msg = `/videocall?roomID=${roomID}`;
  //     socket.send(msg);
  //     return () => {
  //       // Close the socket when the component unmounts
  //       newSocket.close();
  //     };
  //   };

  useEffect(() => {
    const getUrlParams = (url) => {
      let urlStr = url.split("?")[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      const result = Object.fromEntries(urlSearchParams.entries());
      return result;
    };

    // Generate a Token by calling a method.
    // @param 1: appID
    // @param 2: serverSecret
    // @param 3: Room ID
    // @param 4: User ID
    // @param 5: Username
    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      Math.floor(Math.random() * 10000) + "";

    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID = 1680557590;
    const serverSecret = "c5c23972df6a8c4ed6f931d979f712ba";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.querySelector("#abc"),
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });

    // getroomid(roomID);
  }, []);

  const rootStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div id="abc" style={rootStyle}></div>
    </>
  );
};

export default Videocall;
