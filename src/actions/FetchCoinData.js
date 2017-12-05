import axios from 'axios';
import {apiBaseUrl} from "../utils/Constants";
import {
    FETCHING_COIN_DATA,
    FETCHING_COIN_DATA_FAIL,
    FETCHING_COIN_DATA_SUCCESS
} from "../utils/ActionTypes";

export default function FetchCoinData() {
    console.log('Fetching');
    return dispatch => {
        dispatch({type: FETCHING_COIN_DATA});

        return axios.get(`${apiBaseUrl}/v1/ticker/?limit=10`)
            .then(res => {
                dispatch({type: FETCHING_COIN_DATA_SUCCESS, payload: res.data});
            })
            .catch(err => {
                dispatch({type: FETCHING_COIN_DATA_FAIL, payload: err.data});
            });
    }
}