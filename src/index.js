import React from 'react';
import ReactDOM from 'react-dom';
import { LoadScript } from '@react-google-maps/api';
import App from './App';

ReactDOM.render(
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    libraries={['places']}
  >
    <App />
  </LoadScript>,
  document.getElementById('root'),
);
