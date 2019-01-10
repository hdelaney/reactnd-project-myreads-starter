import React from 'react';
import Book from './Book.js';


/**
* @description Wrapper for handling and displaying books for particular shelves
* @constructor
* @param {array} props.books - Prop of state book objects in an array
* @param {function} props.handleChange - Prop function to handle shelf change
*/
class BookWrapper extends React.Component {


	/**
	* @description Handles book shelf change
	* @param {string} newshelf - The new shelf for the book
  * @param {string} id - The book's id
	*/
	handleChange = (selected, newshelf, id) => {
		this.props.handleChange(selected, newshelf, id, this.props.books);
	}

	render() {
		return(
			<div className="bookshelf-books">
	      <ol className="books-grid">
	      	{this.props.books.filter(book => book.shelf === this.props.shelf)
	      		.map((book, index) =>
	  				<Book key={index} shelf={this.props.shelf} id={book.id} book={book} handleChange={this.handleChange}/>
	  			)}
	      </ol>
	    </div>
		);
	}
}

export default BookWrapper;