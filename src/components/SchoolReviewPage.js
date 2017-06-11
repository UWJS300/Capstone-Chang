import React from 'react'
import PropTypes from 'prop-types'

import './SchoolReviewPage.css'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'

class SchoolReviewPage extends React.Component {

  render () {
    const { school } = this.props

    const AddSchoolReviewForm = (
      <form onSubmit={(e) => {
        e.preventDefault()
        const key = this.props.schoolKey
        const name = e.target.querySelector('[name=name').value
        const reviewText = e.target.querySelector('[name=reviewText]').value

        const review = { name, reviewText }

        this.props.addSchoolReview(review, school)
      }}>
        <TextField
          type='text'
          name='name'
          hintText='Name'
          floatingLabelText='Name'
          required />
        <br />
        <TextField
          name='reviewText'
          hintText='Type review here...'
          multiLine={true}
          rows={10}
          style={{
            width: 600
          }}
          type='text'
          required />
        <br />
        <RaisedButton
          type='submit'
          backgroundColor='#009CBA'
          labelColor='#FFFFFF'
          label='Submit Review'/>
      </form>
    )

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col xs={10}>
            <h2>{school.name}</h2>
            <Divider />
            {AddSchoolReviewForm}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

SchoolReviewPage.propTypes = {
  school: PropTypes.object.isRequired,
  addSchoolReview: PropTypes.func.isRequired
}

export default SchoolReviewPage
