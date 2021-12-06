import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-ui-kitten";
import Filter from "../components/molecules/Filter";
import Search from "../components/molecules/Search";
import PatientComp from "../components/organisms/PatientComp";

const index = () => {
  const [AllPatients, setAllPatients] = useState([]);
  useEffect(() => {
    fetch("https://a648-122-177-113-128.ngrok.io/api/v1/patient")
      .then(async (response) => {
        const res = await response.json();
        setAllPatients(res.data)
        console.log(AllPatients);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Search />
      <Text style={{ textAlign: "center" }} category="h6" status="primary">
        Tasks
      </Text>
      <Filter />
      <Button>kitten button</Button>
      {AllPatients?AllPatients.map((item)=>{
        return(
          <PatientComp key={item._id} item={item}/>
        )
      }):null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 2,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
export default index;
