import React from "react";
import { Text, Pressable } from "react-native";
import { connect } from "react-redux";
import { editIPDPackages, editStep } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import styles from "../styles";

const EstimateType = ({ advice, editIPDPackages, editStep }) => {
  return (
    <EstimateBox>
      <ColumnStart>
        <Text style={styles.title}>Choose type of estimate</Text>
        <Pressable
          style={[
            styles.option,
            {
              backgroundColor:
                advice.step >= 1 && advice.isIPDPackage
                  ? "lightblue"
                  : "lightgray",
            },
          ]}
          onPress={() => {
            editStep({ step: 1 });
            editIPDPackages({ ipd: true });
          }}
        >
          <Text>Packaged</Text>
        </Pressable>
        <Pressable
          style={[
            styles.option,
            {
              backgroundColor:
                advice.step >= 1 && !advice.isIPDPackage
                  ? "lightblue"
                  : "lightgray",
            },
          ]}
          onPress={() => {
            editStep({ step: 1 });
            editIPDPackages({ ipd: false });
          }}
        >
          <Text>Non Packaged</Text>
        </Pressable>
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
    editIPDPackages: (item) => dispatch(editIPDPackages(item)),
    editStep: (item) => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EstimateType);
