import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './AdminPage.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { Row, Col } from 'react-flexbox-grid/lib/index'
import Divider from 'material-ui/Divider'
import ToggleDisplay from 'react-toggle-display'

class AdminPage extends React.Component {
  constructor () {
    super()

    this.state = { show: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick () {
    this.setState ({
      show: !this.state.show
    })
  }

  handleChange (e, key) {
    const attr = e.target.name
    const val = e.target.value
    const school = this.props.schools[key]
    const updated = Object.assign({}, school, {
      [attr]: val
    })

    this.props.updateSchool(key, updated)
  }

  render () {
    const { schools } = this.props

    const AddSchoolForm = (
      <form onSubmit={(e) => {
        e.preventDefault()
        const name = e.target.querySelector('[name=name]').value

        const school = { name }

        this.props.addSchool(school)
      }}>
        <TextField
          type='text'
          name='name'
          floatingLabelText='School name'
          hintText='School name'
          required />
        <br />
        <RaisedButton
          type='submit'
          backgroundColor='#009CBA'
          labelColor='white'
          label='Add' />
      </form>
    )

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col md={10}>
            {AddSchoolForm}
            <br />
            <Divider />
            {Object.keys(schools).map(key => {
              const school = schools[key]
              return (
                <ul key={key}>
                  <li>
                    <Link to={`/admin/${school.name}`}>{school.name}</Link>
                    <IconButton tooltip='Edit'>
                      <EditorModeEdit
                        iconClassName='material-icons'
                        onClick={() => this.handleClick(key)} />
                    </IconButton>
                    <IconButton tooltip='Delete'>
                      <ActionDeleteForever
                        color={'a40000'}
                        iconClassName='material-icons'
                        onClick={() => this.props.removeSchool(key)} />
                    </IconButton>
                  </li>
                  <ToggleDisplay if={this.state.show} tag='section'>
                  <li>
                    <TextField
                      type='text'
                      name='name'
                      value={school.name}
                      onChange={(e) => this.handleChange(e, key)} />
                  </li>
                  </ToggleDisplay>
                </ul>
              )
            })}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

AdminPage.propTypes = {
  schools: PropTypes.object.isRequired,
  addSchool: PropTypes.func.isRequired,
  removeSchool: PropTypes.func.isRequired
}

export default AdminPage
