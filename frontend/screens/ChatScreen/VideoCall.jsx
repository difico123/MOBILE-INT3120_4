/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStream, MediaStreamTrack, mediaDevices } from "react-native-webrtc";
const VideoCall = () => {
    const [stream, setStream] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [localStream, setLocalStream] = useState(undefined);
    useEffect(function () {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
        mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: 500, // Provide your own width, height and frame rate here
                        minHeight: 300,
                        minFrameRate: 30,
                    },
                    facingMode: "environment",
                    optional: [],
                },
            })
            .then((stream) => {
                setLocalStream(stream);
            });
    }, []);
    console.log("render", localStream?.toURL());

    const start = async () => {
        // if (!stream) {
        //     let s;
        //     try {
        // (async () => {
        //     const { status } = await Camera.requestCameraPermissionsAsync();
        //     setHasPermission(status === "granted");
        // })();
        //         s = await mediaDevices.getUserMedia({ video: true });
        //         setStream(s);
        //         // let isFront = true;
        //         // console.log("mediaDevices", await mediaDevices.enumerateDevices());
        //         // for (let media in mediaDevices) {
        //         //     console.log(media);
        //         // }
        //         // mediaDevices.enumerateDevices().then((sourceInfos) => {
        //         //     console.log(sourceInfos);
        //         //     let videoSourceId;
        //         //     for (let i = 0; i < sourceInfos.length; i++) {
        //         //         const sourceInfo = sourceInfos[i];
        //         //         if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
        //         //             videoSourceId = sourceInfo.deviceId;
        //         //         }
        //         //     }
        //         //     mediaDevices
        //         //         .getUserMedia({
        //         //             audio: true,
        //         //             video: {
        //         //                 width: 640,
        //         //                 height: 480,
        //         //                 frameRate: 30,
        //         //                 facingMode: isFront ? "user" : "environment",
        //         //                 deviceId: videoSourceId,
        //         //             },
        //         //         })
        //         //         .then((stream) => {
        //         //             // Got stream!
        //         //             setStream(stream);
        //         //         })
        //         //         .catch((error) => {
        //         //             // Log error
        //         //         });
        //         // });
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }
    };

    // useEffect(() => {
    //     let isFront = true;
    //     mediaDevices.enumerateDevices().then((sourceInfos) => {
    //         console.log(sourceInfos);
    //         let videoSourceId;
    //         for (let i = 0; i < sourceInfos.length; i++) {
    //             const sourceInfo = sourceInfos[i];
    //             if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
    //                 videoSourceId = sourceInfo.deviceId;
    //             }
    //         }
    //         mediaDevices
    //             .getUserMedia({
    //                 audio: true,
    //                 video: {
    //                     width: 640,
    //                     height: 480,
    //                     frameRate: 30,
    //                     facingMode: isFront ? "user" : "environment",
    //                     deviceId: videoSourceId,
    //                 },
    //             })
    //             .then((stream) => {
    //                 // Got stream!
    //             })
    //             .catch((error) => {
    //                 // Log error
    //             });
    //     });
    // }, []);
    const stop = () => {
        console.log("stop");
        if (stream) {
            stream.release();
            setStream(null);
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.body}>
                {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} style={styles.stream} />}
                {/* {hasPermission ? (
                    <>
                        <Camera type={Camera.Constants.Type.front} style={{ width: "100%", height: 400, borderWidth: 1 }}></Camera>
                    </>
                ) : null} */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={start} style={styles.buttons}>
                        <View>
                            <Text>start</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={stop} style={styles.buttons}>
                        <View>
                            <Text>stop</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};

export default VideoCall;

const styles = StyleSheet.create({
    rtc: {
        width: "100%",
        height: 400,
    },
    buttons: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        flex: 1,
        padding: 10,
    },
    body: {
        backgroundColor: "#FFFFFF",
        flex: 1,
    },
    stream: {
        flex: 1,
    },
    footer: {
        backgroundColor: "red",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});
