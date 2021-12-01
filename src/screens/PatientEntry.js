import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Touchable,
  Dimensions,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Text, Radio } from "react-native-ui-kitten";

const { width, height } = Dimensions.get("window");

const PatientEntry = ({ route }) => {
  const [showAction, setShowAction] = useState(false);
  const data = route.params.data;
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
          <View>
            <Text>Doctor Recommendations</Text>
            <View>
              <Radio status="basic" {...basicRadioState}>
                Basic
              </Radio>
            </View>
          </View>
        </View>
        <View>
          <Button
            onPress={() => {
              setShowAction(true);
            }}
          >
            Actions
          </Button>
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
            <Text>Actions</Text>
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
