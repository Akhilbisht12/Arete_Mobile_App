import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PatientCard from "../../styles/PatientSearchResultCard";
import ParaText from "../../styles/ParaText";
import SubHeadingText from "../../styles/SubHeadingText";
import { Row, RowBetween } from "../../styles/FlexView";
import HeadingText from "../../styles/HeadingText";
import ImgBox from "../../styles/ImgBox";
import Icon from "react-native-vector-icons/Ionicons";
import { addPatient } from "../../store/actions/patientAction";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
const PatientComp = ({ item, addPatient }) => {
  const navigation = useNavigation();
  const handleSelectPatient = () => {
    addPatient({ patient: item });
    navigation.navigate("PatientEntry", { data: item });
  };
  return (
    <PatientCard style={{ marginVertical: 10 }}>
      <Pressable onPress={handleSelectPatient}>
        <Row>
          <ImgBox>
            <HeadingText>{item.firstName[0].toUpperCase()}</HeadingText>
          </ImgBox>
          <RowBetween style={{ width: 0.75 * width }}>
            <View>
              <Row>
                <SubHeadingText>{item.gender} </SubHeadingText>
                <SubHeadingText>{item.firstName}</SubHeadingText>
                <SubHeadingText> {item.lastName}</SubHeadingText>
              </Row>
              <ParaText>UHID: {item.uhid}</ParaText>
            </View>
            <ParaText> Age: {item.age}</ParaText>
          </RowBetween>
        </Row>
        <RowBetween style={{ marginTop: 5, paddingHorizontal: 5 }}>
          <Row>
            <Icon size={20} color={"#E4DFDA"} name="mail-outline" />
            <ParaText>{item.email}</ParaText>
          </Row>
          <Row>
            <Icon size={20} color={"#E4DFDA"} name="call-outline" />
            <ParaText>{item.phone}</ParaText>
          </Row>
        </RowBetween>
      </Pressable>
    </PatientCard>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPatient: (item) => dispatch(addPatient(item)),
  };
};

export default connect(null, mapDispatchToProps)(PatientComp);
