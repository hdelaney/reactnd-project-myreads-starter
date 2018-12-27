import React, { Component } from 'react';
import Book from './Book.js';


class ListSearchBooks extends Component {

	handleChange = (newshelf, id) => {
		this.props.handleChange(newshelf, id, this.props.books);
	}

  render() { 

  	const { books, query } = this.props;

		const displayBooks = (query === '') ?
		 	false
		 	: 
		 	books.filter((book) => (
	 			(book.title.toLowerCase().includes(query.toLowerCase())) || 
	 			(book.authors[0].toLowerCase().includes(query.toLowerCase()))
		 	))


  	return (

	    <div className="search-books-results">
	      <ol className="books-grid">
				{displayBooks ?
          displayBooks.map((book, index) => (
          	<Book key={index} shelf={book.shelf} id={book.id} book={book} handleChange={this.handleChange} handleRating={this.handleRating} />
          )) : null
      	}	
	      </ol>
	    </div>

  	)
  }

}

export default ListSearchBooks;