import React, { Fragment, useState } from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");


const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

export default function ModelPopup(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Fragment>
      <button style={buttonStyle} disabled={props.disabled} className="btn btn-primary" onClick={toggleModal}>{props.title}</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="div-modal"
        overlayClassName="div-overlay"
        closeTimeoutMS={500}
      >
        <div >
          <h4>Jewelry Estimation Details.</h4>
          <hr />
          <h5>Gold Price (per gram) : {props.rate} </h5>
          <h5>Gold Weight : {props.weight} </h5>
          <h5>Total : {props.total} </h5>
          {/* {props.button} */}
          <br /><br /><br />
          <button style={buttonStyle} className="btn btn-primary" onClick={toggleModal}>Close</button>
        </div>
      </Modal>
    </Fragment>
  );
}
