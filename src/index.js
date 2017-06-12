import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App'
import SchoolList from './components/SchoolList'
import SchoolPage from './components/SchoolPage'
import AdminPage from './components/AdminPage'
import AdminSchoolPage from './components/AdminSchoolPage'
import SchoolReviewPage from './components/SchoolReviewPage'
import NotFound from './components/NotFound'

import base from './base'

import { generateKey } from './helpers'
import { removeHyphen } from './helpers'

import injectTapEventPlugin from 'react-tap-event-plugin';
  injectTapEventPlugin()

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      schools: {}
    }
    this.updateSchool = this.updateSchool.bind(this)
    this.addSchool = this.addSchool.bind(this)
    this.removeSchool = this.removeSchool.bind(this)
    this.addSchoolReview = this.addSchoolReview.bind(this)
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

  removeSchool (key) {
    // clone current school state
    const schools = Object.assign({}, this.state.schools)

    // remove a school from schools use null instead of delete for firebase
    schools[key] = null

    // update state
    this.setState({
      schools
    })
  }

  updateSchool (key, school) {
    const schools = Object.assign({}, this.state.schools)

    schools[key] = school

    this.setState({
      schools
    })
  }

  addSchool (school) {
    const key = generateKey()
    const schools = Object.assign({}, this.state.schools)

    schools[key] = school

    this.setState({
      schools
    })
  }

  addSchoolReview (review, school) {
    const schools = Object.assign({}, this.state.schools)
    const key = Object.keys(this.state.schools).map(key => Object.assign({}, this.state.schools[key], { key })).find(item => item.name === school.name).key

    const immediatelyAvailRef = base.push(`schools/${key}/reviews`, {
      data: review,
      then(err) {
        if(!err) {
          // show success alert message diable submit button
          console.log('Review saved')
        } else {
          // show fail alert message
          console.log('Review could not be saved')
        }
      }
    })
    const generatedKey = immediatelyAvailRef.key

    this.setState({
      schools
    })
  }

  handleStateChange (state, value, callback = () => {}) {
    this.setState({ [state]: value }, () => {
      callback()
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
            <Route exact path='/admin' render={props => (
              <AdminPage schools={this.state.schools}
                addSchool={this.addSchool}
                removeSchool={this.removeSchool}
                updateSchool={this.updateSchool}
                />
            )} />
            <Route path='/admin/:school' render={props => {
              const schoolName = removeHyphen(props.match.params.school)
              const schools = Object.keys(this.state.schools).map(key => this.state.schools[key])
              const school = schools.find(s => s.name === schoolName)

              const schoolKey = Object.keys(this.state.schools).map(key => Object.assign({}, this.state.schools[key], { key })).find(item => item.name === schoolName).key

              if (school) {
                return (
                  <AdminSchoolPage school={school}
                    schoolKey={schoolKey}
                    updateSchool={this.updateSchool}
                  />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />
            <Route exact path='/:school' render={props => {
              const schoolName = removeHyphen(props.match.params.school)
              const schools = Object.keys(this.state.schools).map(key => this.state.schools[key])
              const school = schools.find(s => s.name === schoolName)

              if (school) {
                return (
                  <SchoolPage school={school} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />

            <Route exact path='/:school/reviews' render={props => {
              const schoolName = removeHyphen(props.match.params.school)
              const schools = Object.keys(this.state.schools).map(key => this.state.schools[key])
              const school = schools.find(s => s.name === schoolName)

              if (school) {
                return (
                  <SchoolReviewPage school={school}
                    addSchoolReview={this.addSchoolReview}
                  />
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
