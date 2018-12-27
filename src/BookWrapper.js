import React from 'react';
import Book from './Book.js';


class BookWrapper extends React.Component {

	handleChange = (newshelf, id) => {
		this.props.handleChange(newshelf, id, this.props.books);
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