import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './AdminPage.css'

class AdminPage extends React.Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
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
        <input type='text' name='name' placeholder='School name' />
        <button type='submit'>Add School</button>
      </form>
    )

    return (
      <div>
        {AddSchoolForm}
        <hr />
        {Object.keys(schools).map(key => {
          const school = schools[key]
          return (
            <ul key={key}>
              <li>
                <Link to={`/admin/${school.name}`}>{school.name}</Link>
                <button onClick={() => this.props.removeSchool(key)}>Remove</button>
              </li>
              <li>
                <input type='text' name='name' placeholder='Name' value={school.name} onChange={(e) => this.handleChange(e, key)} />
              </li>
            </ul>
          )
        })}
      </div>
    )
  }
}

AdminPage.propTypes = {
  schools: PropTypes.object.isRequired,
  addSchool: PropTypes.func.isRequired,
  removeSchool: PropTypes.func.isRequired
}

export default AdminPage
