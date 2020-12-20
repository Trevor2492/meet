import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import {mockData} from './mock-data';

class App extends Component {

  render (){
    const events = mockData;

    return (
      <div className="App">
        <CitySearch />
        <NumberOfEvents />
        <EventList events={events}/>
      </div>
    );
  }
}

export default App;
