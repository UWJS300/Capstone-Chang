import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolPage.css'

class SchoolPage extends React.Component {
  render () {
    const {school} = this.props
    return (
      <div>
        <h2>{school.name}</h2>
          <ul>
          {school.reviews.map((review, index) => {
            return <li key={index}>{review.reviewText}</li>
          })}
          </ul>
        <form onSubmit={this.props.handleSubmit}>
          <textarea rows='10' cols='40' defaultValue='Write review here...' onChange={this.props.handleChange} />
          <br />
          <input type='hidden' value={school.name} ref={(input) => {this.schoolName = input}} />
          <button type='submit'>Submit Review</button>
        </form>
      </div>
    )
  }
}

SchoolPage.propTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolPage
