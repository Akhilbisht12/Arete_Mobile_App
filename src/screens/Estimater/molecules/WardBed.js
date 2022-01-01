import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { BedFeeMaster } from "../../../config/BedFee";
import { addWardBed, editStep } from "../../../store/actions/adviceAction";
import { ColumnStart } from "../../../styles/FlexView";
import { styles } from "../CreateEstimate";

const {width} = Dimensions.get('window')

const WardBed = ({ advice, addWardBed, editStep }) => {
  return (
    <ColumnStart>
      <Text style={styles.title}>Choose Ward Bed Category</Text>
      <View style={{ width: width * 0.85 }}>
        <Picker
          selectedValue={advice.wardBedType}
          onValueChange={(itemValue, itemIndex) => {
            editStep({ step: 2 });
            addWardBed({ wardBed: itemValue });
          }}
        >
          {BedFeeMaster.map((item) => {
            return (
              <Picker.Item
                key={item.Billing_Code}
                label={item.Bed_Category}
                value={item.Billing_Code}
              />
            );
          })}
        </Picker>
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
    addWardBed: (item) => dispatch(addWardBed(item)),
    editStep: (item) => dispatch(editStep(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WardBed);
