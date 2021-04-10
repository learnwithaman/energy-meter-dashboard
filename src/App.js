// import 'fontsource-roboto'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Dashboard from './screens/Dashboard'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router className="App">
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Dashboard} exact />
      </Router>
    </ThemeProvider>
  )
}

export default App
