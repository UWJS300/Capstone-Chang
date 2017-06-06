import React from 'react'
import PropTypes from 'prop-types'

import './SchoolReviewPage.css'

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

        this.props.addSchoolReview(key, review, school)
      }}>
        <ul>
          <li><input type='text' name='name' placeholder='Name' /></li>
          <li><textarea name='reviewText' placeholder='School review' /></li>
          <li><button type='submit'>Submit Review</button></li>
        </ul>
      </form>
    )

    return (
      <div>
        <h2>{school.name} Review Page</h2>
        {AddSchoolReviewForm}
      </div>
    )
  }
}

SchoolReviewPage.propTypes = {
  school: PropTypes.object.isRequired,
  addSchoolReview: PropTypes.func.isRequired
}

export default SchoolReviewPage
