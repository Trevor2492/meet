import React, { Component } from "react";
import { getEvents, extractLocations } from "./api";
import "./App.css";
import "./nprogress.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { ErrorAlert } from "./Alert";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    prevEventCount: undefined,
    infoText: "",
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    if (!navigator.onLine) {
      this.setState({
        infoText:
          "You are currently offline and any events shown may not be accurate. Go online then re-open the app to load current events.",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined || 0) {
      this.setState({ eventCount: 32 });
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents.slice(0, this.state.eventCount),
        });
      });
    }

    if (location === undefined) {
      location = "all";
      this.setState({ eventCount: eventCount });
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents.slice(0, this.state.eventCount),
        });
      });
    }
  };

  // This function gets the location data for the scatterplot chart
  getData = () => {
    const { locations, events } = this.state;

    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length; //This line gets the number of events in each city location
      const city = location.split(" ").shift(); //This line gets just the city name instead of the city, country
      return { city, number };
    });

    return data;
  };

  render() {
    return (
      <div className="App">
        <div className="offlineAlert">
          <ErrorAlert text={this.state.infoText} />
        </div>

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateEvents={this.updateEvents} />

        <div className="data-vis-wrapper">
          {/* This section is the pie chart */}
          <EventGenre events={this.state.events} />

          {/* This section creates the scatter chart */}
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="Location" />
              <YAxis
                type="number"
                dataKey="number"
                name="Number of Events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
