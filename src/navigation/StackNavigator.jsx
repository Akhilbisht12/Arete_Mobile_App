import React from "react";
import { View, Text } from "react-native";
import index from "../screens/index";
import PatientEntry from "../screens/PatientEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindPatientByID from "../screens/FindPatientByID";
import DetailedSession from "../screens/DetailedSession";
import QuickPrescriptionUpload from "../screens/QuickPrescriptionUpload";
import CreateNewSessionTab from "../components/organisms/CreateNewSessionTab";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="FindPatient" component={FindPatientByID} />
      <Stack.Screen name="Home" component={index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="DetailedSession" component={DetailedSession} />
      <Stack.Screen name="QuickPrescriptionUpload" component={QuickPrescriptionUpload} />
      <Stack.Screen name="CreateNewSession" component={CreateNewSessionTab} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
