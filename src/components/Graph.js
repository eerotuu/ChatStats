// @flow

import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import Form from 'react-bootstrap/Form'

const Graph = ({ stats } : {stats: any}) => {
  
  const [chartType, setChartType] = useState('Bar')
  
  useEffect(() => {

  },[chartType])

  let dates: Array<string> = []
  let conversationCount: Array<number> = []
  let missedChatCount: Array<number> = []
  let visitorsWithConversationCount: Array<number> = []

  // push data to own arrays for datasets.
  for (let i = 0; i < stats.length; i++) {
    dates.push(stats[i].date)
    conversationCount.push(stats[i].conversation_count)
    missedChatCount.push(stats[i].missed_chat_count)
    visitorsWithConversationCount.push(stats[i].visitors_with_conversation_count)
  }

  const labels = ['conversation_count', 'visitors_with_conversation_count', 'missed_chat_count']
  const dataArray = [conversationCount, visitorsWithConversationCount, missedChatCount]
  const colors = ['rgba(75,192,192,1)', 'rgba(114, 215, 101, 1)', 'rgba(237, 94, 99, 1)']

  const data = {
    labels: dates,
    datasets: createDatasets(labels, dataArray, colors)
  };

  const handleChange = (event: any) => {
    setChartType(event.target.value)
  }

  const chart = () => {
    switch (chartType) {
      case 'Bar':
        return ( <Bar data={data} /> )
      case 'Line':
        return ( <Line data={data} /> )
      default :
        return (<div></div>)
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Form.Label style={{marginLeft: '1rem'}}>Chart Type</Form.Label>
      <Form.Control as="select" style={{maxWidth: '200px', marginLeft: '1rem', marginBottom: '1rem'}} onChange={handleChange}>
        <option>Bar</option>
        <option>Line</option>
      </Form.Control>
      {chart()}
    </div> 
  )
}

const createDatasets = (labels: Array<string>, dataArray: Array<any>, colors: Array<string>) => {
  
  let datasets = []
  for (let i = 0; i < 3; i++) {
    datasets.push(
      {
        label: labels[i],
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors[i],
        borderColor: colors[i],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: colors[i],
        pointBackgroundColor: colors[i],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors[i],
        pointHoverBorderColor: colors[i],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataArray[i]
      }
    )
  }

  return datasets
}

export default Graph