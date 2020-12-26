import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


describe('<App /> component', () => {
	let AppWrapper;
	beforeAll(() => {
		AppWrapper = shallow(<App />);
	});

	test('render list of events', () => {
		expect(AppWrapper.find(EventList)).toHaveLength(1);
	});

	test('render CitySearch', () => {
		expect(AppWrapper.find(CitySearch)).toHaveLength(1);
	});

	test('render Number of Events component', () => {
		expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
	});

});



describe('<App /> integration', () => {
	
	test('App passes "events" state as a prop to EventList', () => {
		const AppWrapper = mount(<App />);
		const AppEventsState = AppWrapper.state('events');
		expect(AppEventsState).not.toEqual(undefined);
		expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
		AppWrapper.unmount();
	});

	test('App passes "locations" state as a prop to CitySearch', () => {
		const AppWrapper = mount(<App />);
		const AppLocationsState = AppWrapper.state('locations');
		expect(AppLocationsState).not.toEqual(undefined);
		expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
		AppWrapper.unmount();
	});

	test('get list of events matching the city selected by the user', async () => {
		const AppWrapper = mount(<App />);
		const CitySearchWrapper = AppWrapper.find(CitySearch);
		const locations = extractLocations(mockData);
		CitySearchWrapper.setState({ suggestions: locations });
		const suggestions = CitySearchWrapper.state('suggestions');
		const selectedIndex = Math.floor(Math.random() * (suggestions.length)); //returns a random integer between 0 and suggestions.length. (Math.floor(Math.random() * 10); returns a random integer from 0 to 9)
		const selectedCity = suggestions[selectedIndex];
		await CitySearchWrapper.instance().handleItemClicked(selectedCity);
		const allEvents = await getEvents();
		const eventsToShow = allEvents.filter(event => event.location === selectedCity);
		expect(AppWrapper.state('events')).toEqual(eventsToShow);
		AppWrapper.unmount();
	});

	test('get a list of all events when the user selects "See all cities"', async () => {
		const AppWrapper = mount(<App />);
		const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
		await suggestionItems.at(suggestionItems.length - 1).simulate('click');
		const allEvents = await getEvents();
		expect(AppWrapper.state('events')).toEqual(allEvents);
		AppWrapper.unmount();
	});

	test('filter the list of events to a number the user specifies', async () => {
		const AppWrapper = mount(<App />);
		const eventObject = { target: { value: 1 }};
		AppWrapper.find(NumberOfEvents).find('.max-events').simulate('change', eventObject);
		expect(AppWrapper.state('eventCount')).toBe(1);
		AppWrapper.unmount();
	});

});