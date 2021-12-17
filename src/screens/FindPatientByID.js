import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SERVER_URL } from "../config/variables";
import PatientComp from "../components/organisms/PatientComp";
import StyledInput from "../styles/StyledInputView";
import StyledInputView from "../styles/StyledInputView";
import { Row, RowBetween } from "../styles/FlexView";
import Icon from "react-native-vector-icons/Ionicons";

const FindPatientByID = ({ navigation }) => {
  const [patientID, setpatientID] = useState("");
  const [patients, setPatients] = useState([]);
  const [Loading, setLoading] = useState(false);
  const findPatientByID = async (text) => {
    setLoading(true);
    try {
      const patients = await axios.post(
        `${SERVER_URL}/api/v1/patient/findPatientByID`,
        {
          patientID: text,
        }
      );
      setLoading(false);
      setPatients(patients.data.patients);
    } catch (error) {
      console.log(error);
      Alert.alert("something went wrong");
      setLoading(false);
    }
  };
  const handlePatientSearch = (text) => {
    setpatientID(text);
    if (text.length > 2) {
      findPatientByID(text);
    }
  };
  return (
    <View>
      <StyledInputView>
        <RowBetween>
          <Row>
            <Icon name="person" size={25} color={"#4281A4"} />
            <TextInput
              style={{ height: 45, marginHorizontal: 5 }}
              placeholder="Search Patient By ID"
              onChangeText={(text) => handlePatientSearch(text)}
            />
          </Row>
          {Loading ? (
            <ActivityIndicator size='small' color='#4281A4' />
          ) : (
            <Icon name="search-outline" size={25} color={"#4281A4"} />
          )}
        </RowBetween>
      </StyledInputView>
      <View>
        {patients.map((item) => {
          return <PatientComp key={item._id} item={item} />;
        })}
      </View>
    </View>
  );
};

export default FindPatientByID;
