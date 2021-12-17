import styled from "styled-components/native";

const RowBetween = styled.View`
flex-direction : row;
justify-Content : space-between;
align-items : center;
`
const Row = styled.View`
flex-direction : row;
align-items : center;
`
const ColumnCenter = styled.View`
alignItems : center;
justify-content : center;
`
const ColumnEvenly = styled.View`
justify-content : space-evenly;
`
export {RowBetween, Row, ColumnCenter, ColumnEvenly}