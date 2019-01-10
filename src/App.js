import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookWrapper from './BookWrapper.js';
import ListSearchBooks from './ListSearchBooks.js';
import { Route, Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar);


class BooksApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchResults: [],
      searchLoaded: false,
      query: '',
    };

    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);
  }

  /**
  * @description API call for books
  */
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }


  // Functions for book shelf changes

  /**
  * @description Update state for books
  */
  updateState (booklist) {
    this.setState({books: booklist});
  }


  /**
  * @description Update book with new shelf
  * @param {string} newshelf - The new shelf for the book
  * @param {string} id - The book's id
  * @param {array} prevBooks - array of books to update
  */
  handleChange (selected, newshelf, id, prevBooks) {
    let updatedBooks = '';

    //if newshelf equals none
    //for a book currently assigned a shelf and to be evnetually removed from this.state.books
    if (newshelf === 'none') {
      selected.shelf = newshelf;
      updatedBooks = prevBooks.filter((pbook) => (
        pbook.id !== id
      ))

      this.updateState(updatedBooks);
    }

    //if no shelf property exists yet on the selected book
    //for a book selected from the search page and to be eventually added to this.state.books
    if (!selected.shelf) {
      selected.shelf = newshelf;
      prevBooks.push(selected);
      this.updateState(prevBooks);
    }

    //if the newshelf is not none, and the selected book has a shelf
    //for a book currently assigned a shelf
    if ((selected.shelf && selected.shelf !=='none') && newshelf !== 'none') {
      updatedBooks = prevBooks.map((pbook) => {

        if(pbook.id !== id) return pbook;

        if(pbook.id === id) {
          pbook.shelf = newshelf;
        }
        return pbook;
      });

      this.updateState(updatedBooks);
      BooksAPI.update(selected, newshelf);

    }
  }



  // Functions for search

  /**
  * @description Fires search for BooksAPI adn returns result
  * @param {string} query - search input content
  */
  handleNewSearch (query) {
    if (query) {
      BooksAPI.search(query.trim())
     .then((data) => {

        this.setState({
          searchResults: data,
          searchLoaded: true
        })

    })}
  }


  /**
  * @description Update state for search query
  * @param {string} query - search input content
  */
  updateQuery (query) {
    this.setState(() => ({
      query: query,
      searchLoaded: false
    }))
    this.handleNewSearch(query);
  }



  render() {
    return (
      <div className="app">
            <Route path='/search' render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to='/'>
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                  </div>
                </div>
                {(this.state.searchLoaded) &&
                  <ListSearchBooks shelvedBooks={this.state.books} books={this.state.searchResults} query={this.state.query} handleChange={this.handleChange} />
                }
              </div>
            )} />


            <Route exact path='/' render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <BookWrapper shelf='currentlyReading' books={this.state.books} handleChange={this.handleChange} />
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <BookWrapper shelf='wantToRead' books={this.state.books} handleChange={this.handleChange} />
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <BookWrapper shelf='read' books={this.state.books} handleChange={this.handleChange} />
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )} />
      </div>
    );
  }
}

export default BooksApp;
