import React from 'react'
import PropTypes from 'prop-types'

import './SchoolPage.css'

class SchoolPage extends React.Component {
  render () {
    const { school } = this.props
    return (
      <div>
        <h2>{school.name}</h2>
      </div>
    )
  }
}

SchoolPage.propTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolPage
