import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolPage.css'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid/lib/index'

import { Rating } from 'material-ui-rating'
import { addHyphen } from '../helpers'

class SchoolPage extends React.Component {
  render () {
    const { school } = this.props
    const { reviews }  = this.props.school

    let ratingArray = school.hasOwnProperty('reviews') ? Object.keys(reviews).map(key => { return reviews[key] }).map((review, index) => { return review.ratingValue }) : null

    let ratingTotal = ratingArray ? ratingArray.reduce((acc, val) => { return acc + val }, 0) : null

    let ratingAvg = ratingTotal && ratingArray ? ratingTotal / ratingArray.length : null

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col md={10}>
            <h2>{school.name}</h2>
            <ul>
              <li>{school.addressLine1} {school.addressLine2}</li>
              <li>{school.city} {school.state} {school.zip}</li>
              <li>{school.website}</li>
              <li>
              { ratingAvg ?
                <Rating
                  value={ratingAvg}
                  max={5}
                  readOnly={true} />
              : null }
              </li>
              { ratingArray ?
              <li>{ratingArray.length} Reviews</li>
              : null }
            </ul>
            <Link to={`/review/${addHyphen(school.name)}`}>
            <RaisedButton
              type='submit'
              backgroundColor='#009CBA'
              labelColor='#FFFFFF'
              label='Write Review'/>
            </Link>

            {school.hasOwnProperty('reviews') ? Object.keys(reviews).map(key => {
              return reviews[key] }).map((review, index) => {
                return (
                  <ul className='review-text' key={index}>
                    <li>
                      <Rating
                        value={review.ratingValue}
                        max={5}
                        readOnly={true} />
                    </li>
                    <li>{review.reviewText}</li>
                    <li className='author'>{review.name}</li>
                  </ul>
                )
              }) : null }
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

SchoolPage.propTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolPage
