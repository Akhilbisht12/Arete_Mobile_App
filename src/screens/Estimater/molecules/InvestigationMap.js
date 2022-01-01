import React from "react";
import { View, Text, Pressable, Dimensions, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  addInvestigationTotal,
  addNewInvestigation,
  editStep,
} from "../../../store/actions/adviceAction";
import { ColumnStart, RowBetween } from "../../../styles/FlexView";
import { EstimateBox } from "../../../styles/styledBoxes";
import Investigation from "../atoms/Investigation";
import styles from "../styles";
const {width} = Dimensions.get('window')

const InvestigationMap = ({
  addNewInvestigation,
  advice,
  addInvestigationTotal,
  editStep
}) => {
  return (
    <EstimateBox style={{ display: advice.step >= 11 ? "flex" : "none" }}>
      <ColumnStart>
        <Text style={styles.title}>Add Investigation</Text>
        <ColumnStart>
          <View>
            {advice.investigations.map((item, index) => {
              return <Investigation key={index} item={item} index={index} />;
            })}
            <Pressable
              style={{ marginVertical: 5 }}
              onPress={() => addNewInvestigation()}
            >
              <Text
                style={{
                  color: "blue",
                }}
              >
                Add a investigation
              </Text>
            </Pressable>
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
            Investigation
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="value"
            value={advice.investigation}
            onChangeText={(text) =>
              addInvestigationTotal({ investigationTotal: text })
            }
            style={[styles.input, { width: 0.41 * width }]}
          />
        </RowBetween>
      </ColumnStart>
      <View
        style={{
          alignItems: "flex-end",
          width: width * 0.85,
          display: advice.step === 11 ? "flex" : "none",
        }}
      >
        <Pressable style={styles.option} onPress={() => editStep({step : 12})}>
          <Text>Next</Text>
        </Pressable>
      </View>
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
    addNewInvestigation: () => dispatch(addNewInvestigation()),
    editStep: (item) => dispatch(editStep(item)),
    addInvestigationTotal: (item) => dispatch(addInvestigationTotal(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationMap);
