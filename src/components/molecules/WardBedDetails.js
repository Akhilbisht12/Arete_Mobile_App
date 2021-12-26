import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { BedFeeMaster } from "../../config/BedFee";
import { addWardBed, addWardStay } from "../../store/actions/adviceAction";
import { RowBetween } from "../../styles/FlexView";
const { width } = Dimensions.get("window");

const WardBedDetails = ({ addWardBed, addWardStay, advice }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totaltemp = 0;
    BedFeeMaster.map((item) => {
      if (item.Billing_Code === advice.wardBedType) {
        totaltemp += (advice.isEmergency?item.Emergency_Fee:item.IP_Fee)*advice.ward;
      }
    });
    setTotal(totaltemp);
  }, [advice]);
  return (
    <RowBetween>
      <View style={{ width: width * 0.45 }}>
        <Picker
          selectedValue={advice.wardBedType}
          onValueChange={(itemValue, itemIndex) =>
            addWardBed({ wardBed: itemValue })
          }
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

      <View style={{ width: width * 0.25 }}>
        <Text>Ward Stay</Text>
        <TextInput
          textContentType="telephoneNumber"
          onChangeText={(text) => addWardStay({ wardStay: text })}
          value={advice.ward}
          keyboardType="number-pad"
          placeholder="Ward"
          style={styles.input}
        />
      </View>
      <View style={{ width: width * 0.3 }}>
        <Text>{total} INR</Text>
      </View>
    </RowBetween>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.2,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWardBed: (item) => dispatch(addWardBed(item)),
    addWardStay: (item) => dispatch(addWardStay(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WardBedDetails);
