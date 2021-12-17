import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionHistoryTab from "../components/organisms/SessionHistoryTab";
import CreateNewSessionTab from "../components/organisms/CreateNewSessionTab";

const PatientEntryTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Session History" component={SessionHistoryTab} />
      <Tab.Screen name="New Session" component={CreateNewSessionTab} />
    </Tab.Navigator>
  );
};

export default PatientEntryTabs;
