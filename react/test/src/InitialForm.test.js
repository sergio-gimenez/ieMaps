import React from 'react';
import ReactDOM from 'react-dom';
import InitialForm from './InitialForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InitialForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
