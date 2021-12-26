import { services } from "../../config/master";
import * as actionTypes from "../types/adviceTypes";

const initAdvice = {
  isIPDPackage: false,
  isEmergency: false,
  ward: 0,
  icu: 0,
  wardBedType: "",
  wardBedPrice: 0,
  icuBedType: "",
  icuBedPrice: 0,
  doctor: "",
  remarks: "",
  paymentType: "",
  paymentCompany: "",
  services: [
    {
      id: 0,
    },
  ],
  addCharges: [],
};

const adviceReducer = (state = initAdvice, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADVICE:
      return {
        ...state,
        services: [...state.services, { id: state.services.length }],
      };
    case actionTypes.REMOVE_ADVICE:
      return state;
    case actionTypes.ADD_WARD_BED:
      const { wardBed } = action.payload.item;
      return {
        ...state,
        wardBedType: wardBed,
      };
    case actionTypes.ADD_WARD_STAY:
      const { wardStay } = action.payload.item;
      return {
        ...state,
        ward: wardStay,
      };
    case actionTypes.ADD_ICU_BED:
      const { icuBed } = action.payload.item;
      return {
        ...state,
        icuBedType: icuBed,
      };
    case actionTypes.ADD_ICU_STAY:
      const { icuStay } = action.payload.item;
      return {
        ...state,
        icu: icuStay,
      };
    case actionTypes.EDIT_IPD_PACKAGES:
      const { ipd } = action.payload.item;
      return {
        ...state,
        isIPDPackage: ipd,
      };
    case actionTypes.ADD_SERVICE:
      const { newService, s_id } = action.payload.item;
      const servicetemp = state.services;
      servicetemp[s_id] = newService;
      return {
        ...state,
        services: servicetemp,
      };
    case actionTypes.DELETE_SERVICE:
      const { index } = action.payload.item;
      const deleteTemp = state.services;
      deleteTemp.splice(index, 1);
      return {
        ...state,
        services: deleteTemp,
      };
    case actionTypes.ADD_CHARGE:
      return {
        ...state,
        addCharges: [...state.addCharges, { key: "", value: 0 }],
      };
    case actionTypes.EDIT_CHARGE:
      const { key, value, chargeIndex } = action.payload.item;
      const tempcharge = state.addCharges;
      tempcharge[chargeIndex].key = key;
      tempcharge[chargeIndex].value = value;
      return {
        ...state,
        addCharges: tempcharge,
      };
    case actionTypes.EDIT_EMERGENCY:
      const { emergency } = action.payload.item;
      return {
        ...state,
        isEmergency: emergency,
      };
    case actionTypes.DELETE_ADD_CHARGE:
      const { deleteChargeIndx } = action.payload.item;
      const tempaddcharge = state.addCharges;
      tempaddcharge.splice(deleteChargeIndx, 1);
      return {
        ...state,
        addCharges: tempaddcharge,
      };
    case actionTypes.ADD_DOCTOR:
      const { doctor } = action.payload.item;
      return {
        ...state,
        doctor: doctor,
      };
    case actionTypes.ADD_REMARK:
      const { remark } = action.payload.item;
      return {
        ...state,
        remark: remark,
      };
    case actionTypes.ADD_PAYMENT_TYPE:
      const { paymentType } = action.payload.item;
      return {
        ...state,
        paymentType: paymentType,
      };
    case actionTypes.ADD_PAYMENT_COMPANY:
      const { paymentCompany } = action.payload.item;
      return {
        ...state,
        paymentCompany: paymentCompany,
      };
    case actionTypes.ADD_DOCTOR_TO_SURGERY:
      const { surgeon, serviceindex } = action.payload.item;
      let tempsurgery = state.services;
      if (tempsurgery[serviceindex].surgeon) {
        tempsurgery[serviceindex].surgeon.push(surgeon);
      } else {
        tempsurgery[serviceindex] = {
          ...tempsurgery[serviceindex],
          surgeon: [surgeon],
        };
      }
      return {
        ...state,
        services: tempsurgery,
      };
    case actionTypes.DELETE_DOCTOR_FROM_SURGERY:
      const { surgeonIndex, surgeryIndex } = action.payload.item;
      let deletesurgery = state.services;
      deletesurgery[surgeryIndex].surgeon.splice(surgeonIndex, 1);
      return {
        ...state,
        services: deletesurgery,
      };
    default:
      return state;
  }
};

export default adviceReducer;
