import React, { useState } from "react";
import { View, Text, Pressable, Alert, ToastAndroid } from "react-native";
import { RowBetween } from "../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { SERVER_URL } from "../config/variables";

const QuickPrescriptionUpload = ({ route }) => {
  const patientID = route.params.patientID;
  console.log(route.params.patientID);
  const [isAdmissionAdvised, setisAdmissionAdvised] = useState(false);
  const [isPetCTAdvised, setisPetCTAdvised] = useState(false);
  const [isRadiologyAdvised, setisRadiologyAdvised] = useState(false);
  const handleQuickPrescriptionUpload = async () => {
    try {
      const prescription = await axios.post(
        `${SERVER_URL}/api/v1/patient/quickPrescriptionUpload`,
        {
          patientID,
          isAdmissionAdvised,
          isPetCTAdvised,
          isRadiologyAdvised,
        }
      );
      ToastAndroid.show(
        "Prescription successfully uploaded",
        ToastAndroid.SHORT
      );
    } catch (error) {
      Alert.alert("something went wrong", error);
    }
  };
  return (
    <View>
      <Text style={{ textAlign: "center" }}>Quick Prescription Upoad</Text>
      <RowBetween style={{ margin: 15 }}>
        <Text>Is Admission Advised?</Text>
        <Pressable onPress={() => setisAdmissionAdvised(!isAdmissionAdvised)}>
          {isAdmissionAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <RowBetween style={{ margin: 15 }}>
        <Text>Is PetCT Advised?</Text>
        <Pressable onPress={() => setisPetCTAdvised(!isPetCTAdvised)}>
          {isPetCTAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <RowBetween style={{ margin: 15 }}>
        <Text>Is Radiology Advised?</Text>
        <Pressable onPress={() => setisRadiologyAdvised(!isRadiologyAdvised)}>
          {isRadiologyAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <Pressable onPress={handleQuickPrescriptionUpload}>
        <Text style={{ textAlign: "center" }}>Submit Quick Prescription</Text>
      </Pressable>
    </View>
  );
};

export default QuickPrescriptionUpload;
