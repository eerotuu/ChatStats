// @flow

import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

type Props = {
  currentPage: number,
  maxPage: number,
  setCurrentPage: (number) => void
}

const Paginator = ( props : Props ) => {

  const currentPage = props.currentPage
  const maxPage = props.maxPage
  const setCurrentPage = props.setCurrentPage 

  let pages = []

  // if max page is less than 7 show all page numbers all time.
  // else shows only closest page numbers to the current page number. 
  if (maxPage < 7) {
    
    for (let i = 1; i < maxPage + 1; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </Pagination.Item>
      )
    }

  } else {
    
    let startPoint = currentPage - 2;

    // if start point (to the left of all that will be shown) is near enough start, show only the first numbers
    if (startPoint < 2) {
      for(let i = 1; i < 7; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
          </Pagination.Item>
        )
      }
      pages.push(<Pagination.Ellipsis key={'next'} />)

    } 

    // if current page is near enough to the end, show only the last numbers
    else if (maxPage - currentPage < 3) { 
      
      pages.push(<Pagination.Ellipsis key={'previous'} />)
      for(let i = maxPage - 4; i < maxPage + 1; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
          </Pagination.Item>
        )
      }

    } 
    
    // otherwise show closest pages to the current page.
    else {
      
      pages.push(<Pagination.Ellipsis key={'previous'} />)
      for(let i = startPoint; i < startPoint + 5; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
          </Pagination.Item>
        )
      }
      pages.push(<Pagination.Ellipsis key={'next'} />)

    }
  }
  
  const nextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev onClick={() => prevPage()} />
      {pages}
      <Pagination.Next onClick={() => nextPage()} />
      <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
    </Pagination>
  )
}

export default Paginator;