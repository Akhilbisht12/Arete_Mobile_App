import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-ui-kitten";

const patientComp = ({ item }) => {
    const navigation = useNavigation()
  return (
    <View style={Styles.main}>
      <TouchableOpacity onPress={()=>navigation.navigate('PatientEntry', {data : item})}>
        <View style={Styles.consultTypeView}>
          <Text category="label">{item.status}</Text>
          <Text category="label">{item.createdAt}</Text>
        </View>
        <View>
          <Text>
            {item.gender} {item.firstName} {item.lastName}
          </Text>
        </View>
        <View>
          <Text>UHID: {item.uhid}</Text>
        </View>
        <View>
          <Text>{item.stage}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
  },
  consultTypeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default patientComp;
