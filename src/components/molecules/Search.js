import React from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-ui-kitten";

const Search = () => {
  const [value, setValue] = React.useState("");

  return (
    <Input
      placeholder="Search with patient name or ID   "
      value={value}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};

export default Search;
