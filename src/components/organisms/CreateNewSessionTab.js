import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  Dimensions,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { SERVER_URL } from "../../config/variables";
import { RowBetween, Row } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
import Advice from "../molecules/Advice";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

const initAdvice = [
  {
    id: 0,
    input: "",
    type: "",
    service: {
      Department_Name: "",
      Sub_Name: " ",
      Department_Type: "",
      ServiceId: 0,
      Ref_Service_Code: 0,
      Service_Name: "",
      OPD: 0,
      IPD: "",
      Four_Sharing: "",
      Twin_Sharing: "",
      Single_Room: "",
      Deluxe_Room: "",
      Suite_Room: "",
    },
  },
];

const ACTION = {
  ADD_ADVICE: "ADD_ADVICE",
  REMOVE_ADVICE: "REMOVE_ADVICE",
  EDIT_ADVICE: "EDIT_ADVICE",
};

const reducer = (advices, action) => {
  switch (action.type) {
    case ACTION.ADD_ADVICE:
      let pushadivce = advices;
      pushadivce.push({
        id: advices.length,
        input: "",
        type: "",
        service: {
          Department_Name: "",
          Sub_Name: " ",
          Department_Type: "",
          ServiceId: 0,
          Ref_Service_Code: 0,
          Service_Name: "",
          OPD: 0,
          IPD: "",
          Four_Sharing: "",
          Twin_Sharing: "",
          Single_Room: "",
          Deluxe_Room: "",
          Suite_Room: "",
        },
      });
      return [...pushadivce];
    case ACTION.REMOVE_ADVICE:
      return advices;
    case ACTION.EDIT_ADVICE:
      let temp = advices;
      const { id, input, type, service } = action.payload;
      temp[id].input = input;
      temp[id].type = type;
      temp[id].service = service;
      return [...temp];

    default:
      return advices;
  }
};

const DispatchContext = React.createContext();

const CreateNewSessionTab = ({ patientID }) => {
  const [advices, dispatch] = useReducer(reducer, initAdvice);
  const [bed, setBed] = useState("Four_Sharing");
  const [ward, setWard] = useState(0);
  const [icu, setIcu] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    var totalTemp = 0;
    advices.map((item) => {
      for (const [key, value] of Object.entries(item.service)) {
        if (key === bed) {
          totalTemp +=
            value === "" ? 0 : parseInt(value.replace(",", "")) * ward;
          console.log(totalTemp);
        }
      }
    });
    setTotal(totalTemp);
  }, [advices, ward, icu, bed, setWard, setIcu, setBed]);
  const handleCreateSession = async() => {
    const session = advices.map((item) => {
        return {
          serviceName: item.service.Service_Name,
          serviceId: item.service.ServiceId,
          departmentName: item.service.Department_Name,
          departmentType: item.service.Department_Type,
        };
      })
      console.log(session)
    const createSession = await axios.post(`${SERVER_URL}/api/v1/patient/createNewSession`, {
      patientID,
      bedType : bed,
      bedCode : 1,
      wardStay : ward,
      ICUStay : icu,
      estimate : total,
      services : session
    })
    console.log(createSession)

    if(createSession.status == 200){
      ToastAndroid.show('Session created successfull', ToastAndroid.SHORT)
      
    }else{
      ToastAndroid.show('Something went wrong please try again', ToastAndroid.SHORT)

    }

  };

  return (
    <PatientDetailedView style={{ backgroundColor: "#E4DFDA" }}>
      <RowBetween style={{ marginBottom: 8 }}>
        <View>
          <Picker
            style={{ width: width * 0.35 }}
            selectedValue={bed}
            onValueChange={(itemValue, itemIndex) => setBed(itemValue)}
          >
            <Picker.Item label="Four Sharing" value="Four_Sharing" />
            <Picker.Item label="Twin Sharing" value="Twin_Sharing" />
            <Picker.Item label="Single Room" value="Single_Room" />
            <Picker.Item label="Deluxe Room" value="Deluxe_Room" />
            <Picker.Item label="Suite Room" value="Suite_Room" />
          </Picker>
        </View>
        <View>
          <Text>Ward Stay</Text>
          <TextInput
            textContentType="telephoneNumber"
            onChangeText={(text) => setWard(text)}
            value={ward}
            keyboardType="number-pad"
            placeholder="Ward"
            style={styles.input}
          />
        </View>
        <View>
          <Text>ICU Stay</Text>
          <TextInput
            textContentType="telephoneNumber"
            value={icu}
            onChangeText={(text) => setIcu(text)}
            keyboardType="number-pad"
            placeholder="ICU"
            style={styles.input}
          />
        </View>
      </RowBetween>
      <DispatchContext.Provider value={dispatch}>
        {advices.map((item) => {
          return <Advice key={item.id} item={item} />;
        })}
      </DispatchContext.Provider>

      <Pressable
        style={{ marginVertical: 5, alignItems: "center" }}
        onPress={() => dispatch({ type: "ADD_ADVICE" })}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "lightblue",
            paddingVertical: 5,
            borderRadius: 5,
            width: 150,
          }}
        >
          Add doctor advice
        </Text>
      </Pressable>

      <View style={{ margin: 5 }}>
        <Text style={{ color: "green" }}>Est: {total}</Text>
      </View>
      <Pressable onPress={handleCreateSession} style={{ backgroundColor: "lightblue", padding: 10 }}>
        <Text style={{ textAlign: "center" }}>Create Session</Text>
      </Pressable>
    </PatientDetailedView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});

export default CreateNewSessionTab;
export { DispatchContext };
