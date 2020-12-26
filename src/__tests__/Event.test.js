import React from 'react';
import Event from '../Event';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
	let EventWrapper;
	beforeAll(() => {
		EventWrapper = shallow(<Event event={mockData[0]}/>);
	}); 

	afterEach(() => {
		EventWrapper = shallow(<Event event={mockData[0]}/>);
		EventWrapper.setState({ isOpen: false });
	});

	test('render correct information when event is collapsed', () => {
		expect(EventWrapper.find('.name')).toHaveLength(1);
		expect(EventWrapper.find('.dateTime')).toHaveLength(1);
		expect(EventWrapper.find('.timeZone')).toHaveLength(1);
		expect(EventWrapper.find('.location')).toHaveLength(1);
	});

	test('render the show details button when event is collapsed', () => {
		expect(EventWrapper.find('.details-btn')).toHaveLength(1);
	});

	test('show details state is changed when button is clicked', () => {
		EventWrapper.find('.details-btn').simulate('click');
		expect(EventWrapper.state('isOpen')).toBe(true); //.toEqual is used for complex data types (arrays, objects, functions)
	});

	test('event description is shown when the show details button is clicked', () => {
		EventWrapper.find('.details-btn').simulate('click');
		const description = 'Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.';
		expect(EventWrapper.find('.description').text()).toBe(description); //.toEqual is used for complex data types (arrays, objects, functions)
	});

	test('render the hide details button when event is expanded', () => {
		EventWrapper.find('.details-btn').simulate('click');
		expect(EventWrapper.find('.details-btn').text()).toBe('hide details');
	});
});