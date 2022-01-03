import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={{ display: "flex", padding: 20 }}>
      <Image
        source={require("../assets/logo.png")}
        style={{
          height: 50,
          width: 200,
          marginLeft: 60,
          marginRight: 50,
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontSize: 15,
          margin: 25,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        We are leading Hospital Management Tool
      </Text>
      <View style={{ marginTop: 50 }}>
        <View>
          <Text style={{ fontSize: 15 }}>Agent ID</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent ID"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15 }}>Password</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Password"
          />
          <Pressable style={{ marginTop: 5 }}>
            <Text
              style={{ textAlign: "right", paddingTop: 5, color: "orange" }}
            >
              Forget Password ?
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "orange",
              marginTop: 20,
              padding: 12,
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                letterSpacing: 5,
              }}
            >
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ margin: 10, textAlign: "center" }}>Or</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              paddingTop: 20,
              paddingLeft: 80,
              paddingRight: 10,
              textAlign: "center",
            }}
          >
            Do not have an account?
          </Text>
          <Pressable style={{ paddingTop: 20, paddingRight: 10 }}>
            <Text
              style={{
                color: "orange",
                fontWeight: "bold",
                fontSize: 14,
                textAlign: "left",
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
