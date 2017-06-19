import React from 'react'
import './Layout.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid } from 'react-flexbox-grid/lib/index'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Header from './Header'
import Footer from './Footer'

injectTapEventPlugin()

class Layout extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
            <Grid>
              <main>
                {this.props.children}
              </main>
            </Grid>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Layout
