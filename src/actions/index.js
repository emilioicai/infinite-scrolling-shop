import { fetchAciis } from '../api'
import { NUM_ASCIIS_PAGE } from '../constants'

export const FETCH_MORE_ASCIIS = 'FETCH_MORE_ASCIIS';
export const FETCH_MORE_ASCIIS_DONE = 'FETCH_MORE_ASCIIS_DONE';
export const SET_SORTING = 'SET_SORTING';

export function fetchMoreAsciis(skip = 0, field = 'id') {
    return dispatch => {
        dispatch({
            type: FETCH_MORE_ASCIIS
        });
        fetchAciis(NUM_ASCIIS_PAGE, skip, field)
            .then((asciis) => {
                dispatch({
                    type: FETCH_MORE_ASCIIS_DONE,
                    asciis
                });
            });
    }
}

export function setSorting(field = 'id') {
    return dispatch => {
        dispatch({
            type: SET_SORTING,
            field
        });
        dispatch({
            type: FETCH_MORE_ASCIIS
        });
        fetchAciis(NUM_ASCIIS_PAGE, 0, field)
            .then((asciis) => {
                dispatch({
                    type: FETCH_MORE_ASCIIS_DONE,
                    asciis
                });
            });
    }
}