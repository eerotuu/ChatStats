// @flow

/**
 * @author Eero Tuure
 */

import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'

// React Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container, Row, Col, Form, Jumbotron, Spinner } from 'react-bootstrap'

// component imports
import DailyStats from './components/DailyStats'
import DatePickerForm from './components/DatePickerForm'
import Graph from './components/Graph'
import { ErrorMessageModal, InvalidAccessModal } from './components/CustomModals'
import BigBoxes from './components/BigBoxes'

// Helper functions
import { isDateRangeOutOfBounds } from './HelperFunctions'

const apiAddress = 'https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/'

const App = () => {

  const didMount = useRef(false)
  const [loading, setLoading] = useState(true)

  // form variables
  const [startDate, setStartDate] = useState(new Date('2017-05-01'))
  const [endDate, setEndDate] = useState(new Date('2017-07-18'))
  const [token, setToken] = useState('')

  // data variables
  const [conversationCount, setConversationCount] = useState(0)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [visitorMessageCount, setVisitorMessageCount,] = useState(0)
  const [statsByDate, setStatsByDate] = useState([])

  // error modal variables
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')

  // variable for valid token modal
  const [showInvalidTokenModal, setShowInvalidTokenModal] = useState(false)

  const apiCall = (auth: string, from: Date, to: Date) => {
    
    // check if token has value to avoid unnecessary fetch.
    if (auth !== null && auth !== undefined && auth.length > 0) {
      
      // format the date into a suitable format
      const formattedStartDate = from.toISOString().split('T', 1)[0]
      const formattedEndDate = to.toISOString().split('T', 1)[0]
      
      const headers = { 
        headers: { 
          'Authorization': auth, 
          'Accept': 'application/json' 
        } 
      }

      setLoading(true)
      axios
        .get(`${apiAddress}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`, headers)
        .then(response => {
          
          const { 
            total_conversation_count, 
            total_user_message_count, 
            total_visitor_message_count, 
            by_date 
          } = response.data
          
          setConversationCount(total_conversation_count)
          setUserMessageCount(total_user_message_count)
          setVisitorMessageCount(total_visitor_message_count)
          setStatsByDate(by_date.sort((a, b) => (a.date > b.date) ? 1 : -1))
        })
        .catch(error => {
          if (error.status === 401 || error.response.status === 401)  {
            setShowInvalidTokenModal(true)
          } else if (error.response.status === 400) {
            setErrorText("400 Bad Request")
            setShowError(!showError)
          } else {
            setErrorText("Oops! Something went wrong.")
            setShowError(!showError)
          }
          resetAllData()
        })
        .then (() => {
          setLoading(false)
        })

    } else {
      setShowInvalidTokenModal(true)
      resetAllData()
    }   
  }

  useEffect(() => {

    // check local storage on first render
    if (!didMount.current) {
      let from = localStorage.getItem('startDate')
      let to = localStorage.getItem('endDate')
      let auth = localStorage.getItem('token')

      if (from !== null && from !== undefined) {
        setStartDate(new Date(from))
      } else {
        from = '2017-05-01'
      }

      if (to !== null && to !== undefined) {
        setEndDate(new Date(to))
      } else {
        to = '2017-6-18'
      }

      if (auth !== null && auth !== undefined) {
        setToken(auth)
      } else {
        auth = ''
      }
      apiCall(auth, new Date(from), new Date(to))
      didMount.current = true
    } else {
      apiCall(token, startDate, endDate)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  // for resetting data
  const resetAllData = () => {
    setConversationCount(0)
    setUserMessageCount(0)
    setVisitorMessageCount(0)
    setStatsByDate([])
  }

  const handleStartDateChange = (date) => {

    // check if date is valid and shows modal if not.
    // > has to be before end date.
    // > new date range has to be less than 730.

     if (date !== undefined) {
      if (date > endDate) {
        setErrorText("Start date can't be greater than end date!")
        setShowError(!showError)
      } else if (isDateRangeOutOfBounds(date, endDate, 730)) { 
        setErrorText("Maximum date range length is 730 days.")
        setShowError(!showError)
      } else {        
        setStartDate(date)
        localStorage.setItem('startDate', date)
      }
    } 
  }

  const handleEndDateChange = (date) => {
    
    // check if date is valid and shows modal if not.
    // > has to be later than start date.
    // > has to be before current date.
    // > new date range has to be less than 730.

    if (date !== undefined) {
      if (date < startDate) {
        setErrorText("End date can't be greater than start date!")
        setShowError(!showError)   
      } else if (date > new Date(Date.now())) {
        setErrorText("Date must be before current date!")
        setShowError(!showError)
      } else if (isDateRangeOutOfBounds(startDate, date, 730)) {
        setErrorText("Maximum date range length is 730 days.")
        setShowError(!showError)
      } else {
        setEndDate(date)
        localStorage.setItem('endDate', date)
      }
    }   
  }

  const onTokenChange = (event: any) => {
    setToken(event.target.value)
    localStorage.setItem('token', event.target.value)
  }

  // returns appropriate content depending if there is any records found.
  const content = () => {

    if (statsByDate.length > 0) {
      return (
        <div>
          <BigBoxes
          conversationCount={conversationCount}
          userMessageCount={userMessageCount}
          visitorMessageCount={visitorMessageCount}
          />
         
          <DailyStats by_date={statsByDate} setStatsByDate={setStatsByDate} />

          <Row style={{ marginTop: "2rem", marginBottom: "3rem" }} >
            <Graph stats={statsByDate} />
          </Row>
        </div>
      )
    } else {
      return (
        <Jumbotron style={{marginTop: "4rem"}}>
          <b>No data found for the specified time period :(</b>  
        </Jumbotron>
      ) 
    }  
  }


  return (
    <div >

      <Navbar bg="dark" variant="dark" style={{ marginBottom: "2rem"}}>
        <Navbar.Brand style={{marginRight: '3rem'}}>Chat Stats Reporting</Navbar.Brand>
        <Nav className='ml-auto'>
          <Navbar.Text className='justify-content-center'>Created by Eero Tuure</Navbar.Text>
        </Nav> 
      </Navbar>

      <Container>
        <Row className="justify-content-center">
          <DatePickerForm label='Start Date' date={startDate} handleChange={handleStartDateChange} />
          <DatePickerForm label='End Date' date={endDate} handleChange={handleEndDateChange} />
          <Col sm xs={8} style={{margin: '0.5rem'}}>
            <Form.Label>Access Token</Form.Label> 
            <div>
              <input value={token} className='form-control' placeholder='Access token' onChange={onTokenChange} onBlur={() => apiCall(token, startDate, endDate)}></input> 
            </div>     
          </Col>
        </Row>
        

        {loading 
          ? <Row className="justify-content-center" style={{marginTop: "5rem"}}>
              <Spinner animation="border" style={{width: "10rem", height: "10rem"}}/>
            </Row>
          : content()
        }

        <InvalidAccessModal
          show={showInvalidTokenModal}
          onHide={() => {
            setShowInvalidTokenModal(false)
            apiCall(token, startDate, endDate)
          }}
          token={token}
          onChange={onTokenChange}
          backdrop={'static'}
          keyboard={false}
        />

        <ErrorMessageModal
          show={showError}
          onHide={() => {
            setShowError(false)
            setErrorText('')
          }}
          message={errorText}
        />

      </Container>

    </div>
  );
}

export default App
