import { connect } from "react-redux";
import { BedFeeMaster } from "../config/BedFee";
import { store } from "../store/store";

const calculateRoom = () => {
  const advice = store.getState().advice;
  let room = 0;
  BedFeeMaster.map((item) => {
    room +=
      item.Billing_Code === advice.wardBedType
        ? item.Room_Rent * advice.ward
        : 0;
  });
  return room;
};

const calculateICU = () => {
  const advice = store.getState().advice;
  let icu = 0;
  BedFeeMaster.map((item) => {
    icu +=
      item.Billing_Code === advice.icuBedType ? item.Room_Rent * advice.icu : 0;
  });
  return icu;
};

let calculateSurgery = () => {
  const advice = store.getState().advice;
  let surgery = 0;
  advice.services.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      surgery += key === advice.wardBedType ? value * 0.01 * item.minor : 0;
    }
    surgery += 0.9 * surgery + 0.3 * surgery + 0.35 * surgery + 0.15 * surgery;
  });
  return Math.round(surgery);
};

let calculatePackage = () => {
  const advice = store.getState().advice;
  let ipdpackage = 0;
  advice.packages.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      ipdpackage += key === advice.wardBedType ? value : 0;
    }
  });
  return ipdpackage;
};

let calculateInvestigation = () => {
  const advice = store.getState().advice;
  let investigation = 0;
  advice.investigations.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      investigation += key === advice.wardBedType ? value : 0;
    }
  });
  console.log(investigation);
  return investigation;
};

let calculateProcedure = () => {
  const advice = store.getState().advice;
  let procedure = 0;
  advice.procedures.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      procedure += key === advice.wardBedType ? value : 0;
    }
  });
  console.log(procedure);
  return procedure;
};

const doctorVisitCharges = () => {
  const advice = store.getState().advice;
  let visit = 0;
  BedFeeMaster.map((item) => {
    visit +=
      (item.Billing_Code === advice.wardBedType
        ? advice.isEmergency
          ? item.Emergency_Fee
          : item.IP_Fee
        : 0) * advice.ward;
    visit +=
      (item.Billing_Code === advice.icuBedType
        ? advice.isEmergency
          ? item.Emergency_Fee
          : item.IP_Fee
        : 0) * advice.icu;
  });
  return visit;
};

export {
  calculateRoom,
  calculateICU,
  calculateSurgery,
  doctorVisitCharges,
  calculateInvestigation,
  calculateProcedure,
  calculatePackage,
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice,
  };
};

export default connect(mapStateToProps)(calculateProcedure);
