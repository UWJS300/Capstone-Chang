import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolPage.css'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'

class SchoolPage extends React.Component {
  render () {
    const { school } = this.props
    const { reviews }  = this.props.school

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col md={10}>
            <h2>{school.name}</h2>
            <ul>
              <li>{school.addressLine1} {school.addressLine2}</li>
              <li>{school.city}, {school.state} {school.zip}</li>
              <li>{school.website}</li>
            </ul>
            <Link to={`/${school.name}/reviews`}>
            <RaisedButton
              type='submit'
              backgroundColor='#009CBA'
              labelColor='white'
              label='Write Review'/>
            </Link>

            {school.hasOwnProperty('reviews') ? Object.keys(reviews).map(key => {
              return reviews[key] }).map((review, index) => {
                return (
                  <ul className='review-text' key={index}>
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
