import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.scss';

const title = 'Shweta Mandavgane\'s portfolio';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);
