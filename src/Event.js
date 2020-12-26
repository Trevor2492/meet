import React, { Component } from 'react'

class Event extends Component{

	state = {
		isOpen: false,
	}

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
 		const { event } = this.props;

		return (
			<div className="event">
				<div className="name">{event.summary}</div>
				<div className="dateTime">Start Time: {event.start.dateTime}</div>
				<div className="timeZone">Time Zone: {event.start.timeZone}</div>
				<div className="location">Location: {event.location}</div>

				{ this.state.isOpen && <div className="description">{event.description}</div> }

				<button className="details-btn" onClick={this.toggle}>{this.state.isOpen ? 'hide details' : 'show details'}</button>
			</div>
		)
	}
}

export default Event;