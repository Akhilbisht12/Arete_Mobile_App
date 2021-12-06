import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Touchable,
  Dimensions,
  Modal,
  Alert,
  Pressable,
  Picker,
} from "react-native";
import { Button, Text, Radio, RadioGroup, Input } from "react-native-ui-kitten";
import axios from 'axios'

const { width, height } = Dimensions.get("window");

const PatientEntry = ({ route }) => {
  const [showAction, setShowAction] = useState(false);
  const [isAdmission, setisAdmission] = useState(0);
  const [selectedAdmPkg, setSelectedAdmPkg] = useState(0);

  const data = route.params.data;
  const handlePostOPDRecommSubmit = () =>{
    axios.post('https://147d-103-84-238-243.ngrok.io/api/v1/patient/admissions/add', {
      patientID : data._id,
      admissionPackage : selectedAdmPkg
    })
    .then((res)=>{
      console.log(res)
      Alert.alert(res.data.message)
    })
  }
  return (
    <View style={Styles.main}>
      <View style={Styles.spaceBetween}>
        <View>
          <View style={Styles.nameView}>
            <Text category="h6">
              {data.gender} {data.firstName} {data.lastName} {data.age}
              {data.gender}
            </Text>
            <Text category="h6">
              {data.uhid} {data.stage}
            </Text>
            <Text category="h6">{data.date}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text>Doctor Recommendations</Text>
            <View style={{ backgroundColor: "lightyellow", padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Admission Advised ?</Text>
                <View>
                  <RadioGroup
                    selectedIndex={isAdmission}
                    onChange={(index) => setisAdmission(index)}
                    style={{ flexDirection: "row" }}
                  >
                    <Radio style={{ marginHorizontal: 10 }}>Yes</Radio>
                    <Radio style={{ marginHorizontal: 10 }}>No</Radio>
                  </RadioGroup>
                </View>
              </View>

              <View style={{ display: isAdmission == 0 ? "flex" : "none" }}>
                <Text>Select admission Package</Text>
                <Picker
                  selectedValue={selectedAdmPkg}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedAdmPkg(itemValue)
                  }
                >
                  <Picker.Item label="CABG" value={120000} />
                  <Picker.Item label="Some other surgery" value={100000} />
                </Picker>
                <Text
                  style={{
                    padding: 10,
                    textAlign: "center",
                    backgroundColor: "lightblue",
                    borderRadius: 5,
                    marginVertical: 10,
                  }}
                >
                  {selectedAdmPkg.valueOf(selectedAdmPkg)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button onPress={handlePostOPDRecommSubmit}>Update</Button>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAction}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowAction(!showAction);
        }}
      >
        <View style={Styles.popup}>
          <View style={Styles.rowSpaceBetween}>
            <Text>Update</Text>
            <Pressable
              style={{ backgroundColor: "pink", padding: 10 }}
              onPress={() => setShowAction(false)}
            >
              <Text>X</Text>
            </Pressable>
          </View>
          <Text>hello</Text>
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
  },
  nameView: {
    padding: 10,
    backgroundColor: "pink",
  },
  spaceBetween: {
    flex: 1,
    justifyContent: "space-between",
  },
  popup: {
    backgroundColor: "pink",
    width: 0.8 * width,
    height: 0.2 * height,
    top: 0.4 * height,
    left: 0.1 * width,
    borderRadius: 5,
    padding: 15,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PatientEntry;
