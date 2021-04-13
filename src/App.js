// import 'fontsource-roboto'
import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { blue, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
});

function App() {
  const [login, setLogin] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path='/' exact>
          {login ? <Dashboard /> : <LoginPage />}
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
