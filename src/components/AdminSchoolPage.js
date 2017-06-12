import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './AdminSchoolPage.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'

class AdminSchoolPage extends React.Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    open: false,
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

    const actions = [
      <Link to={`/admin`}>
      <FlatButton
        label='Done'
        primary={true}
        disabled={false}
        onTouchTap={this.handleClose}
      />
      </Link>
    ]

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col xs={10}>
              <h2>{school.name}</h2>
              <ul>
                <li>{school.addressLine1} {school.addressLine2}</li>
                <li>{school.city} {school.state} {school.zip}</li>
                <li>{school.website}</li>
              </ul>
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
              <RaisedButton
                type='submit'
                backgroundColor='#009CBA'
                labelColor='#FFFFFF'
                label='Save'
                onTouchTap={this.handleOpen} />
              <Dialog
                title='Success'
                actions={actions}
                modal={true}
                open={this.state.open}
              >
              Your update has been successfully submitted.
              </Dialog>
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
