import React from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";

const RegisterScreen = () => {
  return (
    <View>
      <ScrollView>
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: 30,
            width: 120,
            margin: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Agent Registration
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ padding: 10 }}>
            <Text>First Name</Text>
            <TextInput
              style={{
                width: 150,
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Enter First Name"
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text>Last Name</Text>
            <TextInput
              style={{
                width: 150,
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Enter Last Name"
            />
          </View>
        </View>
        <View style={{ marginTop: 5, marginLeft: 10 }}>
          <Text>Email</Text>
          <TextInput
            style={{
              width: 322,
              height: 40,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent Email"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
