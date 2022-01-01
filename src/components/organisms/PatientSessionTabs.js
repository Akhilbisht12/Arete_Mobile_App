import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width, height } = Dimensions.get("window");
import SessionHistoryTab from './SessionHistoryTab';
import { useNavigation } from "@react-navigation/native";

const PatientSessionTabs = ({patientID}) => {
  const navigation = useNavigation()
  const [IsHistoryActive, setIsHistoryActive] = useState(true);
  return (
    <PatientDetailedView label>
      <RowBetween>
        <PatientDetailedView
          style={{ backgroundColor: IsHistoryActive ? "#C1666B" : "#E4DFDA" }}
        >
          <Pressable style={{ width: 0.36 * width }}>
            <Text>Session History</Text>
          </Pressable>
        </PatientDetailedView>
        <PatientDetailedView
          style={{ backgroundColor: IsHistoryActive ? "#E4DFDA" : "#C1666B" }}
        >
          <Pressable onPress={()=>navigation.navigate('CreateEstimate', {patientID})} style={{ width: 0.36 * width }}>
            <Text>Create Estimate</Text>
          </Pressable>
        </PatientDetailedView>
      </RowBetween>
      <PatientDetailedView style={{backgroundColor : 'lightgray'}}>
        <Pressable onPress={()=>navigation.navigate('QuickPrescriptionUpload', {patientID})}>
          <Text style={{textAlign : 'center'}}>Quick Prescription Upload</Text>
        </Pressable>
      </PatientDetailedView>
      {IsHistoryActive?<SessionHistoryTab patientID={patientID}/>:<CreateNewSessionTab patientID={patientID}/>}
    </PatientDetailedView>
  );
};

export default PatientSessionTabs;
