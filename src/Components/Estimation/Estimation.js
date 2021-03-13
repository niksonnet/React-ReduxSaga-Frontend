import React from 'react'


import "./Estimation.css"
import EstimateFormContainer from "../../Shared/Controls/Containers/EstimationFormContainer"
import ErrorBoundary from '../ErrorBoundary'


function Estimation() {
  return (
    <div className="col-md-4 estimate-form">
      <h3>Calculate Jewelry Estimation</h3>
      <hr />
      <ErrorBoundary>
        <EstimateFormContainer />
      </ErrorBoundary>
      <hr />
    </div>
  );
}


export default Estimation;