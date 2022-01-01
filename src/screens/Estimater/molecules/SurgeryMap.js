import React from "react";
import { View, Text, Pressable } from "react-native";
import { connect } from "react-redux";
import { addAdvice } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import Surgery from "../atoms/Surgery";


const SurgeryMap = ({ addAdvice, advice }) => {
  return (
    <ColumnStart>
      <View>
        {advice.services.map((item, index) => {
          return <Surgery key={index} item={item} index={index} />;
        })}
        <Pressable style={{ marginVertical: 5 }} onPress={() => addAdvice()}>
          <Text
            style={{
              color: "blue",
            }}
          >
            Add a service
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
    addAdvice: () => dispatch(addAdvice()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurgeryMap);
