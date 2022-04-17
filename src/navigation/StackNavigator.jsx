import React from "react";
import { View, Text } from "react-native";
import index from "../screens/index";
import PatientEntry from "../screens/PatientEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindPatientByID from "../screens/FindPatientByID";
import DetailedSession from "../screens/DetailedSession";
import LoginScreen from "../screens/Auth/LoginScreen";
import QuickPrescriptionUpload from "../screens/QuickPrescription/QuickPrescriptionUpload";
import EstimatePreview from "../components/organisms/EstimatePreview";
import CreateEstimate from "../screens/Estimater/CreateEstimate";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import EstimateOutput from "../screens/EstimateOutput";
import SessionHistoryTab from "../components/organisms/SessionHistoryTab";
import AgentIndex from "../screens/AgentIndex";
import RegisterPatient from "../screens/RegisterPatient";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = false;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={isLoggedIn ? AgentIndex : LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="FindPatient" component={FindPatientByID} />
      <Stack.Screen name="AgentIndex" component={AgentIndex} />
      <Stack.Screen name="Home" component={index} />
      <Stack.Screen name="PatientEntry" component={PatientEntry} />
      <Stack.Screen name="PatientHistory" component={SessionHistoryTab} />
      <Stack.Screen name="DetailedSession" component={DetailedSession} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
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
