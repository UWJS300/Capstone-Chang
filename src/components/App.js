import React from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import Footer from './Footer'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
          <MuiThemeProvider>
            {this.props.children}
          </MuiThemeProvider>
        <Footer />
      </div>
    )
  }
}

export default App
