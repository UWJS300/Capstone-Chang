import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SocialSchool from 'material-ui/svg-icons/social/school'
import { white } from 'material-ui/styles/colors'

const iconStyles = {
  marginRight: 3,
}

const Header = (props) => {
  return (
    <header>
      <MuiThemeProvider>
        <h1>
          <SocialSchool style={iconStyles} color={white} />
          <Link to={`/`}>Exam School Review</Link>
        </h1>
      </MuiThemeProvider>
    </header>
  )
}

export default Header
