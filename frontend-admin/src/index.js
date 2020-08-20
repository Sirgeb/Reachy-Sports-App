import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F58634",
    },
    secondary: {
      main: "#ffffff",
    }
  },
});

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.register();
