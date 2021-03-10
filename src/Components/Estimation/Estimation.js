import React from 'react'


import "./Estimation.css"
import EstimateFormContainer from "../../Shared/Controls/Containers/EstimationFormContainer"

function Estimation(props) {
  return (
    <div className=" col-md-4 estimate-form">
      <h3>Welcome Mr. X </h3>
      <h3>Fill up Gold Rates </h3>
      <hr />
      <EstimateFormContainer></EstimateFormContainer>
      <hr />
    </div>
  );
}

export default Estimation;