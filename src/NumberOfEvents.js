import React, { Component } from 'react';
import { mockData } from './mock-data';

class NumberOfEvents extends Component {

	state = {
		query: undefined
	}

	handleInputChanged = (event) => {
		const value = event.target.value;
		this.setState({ query: value });

		this.props.updateEvents(undefined, value);
	};


	render() {
		let data = mockData;
		return (
			<div className="numberOfEvents">
				Number of Events
				<input 
					type="number"
					className="max-events"
					value={this.state.query}
					onChange={this.handleInputChanged}
				/>

				<div className="render-events">
					{ this.state.query === null ? data.length : data.slice(0, this.state.query).length}
				</div>
			</div>
		)
	}
}

export default NumberOfEvents