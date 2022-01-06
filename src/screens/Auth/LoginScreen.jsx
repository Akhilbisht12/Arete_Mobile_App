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
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ display: "flex", padding: 20, alignItems: "center" }}>
      <Image
        source={require("../../../assets/logo/logo.png")}
        style={{
          height: 50,
          width: 200,
          marginTop: 50,
        }}
      />
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 15,
          margin: 25,
          textAlign: "center",
        }}
      >
        We are leading Hospital Management Tool
      </Text>
      <View style={{ marginTop: 50 }}>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
            }}
          >
            Agent ID
          </Text>
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="Enter Agent ID"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
            }}
          >
            Password
          </Text>
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
              style={{
                textAlign: "right",
                paddingTop: 5,
                color: "orange",
                fontFamily: "Poppins-Medium",
              }}
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
                textAlign: "center",
                letterSpacing: 5,
                fontFamily: "Poppins-Medium",
              }}
            >
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            margin: 10,
            textAlign: "center",
            fontFamily: "Poppins-Medium",
          }}
        >
          Or
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              paddingTop: 20,
              marginRight: 10,
              fontFamily: "Poppins-Medium",
            }}
          >
            Do not have an account?
          </Text>
          <Pressable
            style={{ paddingTop: 20, paddingRight: 10 }}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text
              style={{
                color: "orange",
                fontFamily: "Poppins-Bold",
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
