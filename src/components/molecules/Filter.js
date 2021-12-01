import React from "react";
import { View, Text } from "react-native";
import { Input, Icon } from "react-native-ui-kitten";

const Filter = () => {
  const [value, setValue] = React.useState("");

  return (
    <Input
      placeholder="Filters"
      value={value}
      accessoryRight={props=><Icon {...props} name='eye'/>}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};

export default Filter;
