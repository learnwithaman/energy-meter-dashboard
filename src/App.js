// import 'fontsource-roboto'
import './App.css';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { blue, deepOrange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from './store/auth-context';
import AddDevice from './components/AddDeviceModal';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
});

function App() {
  const authContext = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='*' render={() => '404 NOT FOUND'} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
