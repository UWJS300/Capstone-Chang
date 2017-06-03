import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import schools from './data/schools'

import App from './components/App'
import SchoolList from './components/SchoolList'
import SchoolPage from './components/SchoolPage'
import NotFound from './components/NotFound'

import base from './base'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      schools: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    // runs on init before app is rendered
    this.baseRef = base.syncState('schools', {
      context: this,
      state: 'schools'
    })
  }

  componentWillUnmount () {
    // clean up
    base.removeBinding(this.baseRef)
  }

  componentWillUpdate () {
    // runs on state update
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const input = e.target.querySelector('input')
    const value = input.value
    const schoolArray = Object.keys(this.state.schools).map(key => this.state.schools[key])
    const school = schoolArray.find(s => s.name === value)
    const schoolReview = {}

    schoolReview.reviewText = this.state.value
    school.reviews.push(schoolReview)

    this.setState({
      schools
    })
  }

  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <SchoolList schools={this.state.schools} />
            )} />
            <Route path='/:school' render={props => {
              const schoolName = props.match.params.school
              const schools = Object.keys(this.state.schools).map(key => this.state.schools[key])
              const school = schools.find(s => s.name === schoolName)

              if (school) {
                return (
                  <SchoolPage school={school} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }

            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
