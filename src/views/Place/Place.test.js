import React from 'react';
import ReactDOM from 'react-dom';
import Place from './Place';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Place />, div);
  ReactDOM.unmountComponentAtNode(div);
});
