import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Logo from "../components/atoms/Logo";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { SERVER_URL } from "../config/variables";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addPatient } from "../store/actions/patientAction";

const RegisterPatient = ({ addPatient }) => {
  const navigation = useNavigation();
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

  const handleRegister = async () => {
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
      const formdata = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
        console.log(key, value);
      }
      const response = await axios.post(
        `${SERVER_URL}/api/v1/patient/register/`,
        formdata
      );
      console.log(response.patient);
      ToastAndroid.show("Patient Registered", ToastAndroid.SHORT);
      addPatient({ patient: response.patient });
      navigation.navigate("PatientEntry", { data: response.patient });
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      console.log(error);
    }
  };
  return (
    <ScrollView style={{ margin: 10 }}>
      <Logo />

      <TextInput
        value={data.uhid}
        keyboardType="number-pad"
        onChangeText={(e) => setData({ ...data, uhid: e })}
        placeholder="UHID"
        style={styles.input}
      />
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
      <TextInput
        value={data.email}
        onChangeText={(e) => setData({ ...data, email: e })}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={data.age}
        onChangeText={(e) => setData({ ...data, age: e })}
        keyboardType="number-pad"
        placeholder="Age"
        style={styles.input}
      />
      <View style={styles.input}>
        <Picker
          selectedValue={data.gender}
          onValueChange={(itemValue, itemIndex) =>
            setData({ ...data, gender: itemValue })
          }
        >
          <Picker.Item value="" label="Select Gender" />
          <Picker.Item value="M" label="Male" />
          <Picker.Item value="F" label="Female" />
          <Picker.Item value="O" label="Others" />
        </Picker>
      </View>

      <TextInput
        value={data.address}
        onChangeText={(e) => setData({ ...data, address: e })}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        keyboardType="number-pad"
        value={data.phone}
        onChangeText={(e) => setData({ ...data, phone: e })}
        placeholder="Phone"
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#2d3e50",
          padding: 15,
          borderRadius: 5,
          marginVertical: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "lightgray",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    addPatient: (item) => dispatch(addPatient(item)),
  };
};
export default connect(null, mapDispatchToProps)(RegisterPatient);
