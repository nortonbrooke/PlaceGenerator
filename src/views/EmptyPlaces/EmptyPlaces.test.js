import React from 'react';
import ReactDOM from 'react-dom';
import EmptyPlaces from './EmptyPlaces';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmptyPlaces />, div);
  ReactDOM.unmountComponentAtNode(div);
});
