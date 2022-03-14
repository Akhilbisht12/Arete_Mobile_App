import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import { SERVER_URL } from "../config/variables";
import ImgBox from "../styles/ImgBox";
import HeadingText from "../styles/HeadingText";
import { ColumnCenter } from "../styles/FlexView";
import PatientDetailedView from "../styles/PatientDetailsView";
import ParaText from "../styles/ParaText";
import moment from "moment";
import PatientSessionTabs from "../components/organisms/PatientSessionTabs";
import Logo from "../components/atoms/Logo";

const { width, height } = Dimensions.get("window");

const PatientEntry = ({ route }) => {
  const [showAction, setShowAction] = useState(false);
  const [isAdmission, setisAdmission] = useState(0);
  const [selectedAdmPkg, setSelectedAdmPkg] = useState(0);

  const data = route.params.data;

  const handlePostOPDRecommSubmit = () => {
    axios
      .post(`${SERVER_URL}/api/v1/patient/admissions/add`, {
        patientID: data._id,
        admissionPackage: selectedAdmPkg,
      })
      .then((res) => {
        console.log(res);
        Alert.alert(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ScrollView style={Styles.main}>
      <Logo />
      <View style={Styles.spaceBetween}>
        <View>
          <PatientDetailedView>
            <ParaText category="h6">
              {data.gender == "M" ? "Mr." : "Mrs./Miss"} {data.firstName}{" "}
              {data.lastName}
            </ParaText>
            <ParaText category="h6">Age: {data.age}</ParaText>
            <ParaText category="h6">UHID: {data.uhid}</ParaText>
            <ParaText category="h6">Phone: {data.phone}</ParaText>
            <ParaText category="h6">Email: {data.email}</ParaText>
            <ParaText category="h6">
              DOJ: {moment(data.createdAt).format("dd-MM-YY hh:mm a")}
            </ParaText>
          </PatientDetailedView>
          <PatientSessionTabs patientID={data._id} />
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
  },
  nameView: {
    padding: 10,
    backgroundColor: "pink",
  },
  spaceBetween: {
    flex: 1,
    justifyContent: "space-between",
  },
  popup: {
    backgroundColor: "pink",
    width: 0.8 * width,
    height: 0.2 * height,
    top: 0.4 * height,
    left: 0.1 * width,
    borderRadius: 5,
    padding: 15,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PatientEntry;
