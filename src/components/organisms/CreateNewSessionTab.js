import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, PermissionsAndroid } from "react-native";
import { SERVER_URL } from "../../config/variables";
import PatientDetailedView from "../../styles/PatientDetailsView";
import CreateAdmission from "../molecules/CreateAdmission";
import CreatePETCT from "../molecules/CreatePETCT";

const CreateNewSessionTab = ({ patient }) => {
  const [IsAdmAdvised, setIsAdmAdvised] = useState(false);
  const [AdmDepartment, setAdmDepartment] = useState(0);
  const [selectedAdmPkg, setSelectedAdmPkg] = useState(0);
  const [IsPETCTAdvised, setIsPETCTAdvised] = useState(false);
  const [selectedPETCT, setSelectedPETCT] = useState(0);
  const [PETCTDepartment, setPETCTDepartment] = useState(0);



  const admProps = {
    IsAdmAdvised,
    setIsAdmAdvised,
    selectedAdmPkg,
    setSelectedAdmPkg,
    AdmDepartment,
    setAdmDepartment,
  };

  const petProps = {
    IsPETCTAdvised,
    setIsPETCTAdvised,
    selectedPETCT,
    setSelectedPETCT,
    PETCTDepartment,
    setPETCTDepartment,
  };

  const handleCreateSession = async () => {
    try {
      if (IsAdmAdvised) {
        const adm = await axios.post(
          `${SERVER_URL}/api/v1/patient/addToAdmission`,
          {
            patientID: patient._id,
            admissionPackage: selectedAdmPkg,
          }
        );
        console.log(adm);
      }
      if (IsPETCTAdvised) {
        const petct = await axios.post(
          `${SERVER_URL}/api/v1/patient/addToPetct`,
          {
            patientID: patient._id,
            petctPackage: selectedPETCT,
          }
        );
        console.log(petct);
      }
      Alert.alert("Session created successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong");
    }
  };

  return (
    <PatientDetailedView style={{ backgroundColor: "#E4DFDA" }}>
      <Text style={{ fontSize: 20 }}>create new session</Text>
      <CreateAdmission admProps={admProps} />
      <CreatePETCT petProps={petProps} />
      <PatientDetailedView>
        <Text style={{textAlign : 'center'}}>{selectedAdmPkg + selectedPETCT}</Text>
      </PatientDetailedView>
      <Pressable
        onPress={handleCreateSession}
        style={{ backgroundColor: "lightblue", padding: 10 }}
      >
        <Text style={{ textAlign: "center" }}>Create Session</Text>
      </Pressable>
    </PatientDetailedView>
  );
};

export default CreateNewSessionTab;
