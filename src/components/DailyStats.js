// @flow

import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Row } from 'react-bootstrap'

import Paginator from './Paginator'

type Props = {
  by_date: any,
  setStatsByDate: any
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const DailyStats = (props: Props) => {

  // false = smalles to highest, true = highest to smallest
  const [sortDate, setSortDate] = useState(false)

  // page variables (for pagination)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage] = useState(Math.ceil(Object.keys(props.by_date).length / 5))

  // maps dates for page.
  const rows = () => {
    const maxPerPage = 5 // how many dates are shown in one page.
    const indexOfLast = currentPage * maxPerPage
    const indexOfFirst = indexOfLast - maxPerPage
    const page = props.by_date.slice(indexOfFirst, indexOfLast)

    return page.map((day, i) => {
      const date = new Date(day.date)
      return (
        <tr key={i}>
          <td>{day.conversation_count}</td>
          <td>{day.missed_chat_count}</td>
          <td>{day.visitors_with_conversation_count}</td>
          <td>{`${date.getDate()} ${monthNames[date.getMonth()]} (${date.getFullYear()})`}</td>
        </tr>
      )
    })
  }

  const sort = () => {
    if (sortDate) props.setStatsByDate(props.by_date.sort((a, b) => (a.date > b.date) ? 1 : -1))
    else props.setStatsByDate(props.by_date.sort((a, b) => (a.date > b.date) ? -1 : 1))
    setSortDate(!sortDate)
  }

  return (
    <div>
      <Row>
        <Table responsive size="sm">
          <thead>
            <tr>
              <th>conversation_count</th>
              <th>missed_chat_count</th>
              <th>visitors_with_conversation_count</th>
              {sortDate 
                ? <th style={{cursor: 'pointer'}}onClick={() => sort()}>Date ▲</th>
                : <th style={{cursor: 'pointer'}}onClick={() => sort()}>Date ▼</th>
              }
              
            </tr>
          </thead>
          <tbody>
            {rows()}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-center">
        <Paginator currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} />
      </Row>
    </div>
  )
}

export default DailyStats;