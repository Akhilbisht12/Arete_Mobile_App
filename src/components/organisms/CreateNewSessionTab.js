import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SERVER_URL } from "../../config/variables";
import { RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
import Advice from "../molecules/Advice";
import { Picker } from "@react-native-picker/picker";
import WardBedDetails from "../molecules/WardBedDetails";
import IcuBedDetails from "../molecules/IcuBedDetails";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  addAdvice,
  addService,
  editAdvice,
  editIPDPackages,
  addCharge,
  editCharge,
  editEmergency,
  deleteAddCharge,
  addDoctor,
  addRemark,
  addPaymentCompany,
  addPaymentType,
} from "../../store/actions/adviceAction";
import Icon from "react-native-vector-icons/Ionicons";
import EstimatePreview from "./EstimatePreview";

const { width } = Dimensions.get("window");

const CreateNewSessionTab = ({
  patientID,
  advice,
  editIPDPackages,
  addAdvice,
  addCharge,
  editCharge,
  editEmergency,
  deleteAddCharge,
  addDoctor,
  addRemark,
  addPaymentCompany,
  addPaymentType,
}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    console.log(advice);
    var totalTemp = 0;
    advice.services.map((item) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === advice.wardBedType) {
          totalTemp +=
            value === "" ? 0 : parseInt(value.replace(",", "")) * advice.ward;
        }
      }
    });
    setTotal(totalTemp);
  }, [advice]);

  const handleCreateSession = async () => {
    const session = advice.services.map((item) => {
      return {
        serviceName: item.Service_Name,
        serviceId: item.ServiceId,
        departmentName: item.Department_Name,
        departmentType: item.Department_Type,
      };
    });
    const createSession = await axios.post(
      `${SERVER_URL}/api/v1/patient/createNewSession`,
      {
        patientID,
        bedType: advice.bedType,
        bedCode: 1,
        wardStay: advice.ward,
        ICUStay: advice.icu,
        estimate: total,
        services: session,
      }
    );
    if (createSession.status == 200) {
      ToastAndroid.show("Session created successfull", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Something went wrong please try again",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ScrollView>
      <PatientDetailedView style={{ backgroundColor: "#E4DFDA" }}>
        {/* select type of admission */}
        <Picker
          selectedValue={advice.isIPDPackage}
          onValueChange={(itemValue, itemIndex) =>
            editIPDPackages({ ipd: itemValue })
          }
        >
          <Picker.Item value={true} label="IPD Packages" />
          <Picker.Item value={false} label="Custom" />
        </Picker>
        <View
          style={{
            marginBottom: 8,
            display: advice.isIPDPackage ? "none" : "flex",
          }}
        >
          <WardBedDetails />
          <IcuBedDetails />
        </View>
        <RowBetween>
          <Text style={{ fontSize: 16 }}>Is Emergency</Text>
          <Pressable
            onPress={() => editEmergency({ emergency: !advice.isEmergency })}
          >
            <Icon
              name={advice.isEmergency ? "checkbox-outline" : "square-outline"}
              size={25}
            />
          </Pressable>
        </RowBetween>
        <View style={{ marginVertical: 5 }}>
          <RowBetween style={{ marginVertical: 2 }}>
            <TextInput
              value={advice.doctor}
              onChangeText={(text) => addDoctor({ doctor: text })}
              placeholder="Dr Name"
              style={[styles.input, { width: 0.43 * width }]}
            />
            <TextInput
              value={advice.remark}
              onChangeText={(text) => addRemark({ remark: text })}
              placeholder="Remarks"
              style={[styles.input, { width: 0.43 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <TextInput
              value={advice.paymentType}
              onChangeText={(text) => addPaymentType({ paymentType: text })}
              placeholder="Payment Type"
              style={[styles.input, { width: 0.43 * width }]}
            />
            <TextInput
              value={advice.paymentCompany}
              onChangeText={(text) => addPaymentCompany(text)}
              placeholder="Company"
              style={[styles.input, { width: 0.43 * width }]}
            />
          </RowBetween>
        </View>
        <View>
          {advice.services.map((item, index) => {
            return <Advice key={index} item={item} index={index} />;
          })}
          <Pressable style={{ marginVertical: 5 }} onPress={() => addAdvice()}>
            <Text
              style={{
                color: "blue",
              }}
            >
              Add a service
            </Text>
          </Pressable>
        </View>
        <View>
          {advice.addCharges.map((item, index) => {
            return (
              <RowBetween style={{ marginVertical: 2 }} key={index}>
                <TextInput
                  value={item.key}
                  onChangeText={(text) =>
                    editCharge({
                      key: text,
                      value: item.value,
                      chargeIndex: index,
                    })
                  }
                  placeholder="Key"
                  style={[styles.input, { width: 0.41 * width }]}
                />
                <TextInput
                  value={item.value}
                  keyboardType="number-pad"
                  onChangeText={(text) =>
                    editCharge({
                      key: item.key,
                      value: text,
                      chargeIndex: index,
                    })
                  }
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
                <Pressable
                  onPress={() => deleteAddCharge({ deleteChargeIndx: index })}
                >
                  <Icon name="trash" size={20} />
                </Pressable>
              </RowBetween>
            );
          })}

          <Pressable onPress={() => addCharge()}>
            <Text style={{ marginVertical: 5, color: "blue" }}>
              Add Additional Charges
            </Text>
          </Pressable>
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ color: "green" }}>Est: {total}</Text>
        </View>
        <Pressable
          onPress={handleCreateSession}
          style={{ backgroundColor: "lightblue", padding: 10, borderRadius: 5 }}
        >
          <Text style={{ textAlign: "center" }}>Preview</Text>
        </Pressable>
      </PatientDetailedView>
      <EstimatePreview/>
    </ScrollView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    editAdvice: (item) => dispatch(editAdvice(item)),
    editIPDPackages: (item) => dispatch(editIPDPackages(item)),
    addService: (item) => dispatch(addService(item)),
    addAdvice: () => dispatch(addAdvice()),
    addCharge: () => dispatch(addCharge()),
    editCharge: (item) => dispatch(editCharge(item)),
    editEmergency: (item) => dispatch(editEmergency(item)),
    deleteAddCharge: (item) => dispatch(deleteAddCharge(item)),
    addDoctor: (item) => dispatch(addDoctor(item)),
    addRemark: (item) => dispatch(addRemark(item)),
    addPaymentCompany: (item) => dispatch(addPaymentCompany(item)),
    addPaymentType: (item) => dispatch(addPaymentType(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewSessionTab);
