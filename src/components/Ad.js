import React, { Component } from 'react'

var styles = {
	container: { 
		display: 'inline-block',
	    height: 180,
	    width: 300,
	    backgroundColor: '#eee',
	    margin: 20,
	    verticalAlign: 'middle',
	    textAlign: 'center',
	}
}

export default function(props) {
	return (
		<li style={styles.container}>
			<img className="ad" src={"/ad/?r=" + props.adId} height={styles.container.height} width={styles.container.width}/>
		</li>
	)
}