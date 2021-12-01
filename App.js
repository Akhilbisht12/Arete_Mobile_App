import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import index from "./src/screens";
import { ApplicationProvider } from "react-native-ui-kitten";
import * as eva from "@eva-design/eva";
import StackNavigator from "./src/navigation/StackNavigator";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
