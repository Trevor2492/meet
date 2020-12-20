import React, { Component } from 'react'

class Event extends Component{

	state = {
		isOpen: false
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		const { event } = this.props;

		return (
			<div>
				<div className="summary"></div>
				<div className="dateTime"></div>
				<div className="timeZone"></div>
				<div className="location"></div>

				{ this.state.isOpen && <div className="description">Description</div> }

				<button className="show-details" onClick={this.toggle}>{this.state.isOpen ? 'hide details' : 'show details'}</button>
			</div>
		)
	}
}

export default Event;