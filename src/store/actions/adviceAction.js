import * as actionTypes from "../types/adviceTypes";

export const addAdvice = () => {
  return {
    type: actionTypes.ADD_ADVICE,
    payload: {},
  };
};

export const editAdvice = (item) => {
  return {
    type: actionTypes.EDIT_ADVICE,
    payload: {
      item,
    },
  };
};

export const addWardBed = (item) => {
  return {
    type: actionTypes.ADD_WARD_BED,
    payload: {
      item,
    },
  };
};

export const addWardStay = (item) => {
  return {
    type: actionTypes.ADD_WARD_STAY,
    payload: {
      item,
    },
  };
};

export const addIcuBed = (item) => {
  return {
    type: actionTypes.ADD_ICU_BED,
    payload: {
      item,
    },
  };
};

export const addIcuStay = (item) => {
  return {
    type: actionTypes.ADD_ICU_STAY,
    payload: {
      item,
    },
  };
};

export const editIPDPackages = (item) => {
  console.log(item);
  return {
    type: actionTypes.EDIT_IPD_PACKAGES,
    payload: {
      item,
    },
  };
};

export const addService = (item) => {
  return {
    type: actionTypes.ADD_SERVICE,
    payload: {
      item,
    },
  };
};

export const editService = (item) => {
  return {
    type: actionTypes.EDIT_SERVICE,
    payload: {
      item,
    },
  };
};

export const deleteService = (item) => {
  return {
    type: actionTypes.DELETE_SERVICE,
    payload: {
      item,
    },
  };
};

export const addCharge = () => {
  return {
    type: actionTypes.ADD_CHARGE,
    payload: {},
  };
};

export const editCharge = (item) => {
  return {
    type: actionTypes.EDIT_CHARGE,
    payload: {
      item,
    },
  };
};

export const editEmergency = (item) => {
  return {
    type: actionTypes.EDIT_EMERGENCY,
    payload: {
      item,
    },
  };
};

export const deleteAddCharge = (item) => {
  return {
    type: actionTypes.DELETE_ADD_CHARGE,
    payload: {
      item,
    },
  };
};

export const addDoctor = (item) => {
  return {
    type: actionTypes.ADD_DOCTOR,
    payload: {
      item,
    },
  };
};

export const addRemark = (item) => {
  return {
    type: actionTypes.ADD_REMARK,
    payload: {
      item,
    },
  };
};

export const addPaymentType = (item) => {
  return {
    type: actionTypes.ADD_PAYMENT_TYPE,
    payload: {
      item,
    },
  };
};

export const addPaymentCompany = (item) => {
  return {
    type: actionTypes.ADD_PAYMENT_COMPANY,
    payload: {
      item,
    },
  };
};

export const addDoctorToSurgery = (item) => {
  return {
    type: actionTypes.ADD_DOCTOR_TO_SURGERY,
    payload: {
      item,
    },
  };
};

export const deleteDoctorFromSurgery = (item) => {
  return {
    type: actionTypes.DELETE_DOCTOR_FROM_SURGERY,
    payload: {
      item,
    },
  };
};

export const addMinorToSurgery = (item) => {
  return {
    type: actionTypes.ADD_MINOR_TO_SURGERY,
    payload: {
      item,
    },
  };
};

export const editMinorSurgeryPercent = (item) => {
  return {
    type: actionTypes.EDIT_MINOR_SURGERY_PERCENT,
    payload: {
      item,
    },
  };
};
