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
