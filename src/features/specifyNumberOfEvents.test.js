import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

	test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {

		given('the user hasn\'t specified a number of events', () => {
			//intentionally empty
		});

		let AppWrapper;
		when('the user opens the app', () => {
			AppWrapper = mount(<App />);
		});

		then('they should see 32 events total', () => {
			expect(AppWrapper.state('eventCount')).toBe(32);
		});

	});


	test('User can change the number of events they want to see', ({ given, when, then }) => {

		let NumberOfEventsWrapper;
		given('the user hasn\'t specified a number of events', () => {
			NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
		});

		when('when the user types in a number', () => {
			NumberOfEventsWrapper.find('.max-events').simulate('change', { target: { value: 3 } });
		});

		then('that number of events will be shown', () => {
			expect(NumberOfEventsWrapper.state('query')).toBe(3);
		});

	});

});