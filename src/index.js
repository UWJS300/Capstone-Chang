import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import schools from './data/schools'

import App from './components/App'
import SchoolList from './components/SchoolList'
import SchoolPage from './components/SchoolPage'
import NotFound from './components/NotFound'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      schools
    }
  }

  render () {
    return (
      <Router history={hashHistory}>
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
                  <SchoolPage school={school} />
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
