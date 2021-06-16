import React from 'react';
import {create} from 'react-test-renderer';
import RegistrationScreen from '../screens/RegistrationScreen';

import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const tree = create(<RegistrationScreen/>);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});


if('should change state if email is entered', () => {
  const instanceOf = renderer.create(<RegistrationScreen/>).getInstance();
  instanceOf.handleEmailChange('abcd@gmail.com');
  expect(instanceOf.state.email).toEqual('abcd@gmail.com');
});


