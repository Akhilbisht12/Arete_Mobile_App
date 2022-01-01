import React from "react";
import { View, Text, Pressable, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  addNewProcedure,
  addProcedureTotal,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import { calculateProcedure } from "../../../utils/EstimateCalculator";
import Procedure from "../atoms/Procedure";
import styles from "../styles";

const { width, height } = Dimensions.get("window");

const ProcedureMap = ({
  addNewProcedure,
  advice,
  addProcedureTotal,
  editStep,
}) => {
  return (
    <EstimateBox style={{ display: advice.step >= 12 ? "flex" : "none" }}>
      <ColumnStart>
        <Text style={styles.title}>Add Procedures</Text>
        <ColumnStart>
          <View>
            {advice.procedures.map((item, index) => {
              return <Procedure key={index} item={item} index={index} />;
            })}
            <RowBetween>
              <Pressable
                style={{ marginVertical: 5 }}
                onPress={() => addNewProcedure()}
              >
                <Text
                  style={{
                    color: "blue",
                  }}
                >
                  Add a Procedure
                </Text>
              </Pressable>
              <Pressable
                style={{ marginVertical: 5 }}
                onPress={() =>
                  addProcedureTotal({ procedureTotal: calculateProcedure() })
                }
              >
                <Text
                  style={{
                    color: "blue",
                  }}
                >
                  calculate Total {calculateProcedure()}
                </Text>
              </Pressable>
            </RowBetween>
          </View>
        </ColumnStart>
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
            Procedures
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="value"
            value={advice.procedureTotal}
            onChangeText={(text) => addProcedureTotal({ procedureTotal: text })}
            style={[styles.input, { width: 0.41 * width }]}
          />
        </RowBetween>
        <View
          style={{
            alignItems: "flex-end",
            width: width * 0.85,
            display: advice.step === 12 ? "flex" : "none",
          }}
        >
          <Pressable
            style={styles.option}
            onPress={() => editStep({ step: 13 })}
          >
            <Text>Next</Text>
          </Pressable>
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
const mapDispatchToProps = (dispatch) => {
  return {
    addNewProcedure: () => dispatch(addNewProcedure()),
    addProcedureTotal: (item) => dispatch(addProcedureTotal(item)),
    editStep: (item) => dispatch(editStep(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProcedureMap);
