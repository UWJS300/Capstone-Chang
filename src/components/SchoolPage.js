import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolPage.css'

class SchoolPage extends React.Component {
  render () {
    const { school } = this.props
    const { reviews }  = this.props.school

    const reviewArray = Object.keys(reviews).map(key => {
      return reviews[key]
    })

    return (
      <div>
        <h2>{school.name}</h2>
        {reviewArray.map((review, index) => {
          return (
            <ul key={index}>
              <li>{review.name}</li>
              <li>{review.reviewText}</li>
            </ul>
          )
        })}
        <ul>
          <li>{school.website}</li>
          <li>{school.addressLine1}</li>
          <li>{school.addressLine2}</li>
          <li>{school.city}</li>
          <li>{school.state}</li>
          <li>{school.zip}</li>
          <li>{school.country}</li>
        </ul>
        <Link to={`/${school.name}/reviews`}>Submit Review</Link>
      </div>
    )
  }
}

SchoolPage.propTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolPage
