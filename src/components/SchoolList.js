import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolList.css'

class SchoolList extends React.Component {
  render () {
    const { schools } = this.props

    return (
      <ul className='school-list'>
        {Object.keys(schools).map(key => {
          const school = schools[key]
          return <li key={key}><Link to={`/${school.name}`}>{school.name}</Link></li>
        })}
      </ul>
    )
  }
}

SchoolList.propTypes = {
  schools: PropTypes.object.isRequired
}

export default SchoolList
