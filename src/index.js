import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';

// react-redux
import {Provider} from 'react-redux';
import store from './redux/store';

// react-query
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
 const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
