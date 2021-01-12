import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

	state = {
		query: undefined,
		infoText: ''
	}

	handleInputChanged = (event) => {
		const value = event.target.value;

		this.setState({ query: value });

		if (value < 1 || value > 32){
			this.setState({
				infoText: 'Please enter a number between 1 and 32'
			});
		} else {
			this.setState({ 
				query: value, 
				infoText: ''
			});

			this.props.updateEvents(undefined, value);
		}

	};


	render() {
		return (
			<div className="numberOfEvents">
				Number of Events
				<input 
					type="number"
					className="max-events"
					value={this.state.query}
					onChange={this.handleInputChanged}
				/>

				<ErrorAlert text={this.state.infoText} />

			</div>
		)
	}
}

export default NumberOfEvents