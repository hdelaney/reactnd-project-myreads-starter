import React from 'react';
import Stars from './Stars.js';


class Book extends React.Component {

	handleChange = (e) => {
		e.preventDefault();
		this.props.handleChange(e.target.value, this.props.id);
	}


	render() {

	return(
		<li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`}}></div>
        <div className="book-shelf-changer">
          <select value={this.props.shelf} onChange={this.handleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.book.title}</div>
      <div className="book-authors">{this.props.book.authors[0]}</div>
      <Stars book={this.props.book} id={this.props.id} />
    </div>
  </li>

	);
	}
	
}

export default Book;