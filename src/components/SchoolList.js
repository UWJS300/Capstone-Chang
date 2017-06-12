import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SchoolList.css'
import { Row, Col } from 'react-flexbox-grid/lib/index'

class SchoolList extends React.Component {
  render () {
    const { schools } = this.props

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col xs={10}>
            <ul className='school-list'>
              {Object.keys(schools).map(key => {
                const school = schools[key]
                return <li key={key}><Link to={`/${school.name}`}>{school.name}</Link></li>
              })}
            </ul>
           </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

SchoolList.propTypes = {
  schools: PropTypes.object.isRequired
}

export default SchoolList
