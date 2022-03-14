import React, { useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width, height } = Dimensions.get("window");
import SessionHistoryTab from "./SessionHistoryTab";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { restoreState } from "../../store/actions/adviceAction";
import { connect } from "react-redux";

const PatientSessionTabs = ({ patientID, restoreState }) => {
  const navigation = useNavigation();
  const [IsHistoryActive, setIsHistoryActive] = useState(true);
  return (
    <View>
      {/* <PatientDetailedView label>
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
            <Pressable
              onPress={() =>
                navigation.navigate("CreateEstimate", { patientID })
              }
              style={{ width: 0.36 * width }}
            >
              <Text>Create Estimate</Text>
            </Pressable>
          </PatientDetailedView>
        </RowBetween>

        <PatientDetailedView style={{ backgroundColor: "lightgray" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("QuickPrescriptionUpload", { patientID })
            }
          >
            <Text style={{ textAlign: "center" }}>
              Quick Prescription Upload
            </Text>
          </Pressable>
        </PatientDetailedView>
        {IsHistoryActive ? (
          <SessionHistoryTab patientID={patientID} />
        ) : (
          <CreateNewSessionTab patientID={patientID} />
        )}
      </PatientDetailedView> */}
      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => navigation.navigate("PatientHistory", { patientID })}
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#2d3e50",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="person-outline" size={40} color={"white"} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: "white",
              textAlign: "center",
            }}
          >
            Patient History
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            restoreState({});
            navigation.navigate("CreateEstimate", { patientID });
          }}
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#2d3e50",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="calculator-outline" size={40} color={"white"} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: "white",
              textAlign: "center",
            }}
          >
            Create Estimate
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("QuickPrescriptionUpload", { patientID })
          }
          style={{
            margin: 10,
            width: width * 0.9,
            backgroundColor: "#2d3e50",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="person-outline" size={40} color={"white"} />
          <Text
            style={{
              margin: 0,
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: "white",
              textAlign: "center",
            }}
          >
            Quick Prescription Upload
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    restoreState: (item) => dispatch(restoreState(item)),
  };
};

export default connect(null, mapDispatchToProps)(PatientSessionTabs);
