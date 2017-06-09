import React from 'react'
import PropTypes from 'prop-types'

import './AdminSchoolPage.css'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'

class AdminSchoolPage extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 'AL'
    }

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
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col xs={10}>
              <h2>{school.name}</h2>
              <Divider />
              <ul>
                <li>
                  <TextField
                    type='text'
                    name='website'
                    hintText='Website'
                    floatingLabelText='Website'
                    value={school.website}
                    onChange={(e) => this.handleChange(e)} />
                </li>
                <li>
                  <TextField
                    type='text'
                    name='addressLine1'
                    hintText='School address'
                    floatingLabelText='School address'
                    value={school.addressLine1} onChange={(e) => this.handleChange(e)} />
                </li>
                <li>
                  <TextField
                    type='text'
                    name='addressLine2'
                    hintText='School address'
                    floatingLabelText='School address'
                    value={school.addressLine2}
                    onChange={(e) => this.handleChange(e)} />
                </li>
                <li>
                  <TextField type='text'
                    name='city'
                    hintText='City'
                    floatingLabelText='City'
                    value={school.city}
                    onChange={(e) => this.handleChange(e)} />
                </li>
                <li>
                  <TextField
                    hintText='State'
                    floatingLabelText='State'
                    name='state'
                    value={school.state}
                    onChange={(e) => this.handleChange(e)}>
                  </TextField>
                </li>
                <li>
                  <TextField
                    type='text'
                    name='zip'
                    hintText='Zip'
                    floatingLabelText='Zip'
                    value={school.zip}
                    onChange={(e) => this.handleChange(e)} />
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

AdminSchoolPage.propTypes = {
  school: PropTypes.object.isRequired,
  updateSchool: PropTypes.func.isRequired
}

export default AdminSchoolPage
