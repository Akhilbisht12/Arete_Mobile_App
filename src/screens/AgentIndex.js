import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../components/atoms/Logo";
const { width } = Dimensions.get("window");

const AgentIndex = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Logo />
      <Pressable
        onPress={() => {
          navigation.navigate("FindPatient");
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
        <Icon name="search-outline" size={40} color={"white"} />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            color: "white",
            textAlign: "center",
          }}
        >
          Find Patient
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("RegisterPatient")}
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
        <Icon name="person-add-outline" size={40} color={"white"} />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            color: "white",
            textAlign: "center",
          }}
        >
          Register Patient
        </Text>
      </Pressable>
    </View>
  );
};

export default AgentIndex;
