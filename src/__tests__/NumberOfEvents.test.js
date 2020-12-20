import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {
	let locations, NumberOfEventsWrapper;
	beforeAll(() => {
		locations = extractLocations(mockData);
		NumberOfEventsWrapper = shallow(<NumberOfEvents />);
	});

	afterEach(() => {
		NumberOfEventsWrapper.setState({ query: null });
	});

	test('render text input box', () => {
		expect(NumberOfEventsWrapper.find('.max-events')).toHaveLength(1);
	});

	test('render correct number of events when input is empty', () => {
		expect(NumberOfEventsWrapper.find('.render-events').text()).toEqual(mockData.length.toString()); //This is the number of objects in the mockdata before it's been modified
	});

	test('change state when number input changes', () => {
		NumberOfEventsWrapper.setState({ query: null });
		NumberOfEventsWrapper.find('.max-events').simulate('change', { target: { value: 2 }});
		const query = NumberOfEventsWrapper.state('query');
		expect(query).toBe(2);
	});

	test('render correct number of events when input is changed', () => {
		NumberOfEventsWrapper.setState({ query: null });
		NumberOfEventsWrapper.find('.max-events').simulate('change', { target: { value: 1 }});
		expect(NumberOfEventsWrapper.find('.render-events').text()).toBe('1');
	});

});