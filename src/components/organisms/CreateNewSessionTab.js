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
import {useNavigation} from '@react-navigation/native'

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
  const navigation = useNavigation()
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
    <View style={{flex : 1, justifyContent : 'flex-end', marginVertical : 20, padding : 10}}>
      <Text>choose type of estimate</Text>
    </View>
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
