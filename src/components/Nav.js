import React, { Component } from 'react'

export default function(props) {
	return (
		<nav className="navbar navbar-default" style={{position: 'fixed' , width: '100%'}}>
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand" href="#">
		        Discount Ascii Warehouse
		      </a>

		      { props.loadingAsciis && <img src='/img/spinner.svg' style={{marginTop: 10, position: 'absolute'}} /> }

		      <div style={{position: 'absolute', width: 200, top: 10, right: 10}}>
			      <select onChange={props.onSortSelected} className='form-control'>
			      	<option value=''>Sort by...</option>
			      	<option value=''></option>
	    			<option value='id'>Id</option>
	    			<option value='size'>Size</option>
	    			<option value='price'>Price</option>
		    	  </select>
		      </div>
		    </div>
		  </div>
		</nav>
	)
}