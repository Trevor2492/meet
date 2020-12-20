import React from 'react';
import Event from '../Event';
import { shallow } from 'enzyme';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event />);
	}); 

	afterEach(() => {
		EventWrapper.setState({ isOpen: false });
	});

	test('render correct information when event is collapsed', () => {
		expect(EventWrapper.find('.summary')).toHaveLength(1);
		expect(EventWrapper.find('.dateTime')).toHaveLength(1);
		expect(EventWrapper.find('.timeZone')).toHaveLength(1);
		expect(EventWrapper.find('.location')).toHaveLength(1);
	});

	test('render the show details button when event is collapsed', () => {
		expect(EventWrapper.find('.show-details')).toHaveLength(1);
	});

	test('show details state is changed when button is clicked', () => {
		EventWrapper.find('.show-details').simulate('click');
		expect(EventWrapper.state('isOpen')).toBe(true); //.toEqual is used for complex data types (arrays, objects, functions)
	});

	test('event description is shown when the show details button is clicked', () => {
		EventWrapper.find('.show-details').simulate('click');
		expect(EventWrapper.find('.description').text()).toBe('Description'); //.toEqual is used for complex data types (arrays, objects, functions)
	});

	test('render the hide details button when event is expanded', () => {
		EventWrapper.find('.show-details').simulate('click');
		expect(EventWrapper.find('.show-details').text()).toBe('hide details');
	});
});