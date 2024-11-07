import React from 'react';
import { shallow } from 'enzyme';
import ExampleComponent from '../src/index';
import '../src/index.scss';

it('renders', () => {
  const wrapper = shallow(<ExampleComponent />);
  expect(wrapper.find('.ExampleComponent').length).toBe(1);
});
