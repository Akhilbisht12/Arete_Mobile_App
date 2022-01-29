import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { RowBetween } from "../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { SERVER_URL } from "../config/variables";
import { Picker } from "@react-native-picker/picker";
import {useNavigation} from '@react-navigation/native'

const QuickPrescriptionUpload = ({ route }) => {
  const navigation = useNavigation()
  const patientID = route.params.patientID;
  const [isAdmissionAdvised, setisAdmissionAdvised] = useState(false);
  const [isPetCTAdvised, setisPetCTAdvised] = useState(false);
  const [isRadiologyAdvised, setisRadiologyAdvised] = useState(false);
  const [ct, setCt] = useState(false);
  const [mri, setMri] = useState(false);
  const [usg, setUsg] = useState(false);
  const [others, setOthers] = useState(false);
  const [dialysis, setDialysis] = useState(false);
  const [loading, setLoading] = useState(false);

  const UploadPrescription = async () => {
    setLoading(true);
    try {
      const pres = await axios.post(
        `${SERVER_URL}/api/v1/patient/createNewSession`,
        {
          patientID: patientID,
          quickPres: {
            isAdmissionAdvised,
            isPetCTAdvised,
            isRadiologyAdvised,
            dialysis,
            diagnostics: {
              ct,
              mri,
              usg,
              others,
            },
          },
        }
      );
      console.log(pres);
      if (pres.status === 200) {
        setLoading(false);
        ToastAndroid.show(
          "Prescription Uploaded Successfully",
          ToastAndroid.SHORT
        );
        navigation.navigate("FindPatient");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <RowBetween style={{ margin: 15 }}>
        <Text>Admission</Text>
      </RowBetween>
      <Picker
        selectedValue={isAdmissionAdvised}
        onValueChange={(itemValue, itemIndex) =>
          setisAdmissionAdvised(itemValue)
        }
      >
        <Picker.Item value="Initiate RFA" label="Initiate RFA" />
        <Picker.Item value="Follow Up Later" label="Follow Up Later" />
        <Picker.Item value="Not Advised" label="Not Advised" />
        <Picker.Item value="Not Interested" label="Not Interested" />
      </Picker>
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
      <View style={{ margin: 15 }}>
        <Text>Diagnostics</Text>
        <RowBetween style={{ margin: 15 }}>
          <Text>CT</Text>
          <Pressable onPress={() => setCt(!ct)}>
            {ct ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{ margin: 15 }}>
          <Text>MRI</Text>
          <Pressable onPress={() => setMri(!mri)}>
            {mri ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{ margin: 15 }}>
          <Text>USG</Text>
          <Pressable onPress={() => setUsg(!usg)}>
            {usg ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
        <RowBetween style={{ margin: 15 }}>
          <Text>Others</Text>
          <Pressable onPress={() => setOthers(!others)}>
            {others ? (
              <Icon size={25} name="checkbox-outline" />
            ) : (
              <Icon size={25} name="square-outline" />
            )}
          </Pressable>
        </RowBetween>
      </View>
      <RowBetween style={{ margin: 15 }}>
        <Text>Radiology</Text>
        <Pressable onPress={() => setisRadiologyAdvised(!isRadiologyAdvised)}>
          {isRadiologyAdvised ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <RowBetween style={{ margin: 15 }}>
        <Text>Dialysis</Text>
        <Pressable onPress={() => setDialysis(!dialysis)}>
          {dialysis ? (
            <Icon size={25} name="checkbox-outline" />
          ) : (
            <Icon size={25} name="square-outline" />
          )}
        </Pressable>
      </RowBetween>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightgray",
          padding: 10,
          margin: 10,
        }}
      >
        <Icon style={{ marginHorizontal: 5 }} name="camera" size={25} />
        <Text>Upload Prescription</Text>
      </View>
      <Pressable
        style={{ backgroundColor: "lightblue", padding: 15 }}
        onPress={() => UploadPrescription()}
      >
        <Text style={{ textAlign: "center" }}>Submit Quick Prescription</Text>
        <ActivityIndicator
          color="black"
          style={{ display: loading ? "flex" : "none" }}
        />
      </Pressable>
    </View>
  );
};

export default QuickPrescriptionUpload;
