import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { BedFeeMaster } from "../../config/BedFee";
import { ColumnCenter, RowBetween } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
const { width } = Dimensions.get("window");
const EstimatePreview = ({ advice }) => {
  const [wardTotal, setWardTotal] = useState(0);
  const [icuTotal, setIcuTotal] = useState(0);
  useEffect(() => {
    let wardTotal = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.wardBedType) {
        wardTotal +=
          (advice.isEmergency ? item.Emergency_Fee : item.IP_Fee) * advice.ward;
      }
      setWardTotal(wardTotal);
    });
  }, [advice]);
  useEffect(() => {
    let icutotal = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.icuBedType) {
        icutotal +=
          (advice.isEmergency ? item.Emergency_Fee : item.IP_Fee) * advice.icu;
      }
      setIcuTotal(icutotal);
    });
  }, [advice]);
  return (
    <PatientDetailedView style={{ backgroundColor: "lightgray" }}>
      <ColumnCenter>
        <Text>
          {advice.isIPDPackage ? "IPD Package Estimate" : "Bill Estimate"}
        </Text>
        <RowBetween style={{ width: 0.85 * width, marginVertical : 5 }}>
          <View>
            <Text>patient name</Text>
            <Text>patient age</Text>
            <Text>patient dob</Text>
            <Text>patient phone</Text>
            <Text>patient email</Text>
          </View>
          <View>
            <Text>Emergency: {advice.isEmergency ? "Yes" : "No"}</Text>
            <Text>Doctor: {advice.doctor}</Text>
            <Text>Payment Type: {advice.paymentType}</Text>
            <Text>Payment Company: {advice.paymentCompany}</Text>
          </View>
        </RowBetween>
        <RowBetween style={{ width: 0.85 * width,marginVertical : 5 }}>
          <View>
            <Text>Total Ward Days: {advice.ward}</Text>
            <Text>Ward Bed Category: {advice.wardBedType}</Text>
            <Text>Total Ward Amout: {wardTotal}</Text>
          </View>
          <View>
            <Text>Total ICU Days: {advice.icu}</Text>
            <Text>ICU Bed Category: {advice.icuBedType}</Text>
            <Text>Total ICU Amout: {icuTotal}</Text>
          </View>
        </RowBetween>

        <Text>Services:</Text>
        {advice.services.map((item) => {
          return (
            <View>
              <Text>{item.Service_Name}</Text>
              <View
                style={{
                  display: item.Department_Type === "SURGERY" ? "flex" : "none",
                }}
              >
                <Text>Surgeon Fee: {item.OPD ? item.OPD : ""}</Text>
                <Text>
                  Assistant Surgeon:{" "}
                  {item.OPD ? parseInt(item.OPD.replace(",", "")) * 0.3 : ""}
                </Text>
                <Text>
                  OT Charges:{" "}
                  {item.OPD ? parseInt(item.OPD.replace(",", "")) * 0.9 : ""}
                </Text>
                <Text>
                  Aneasthetist:{" "}
                  {item.OPD ? parseInt(item.OPD.replace(",", "")) * 0.35 : ""}
                </Text>
                <Text>
                  OT Gases:{" "}
                  {item.OPD ? parseInt(item.OPD.replace(",", "")) * 0.15 : ""}
                </Text>
              </View>
            </View>
          );
        })}
        <View>
          {advice.addCharges.map((item, index) => {
            return (
              <Text key={index}>
                {item.key}: {item.value}
              </Text>
            );
          })}
        </View>
      </ColumnCenter>
    </PatientDetailedView>
  );
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps)(EstimatePreview);
