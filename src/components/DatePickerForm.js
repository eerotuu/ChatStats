// @flow

import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Col, Form, Button } from 'react-bootstrap'

type Props = {
  label: string,
  date: Date,
  handleChange: () => void
}

const DatePickerForm = (props : Props) => {

  const Input = React.forwardRef((props:{onClick: any, value: any}, ref) => (
    <Button  onClick={props.onClick} style={{color: '#495057', backgroundColor: '#fff', border: '1px solid #ced4da'}}>
      {props.value}
    </Button>
  ))
  
  const ref = React.createRef();
  
  return (
    <Col sm xs={8} style={{margin: '0.5rem'}}>
        <Form.Label style={{paddingLeft: '0'}}>{props.label}</Form.Label>
        <div>
          <DatePicker className='form-control'
            selected={props.date}
            onChange={props.handleChange}
            dateFormat="yyyy-MM-dd"
            customInput={<Input ref={ref} onClick={null} value={null} />}
          />
        </div>
    </Col>
  )
}



export default DatePickerForm;