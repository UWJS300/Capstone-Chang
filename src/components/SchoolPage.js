import React from 'react'
import PropTypes from 'prop-types'

import './SchoolPage.css'

class SchoolPage extends React.Component {
  render () {
    const { school } = this.props
    return (
      <div>
        <h2>{school.name}</h2>
        <ul>
          <li>{school.website}</li>
          <li>{school.addressLine1}</li>
          <li>{school.addressLine2}</li>
          <li>{school.city}</li>
          <li>{school.state}</li>
          <li>{school.zip}</li>
          <li>{school.country}</li>
        </ul>
      </div>
    )
  }
}

SchoolPage.propTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolPage
