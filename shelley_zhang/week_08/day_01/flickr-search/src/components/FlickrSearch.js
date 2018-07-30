import React, { Component } from 'react';
import jsonp from 'jsonp-es6'

//JSONP (json with padding) is a method commonly used to bypass the cross domain policies in web browsers. It does not use the XMLHttpRequest object and uses the script tag instead.

//Hierarchy=======================================================================================================================
//the component hierarchy:
//flickrsearch
  //searchform
    //gallery
      //images

//better to go top-down for simple projects and bottom-up for larger projects - testing

//State===========================================================================================================================
//props are a way of passing data from parent to child
//State is similar to props but is private and fully controlled by the component
//to figure out which component is state:
  //is it passed in from a parent via props? not State
  //does it remain unchanged over time? not State
  // can you compute it based on any other state or props in your component? not state


//you convert a functional components to a class by extending React.Component, adding render, placing body of function into render method and replace props with this.props in the render() body

//searches flickr for relevant image based on searchForm component, ajax calls
class FlickrSearch extends Component {
  constructor() { //special method for creating and initialising an object created with a class
    super();
    this.state = { //this points to the immediate parent object
      images: []
    }
    this.fetchImages = this.fetchImages.bind(this); //the bind method sets the value of a function's this regardless of how it's called
  }

  fetchImages(q) {

    console.log('searching flickr', q);

  const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?';
  const flickrParams = {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084', //not a secret key
    text: q,
    format: 'json'
  };

  const generateURL = function (photo) {
    return [
      'http://farm',
      photo.farm,
      '.static.flickr.com/',
      photo.server,
      '/',
      photo.id,
      '_',
      photo.secret,
      '_q.jpg' // Change 'q' to something else for different sizes
    ].join(''); // Return a string by join()ing the array elements.
  };

  //save those images in state

  jsonp(flickrURL, flickrParams, {callback: "jsoncallback"}).then((results) => {
    const images = results.photos.photo.map(generateURL);
    this.setState({images: images}); //save those images in state
  });

    this.setState({images: []});

  }

  render() {
    return (
      <div>
        <h2>Flickr Search</h2>
        <SearchForm onSubmit={ this.fetchImages }/>
        <Gallery images={ this.state.images }/>
      </div>
    );
  }
}

//receives all user input
class SearchForm extends Component {
  constructor() {
    super();
    this.state = {query: ''}
    this._handleInput = this._handleInput.bind( this ); //remember the original object
    this._handleSubmit = this._handleSubmit.bind( this );
  }

  _handleInput(e) {
    // console.log( e.target.value );
    this.setState( {query: e.target.value} );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  render() {
    return (
    <form onSubmit = { this._handleSubmit }>
      <input type="search" placeholder="bewbs" required onInput = { this._handleInput }/>
      <input type="submit" value="Search" />
    </form>
    );
  }
}

//loops thru images and turn into individual image components. This is actually optional

class Gallery extends Component {
  render() {
    return (
      <div>
      { this.props.images.map( (url) => <Image url={url} key={url} /> )} //new array
      </div>
    );
  }
}

function Image(props) {
  return (
    <img src={ props.url } width="150" height="150" alt={ props.url }/>
  );
}

export default FlickrSearch
