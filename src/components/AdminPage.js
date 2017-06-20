import React from 'react'
import PropTypes from 'prop-types'
import base from '../base'
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
import { addHyphen } from '../helpers'

class AdminPage extends React.Component {
  constructor () {
    super()

    this.state = {
      show: false,
      uid: null,
      owner: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user })
      }
    })
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

  authenticate = (provider) => {
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  logout = () => {
    base.unauth()
    this.setState({ uid: null })
  }

  authHandler = (err, authData) => {
    if (err) {
      console.error(err)
      return
    }

    const ref = base.database().ref()
    ref.once('value', snapshot => {
      const data = snapshot.val() || {}

      if (!data.owner) {
        ref.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderLogin () {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={() => this.authenticate('github')}>Login with Github</button>
      </div>
    )
  }

  renderPage () {
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
          labelColor='#FFFFFF'
          label='Add' />
      </form>
    )

    return (
      <Row>
        <Col xs={12}>
          <Row center='xs'>
            <Col md={10}>
            <button onClick={this.logout}>Log out</button>
            {AddSchoolForm}
            <br />
            <Divider />
            {Object.keys(schools).map(key => {
              const school = schools[key]
              return (
                <ul key={key}>
                  <li>
                    <Link to={`/admin/${addHyphen(school.name)}`}>{school.name}</Link>
                    <IconButton tooltip='Edit'>
                      <EditorModeEdit
                        onClick={() => this.handleClick(key)} />
                    </IconButton>
                    <IconButton tooltip='Delete'>
                      <ActionDeleteForever
                        color={'a40000'}
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

  render () {
    if (!this.state.uid) {
      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    } else if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <h2>Unauthorized</h2>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderPage()}
        </div>
      )
    }
  }
}

AdminPage.propTypes = {
  schools: PropTypes.object.isRequired,
  addSchool: PropTypes.func.isRequired,
  removeSchool: PropTypes.func.isRequired
}

export default AdminPage
