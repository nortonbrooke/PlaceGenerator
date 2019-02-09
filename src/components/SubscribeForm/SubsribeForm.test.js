import React from 'react';
import ReactDOM from 'react-dom';
import SubscribeForm from './SubscribeForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubscribeForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
