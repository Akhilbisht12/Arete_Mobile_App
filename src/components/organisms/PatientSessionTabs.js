import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width, height } = Dimensions.get("window");
import SessionHistoryTab from './SessionHistoryTab';
import CreateNewSessionTab from "./CreateNewSessionTab";

const PatientSessionTabs = ({patientID}) => {
  const [IsHistoryActive, setIsHistoryActive] = useState(true);
  return (
    <PatientDetailedView label>
      <RowBetween>
        <PatientDetailedView
          style={{ backgroundColor: IsHistoryActive ? "#C1666B" : "#E4DFDA" }}
        >
          <Pressable onPress={()=>setIsHistoryActive(!IsHistoryActive)} style={{ width: 0.36 * width }}>
            <Text>Session History</Text>
          </Pressable>
        </PatientDetailedView>
        <PatientDetailedView
          style={{ backgroundColor: IsHistoryActive ? "#E4DFDA" : "#C1666B" }}
        >
          <Pressable onPress={()=>setIsHistoryActive(!IsHistoryActive)} style={{ width: 0.36 * width }}>
            <Text>Create New Session</Text>
          </Pressable>
        </PatientDetailedView>
      </RowBetween>
      {IsHistoryActive?<SessionHistoryTab patientID={patientID}/>:<CreateNewSessionTab patientID={patientID}/>}
    </PatientDetailedView>
  );
};

export default PatientSessionTabs;
