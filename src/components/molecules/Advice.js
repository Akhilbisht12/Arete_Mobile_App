import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { prescription } from "../../config/dummydata";
import { services } from "../../config/master";
import Icon from "react-native-vector-icons/Ionicons";
import { Row, RowBetween } from "../../styles/FlexView";
import { DispatchContext } from "../organisms/CreateNewSessionTab";

const { width, height } = Dimensions.get("window");

const Advice = ({ item }) => {
  const { input, type, id, service } = item;
  const [Prescription, setPrescription] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const dispatch = useContext(DispatchContext);

  // handle every tick on finding service
  const handleSearchPres = async (text) => {
    dispatch({
      type: "EDIT_ADVICE",
      payload: { input: text, id, type, service: {} },
    });
    const result = await services.filter((str) => {
      return str.Service_Name.toLowerCase().includes(text.toLowerCase());
    });
    setPrescription(result.slice(0, 100));
  };

  // handle selecting the service
  const handleSelectService = (serviceItem) => {
    setShowInput(false);
    dispatch({
      type: "EDIT_ADVICE",
      payload: {
        input: serviceItem.Service_Name,
        type,
        id,
        service: serviceItem,
      },
    });
  };

  return (
    <View>
      <View style={{ display: showInput ? "flex" : "none" }}>
        <TextInput
        placeholder='find service'
          value={input}
          onChangeText={(text) => handleSearchPres(text)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            marginVertical: 1,
            paddingVertical: 2,
            paddingHorizontal: 10,
          }}
        />
        <ScrollView
          style={{ marginVertical: 2, padding: 2, maxHeight: 0.15 * height }}
        >
          {input.length >= 4
            ? Prescription.map((item) => {
                return (
                  <Pressable
                    style={styles.service}
                    key={item.ServiceId}
                    onPress={() => handleSelectService(item)}
                  >
                    <Text>{item.Service_Name}</Text>
                  </Pressable>
                );
              })
            : null}
        </ScrollView>
      </View>
      <View
        style={{
          display: showInput ? "none" : "flex",
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: "lightgray",
          borderRadius: 5,
          marginVertical: 4,
        }}
      >
        <RowBetween>
          <View>
          <Text>{service.Service_Name}</Text>
          <Row>
          <Text style={styles.badge}>{service.Department_Name}</Text>
          <Text style={styles.badge}>{service.Department_Type}</Text>
          </Row>
          </View>
          <Text>{service.OPD}</Text>
        </RowBetween>
      </View>

      {/* <RowBetween style={{ marginVertical: 5 }}>
        <Pressable
          onPress={() =>
            dispatch({
              type: "EDIT_ADVICE",
              payload: { input, id, type: "admission" },
            })
          }
        >
          <Row>
            {type === "admission" ? (
              <Icon name="checkbox-outline" size={30} />
            ) : (
              <Icon name="square-outline" size={30} />
            )}
            <Text>Admission</Text>
          </Row>
        </Pressable>
        <Pressable
          onPress={() =>
            dispatch({
              type: "EDIT_ADVICE",
              payload: { input, id, type: "diagnosis" },
            })
          }
        >
          <Row>
            {type === "diagnosis" ? (
              <Icon name="checkbox-outline" size={30} />
            ) : (
              <Icon name="square-outline" size={30} />
            )}
            <Text>Diagnosis</Text>
          </Row>
        </Pressable>
        <Pressable
          onPress={() =>
            dispatch({
              type: "EDIT_ADVICE",
              payload: { input, id, type: "petct" },
            })
          }
        >
          <Row>
            {type === "petct" ? (
              <Icon name="checkbox-outline" size={30} />
            ) : (
              <Icon name="square-outline" size={30} />
            )}
            <Text>PETCT</Text>
          </Row>
        </Pressable>
        <Pressable
          onPress={() =>
            dispatch({
              type: "EDIT_ADVICE",
              payload: { input, id, type: "radiology" },
            })
          }
        >
          <Row>
            {type === "radiology" ? (
              <Icon name="checkbox-outline" size={30} />
            ) : (
              <Icon name="square-outline" size={30} />
            )}
            <Text>Radiology</Text>
          </Row>
        </Pressable>
      </RowBetween> */}
    </View>
  );
};

const styles = StyleSheet.create({
  service: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "lightgray",
    marginVertical: 2,
    borderRadius: 5,
  },
  badge : {
    backgroundColor : 'blue',
    color : 'white',
    paddingVertical : 2,
    paddingHorizontal : 5,
    borderRadius : 5,
    margin : 2
  }
});

export default Advice;
