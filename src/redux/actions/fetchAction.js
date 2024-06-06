//Action constants
export const FETCH_LOADING = 'Fetch Loading';
export const FETCH_SUCCESS = 'Fetch Success';
export const FETCH_FAILURE = 'Fetch Failure';

//Action creators
export const fetchLoading = () => ({type : FETCH_LOADING});
export const fetchSuccess = (data) => ({type : FETCH_SUCCESS, payload : data});
export const fetchFailure = (error) => ({type : fetchFailure,payload : error });
