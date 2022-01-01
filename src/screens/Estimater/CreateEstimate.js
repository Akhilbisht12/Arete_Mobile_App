import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SERVER_URL } from "../../config/variables";
import { RowBetween, ColumnStart, Row } from "../../styles/FlexView";
import PatientDetailedView from "../../styles/PatientDetailsView";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  addAdvice,
  addService,
  editAdvice,
  editIPDPackages,
  addCharge,
  editCharge,
  editEmergency,
  deleteAddCharge,
  addDoctor,
  addRemark,
  addPaymentCompany,
  addPaymentType,
  addWardBed,
  addWardStay,
  addIcuBed,
  addIcuStay,
  addInvestigation,
  addMedicineCharge,
  addEquipmentCharge,
  addBloodRequirement,
  addInvestigationTotal,
  addStent,
  addVisitTotal,
  addProcedureTotal,
} from "../../store/actions/adviceAction";
import Icon from "react-native-vector-icons/Ionicons";
import EstimatePreview from "../../components/organisms/EstimatePreview";
import { useNavigation } from "@react-navigation/native";
import { BedFeeMaster } from "../../config/BedFee";
import { EstimateBox } from "../../styles/styledBoxes";
import SurgeryMap from "./molecules/SurgeryMap";
import InvestigationMap from "./molecules/InvestigationMap";
import ProcedureMap from "./molecules/ProcedureMap";
import PackageMap from "./molecules/PackageMap";
import { calculateRoom } from "../../utils/EstimateCalculator";
import EstimateType from "./molecules/EstimateType";
import WardBed from "./molecules/WardBed";

const { width, height } = Dimensions.get("window");

const CreateEstimate = ({
  patientID,
  advice,
  editIPDPackages,
  addAdvice,
  addCharge,
  editCharge,
  editEmergency,
  deleteAddCharge,
  addDoctor,
  addRemark,
  addPaymentCompany,
  addPaymentType,
  addWardBed,
  addWardStay,
  addIcuBed,
  addIcuStay,
  addInvestigationTotal,
  addProcedureTotal,
  addMedicineCharge,
  addEquipmentCharge,
  addBloodRequirement,
  addStent,
  addVisitTotal,
}) => {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    var totalTemp = 0;
    advice.services.map((item) => {
      for (const [key, value] of Object.entries(item)) {
        if (key === advice.wardBedType) {
          totalTemp +=
            value === "" ? 0 : parseInt(value.replace(",", "")) * advice.ward;
        }
      }
    });
    setTotal(totalTemp);
  }, [advice]);
  console.log(advice)

  const handleCreateSession = async () => {
    const session = advice.services.map((item) => {
      return {
        serviceName: item.Service_Name,
        serviceId: item.ServiceId,
        departmentName: item.Department_Name,
        departmentType: item.Department_Type,
      };
    });
    const createSession = await axios.post(
      `${SERVER_URL}/api/v1/patient/createNewSession`,
      {
        patientID,
        bedType: advice.bedType,
        bedCode: 1,
        wardStay: advice.ward,
        ICUStay: advice.icu,
        estimate: total,
        services: session,
      }
    );
    if (createSession.status == 200) {
      ToastAndroid.show("Session created successfull", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Something went wrong please try again",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-end",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          marginVertical: 20,
          padding: 10,
          justifyContent: "flex-end",
        }}
      >
        <EstimateBox>
          <EstimateType/>
        </EstimateBox>
        {/* choose ward bed category */}
        <EstimateBox
          style={{
            display: advice.step >= 1 && !advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <WardBed/>
        </EstimateBox>
        <EstimateBox
          style={{
            display: step >= 2 && !advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Type number of days to ward</Text>
            <TextInput
              onSubmitEditing={() => setStep(3)}
              textContentType="telephoneNumber"
              onChangeText={(text) => addWardStay({ wardStay: text })}
              value={advice.ward}
              keyboardType="number-pad"
              placeholder="Ward"
              style={styles.input}
            />
          </ColumnStart>
        </EstimateBox>
        {/* choose ward bed category */}
        <EstimateBox
          style={{
            display: step >= 3 && !advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Choose ICU Bed Category</Text>
            <View style={{ width: width * 0.85 }}>
              <Picker
                selectedValue={advice.icuBedType}
                onValueChange={(itemValue, itemIndex) => {
                  setStep(4);
                  addIcuBed({ icuBed: itemValue });
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
        </EstimateBox>
        <EstimateBox
          style={{
            display: step >= 4 && !advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Type number of days to ICU</Text>
            <TextInput
              textContentType="telephoneNumber"
              value={advice.icu}
              onSubmitEditing={() => setStep(5)}
              onChangeText={(text) => {
                addIcuStay({ icuStay: text });
              }}
              keyboardType="number-pad"
              placeholder="ICU"
              style={styles.input}
            />
          </ColumnStart>
        </EstimateBox>
        <EstimateBox style={{ display: step >= 5 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Is emergency case?</Text>
            <Row>
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      step >= 6 && advice.isEmergency
                        ? "lightblue"
                        : "lightgray",
                  },
                ]}
                onPress={() => {
                  setStep(6);
                  editEmergency({ emergency: true });
                }}
              >
                <Text>Yes</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      step >= 6 && !advice.isEmergency
                        ? "lightblue"
                        : "lightgray",
                  },
                ]}
                onPress={() => {
                  setStep(6);
                  editEmergency({ emergency: false });
                }}
              >
                <Text>No</Text>
              </Pressable>
            </Row>
          </ColumnStart>
        </EstimateBox>
        {/* enter doctors name */}
        <EstimateBox style={{ display: step >= 6 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Type Doctor's Name</Text>
            <TextInput
              value={advice.doctor}
              onChangeText={(text) => addDoctor({ doctor: text })}
              onSubmitEditing={() => setStep(7)}
              placeholder="Dr Name"
              style={[styles.input, { width: 0.43 * width }]}
            />
          </ColumnStart>
        </EstimateBox>
        <EstimateBox style={{ display: step >= 7 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Select Payment Mode</Text>
            <View style={{ width: width * 0.85 }}>
              <Picker
                selectedValue={advice.paymentType}
                onValueChange={(itemValue, itemIndex) => {
                  itemValue === "cash"
                    ? advice.isIPDPackage
                      ? setStep(10)
                      : setStep(9)
                    : setStep(8);
                  addPaymentType({ paymentType: itemValue });
                }}
              >
                <Picker.Item value="" label="Payment Mode" />
                <Picker.Item value="cash" label="Cash" />
                <Picker.Item value="echg-cghs" label="ECHG/CGHS" />
                <Picker.Item value="insurance" label="Insurance" />
              </Picker>
            </View>
          </ColumnStart>
        </EstimateBox>
        {/* payment company */}
        <EstimateBox
          style={{
            display:
              step >= 8 && advice.paymentType !== "cash" ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Select Payment Company</Text>
            <View style={{ width: width * 0.85 }}>
              <Picker
                selectedValue={advice.paymentCompany}
                onValueChange={(itemValue, itemIndex) => {
                  advice.isIPDPackage ? setStep(10) : setStep(9);
                  addPaymentCompany({ paymentCompany: itemValue });
                }}
              >
                <Picker.Item value="" label="Select Insurance Company" />
                <Picker.Item value="Insurance_1" label="Insurance_1" />
                <Picker.Item value="Insurance_2" label="Insurance_1" />
                <Picker.Item value="Inusrance_3" label="Insurance_1" />
              </Picker>
            </View>
          </ColumnStart>
        </EstimateBox>
        {/* add services  section */}
        <EstimateBox
          style={{
            display: step >= 9 && !advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Add Surgery</Text>
            <SurgeryMap />
            <View
              style={{
                alignItems: "flex-end",
                width: width * 0.85,
                display: step === 9 ? "flex" : "none",
              }}
            >
              <Pressable style={styles.option} onPress={() => setStep(11)}>
                <Text>Next</Text>
              </Pressable>
            </View>
          </ColumnStart>
        </EstimateBox>
        {/* add ipd package */}
        <EstimateBox
          style={{
            display: step >= 10 && advice.isIPDPackage ? "flex" : "none",
          }}
        >
          <ColumnStart>
            <Text style={styles.title}>Add Package</Text>
            <PackageMap />
            <View
              style={{
                alignItems: "flex-end",
                width: width * 0.85,
                display: step === 10 ? "flex" : "none",
              }}
            >
              <Pressable style={styles.option} onPress={() => setStep(11)}>
                <Text>Next</Text>
              </Pressable>
            </View>
          </ColumnStart>
        </EstimateBox>
        <EstimateBox style={{ display: step >= 11 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Add Investigation</Text>
            <InvestigationMap />
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
              display: step === 11 ? "flex" : "none",
            }}
          >
            <Pressable style={styles.option} onPress={() => setStep(12)}>
              <Text>Next</Text>
            </Pressable>
          </View>
        </EstimateBox>
        <EstimateBox style={{ display: step >= 12 ? "flex" : "none" }}>
          <ColumnStart>
            <Text style={styles.title}>Add Procedures</Text>
            <ProcedureMap />
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
                Procedures
              </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="value"
                value={advice.procedureTotal}
                onChangeText={(text) =>
                  addProcedureTotal({ procedureTotal: text })
                }
                style={[styles.input, { width: 0.41 * width }]}
              />
            </RowBetween>
            <View
              style={{
                alignItems: "flex-end",
                width: width * 0.85,
                display: step === 12 ? "flex" : "none",
              }}
            >
              <Pressable style={styles.option} onPress={() => setStep(13)}>
                <Text>Next</Text>
              </Pressable>
            </View>
          </ColumnStart>
        </EstimateBox>
        <EstimateBox style={{ display: step >= 13 ? "flex" : "none" }}>
          <ColumnStart>
            <View>
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
                  Visit Charge
                </Text>
                <TextInput
                  value={advice.visitTotal}
                  onChangeText={(text) => addVisitTotal({ visitTotal: text })}
                  keyboardType="number-pad"
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
              </RowBetween>
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
                  Medicine Charge
                </Text>
                <TextInput
                  value={advice.medicine}
                  onChangeText={(text) => addMedicineCharge({ medicine: text })}
                  keyboardType="number-pad"
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
              </RowBetween>
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
                  Equipment Charge
                </Text>
                <TextInput
                  value={advice.equipment}
                  onChangeText={(text) => addEquipmentCharge(text)}
                  keyboardType="number-pad"
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
              </RowBetween>
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
                  Blood Requirement
                </Text>
                <TextInput
                  value={advice.blood}
                  onChangeText={(text) => addBloodRequirement({ blood: text })}
                  keyboardType="number-pad"
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
              </RowBetween>
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
                  Stent/Implant Cost
                </Text>
                <TextInput
                  value={advice.stent}
                  onChangeText={(text) => addStent({ stent: text })}
                  keyboardType="number-pad"
                  placeholder="value"
                  style={[styles.input, { width: 0.41 * width }]}
                />
              </RowBetween>
            </View>
          </ColumnStart>
        </EstimateBox>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.4,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    borderRadius: 0,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  option: {
    backgroundColor: "lightgray",
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    marginVertical: 4,
  },
});


const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAdvice: (item) => dispatch(editAdvice(item)),
    editIPDPackages: (item) => dispatch(editIPDPackages(item)),
    addService: (item) => dispatch(addService(item)),
    addAdvice: () => dispatch(addAdvice()),
    addCharge: () => dispatch(addCharge()),
    editCharge: (item) => dispatch(editCharge(item)),
    editEmergency: (item) => dispatch(editEmergency(item)),
    deleteAddCharge: (item) => dispatch(deleteAddCharge(item)),
    addDoctor: (item) => dispatch(addDoctor(item)),
    addRemark: (item) => dispatch(addRemark(item)),
    addPaymentCompany: (item) => dispatch(addPaymentCompany(item)),
    addPaymentType: (item) => dispatch(addPaymentType(item)),
    addWardBed: (item) => dispatch(addWardBed(item)),
    addWardStay: (item) => dispatch(addWardStay(item)),
    addIcuBed: (item) => dispatch(addIcuBed(item)),
    addIcuStay: (item) => dispatch(addIcuStay(item)),
    addInvestigation: (item) => dispatch(addInvestigation(item)),
    addMedicineCharge: (item) => dispatch(addMedicineCharge(item)),
    addEquipmentCharge: (item) => dispatch(addEquipmentCharge(item)),
    addBloodRequirement: (item) => dispatch(addBloodRequirement(item)),
    addInvestigationTotal: (item) => dispatch(addInvestigationTotal(item)),
    addProcedureTotal: (item) => dispatch(addProcedureTotal(item)),
    addStent: (item) => dispatch(addStent(item)),
    addVisitTotal: (item) => dispatch(addVisitTotal(item)),
  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEstimate);

export {styles}
