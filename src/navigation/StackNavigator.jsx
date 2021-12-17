import React from "react";
import { View, Text } from "react-native";
import index from "../screens/index";
import PatientEntry from "../screens/PatientEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindPatientByID from "../screens/FindPatientByID";
import DetailedSession from "../screens/DetailedSession";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="FindPatient" component={FindPatientByID} />
      <Stack.Screen name="Home" component={index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="DetailedSession" component={DetailedSession} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
