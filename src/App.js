import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookWrapper from './BookWrapper.js';
import ListSearchBooks from './ListSearchBooks.js';
import { Route } from 'react-router-dom';
import {Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)


class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      query: '',
      showSearchPage: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  /**
  * functions for book shelf changes
  */

  updateState (booklist) {
    this.setState({books: booklist});
  }

  handleChange (newshelf, id, prevBooks) {
    const updatedBooks = prevBooks.map(book => {
      if(book.id !== id) return book;

      book.shelf = newshelf;
      BooksAPI.update(book, newshelf);
      return book;
    });
    
    this.updateState(updatedBooks);   
  }


  /**
  * functions for search
  */

  updateQuery (query) {
    this.setState(() => ({
      query: query.trim(),
    }))
  }



  render() {
    return (
      <div className="app">

        {this.state.showSearchPage ? (
          <div>
            <Route exact path='/search' render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to='/'>
                  <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
                <ListSearchBooks books={this.state.books} query={this.state.query} handleChange={this.handleChange} />
              </div>
            )} />
          </div>
        ) : (
          <div>
            <Route path='/' render={() => (
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
                  <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                  </Link>
                </div>
              </div>
            )} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
