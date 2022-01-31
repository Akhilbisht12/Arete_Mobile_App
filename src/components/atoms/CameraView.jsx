import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { RowBetween } from "../../styles/FlexView";

const CameraView = ({ photo, setPhoto, setCamera }) => {
  const { width, height } = Dimensions.get("window");
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const camera = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  useEffect(() => {
    const getCameraPermissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === "denied") {
        console.log("dd");
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(newCameraPermission);
      }
    };
    getCameraPermissions();
  }, []);
  const handlePhotoClick = async () => {
    const photo = await camera.current.takePhoto({
      flash: "on",
    });
    setPhoto(photo.path);
    setShowPhoto(true);
    console.log(photo.path);
  };
  if (device == null) return <ActivityIndicator />;
  if (showPhoto)
    return (
      <View>
        <View>
          <Image
            source={{ uri: `file://${photo}` }}
            style={{ height: height - 200, width: width }}
          />
        </View>
        <View>
          <RowBetween style={{ padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setPhoto("");
                setShowPhoto(false);
              }}
            >
              <Text>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCamera(false)}>
              <Text>Done</Text>
            </TouchableOpacity>
          </RowBetween>
        </View>
      </View>
    );
  return (
    <View>
      <Camera
        ref={camera}
        style={{ width: width, height: height - 200 }}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={handlePhotoClick}
          style={{ padding: 20, backgroundColor: "lightblue" }}
        >
          <Text>click photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({});
