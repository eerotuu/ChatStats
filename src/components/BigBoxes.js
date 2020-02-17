// @flow

import React from 'react'
import { Row, Col } from 'react-bootstrap'

type Props = {
  conversationCount: number, 
  userMessageCount: number, 
  visitorMessageCount: number 
}

const BigBoxes = ( props: Props )  => {

  const style = {
    base: {
      color: '#fff',
      borderRadius: '5rem',
      height: '15em',
      margin: '2rem',
      boxShadow: '2px 3px 6px 2px rgba(0,0,0,0.2)',
      textShadow: '0px 0px 6px rgba(0,0,0,0.5)'
    },
    conversationColor: {
      backgroundColor: 'rgba(75,192,192,1)'
    },
    userMessageColor: {
      backgroundColor: 'rgba(237, 94, 99, 1)'
    },
    visitorMessageColor: {
      backgroundColor: 'rgba(114, 215, 101, 1)'
    },

  }

  return (
    <Row className='justify-content-center' style={{ marginTop: "4rem", marginBottom: "4rem" }}>
      <Col lg sm={8} style={Object.assign({}, style.base, style.conversationColor)}>
        <h1 className="text-center" style={{ marginTop: "2rem" }}>{props.conversationCount}</h1>
        <h2 className="text-center">Total conversation count</h2>
      </Col>
      <Col md sm={8} style={Object.assign({}, style.base, style.userMessageColor)}>
        <h1 className="text-center" style={{ marginTop: "2rem" }}>{props.userMessageCount}</h1>
        <h2 className="text-center">Total user message count</h2>
      </Col>
      <Col md sm={8} style={Object.assign({}, style.base, style.visitorMessageColor)}>
        <h1 className="text-center" style={{ marginTop: "2rem" }}>{props.visitorMessageCount}</h1>
        <h2 className="text-center">Total visitor message count</h2>
      </Col>
    </Row>
  )
}

export default BigBoxes;