import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount} from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {

	let AppWrapper;

	test('An event element is collapsed by default', ({ given, when, then }) => {
		given('the user hasn\'t clicked the show details button on the event', () => {
			//intentionally empty
		});

		when('the user opens the app', () => {
			AppWrapper = mount(<App />);
		});

		then('the extra details should be hidden', () => {
      expect(AppWrapper.find('.event').find('.description')).toHaveLength(0);
		});
	});


	test('User can expand an event to see its details', ({ given, when, then }) => {
		given('the user hasn\'t clicked the show details button on the event', () => {
			//intentionally empty
		});

		let EventWrapper;
		when('the user clicks the show details button', () => {
			EventWrapper = mount(<Event event={mockData[0]}/>);
			EventWrapper.find('.event').find('.details-btn').simulate('click');
		});

		then('the extra details should be displayed', () => {
			expect(EventWrapper.find('.event').find('.description')).toHaveLength(1);
		});
	});


	test('User can collapse an event to hide its details', ({ given, when, then }) => {
		given('the extra details are displayed', () => {
			EventWrapper = mount(<Event event={mockData[0]}/>);
			EventWrapper.find('.event').find('.details-btn').simulate('click');
		});

		let EventWrapper;
		when('the user clicks the hide details button', () => {
			EventWrapper.find('.event').find('.details-btn').simulate('click');
		});

		then('the extra details should be hidden', () => {
			expect(EventWrapper.find('.event').find('.description')).toHaveLength(0);
		});
	});

});