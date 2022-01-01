import React from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  addBloodRequirement,
  addEquipmentCharge,
  addMedicineCharge,
  addStent,
  addVisitTotal,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import styles from "../styles";
const {width} = Dimensions.get('window')

const MultiCharges = ({
  advice,
  addMedicineCharge,
  addVisitTotal,
  addBloodRequirement,
  addEquipmentCharge,
  addStent,
}) => {
  return (
    <EstimateBox style={{ display: advice.step >= 13 ? "flex" : "none" }}>
      <ColumnStart>
        <View>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Visit Charge
            </Text>
            <TextInput
              value={advice.visitTotal}
              onChangeText={(text) => addVisitTotal({ visitTotal: text })}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Medicine Charge
            </Text>
            <TextInput
              value={advice.medicine}
              onChangeText={(text) => addMedicineCharge({ medicine: text })}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Equipment Charge
            </Text>
            <TextInput
              value={advice.equipment}
              onChangeText={(text) => addEquipmentCharge(text)}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Blood Requirement
            </Text>
            <TextInput
              value={advice.blood}
              onChangeText={(text) => addBloodRequirement({ blood: text })}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
          <RowBetween style={{ marginVertical: 2 }}>
            <Text
              style={{
                width: 0.41 * width,
                paddingHorizontal: 10,
                fontSize: 17,
                fontWeight: "700",
                color: "gray",
              }}
            >
              Stent/Implant Cost
            </Text>
            <TextInput
              value={advice.stent}
              onChangeText={(text) => addStent({ stent: text })}
              keyboardType="number-pad"
              placeholder="value"
              style={[styles.input, { width: 0.41 * width }]}
            />
          </RowBetween>
        </View>
      </ColumnStart>
    </EstimateBox>
  );
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispacth) => {
  return {
    addVisitTotal: (item) => dispacth(addVisitTotal(item)),
    addMedicineCharge: (item) => dispacth(addMedicineCharge(item)),
    addBloodRequirement: (item) => dispacth(addBloodRequirement(item)),
    addEquipmentCharge: (item) => dispacth(addEquipmentCharge(item)),
    addStent: (item) => dispacth(addStent(item)),
    editStep : (item) => dispacth(editStep(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiCharges);
