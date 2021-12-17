import React from "react";
import { View, Text, ScrollView } from "react-native";
import PatientDetailedView from "../styles/PatientDetailsView";

const DetailedSession = ({ route }) => {
  const Session = route.params.data;
  console.log(Session)
  console.log(Session);
  return (
    <ScrollView>
      {Session.activity.map((item) => {
        return (
          <PatientDetailedView key={item._id}>
            <Text>{item.activityType}</Text>
            <Text>{item.activityID}</Text>
          </PatientDetailedView>
        );
      })}
    </ScrollView>
  );
};

export default DetailedSession;
