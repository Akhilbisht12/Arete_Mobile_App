import { useReducer } from "react";
import ADVICE_ACTION from "../types/adviceTypes";
const initAdvice = [
  {
    id: 1,
    input: "",
    type: "",
  },
];
const advice_reducer = (advices, action) => {
  switch (action.type) {
    case ADVICE_ACTION.ADD_ADVICE:
      return advices;
      console.log(advices);
    case ADVICE_ACTION.REMOVE_ADVICE:
      return advices;
    case ADVICE_ACTION.EDIT_ADVICE:
      return advices;
    default:
      return advices;
  }
};

const [advices, dispatch] = useReducer(reducer, initAdvice);


export default advice_reducer;
