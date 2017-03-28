import React, { Component } from 'react'
import moment from 'moment'

var styles = {
	container: { 
		display: 'inline-block',
		verticalAlign: 'middle',
		margin: 20,
	    minHeight: 150,
	    minWidth: 300,
	    textAlign: 'center',
	    backgroundColor: '#eee'
	},
	price: {
		lineHeight: '10px',
		fontWeight: 'bold'
	},
	date: {
		lineHeight: '10px',
		fontSize: 10
	},
	face: {
		lineHeight: '130px'
	}
}

export default function(props) {
	const { id, face, price, size, date } = props;
	let formattedDate;
	styles.face.fontSize = size;

	//Choose format for date: if smaller than one week ...ago, otherwise display DD/MM/YYYY

	if(moment(date).unix() > Date.now()/1000 - (7 * 24 * 60 * 60)) {
		formattedDate = moment(date).fromNow();
	} else {
		formattedDate = moment(date).format('DD/MM/YYYY');
	}

	return (
		<li style={styles.container}>
			<p className='face' style={styles.face}>{face}</p>
			{ price && <p className='price' style={styles.price}>{'$' + price / 100}</p> }
			{ date && <p className='date' style={styles.date}>{formattedDate}</p> }
		</li>
	)
}
