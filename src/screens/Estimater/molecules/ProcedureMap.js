import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { connect } from "react-redux";
import { addNewProcedure, addProcedureTotal } from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { calculateProcedure } from "../../../utils/EstimateCalculator";
import Procedure from "../atoms/Procedure";

const { width, height } = Dimensions.get("window");

const ProcedureMap = ({ addNewProcedure, advice, addProcedureTotal }) => {
  return (
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProcedureMap);
