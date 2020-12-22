import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Client from './apollo/Client';
import App from './components/App';
import AppContext from './hooks/AppContext';
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
  <ThemeProvider theme={theme}>
    <ApolloProvider client={Client}>
      <AppContext>   
        <App />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </AppContext>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.register();
