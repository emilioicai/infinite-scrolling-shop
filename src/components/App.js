import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import Gallery from './Gallery'
import Nav from './Nav'
import { INFINITE_TRIGGER_OFFSET } from '../constants'

var styles = {};

class App extends Component {
    constructor(props) {
        super(props);
        this.offsetHeight = -1;
    }

    handleSortChange(event) {
        if(!event.target.value) return;
    	this.offsetHeight = -1;
    	this.props.setSorting(event.target.value);	
    }

    componentDidMount() {
        const self = this;
        // INFINITE SCROLLING
        window.onscroll = function(ev) {
            //TODO: Use document.documentElement.scrollTop instead of window.scrollY for IE.
            if (self.offsetHeight < document.body.offsetHeight && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - INFINITE_TRIGGER_OFFSET) {
                self.offsetHeight = document.body.offsetHeight;
                self.props.fetchMoreAsciis(self.props.asciis.length, self.props.sortBy);
            }
        };
        self.props.fetchMoreAsciis();
    }

    render() {
        const { asciis, loadingAsciis, endOfCatalogue, fetchMoreAsciis } = this.props;

        return (
        	<div>
                <Nav loadingAsciis={loadingAsciis} onSortSelected={this.handleSortChange.bind(this)}/>
                <Gallery asciis={asciis} loadingAsciis={loadingAsciis} endOfCatalogue={endOfCatalogue} fetchMoreAsciis={fetchMoreAsciis}/>
        	</div>
        )
    }
};

//*** REDUX BOILERPLATE ***
function mapStateToProps(state) {
    return {
        asciis: state.asciis,
        loadingAsciis: state.loadingAsciis,
        sortBy: state.sortBy,
        endOfCatalogue: state.endOfCatalogue
    }
}

function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(App)
