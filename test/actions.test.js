import { assert } from 'chai'
import sinon from 'sinon'

import * as actions from '../src/actions'

describe('Actions', function() {
    sinon.stub(global, 'fetch').returns({ then: () =>{ return { then:(f)=>{ f(); } } } });
    
    describe('fetchMoreAsciis()', function() {

        it('returned thunk makes an dipatches FETCH_MORE_ASCIIS and FETCH_MORE_ASCIIS_DONE', function() {
            const dispatch = sinon.spy();
            const thunk = actions.fetchMoreAsciis();
            thunk(dispatch);

            assert(dispatch.calledTwice);
            assert.equal(dispatch.firstCall.args[0].type, actions.FETCH_MORE_ASCIIS);
            assert.equal(dispatch.secondCall.args[0].type, actions.FETCH_MORE_ASCIIS_DONE);
        });

    });

    describe('setSorting()', function() {

        it('returned thunk makes an dipatches SET_SORTING, FETCH_MORE_ASCIIS and FETCH_MORE_ASCIIS_DONE', function() {
            const dispatch = sinon.spy();
            const thunk = actions.setSorting();
            thunk(dispatch);

            assert(dispatch.calledThrice);
            assert.equal(dispatch.firstCall.args[0].type, actions.SET_SORTING);
            assert.equal(dispatch.secondCall.args[0].type, actions.FETCH_MORE_ASCIIS);
            assert.equal(dispatch.thirdCall.args[0].type, actions.FETCH_MORE_ASCIIS_DONE);
        });

    });
});