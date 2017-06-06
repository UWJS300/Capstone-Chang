import React from 'react'
import PropTypes from 'prop-types'

import './AdminSchoolPage.css'

class AdminSchoolPage extends React.Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const attr = e.target.name
    const val = e.target.value
    const { school } = this.props
    const key = this.props.schoolKey
    const updated = Object.assign({}, school, {
      [attr]: val
    })

    this.props.updateSchool(key, updated)
  }

  render () {
    const { school } = this.props

    return (
      <div>
        <h2>{school.name}</h2>
        <hr />
        <ul>
          <li><input type='text' name='website' placeholder='Website' value={school.website} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='addressLine1' placeholder='School address' value={school.addressLine1} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='addressLine2' placeholder='School address' value={school.addressLine2} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='city' placeholder='City' value={school.city} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='state' placeholder='State' value={school.state} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='country' placeholder='Country' value={school.country} onChange={(e) => this.handleChange(e)} /></li>
          <li><input type='text' name='zip' placeholder='Zip' value={school.zip} onChange={(e) => this.handleChange(e)} /></li>
        </ul>
      </div>
    )
  }
}

AdminSchoolPage.propTypes = {
  school: PropTypes.object.isRequired,
  updateSchool: PropTypes.func.isRequired
}

export default AdminSchoolPage
