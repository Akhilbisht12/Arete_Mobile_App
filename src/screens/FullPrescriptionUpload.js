import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  CheckBox,
  Pressable,
  Dimensions,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addDoctor, addTreatment } from "../store/actions/adviceAction";
import React, { useState } from "react";
import { SERVER_URL } from "../config/variables";
import { Picker } from "@react-native-picker/picker";
import { ColumnCenter, Row, RowBetween, RowEven } from "../styles/FlexView";

import DiagnosticsMap from "./Estimater/molecules/DiagnosticsMap";
import RadiologyMap from "./Estimater/molecules/RadiologyMap";
import MedicineMap from "./Estimater/molecules/MedicineMap";
import CameraView from "../components/atoms/CameraView";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native-elements";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const FullPrescriptionUpload = ({
  route,
  advice,
  addDoctor,
  item,
  addTreatment,
}) => {
  const [selectDiagnostics, setSelectDiagnostics] = useState();
  const [selectRadiology, setSelectRadiology] = useState();
  const [selectAdmission, setSelectAdmission] = useState();
  const [diseaseName, setDiseaseName] = useState();
  const [camera, setCamera] = useState(false);
  const [photo, setPhoto] = useState("");
  const [doctor, setDoctor] = useState();
  const [medicine, setMedicine] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleEstimator = () => {
    navigation.navigate("CreateEstimate");
  };

  const handleUploadPrescription = async () => {
    setLoading(true);
    const patientID = route.params.patientID;
    const prescription = {
      prescriptionDate: Date.now(),
      diseaseName: diseaseName,
      doctor: doctor,
      diagnostic: advice.diagnostic,
      radiology: advice.radiology,
      medicine: "Empty",
      file: {
        uri: `file://${photo}`,
        name: `${patientID + "on" + Date.now()}`,
        type: "image/jpg",
      },
      isAdmissonAdvised: selectAdmission,
    };

    const data = [patientID, prescription];
    if (!data.diseaseName && !data.doctor && !data.diagnostic) {
      ToastAndroid.show(
        "Capture Prescription, Select Doctor, Select Diagnostic, Enter Disease",
        ToastAndroid.SHORT
      );
    }
    try {
      const uploadData = await axios.post(
        `${SERVER_URL}/api/v1/patient/newAppointment`,
        data
      );

      if (uploadData.status === 200) {
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

  if (camera)
    return (
      <CameraView photo={photo} setCamera={setCamera} setPhoto={setPhoto} />
    );
  {
    console.log(item);
  }
  return (
    <View>
      <ScrollView style={{ height: height * 0.8 }}>
        <View style={styles.card}>
          <TextInput
            placeholder="Enter Disease Name"
            style={{ padding: 10, backgroundColor: "#f5f5f5", borderRadius: 5 }}
            onSubmitEditing={(e) => {
              setDiseaseName(e.nativeEvent.text);
              addTreatment({ treatment: e.nativeEvent.text });
            }}
          ></TextInput>
          <Row>
            <Text style={{ fontFamily: "Poppins-Bold", margin: 7 }}>
              Treatment For: {diseaseName}
            </Text>
          </Row>
          <Picker
            selectedValue={doctor}
            onValueChange={(itemValue) => {
              addDoctor({ doctor: itemValue });
              setDoctor(itemValue);
            }}
            style={{ width: width * 0.85, fontFamily: "Poppins-Medium" }}
          >
            <Picker.Item value="" label="Select Doctor" />
            <Picker.Item value="Dr. Ramesh Talwas" label="Dr. Ramesh Talwas" />
            <Picker.Item value="Dr. Naveen Jain" label="Dr. Naveen Jain" />
            <Picker.Item value="Dr. Kanti Jindal" label="Dr. Kanti Jindal" />
            <Picker.Item
              value="Dr. Seema Aggarwal"
              label="Dr. Seema Aggarwal"
            />
          </Picker>
        </View>
        <View style={styles.card}>
          <RowEven>
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              Admission Advised ?
            </Text>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectAdmission === true ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectAdmission(true);
              }}
            >
              <Text
                style={{
                  color: `${selectAdmission == true ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectAdmission == false ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectAdmission(false);
              }}
            >
              <Text
                style={{
                  color: `${selectAdmission == false ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                No
              </Text>
            </Pressable>
          </RowEven>
          <View
            style={{
              display: `${selectAdmission == true ? "flex" : "none"}`,
              flexDirection: "row",
            }}
          >
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.9,
                marginVertical: 10,
              }}
            >
              <Pressable
                style={{
                  width: width * 0.85,
                  backgroundColor: "olive",
                  paddingHorizontal: 5,
                  paddingVertical: 15,
                  borderRadius: 7,
                }}
                onPress={handleEstimator}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Create Estimate Here
                </Text>
              </Pressable>
            </Row>
          </View>
        </View>
        <View
          style={[
            styles.card,
            { display: `${selectAdmission == undefined ? "none" : "flex"}` },
          ]}
        >
          <RowEven>
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              Diagnostics Advised ?
            </Text>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectDiagnostics === true ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectDiagnostics(true);
              }}
            >
              <Text
                style={{
                  color: `${selectDiagnostics == true ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectDiagnostics == false ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectDiagnostics(false);
              }}
            >
              <Text
                style={{
                  color: `${selectDiagnostics == false ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                No
              </Text>
            </Pressable>
          </RowEven>
          <View
            style={{
              display: `${selectDiagnostics == true ? "flex" : "none"}`,
              flexDirection: "row",
            }}
          >
            <DiagnosticsMap />
          </View>
        </View>
        <View
          style={[
            styles.card,
            { display: `${selectAdmission == undefined ? "none" : "flex"}` },
          ]}
        >
          <RowEven>
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              Radiology Advised ?
            </Text>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectRadiology === true ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectRadiology(true);
              }}
            >
              <Text
                style={{
                  color: `${selectRadiology == true ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    selectRadiology == false ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setSelectRadiology(false);
              }}
            >
              <Text
                style={{
                  color: `${selectRadiology == false ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                No
              </Text>
            </Pressable>
          </RowEven>
          <View
            style={{
              display: `${selectRadiology == true ? "flex" : "none"}`,
              flexDirection: "row",
            }}
          >
            <RadiologyMap />
          </View>
        </View>
        <View style={styles.card}>
          <RowEven>
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              Medicines Advised ?
            </Text>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    medicine === true ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setMedicine(true);
              }}
            >
              <Text
                style={{
                  color: `${medicine == true ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={[
                {
                  backgroundColor: `${
                    medicine == false ? "#030027" : "#f5f5f5"
                  }`,
                },
                styles.button,
              ]}
              onPress={() => {
                setMedicine(false);
              }}
            >
              <Text
                style={{
                  color: `${medicine == false ? "white" : "black"}`,
                  fontFamily: "Poppins-Medium",
                }}
              >
                No
              </Text>
            </Pressable>
          </RowEven>
          <View
            style={{
              display: `${medicine == true ? "flex" : "none"}`,
              flexDirection: "row",
            }}
          >
            <MedicineMap />
          </View>
        </View>
        <View style={styles.card}>
          <Pressable
            style={{
              flexDirection: "row",
              padding: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setCamera(true);
            }}
          >
            <Icon name={"attach"} size={25} />
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              {photo ? "Attached Prescription" : "Attach Prescription"}
            </Text>
          </Pressable>
          <View
            style={{ height: height * 0.3, display: photo ? "flex" : "none" }}
          >
            <Image
              source={{ uri: `file://${photo}` }}
              style={{ height: height * 0.3, borderRadius: 5 }}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: height * 0.1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={handleUploadPrescription}
          style={{
            width: width * 0.85,
            height: height * 0.08,
            backgroundColor: "#030027",
            paddingHorizontal: 5,
            paddingVertical: 15,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Poppins-Bold",
            }}
          >
            Upload Prescription
          </Text>
          <ActivityIndicator
            animating={loading}
            color={"white"}
            size={"small"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 7,
    shadowColor: "grey",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 5,
    elevation: 2,
    fontFamily: "Poppins-Medium",
  },
  service: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "lightgray",
    marginVertical: 2,
    borderRadius: 5,
  },
  badge: {
    backgroundColor: "blue",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 2,
  },
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDoctor: (item) => dispatch(addDoctor(item)),
    addTreatment: (item) => dispatch(addTreatment(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPrescriptionUpload);
