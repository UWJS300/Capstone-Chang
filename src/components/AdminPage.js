import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './AdminPage.css'

class AdminPage extends React.Component {
  render () {
    const { schools } = this.props

    return (
      <ul>
        {Object.keys(schools).map(key => {
          const school = schools[key]
          return <li key={key}><Link to={`/admin/${school.name}`}>{school.name}</Link></li>
        })}
      </ul>
    )
  }
}

AdminPage.propTypes = {
  schools: PropTypes.object.isRequired
}

export default AdminPage
