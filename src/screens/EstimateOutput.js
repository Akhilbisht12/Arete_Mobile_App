import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { RowBetween } from "../styles/FlexView";
import {
  calculateICU,
  calculatePackage,
  calculateRoom,
  calculateSurgery,
  doctorVisitCharges,
} from "../utils/EstimateCalculator";

const { width } = Dimensions.get("window");

const EstimateOutput = ({ patient, advice }) => {
  const info = patient.info;
  const calculateTotal = () => {
    let total = 0;
    total =
      doctorVisitCharges() +
      parseInt(advice.procedureTotal) +
      parseInt(advice.investigationTotal) +
      parseInt(advice.blood) +
      parseInt(advice.equipment) +
      parseInt(advice.medicine) +
      parseInt(advice.stent) +
      calculateICU() +
      calculateRoom() +
      calculatePackage() +
      calculateSurgery();
    return total;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "orange", padding: 12 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Estimate Preview
        </Text>
      </View>
      <View>
        {/* patient info and amount */}
        <RowBetween style={{ padding: 15 }}>
          <View style={{ width: 0.45 * width }}>
            <Text style={styles.titleh3}>
              Patient Name: {info.firstName} {info.lastName}
            </Text>
            <Text style={styles.titleh3}>UHID: {info.uhid}</Text>
            <Text style={styles.titleh3}>
              Admitting Doctor: {advice.doctor}
            </Text>
            <Text style={styles.titleh3}>
              Ward Bed Type: {advice.wardBedType}
            </Text>
            <Text
              style={[
                styles.titleh3,
                { display: advice.isIPDPackage ? "none" : "flex" },
              ]}
            >
              Ward Stay: {advice.ward}
            </Text>
            <Text
              style={[
                styles.titleh3,
                { display: advice.isIPDPackage ? "none" : "flex" },
              ]}
            >
              Icu Bed Type: {advice.icuBedType}
            </Text>
            <Text
              style={[
                styles.titleh3,
                { display: advice.isIPDPackage ? "none" : "flex" },
              ]}
            >
              Icu Bed Stay: {advice.icu}
            </Text>
          </View>
          <View style={{ width: 0.45 * width, alignItems: "flex-end" }}>
            <Text style={styles.titleh1}>Amount</Text>
            <View
              style={{
                backgroundColor: "orange",
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                ₹ {calculateTotal()}
              </Text>
            </View>
          </View>
        </RowBetween>
        {/* ipd non ipd info serction */}
        <View style={{ padding: 15 }}>
          <View style={{ display: advice.isIPDPackage ? "none" : "flex" }}>
            <Text style={{ fontWeight: "bold" }}>Surgery:</Text>
            {advice.services.map((item) => {
              return <Text key={item.Service_Id}>{item.Service_Name}</Text>;
            })}
          </View>
          <View style={{ display: advice.isIPDPackage ? "flex" : "none" }}>
            <Text style={{fontWeight : 'bold'}}>Package:</Text>
            {advice.packages.map((item) => {
              return <Text key={item.Service_Id}>{item.Service_Name}</Text>;
            })}
          </View>
        </View>
        {/* charges */}
        <View
          style={{
            padding: 10,
            display: advice.isIPDPackage ? "none" : "flex",
          }}
        >
          <RowBetween style={styles.list}>
            <Text>Bed Charges:</Text>
            <Text>{calculateRoom()} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>ICU Charges:</Text>
            <Text>{calculateICU()} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Total Bed Charges</Text>
            <Text>{calculateRoom() + calculateICU()} ₹</Text>
          </RowBetween>
        </View>
        <View
          style={{
            padding: 10,
            display: advice.isIPDPackage ? "none" : "flex",
          }}
        >
          <RowBetween style={styles.list}>
            <Text style={{ width: width * 0.6 }}>
              Surgery/Procedure (Surgeon Fee / OT & Anaesthesia):
            </Text>
            <Text>{calculateSurgery()} ₹</Text>
          </RowBetween>
        </View>
        <View
          style={{
            padding: 10,
            display: advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <RowBetween style={styles.list}>
            <Text>IPD Package Charge:</Text>
            <Text>{calculatePackage()} ₹</Text>
          </RowBetween>
        </View>
        <View style={{ padding: 10 }}>
          <RowBetween style={styles.list}>
            <Text>Implants / Stent / Valve / Grafts / Coils etc:</Text>
            <Text>{advice.stent} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Medicine & Consumables:</Text>
            <Text>{advice.medicine} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Investigations:</Text>
            <Text>{advice.investigationTotal} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Procedure:</Text>
            <Text>{advice.procedureTotal} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Doctor and visit charges:</Text>
            <Text>{doctorVisitCharges()} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Equipment Charges:</Text>
            <Text>{advice.equipment} ₹</Text>
          </RowBetween>
          <RowBetween style={styles.list}>
            <Text>Blood Charges:</Text>
            <Text>{advice.blood} ₹</Text>
          </RowBetween>
        </View>
      </View>
      {/* payment section */}
      <View style={{ margin: 10, padding: 10 }}>
        <View style={{ backgroundColor: "orange", marginVertical: 4, borderRadius : 4 }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              padding: 10,
            }}
          >
            Payment Method
          </Text>
        </View>
        <View>
          <RowBetween>
            <View
              style={{
                width: 0.45 * width,
                backgroundColor: "lightgray",
                borderRadius: 5,
                marginVertical: 5,
                padding: 10,
              }}
            >
              <Text>Payment Type</Text>
              <Text>{advice.paymentType}</Text>
            </View>
            <View
              style={{
                width: 0.45 * width,
                backgroundColor: "lightgray",
                borderRadius: 5,
                padding: 10,
                marginVertical: 4,
              }}
            >
              <Text>Insurance Company</Text>
              <Text>{advice.paymentCompany}</Text>
            </View>
          </RowBetween>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleh1: {
    fontSize: 18,
    fontWeight: "800",
  },
  titleh3: {
    fontSize: 14,
    fontWeight: "bold",
  },
  list: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
    backgroundColor: "lightgray",
  },
});

const mapStateToProps = (state) => {
  return {
    patient: state.patient,
    advice: state.advice,
  };
};

export default connect(mapStateToProps)(EstimateOutput);
