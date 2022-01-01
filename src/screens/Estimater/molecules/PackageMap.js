import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { connect } from "react-redux";
import { addNewPackage } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import Package from "../atoms/Package";

const PackageMap = ({ addNewPackage, advice }) => {
  return (
    <ColumnStart>
      <View>
        {advice.packages.map((item, index) => {
          return <Package key={index} item={item} index={index} />;
        })}
        <Pressable
          style={{ marginVertical: 5 }}
          onPress={() => addNewPackage()}
        >
          <Text
            style={{
              color: "blue",
            }}
          >
            Add a Package
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
    addNewPackage: () => dispatch(addNewPackage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageMap);
