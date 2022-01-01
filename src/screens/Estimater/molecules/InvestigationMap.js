import React from "react";
import { View, Text, Pressable } from "react-native";
import { connect } from "react-redux";
import { addNewInvestigation } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import Investigation from "../atoms/Investigation";

const InvestigationMap = ({ addNewInvestigation, advice }) => {
  return (
    <ColumnStart>
      <View>
        {advice.investigations.map((item, index) => {
          return <Investigation key={index} item={item} index={index} />;
        })}
        <Pressable style={{ marginVertical: 5 }} onPress={() => addNewInvestigation()}>
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
  );
};
const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewInvestigation : () => dispatch(addNewInvestigation())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationMap);
