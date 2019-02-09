import React from 'react';
import ReactDOM from 'react-dom';
import Radius from './Radius';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Radius />, div);
  ReactDOM.unmountComponentAtNode(div);
});
