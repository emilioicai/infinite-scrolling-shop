import { FETCH_MORE_ASCIIS, FETCH_MORE_ASCIIS_DONE, SET_SORTING } from '../actions'

const defaultState = {
	asciis: [],
	loadingAsciis: false,
	sortBy: 'id',
	endOfCatalogue: false
}


export default function(state = defaultState, action) {
	if(!action || !action.type) {
		return state;
	} 

	switch(action.type) {
		case FETCH_MORE_ASCIIS:
		return {...state, loadingAsciis: true};
		case FETCH_MORE_ASCIIS_DONE:
		return {...state, asciis: state.asciis.concat(action.asciis), loadingAsciis: false, endOfCatalogue: (action.asciis.length === 0)};
		case SET_SORTING:
		return {...state, sortBy: action.field, asciis: []};
	}

	return state;
}