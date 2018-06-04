import {
  FETCH_TRAIN_PREDICTIONS,
  FETCH_OPERATIONAL_HEALTH,
  FETCH_STATION_DETAIL_PREDICTIONS,
  FETCH_LONG_TERM_STATION_DETAIL_PREDICTIONS,
  FETCH_STATION_DETAIL_HEALTH,
  FETCH_STATION_DETAIL_AVERAGES,
  FETCH_STATION_DETAIL_PREDICTIONS_ALL_DAY,
  FETCH_ALL_CROWD_DATA,
  FETCH_STATION_DETAIL_CROWD_DATA,
  FETCH_STATION_DETAIL_PREDICTED_CROWD_DATA
} from '../actions/types';

const initialState = {
  trainPredictions: null,
  operationalHealth: null,
  stationDetailPredictions: null,
  stationDetailPredictionsLongTerm: null,
  stationDetailHealth: null,
  stationDetailAverages: null,
  stationDetailPredictionsAllDay: null,
  allCrowdData: null,
  stationDetailCrowdData: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_TRAIN_PREDICTIONS:
      return { ...state, trainPredictions: action.payload };
    case FETCH_OPERATIONAL_HEALTH:
      return { ...state, operationalHealth: action.payload}
    case FETCH_STATION_DETAIL_PREDICTIONS:
      return { ...state, stationDetailPredictions: action.payload }
    case FETCH_LONG_TERM_STATION_DETAIL_PREDICTIONS:
      return { ...state, stationDetailPredictionsLongTerm: action.payload }
    case FETCH_STATION_DETAIL_HEALTH:
      return { ...state, stationDetailHealth: action.payload }
    case FETCH_STATION_DETAIL_AVERAGES:
      return { ...state, stationDetailAverages: action.payload }
    case FETCH_STATION_DETAIL_PREDICTIONS_ALL_DAY:
      return { ...state, stationDetailPredictionsAllDay: action.payload }
    case FETCH_ALL_CROWD_DATA:
      return { ...state, allCrowdData: action.payload }
    case FETCH_STATION_DETAIL_CROWD_DATA:
      return { ...state, stationDetailCrowdData: action.payload }
    case FETCH_STATION_DETAIL_PREDICTED_CROWD_DATA:
      return { ...state, stationDetailPredictedCrowdData: action.payload}
    default:
      return state;
  }
}
