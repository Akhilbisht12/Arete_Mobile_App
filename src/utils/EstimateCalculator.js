import { BedFeeMaster } from "../config/BedFee";
import { store } from "../store/store";
const advice = store.getState().advice;

const calculateRoom = () => {
  let room = 0;
  BedFeeMaster.map((item) => {
    room += item.Billing_Code === advice.wardBedType ? item.Room_Rent : 0;
  });
  return room;
};

const calculateICU = () => {
  let icu = 0;
  BedFeeMaster.map((item) => {
    icu = item.Billing_Code === advice.icuBedType ? item.Room_Rent : 0;
  });
  return icu;
};

const calculateSurgery = () => {
  let surgery = 0;
  advice.services.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      surgery += key === advice.wardBedType ? value : 0;
    }
    surgery += 0.9 * surgery + 0.3 * surgery + 0.35 * surgery + 0.15 * surgery;
  });
  return surgery;
};

const calculateInvestigation = () => {
  let investigation = 0;
  advice.investigations.map((item) => {
    for (const [key, value] of Object.entries(item)) {
      surgery += key === advice.wardBedType ? value : 0;
    }
  });
  return investigation;
};

const calculateProcedure = () => {
  let procedure = 0;
  if(advice.isIPDPackage){
    advice.procedures.map((item)=>{
      procedure+=item.OPD
    })
  }else{
    advice.procedures.map((item) => {
      for (const [key, value] of Object.entries(item)) {
        procedure += key == advice.wardBedType ? value : 0;
      }
    });
  }
  
  return procedure;
};

const doctorVisitCharges = () => {
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
};
