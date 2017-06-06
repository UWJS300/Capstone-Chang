import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = (props) => {
  return (
    <header>
      <h1><Link to={`/`}>Exam Schools</Link></h1>
      <ul>
        <li><Link to={`/admin`}>Admin</Link></li>
      </ul>
    </header>
  )
}

export default Header
