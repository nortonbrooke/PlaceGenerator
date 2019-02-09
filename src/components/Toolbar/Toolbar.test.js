import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toolbar>
    <button>Click me</button>
    <button>Click me</button>
    <button>Click me</button>
  </Toolbar>, div);
  ReactDOM.unmountComponentAtNode(div);
});
