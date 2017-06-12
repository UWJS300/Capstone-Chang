import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolReviewPage.css'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'

import { Rating } from 'material-ui-rating'

class SchoolReviewPage extends React.Component {
  state = {
    open: false,
    rating: 0
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleRating (value) {
    this.setState({ rating: value })
  }

  render () {
    const { school } = this.props

    const actions = [
      <Link to={`/${school.name}`}>
      <FlatButton
        label='Done'
        primary={true}
        disabled={false}
        onTouchTap={this.handleClose}
      />
      </Link>
    ]

    const AddSchoolReviewForm = (
      <form onSubmit={(e) => {
        e.preventDefault()
        const key = this.props.schoolKey
        const name = e.target.querySelector('[name=name').value
        const ratingValue = this.state.rating
        const reviewText = e.target.querySelector('[name=reviewText]').value

        const review = { name, ratingValue, reviewText }

        this.props.addSchoolReview(review, school)
      }}>
        <TextField
          type='text'
          name='name'
          hintText='Name'
          floatingLabelText='Name'
          required />
        <Rating
          value={this.state.rating}
          max={5}
          onChange={(value) => this.handleRating(value)}
          required />
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
          label='Submit Review'
          onTouchTap={this.handleOpen} />
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
            <Dialog
              title='Success'
              actions={actions}
              modal={true}
              open={this.state.open}
            >
            Your review has been successfully submitted.
            </Dialog>
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
