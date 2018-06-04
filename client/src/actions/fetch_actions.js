import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import config from './config';
import common from './common_functions';
import stationCrowdData from './station_crowding'

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
} from './types';

const ROOT_URL = config.serverURL;

export const fetchStationDetailAverages = stationName => {
  return dispatch => {
    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    axios.post(`${ROOT_URL}/fetch-station-detail-averages`, {stationCodeObject}).then(response => {
      const data = response.data;
      console.log('data: ', data);

      const newStationCodeObject = {};
      _.forEach(stationInformation, station => {
        if (station.Name == stationName) {
          newStationCodeObject[station.Code] = {
            peak: [],
            offPeak: []
          };
        };
      });

      _.forEach(newStationCodeObject, (station, stationCode) => {
        _.forEach(station, (peakOrOff, id) => {
          _.forEach(data[stationCode], item => {
            if (item.peak == 'Peak') {
              newStationCodeObject[stationCode].peak.push(item)
            }
            if (item.peak == 'Off-Peak') {
              newStationCodeObject[stationCode].offPeak.push(item)
            }
          })
        })
      })

      dispatch({
        type: FETCH_STATION_DETAIL_AVERAGES,
        payload: newStationCodeObject
      })
    })
  }
}

export const fetchStationDetailLongTermData = stationName => {
  return dispatch => {
    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    axios.post(`${ROOT_URL}/fetch-long-term-train-predictions`, {stationCodeObject})
    //   .then(response => {
    //
    //
    //   dispatch({
    //     type: FETCH_LONG_TERM_STATION_DETAIL_PREDICTIONS,
    //     payload: newObject
    //   })
    // })

  }
}

export const fetchStationDetailHealth = stationName => {
  return dispatch => {
    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    axios.get(`${ROOT_URL}/fetch-operational-health`).then(response => {
      const object = common.stationDataToObjectByLocationCode(response.data, 'Station_Code');

      _.forEach(stationCodeObject, (station, stationCode) => {
        stationCodeObject[stationCode] = object[stationCode]
      })

      dispatch({
        type: FETCH_STATION_DETAIL_HEALTH,
        payload: stationCodeObject
      })
    })

  }

}

export const fetchStationDetailAllDayPredictions = stationName => {
  console.log('fetchStationDetailAllDayPredictions()');
  return dispatch => {
    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    axios.post(`${ROOT_URL}/fetch-train-predictions-all-day`, {stationCodeObject}).then(response => {
      const object = response.data;

      _.forEach(stationCodeObject, (station, stationCode) => {
        stationCodeObject[stationCode] = object[stationCode]
      })

      const newObject = {};
      _.forEach(stationCodeObject, (stationCodeObject, code) => {
        newObject[code] = {};
      })

      _.forEach(stationCodeObject, (array, code) => {
        _.forEach(array, train => {
          newObject[train.LocationCode][train.DestinationName] = [];
        })
      })

      _.forEach(stationCodeObject, (array, code) => {
        _.forEach(array, train => {
          newObject[train.LocationCode][train.DestinationName].push(train);
        })
      })

      dispatch({
        type: FETCH_STATION_DETAIL_PREDICTIONS_ALL_DAY,
        payload: newObject
      })

    })
  }

}

export const fetchStationDetailPredictions = stationName => {
  return dispatch => {
    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    axios.get(`${ROOT_URL}/fetch-train-predictions`).then(response => {
      const object = common.stationDataToObjectByLocationCode(response.data, 'LocationCode');

      _.forEach(stationCodeObject, (station, stationCode) => {
        stationCodeObject[stationCode] = object[stationCode]
      })

      const newObject = {};
      _.forEach(stationCodeObject, (stationCodeObject, code) => {
        newObject[code] = {};
      })

      _.forEach(stationCodeObject, (array, code) => {
        _.forEach(array, train => {
          newObject[train.LocationCode][train.DestinationName] = [];
        })
      })

      _.forEach(stationCodeObject, (array, code) => {
        _.forEach(array, train => {
          newObject[train.LocationCode][train.DestinationName].push(train);
        })
      })

      dispatch({
        type: FETCH_STATION_DETAIL_PREDICTIONS,
        payload: newObject
      })
    })
  }
}

export const fetchTrainPredictions = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/fetch-train-predictions`).then(response => {
      const object = common.stationDataToObjectByLocationCode(response.data, 'LocationCode');
      dispatch({
        type: FETCH_TRAIN_PREDICTIONS,
        payload: object
      })
    })
    // var connection = mysql.createConnection({
    //   host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    //   user     : 'ignytegroup',
    //   password : 'Ignyterox!',
    //   database : 'metrodb'
    // });
    //
    // connection.connect();
    //
    // connection.query('SELECT * from TrainPredictionsWMATA', function(err, rows, fields) {
    //   if (!err)
    //     console.log('TrainPredictionsWMATA: ', rows);
    //   else
    //     console.log('Error while performing Query.');
    // });
    //
    // connection.end();

  }
}

export const fetchOperationalHealth = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/fetch-operational-health`).then(response => {
      // console.log(response.data);
      const object = common.stationDataToObjectByLocationCode(response.data, 'Station_Code');
      dispatch({
        type: FETCH_OPERATIONAL_HEALTH,
        payload: object
      })
    })
  }
}

export const fetchAllCrowdData = () => {
  return dispatch => {
    // axios.get(`${ROOT_URL}/fetch-all-crowd-data`).then(response => {
    //   console.log('all crowd data: ', response.data);
    //
    //   console.log('object: ', object);
    // })

    const object = common.stationDataToObjectByLocationCode(stationCrowdData, 'stationkey');

    dispatch({
      type: FETCH_ALL_CROWD_DATA,
      payload: object
    })
  }
}

export const fetchStationDetailCrowdData = stationName => {
  return dispatch => {
    const object = common.stationDataToObjectByLocationCode(stationCrowdData, 'stationkey');

    const { stationInformation } = config;
    const stationCodeArray = [];
    const stationCodeObject = {};
    _.forEach(stationInformation, station => {
      if (station.Name == stationName) {
        stationCodeArray.push(station.Code)
        stationCodeObject[station.Code] = [];
      };
    });

    _.forEach(stationCodeObject, (blank, id) => {
      stationCodeObject[id] = object[id]
    })

    dispatch({
      type: FETCH_STATION_DETAIL_CROWD_DATA,
      payload: stationCodeObject
    })
  }
}

export const fetchStationDetailPredictedCrowdData = stationName => {
  return dispatch => {
    axios.get(`${ROOT_URL}/fetch-predicted-crowd-data`).then(response => {
      const { stationInformation } = config;
      const stationCodeArray = [];
      const stationCodeObject = {};
      _.forEach(stationInformation, station => {
        if (station.Name == stationName) {
          stationCodeArray.push(station.Code)
          stationCodeObject[station.Code] = [];
        };
      });
      console.log('stationCodeArray: ', stationCodeArray);
      console.log('stationCodeObject: ', stationCodeObject);
      console.log('response.data: ', response.data);

      _.forEach(stationCodeObject, (blank, stationKey) => {
        _.forEach(response.data, data => {
          if (data.stationkey == stationKey) {
            stationCodeObject[stationKey] = JSON.parse(data.poptime)
          }
        })
      })

      console.log('stationCodeObject2: ', stationCodeObject);

      dispatch({
        type: FETCH_STATION_DETAIL_PREDICTED_CROWD_DATA,
        payload: stationCodeObject
      })
    })
  }
}
