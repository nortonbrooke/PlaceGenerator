import React from 'react';
import ReactDOM from 'react-dom';
import Bubbles from './Bubbles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bubbles>foo</Bubbles>, div);
  ReactDOM.unmountComponentAtNode(div);
});
