export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL  = 'OPEN_MODAL';
export const REQUEST_TEST_DATA = 'REQUEST_TEST_DATA';
export const RETURN_TEST_DATA = 'RETURN_TEST_DATA';

export const INITIAL_STATE = {
  stories: [],
  openModal: null,
};

export const closeModal = payload => ({
  type: CLOSE_MODAL,
  payload,
});

export const openModal = payload => ({
  type: OPEN_MODAL,
  payload,
});

export const requestTestData = () => ({
  type: REQUEST_TEST_DATA,
});

export const returnTestData = payload => ({
  type: RETURN_TEST_DATA,
  payload,
});

function format(queryParams) {
  return Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
}

function api(endpoint, normalizer) {
  return function apiHandler(queryParams) {
    return (dispatch) => {
      dispatch(requestTestData());
      return fetch(`http://localhost:8000/housing_api${endpoint}?format=json&${format(queryParams)}`)
        .then(res => res.json())
        .then(normalizer)
        .then((data) => {
          dispatch(returnTestData(data));
        });
    };
  };
}

export const fetchDemoData = api('/affordable', json =>
  json.map(demo => [
    demo.affordable ? ':D' : ':C',
    demo.demographic.name,
    demo.demographic.income_median,
    demo.neighborhood.name,
    demo.neighborhood.report_year.year,
  ]));

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: null,
      };
    case OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case REQUEST_TEST_DATA:
      return {
        ...state,
        testDataPending: true,
        testData: [],
      };
    case RETURN_TEST_DATA:
      return {
        ...state,
        testDataPending: false,
        testData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
