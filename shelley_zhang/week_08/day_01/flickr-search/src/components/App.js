//import any modules required - will need React
import React, { Component } from 'react';
import FlickrSearch from './FlickrSearch';


//create a new class that extends the React.component
class App extends Component {
  //components must have a render function that returns HTML
  render() {
    return (
      <div className="App">
        <FlickrSearch />
      </div>
    );
  }
}

export default App;

//break up components the represent exactly one piece of your data model.
