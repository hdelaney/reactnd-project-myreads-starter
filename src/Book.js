import React from 'react';
import Stars from './Stars.js';


/**
* @description Represents a book
* @constructor
* @param {object} props.book - Prop of book object
* @param {function} props.handleChange - Prop function to handle shelf change
* @param {string} props.shelf - Prop of current shelf
* @param {string} props.id - The book's id
*/
class Book extends React.Component {

  /**
  * @description Handles book shelf change
  * @param {object} e - Event object
  */
	handleChange = (e) => {
		e.preventDefault();
		this.props.handleChange(this.props.book, e.target.value, this.props.id);
	}


	render() {
  	return(
  		<li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select value={(this.props.shelf) ? this.props.shelf : 'none'} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{(this.props.book.authors) ? this.props.book.authors[0] : 'Author n/a'}</div>
          <Stars book={this.props.book} />
        </div>
      </li>
    );
  }

}

export default Book;