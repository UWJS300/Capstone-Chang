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
import { addHyphen } from '../helpers'

class SchoolReviewPage extends React.Component {
  state = {
    open: false,
    rating: 0,
    canSubmit: false,
    errorText: null
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

  handleRating = (value) => {
    this.setState({ rating: value })
  }

  checkReviewText = (e) => {
    const reviewTextField = e.target.value
    reviewTextField.length >= 100 ?
      this.setState({ canSubmit: true }) :
      this.setState({ canSubmit: false })
  }

  render () {
    const { school } = this.props

    const actions = [
      <Link to={`/${addHyphen(school.name)}`}>
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
        const name = e.target.querySelector('[name=name]').value
        const ratingValue = this.state.rating
        const reviewText = e.target.querySelector('[name=reviewText]').value

        const review = { name, ratingValue, reviewText }

        this.props.addSchoolReview(review, school)
      }}>
        <TextField
          type='text'
          name='name'
          errorText={this.state.nameErrorText}
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
          hintText='Your review must be at least 100 characters.'
          onKeyUp={(e) => this.checkReviewText(e)}
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
          disabled={!this.state.canSubmit}
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
