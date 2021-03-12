import React from 'react'


import "./Estimation.css"
import EstimateFormContainer from "../../Shared/Controls/Containers/EstimationFormContainer"
import ErrorFallback from "../ErrorFallback"
import { ErrorBoundary } from 'react-error-boundary'


function Estimation(props) {
  return (
    <div className=" col-md-4 estimate-form">
      <h3>Calculate Jewelry Estimation</h3>
      <hr />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}>
        <EstimateFormContainer />
      </ErrorBoundary>
      <hr />
    </div>
  );
}


export default Estimation;