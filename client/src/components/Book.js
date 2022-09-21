import React from 'react'
import '../App.css';


class Book extends React.Component {
  componentDidMount() {

  }
  render() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return (
      <div>
        <h3>A few tips for making friends.</h3>
        <h5 className="name pink-text text-darken-1 book-date">{month}/{day}/{year}</h5>
      </div>
    )
  }
}

export default Book