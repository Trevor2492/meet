Feature: Show Hide Event Details

	Scenario: An event element is collapsed by default
		Given the user hasn't clicked the show details button on the event
		When the user opens the app
		Then the extra details should be hidden

	Scenario: User can expand an event to see its details
		Given the user hasn't clicked the show details button on the event
		When the user clicks the show details button
		Then the extra details should be displayed

	Scenario: User can collapse an event to hide its details
		Given the extra details are displayed
		When the user clicks the hide details button
		Then the extra details should be hidden
