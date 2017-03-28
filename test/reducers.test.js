import { assert } from 'chai'

import * as actions from '../src/actions'
import reducers from '../src/reducers'

describe('Reducers', function() {
	const yesterday = (Date.now() - 24*60*60*1000);
	const twoWeeksAgo = (Date.now() - 14*24*60*60*1000);
	const oneYearAgo = (Date.now() - 365*24*60*60*1000);
	const asciis = [
		{ id: 1, face: ':)', size: 2, price: 3, date:  yesterday},
		{ id: 2, face: ':(', size: 4, price: 520, date: twoWeeksAgo },
		{ id: 3, face: ':|', size: 6, price: 700, date: oneYearAgo }
	];

    it('returns an initialised default state', function() {
        const state = reducers();

        assert.isArray(state.asciis);
        assert.equal(state.asciis.length, 0);
        assert.isFalse(state.loadingAsciis);
        assert.isFalse(state.endOfCatalogue);
    });

    describe('reactions to actions', function() {

		it('sets the loading sign when fetching', function() {
    		let state = reducers();
			const action = {type: actions.FETCH_MORE_ASCIIS };
			state = reducers(state, action);

			assert.isTrue(state.loadingAsciis);
		});

		it('unsets the loading sign when fetching is complete', function() {
    		let state = reducers();
			const action = {type: actions.FETCH_MORE_ASCIIS };
			const action2 = { asciis: asciis, type: actions.FETCH_MORE_ASCIIS_DONE };
			state = reducers(state, action);

			assert.isTrue(state.loadingAsciis);

			state = reducers(state, action2);

			assert.isFalse(state.loadingAsciis);
		});

		it('sets end of catalogue === true when no more asciis are received', function() {
    		let state = reducers();
			const action = { asciis: [], type: actions.FETCH_MORE_ASCIIS_DONE };
			state = reducers(state, action);

			assert.isTrue(state.endOfCatalogue);
		});

    });
});