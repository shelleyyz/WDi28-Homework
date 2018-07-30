import React, { Component } from 'react';
import jsonp from 'jsonp-es6'


class BookSearch extends Component {
  //2. defining fetchBook function and api deets

  fetchBook(q) {
    const bookURL = 'https://www.googleapis.com/books/v1/volumes?=q';
    const bookParams = {
      q: q,
  };

  jsonp(bookURL, bookParams, {callback: "jsoncallback"}).then((results)) => {
    const cover = info.items[0].volumeInfo.imageLinks.thumbnail;
  });

  })

  //1. defining what will be rendering first
  render() {
    return (
      <div>
        <h2>Book Search</h2>
        <SearchForm onSubmit={ this.fetchBook }/>
      </div>
    );
  }
}
