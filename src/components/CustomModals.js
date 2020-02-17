// @flow

import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

type errorProps = {
  show: boolean,
  message: string,
  onHide: () => void
}

export const ErrorMessageModal = (props: errorProps) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <b>{props.message}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

type invalidProps = {
  show: boolean,
  token: string,
  onChange: () => void,
  onHide: () => void
}

export const InvalidAccessModal = (props: invalidProps) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>Invalid Access Token!</Modal.Header>
      <Modal.Body>
        <Form.Label>Enter Valid Access Token</Form.Label>
        <input value={props.token} className='form-control' placeholder='Access token' onChange={props.onChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Enter</Button>
      </Modal.Footer>
    </Modal>
  );
}