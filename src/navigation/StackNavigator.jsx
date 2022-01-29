import React from "react";
import { View, Text } from "react-native";
import index from "../screens/index";
import PatientEntry from "../screens/PatientEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindPatientByID from "../screens/FindPatientByID";
import DetailedSession from "../screens/DetailedSession";
import LoginScreen from "../screens/LoginScreen";
import QuickPrescriptionUpload from "../screens/QuickPrescriptionUpload";
import EstimatePreview from "../components/organisms/EstimatePreview";
import CreateEstimate from "../screens/Estimater/CreateEstimate";
import RegisterScreen from "../screens/RegisterScreen";
import EstimateOutput from "../screens/EstimateOutput";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="FindPatient" component={FindPatientByID} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register Screen" component={RegisterScreen} />
      <Stack.Screen name="Home" component={index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="DetailedSession" component={DetailedSession} />
      <Stack.Screen
        name="QuickPrescriptionUpload"
        component={QuickPrescriptionUpload}
      />
      <Stack.Screen name="CreateEstimate" component={CreateEstimate} />
      <Stack.Screen name="EstimatePreview" component={EstimatePreview} />
      <Stack.Screen name="EstimateOutput" component={EstimateOutput} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
