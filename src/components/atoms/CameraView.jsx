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
import { Row, RowBetween } from "../../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";

const CameraView = ({ photo, setPhoto, setCamera }) => {
  const { width, height } = Dimensions.get("window");
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const camera = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [flash, setFlash] = useState(false);
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
  const handleFlash = () => {
    setFlash(!flash);
  };
  const handlePhotoClick = async () => {
    const photo = await camera.current.takePhoto({
      flash: flash ? "on" : "off",
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

      <RowBetween
        style={{
          height: 200,
          backgroundColor: "black",
        }}
      >
        <View>
          <TouchableOpacity onPress={handleFlash}>
            <Icon
              name="flash"
              size={25}
              style={{
                color: flash ? "white" : "#a5a5a5",
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={handlePhotoClick}
            style={{
              backgroundColor: "white",
              borderRadius: 100,
              height: 60,
              width: 60,
              borderWidth: 3,
              borderColor: "#c5c5c5",
              marginBottom: 50,
            }}
          ></TouchableOpacity>
        </View>
        <View></View>
      </RowBetween>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({});
