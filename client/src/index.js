import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import themeSettings from './config/theme.json';
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme(themeSettings);

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </BrowserRouter>,  
  document.getElementById('root')
);

serviceWorker.register();
