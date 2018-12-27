import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Stars extends Component {


	render() {
		let stars = [];
		const rating = this.props.book.averageRating;
		if (rating === undefined) {
			stars.push(
				<span key='noRating' className={'no-rating'}>No average rating available.</span>
			)
		}
		if (rating && rating !== undefined) {
			const rounded = Math.round(rating);
			const leftover = 5 - rounded;
			for (let i = 0; i < rounded; i++) {
				let string = i.toString();
				stars.push(
					<span key={'ystar' + string} style={{color: '#f4d107'}}><FontAwesomeIcon icon='star' size='sm' /></span>
				)
			}

			for (let i = 0; i < leftover; i++) {
				let string = i.toString();
				stars.push(
					<span key={'gstar'+string} style={{color: '#999'}}><FontAwesomeIcon icon='star' size='sm' /></span>
				)
			}
		}

		return(

			<div>
				{stars}
			</div>
		)
	}

}


export default Stars;