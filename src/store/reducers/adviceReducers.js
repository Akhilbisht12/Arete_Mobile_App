import { services } from "../../config/master";
import * as actionTypes from "../types/adviceTypes";

const initAdvice = {
  isIPDPackage: false,
  ward: 0,
  icu: 0,
  wardBedType: "",
  icuBedType: "",
  services: [
    {
      id: 0,
    },
  ],
  addCharges : []
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
      const servicetemp = state.services
      servicetemp[s_id] = newService
      return {
        ...state,
        services : servicetemp
      };
    case actionTypes.DELETE_SERVICE: 
    const {index} = action.payload.item
    const deleteTemp = state.services
    deleteTemp.splice(index, 1)
    return {
      ...state,
      services : deleteTemp
    }
    case actionTypes.ADD_CHARGE:
      return{
        ...state,
        addCharges : [...state.addCharges, {key : '', value : 0}]
      }
    case actionTypes.EDIT_CHARGE:
      const {key, value, chargeIndex} = action.payload.item
      const tempcharge = state.addCharges
      tempcharge[chargeIndex].key = key;
      tempcharge[chargeIndex].value = value;
      return{
        ...state,
        addCharges : tempcharge
      }
    default:
      return state;
  }
};

export default adviceReducer;
