import styled from "styled-components/native";
const PatientDetailedView = styled.View`
margin : ${(props) => (props.label ? "10px" : "10px")};
padding : ${(props) => (props.label ? "1px" : "15px")}
background-color : #6dbcdb;
border-radius : 6px;
`;
export default PatientDetailedView;
