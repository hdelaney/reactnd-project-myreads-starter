import React, { Component } from 'react';
import Book from './Book.js';

/**
* @description Represents all books for searching
* @constructor
* @param {array} props.books - Prop of state book objects in an array
* @param {function} props.handleChange - Prop function to handle shelf change
* @param {string} props.query - Prop of state query for performing filtering of books
*/
class ListSearchBooks extends Component {


	/**
	* @description Handles book shelf change
	* @param {string} newshelf - The new shelf for the book
  * @param {string} id - The book's id
	*/
	handleChange = (selected, newshelf, id) => {
		this.props.handleChange(selected, newshelf, id, this.props.shelvedBooks);
	}


  render() {

  	const { shelvedBooks, books, query } = this.props;

		const displayBooks = (query === '' || books.error === 'empty query') ?
		 	false
		 	:
		 	books.filter((book) =>
	 			book.imageLinks
		 	);


		if (displayBooks.length > 0 && displayBooks !== false) {
			displayBooks.map((dbook) => {
	 			let filtered = shelvedBooks.filter((sbook) => (
	 				sbook && sbook.id === dbook.id
	 			))
	 			if (filtered.length > 0) {
	 				dbook.shelf = filtered[0].shelf;
	 			}
	 			return dbook;
		 		})
		}

  	return (

	    <div className="search-books-results">
	      <ol className="books-grid">
				{(displayBooks && displayBooks.length > 0) &&
          displayBooks.map((book, index) => (
          	<Book key={index} shelf={book.shelf} id={book.id} book={book} handleChange={this.handleChange} handleRating={this.handleRating} />
          ))
      	}
	      </ol>
	    </div>

  	);
  }

}

export default ListSearchBooks;