import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import Logo from "../components/atoms/Logo";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { SERVER_URL } from "../config/variables";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addPatient } from "../store/actions/patientAction";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
let genderColor = ["white", "#151E3F"];
var textIconColor = ["#151E3F", "white"];

const RegisterPatient = ({ addPatient }) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    uhid: "",
    firstName: "",
    lastName: "",
    address: "",
    age: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [genderSelector, setGenderSelector] = useState();

  const handleRegister = async () => {
    data.age = parseInt(data.age);
    data.phone = parseInt(data.phone);
    setLoader(true);
    if (
      !(
        data.uhid &&
        data.firstName &&
        data.lastName &&
        data.address &&
        data.age &&
        data.email &&
        data.gender &&
        data.phone
      )
    ) {
      ToastAndroid.show("Please Fill All Details", ToastAndroid.SHORT);
      return;
    }
    try {
      console.log(data);
      const response = await axios.post(
        `${SERVER_URL}/api/v1/patient/register/`,
        data
      );
      console.log(response.patient);
      ToastAndroid.show("Patient Registered", ToastAndroid.SHORT);
      setLoader(false);
      setData("");
      // addPatient({ patient: response.patient });
      // navigation.navigate("PatientEntry", { data: response.patient });
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something Went Wrong", ToastAndroid.SHORT);
      setLoader(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.bannerText}>Add Pateint Details </Text>
        <Text style={styles.bannerSubText}>
          Please Fill Pateint Details here and submit it to the OCTA PRM
        </Text>
      </View>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.itemName}>Enter Pateint Name</Text>
        <TextInput
          value={data.firstName}
          onChangeText={(e) => setData({ ...data, firstName: e })}
          placeholder="First Name"
          style={styles.input}
        />
        <TextInput
          value={data.lastName}
          onChangeText={(e) => setData({ ...data, lastName: e })}
          placeholder="Last Name"
          style={styles.input}
        />
        <Text style={styles.itemName}>Enter UHID</Text>
        <TextInput
          value={data.uhid}
          keyboardType="number-pad"
          onChangeText={(e) => setData({ ...data, uhid: e })}
          placeholder="UHID"
          style={styles.input}
        />
        <Text style={styles.itemName}>Enter Email Address</Text>
        <TextInput
          value={data.email}
          onChangeText={(e) => setData({ ...data, email: e })}
          placeholder="Email"
          style={styles.input}
        />
        <Text style={styles.itemName}>Enter Pateint Age</Text>
        <TextInput
          value={data.age}
          onChangeText={(e) => setData({ ...data, age: e.toString() })}
          keyboardType="number-pad"
          placeholder="Age"
          style={styles.input}
        />
        <Text style={[styles.itemName, { paddingHorizontal: 5 }]}>
          Select Gender
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              backgroundColor: `${
                genderSelector === 0 ? genderColor[1] : genderColor[0]
              }`,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 7,
              alignItems: "center",
            }}
            onPress={() => {
              setGenderSelector(0);
              setData({ ...data, gender: "M" });
            }}
          >
            <Ionicons
              name="male-outline"
              color={`${
                genderSelector === 0 ? textIconColor[1] : textIconColor[0]
              }`}
              size={30}
            />
            <Text
              style={[
                styles.itemName,
                {
                  color: `${
                    genderSelector === 0 ? textIconColor[1] : textIconColor[0]
                  }`,
                },
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              backgroundColor: `${
                genderSelector === 1 ? genderColor[1] : genderColor[0]
              }`,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 7,
              alignItems: "center",
            }}
            onPress={() => {
              setGenderSelector(1);
              setData({ ...data, gender: "F" });
            }}
          >
            <Ionicons
              name="female-outline"
              color={`${
                genderSelector === 1 ? textIconColor[1] : textIconColor[0]
              }`}
              size={30}
            />
            <Text
              style={[
                styles.itemName,
                {
                  color: `${
                    genderSelector === 1 ? textIconColor[1] : textIconColor[0]
                  }`,
                },
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              backgroundColor: `${
                genderSelector === 2 ? genderColor[1] : genderColor[0]
              }`,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 7,
              alignItems: "center",
            }}
            onPress={() => {
              setGenderSelector(2);
              setData({ ...data, gender: "O" });
            }}
          >
            <Ionicons
              name="male-female-outline"
              color={`${
                genderSelector === 2 ? textIconColor[1] : textIconColor[0]
              }`}
              size={30}
            />
            <Text
              style={[
                styles.itemName,
                {
                  color: `${
                    genderSelector === 2 ? textIconColor[1] : textIconColor[0]
                  }`,
                },
              ]}
            >
              Others
            </Text>
          </TouchableOpacity>
          {/* <Picker
            selectedValue={data.gender}
            onValueChange={(itemValue, itemIndex) =>
              setData({ ...data, gender: itemValue })
            }
          >
            <Picker.Item value="" label="Select Gender" />
            <Picker.Item value="M" label="Male" />
            <Picker.Item value="F" label="Female" />
            <Picker.Item value="O" label="Others" />
          </Picker> */}
        </View>
        <Text style={styles.itemName}>Enter Phone Number</Text>
        <TextInput
          keyboardType="number-pad"
          value={data.phone}
          onChangeText={(e) => setData({ ...data, phone: e.toString() })}
          placeholder="Phone"
          style={styles.input}
        />
        <Text style={styles.itemName}>Enter Address</Text>
        <TextInput
          value={data.address}
          onChangeText={(e) => setData({ ...data, address: e })}
          placeholder="Address"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#0F7173",
            padding: 15,
            borderRadius: 10,
            marginVertical: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              letterSpacing: 4,
              fontFamily: "Poppins-Bold",
            }}
          >
            Add Details
          </Text>
          <ActivityIndicator
            animating={loader}
            color={"white"}
            size={"small"}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: "Poppins-Medium",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    width: width,
  },
  rowInput: {
    width: width * 0.4,
  },
  header: {
    backgroundColor: "#030027",
    width: width,
    height: height * 0.2,
    padding: 20,
    borderBottomRightRadius: 40,
  },
  bannerText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  bannerSubText: {
    color: "white",
    fontFamily: "SFPRODISPLAYREGULAR",
  },
  itemName: {
    fontFamily: "Poppins-Medium",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addPatient: (item) => dispatch(addPatient(item)),
  };
};
export default connect(null, mapDispatchToProps)(RegisterPatient);
