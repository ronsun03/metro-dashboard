import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import AverageWaitLineChartEastWest from './average-wait-line-chart-east-west';
import TodaysWaitLineChartEastWest from './todays-wait-line-chart-east-west';
import CrowdingDataChart from './crowding-data-chart';
import TestChart from './test-chart';

import config from '../actions/config'
import commonFunctions from '../actions/common_functions'
import * as actions from '../actions'
import common from '../actions/common_functions';

class StationDetail extends Component {
  state = {
    // stationNameFull: this.props.params.stationName.split('_').join(' '),
    // stationCodes: [],
    // stationTrainData: {}
    direction: '',
    isMultipleStation: false
  }

  componentWillMount() {
    this.props.fetchStationDetailPredictions(this.props.params.stationName.split('_').join(' '));
    // this.props.fetchStationDetailAllDayPredictions(this.props.params.stationName.split('_').join(' '));
    this.props.fetchStationDetailHealth(this.props.params.stationName.split('_').join(' '));
    // this.props.fetchStationDetailLongTermData(this.props.params.stationName.split('_').join(' '));
    this.props.fetchStationDetailAverages(this.props.params.stationName.split('_').join(' '));
    this.props.fetchStationDetailCrowdData(this.props.params.stationName.split('_').join(' '));

    _.forEach(config.stationInformation, (data) => {
      if(this.props.params.stationName.split('_').join(' ') == data.Name) {
        if (config.multipleStationsForStationDetail[data.Code]) {
          this.setState({ isMultipleStation: true })
        }
      }
    })
  }

  renderHealthRow() {
    const data = this.props.stationDetailHealth;
    const numOfLines = _.size(data);
    let elevatorHealth = 0;
    let escalatorHealth = 0;

    _.forEach(data, data => {
      elevatorHealth = data[0].elevator_health;
      escalatorHealth = data[0].escator_health;
    });

    if (numOfLines == 1) {
      return ([
        <div className="col-md-4">
          <h4 className="stat-header">Escalator Uptime</h4>
          <div className="progress"
            style={{
              backgroundColor: '#E6E6E6 !important',
              borderRadius: 0 ,
              height: '3rem',
              width: '80%'
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${escalatorHealth}%` }}
              // style="width: ${percentageWidth}%; background-color: ${color}"
            >
              <h5 style={{ marginBottom: 0 }}>{`${escalatorHealth}%`}</h5>
            </div>
          </div>
        </div>,
        <div className="col-md-4">
          <h4 className="stat-header">Elevator Uptime</h4>
          <div className="progress"
            style={{
              backgroundColor: '#E6E6E6 !important',
              borderRadius: 0 ,
              height: '3rem',
              width: '80%'
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${elevatorHealth}%` }}
              // style="width: ${percentageWidth}%; background-color: ${color}"
            >
              <h5 style={{ marginBottom: 0 }}>{`${elevatorHealth}%`}</h5>
            </div>
          </div>
        </div>
      ])
    }

  }

  renderPeakAverageWaitTimeColumn() {
    const westOrSouth = [];
    const eastOrNorth = [];
    const data = this.props.stationDetailAverages;
    const numOfLines = _.size(data);
    let generalTrainDirection = '';

    if (numOfLines === 1) {
      _.forEach(data, station => {
        _.forEach(station.peak, row => {
          if (config.stationDirections[row.DestinationName]) {
            const trainDirection = config.stationDirections[row.DestinationName].Direction;

            if (trainDirection == 'North') {
              eastOrNorth.push(row);
              generalTrainDirection = 'North-South'
            }

            if (trainDirection == 'East') {
              eastOrNorth.push(row);
              generalTrainDirection = 'East-West'
            }

            if (trainDirection == 'South') {
              westOrSouth.push(row);
              generalTrainDirection = 'North-South'
            }

            if (trainDirection == 'West') {
              westOrSouth.push(row);
              generalTrainDirection = 'East-West'
            }
          }
        })
      })

      console.log('generalTrainDirection', generalTrainDirection);

      // console.log('westOrSouth: ', westOrSouth);
      // console.log('eastOrNorth: ', eastOrNorth);

      let westOrSouthTotal = 0;
      let westOrSouthAverage = 0;
      let eastOrNorthTotal = 0;
      let eastOrNorthAverage = 0;

      _.forEach(westOrSouth, data => {
        westOrSouthTotal = westOrSouthTotal + data.boardingtimes;
      })

      _.forEach(eastOrNorth, data => {
        eastOrNorthTotal = eastOrNorthTotal + data.boardingtimes;
      })

      // console.log('westOrSouthTotal: ', westOrSouthTotal);
      // console.log('eastOrNorthTotal: ', eastOrNorthTotal);

      westOrSouthAverage = westOrSouthTotal / _.size(westOrSouth);
      eastOrNorthAverage = eastOrNorthTotal / _.size(eastOrNorth);

      // console.log('westOrSouthAverage: ', westOrSouthAverage);
      // console.log('eastOrNorthAverage: ', eastOrNorthAverage);

      return ([
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Eastbound' : 'Northbound'}</h6></div>
          <div className="col-md-6"><h6>{eastOrNorthAverage.toFixed(1)}</h6></div>
        </div>,
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Westbound' : 'Southbound'}</h6></div>
          <div className="col-md-6"><h6>{westOrSouthAverage.toFixed(1)}</h6></div>
        </div>,
        <div className="row">
          <AverageWaitLineChartEastWest dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/>
        </div>
      ])
    }
  }

  renderOffPeakAverageWaitTimeColumn() {
    const westOrSouth = [];
    const eastOrNorth = [];
    const data = this.props.stationDetailAverages;
    const numOfLines = _.size(data);
    let generalTrainDirection = '';

    if (numOfLines === 1) {
      _.forEach(data, station => {
        _.forEach(station.offPeak, row => {
          if (config.stationDirections[row.DestinationName]) {
            const trainDirection = config.stationDirections[row.DestinationName].Direction;

            if (trainDirection == 'North') {
              eastOrNorth.push(row)
              generalTrainDirection = 'North-South'
            }

            if (trainDirection == 'East') {
              eastOrNorth.push(row)
              generalTrainDirection = 'East-West'
            }

            if (trainDirection == 'South') {
              westOrSouth.push(row)
              generalTrainDirection = 'North-South'
            }

            if (trainDirection == 'West') {
              westOrSouth.push(row)
              generalTrainDirection = 'East-West'
            }
          }
        })
      })

      // console.log('westOrSouth: ', westOrSouth);
      // console.log('eastOrNorth: ', eastOrNorth);

      let westOrSouthTotal = 0;
      let westOrSouthAverage = 0;
      let eastOrNorthTotal = 0;
      let eastOrNorthAverage = 0;

      _.forEach(westOrSouth, data => {
        westOrSouthTotal = westOrSouthTotal + data.boardingtimes;
      })

      _.forEach(eastOrNorth, data => {
        eastOrNorthTotal = eastOrNorthTotal + data.boardingtimes;
      })

      // console.log('westOrSouthTotal: ', westOrSouthTotal);
      // console.log('eastOrNorthTotal: ', eastOrNorthTotal);

      westOrSouthAverage = westOrSouthTotal / _.size(westOrSouth);
      eastOrNorthAverage = eastOrNorthTotal / _.size(eastOrNorth);

      // console.log('westOrSouthAverage: ', westOrSouthAverage);
      // console.log('eastOrNorthAverage: ', eastOrNorthAverage);

      return ([
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Eastbound' : 'Northbound'}</h6></div>
          <div className="col-md-6"><h6>{eastOrNorthAverage.toFixed(1)}</h6></div>
        </div>,
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Westbound' : 'Southbound'}</h6></div>
          <div className="col-md-6"><h6>{westOrSouthAverage.toFixed(1)}</h6></div>
        </div>,
        <div className="row">
          <AverageWaitLineChartEastWest dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/>
        </div>
      ])
    }
  }

  renderCurrentWaitTimeColumn() {
    const westOrSouth = [];
    const eastOrNorth = [];
    const data = this.props.stationDetailPredictions;
    const numOfLines = _.size(data);
    let generalTrainDirection = '';

    // For stations with only one line
    if (numOfLines === 1) {
      _.forEach(data, (stationCodeSet, stationCodeID) => {
        _.forEach(stationCodeSet, (stationData, destination) => {
          // const trainDirection = config.stationDirections[destination].Direction;

          let trainDirection = '';

          if(config.stationDirections[destination]) {
            trainDirection = config.stationDirections[destination].Direction;
          }

          // generalTrainDirection = trainDirection;

          if (trainDirection == 'North') {
            _.forEach(stationData, indData => {
              eastOrNorth.push(indData)
            })
            generalTrainDirection = 'North-South'
          }

          if (trainDirection == 'East') {
            _.forEach(stationData, indData => {
              eastOrNorth.push(indData)
            })
            generalTrainDirection = 'East-West'
          }

          if (trainDirection == 'West') {
            _.forEach(stationData, indData => {
              westOrSouth.push(indData)
            })
            generalTrainDirection = 'East-West'
          }

          if (trainDirection == 'South') {
            _.forEach(stationData, indData => {
              westOrSouth.push(indData)
            })
            generalTrainDirection = 'North-South'
          }
        });
      });

      let westOrSouthWait = '';
      let eastOrNorthWait = '';

      // Loop through to get the shortest wait time
      _.forEach(westOrSouth, data => {
        const arrivalTime = data.Min;
        const arrivalTimeInt = parseInt(data.Min);

        // If nothing exists, push arrivalTime
        if (!westOrSouthWait) {
          westOrSouthWait = arrivalTime;
          return;
        }

        // If wait time is already BRD, break for loop because BRD is the shortest possible board time.
        if (westOrSouthWait == 'BRD') {
          return;
        }

        if (arrivalTime == 'BRD') {
          westOrSouthWait = arrivalTime;
          return;
        }

        if (westOrSouthWait == 'ARR') {
          return;
        }

        if (arrivalTime == 'ARR') {
          westOrSouthWait = arrivalTime;
          return;
        }

        if (!westOrSouthWait) {
          westOrSouthWait = arrivalTime;
          return;
        }

        if (parseInt(westOrSouthWait) > arrivalTimeInt) {
          westOrSouthWait = arrivalTime;
        }
      })

      // Loop through to get the shortest wait time
      _.forEach(eastOrNorth, data => {
        const arrivalTime = data.Min;
        const arrivalTimeInt = parseInt(data.Min);
        // console.log('arrivalTime: ', arrivalTime);

        // If nothing exists, push arrivalTime
        if (!eastOrNorthWait) {
          eastOrNorthWait = arrivalTime;
          return;
        }

        // If wait time is already BRD, break for loop because BRD is the shortest possible board time.
        if (eastOrNorthWait == 'BRD') {
          return;
        }

        if (arrivalTime == 'BRD') {
          eastOrNorthWait = arrivalTime;
          return;
        }

        if (eastOrNorthWait == 'ARR') {
          return;
        }

        if (arrivalTime == 'ARR') {
          eastOrNorthWait = arrivalTime;
          return;
        }

        if (!eastOrNorthWait) {
          eastOrNorthWait = arrivalTime;
          return;
        }

        if (parseInt(eastOrNorthWait) > arrivalTimeInt) {
          eastOrNorthWait = arrivalTime;
        }

      });

      return ([
        <div className="row">
          <div className="col-md-12">
            <h4 className="stat-header">Next Train</h4>
          </div>
        </div>,
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Eastbound' : 'Northbound'}</h6></div>
          <div className="col-md-6"><h6>{eastOrNorthWait}</h6></div>
        </div>,
        <div className="row">
          <div className="col-md-6"><h6>{generalTrainDirection == 'East-West' ? 'Westbound' : 'Southbound'}</h6></div>
          <div className="col-md-6"><h6>{westOrSouthWait}</h6></div>
        </div>,
        // <div className="row">
        //   {this.renderHealthRow()}
        // </div>
      ])
    }
  }

  // renderCurrentWaitGraph() {
  //   const westOrSouth = [];
  //   const eastOrNorth = [];
  //   const data = this.props.stationDetailPredictionsAllDay;
  //   const numOfLines = _.size(data);
  //   let generalTrainDirection = '';
  //
  //   if (numOfLines == 1) {
  //     _.forEach(data, (stationCodeSet, stationCodeID) => {
  //       _.forEach(stationCodeSet, (stationData, destination) => {
  //         // console.log('stationData: ', stationData);
  //         // console.log('destination: ', destination);
  //         // const trainDirection = config.stationDirections[destination].Direction;
  //
  //         let trainDirection = '';
  //
  //         if (config.stationDirections[destination]) {
  //           trainDirection = config.stationDirections[destination].Direction;
  //         }
  //
  //         // console.log('trainDirection: ', trainDirection);
  //         generalTrainDirection = trainDirection;
  //
  //         if (trainDirection == 'North' || trainDirection == 'East') {
  //           _.forEach(stationData, indData => {
  //             eastOrNorth.push(indData)
  //           })
  //         }
  //
  //         if (trainDirection == 'West' || trainDirection == 'South') {
  //           _.forEach(stationData, indData => {
  //             westOrSouth.push(indData)
  //           })
  //         }
  //       });
  //     });
  //
  //     return (
  //       <TodaysWaitLineChartEastWest dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/>
  //     )
  //   }
  // }

  renderCrowdGraph() {
    const data = this.props.stationDetailCrowdData;

    return (
      <CrowdingDataChart data={data}/>
    )
  }

  render() {
    console.log('this.state: ', this.state);
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>{this.props.params.stationName.split('_').join(' ')}</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            {this.renderCurrentWaitTimeColumn()}
          </div>
          {this.renderHealthRow()}
        </div>
        <hr />
        <div className="row">
          {/* <div className="col-md-4">
            <h4>Current Wait Time</h4>
            {this.renderCurrentWaitTimeColumn()}
          </div> */}
          <div className="col-md-6">
            <h4 className="stat-header">Peak Average Wait Time</h4>
            {this.renderPeakAverageWaitTimeColumn()}
          </div>
          <div className="col-md-6">
            <h4 className="stat-header">Off-Peak Average Wait Time</h4>
            {this.renderOffPeakAverageWaitTimeColumn()}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <h3>Crowding Data</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderCrowdGraph()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    stationDetailPredictions: state.fetch.stationDetailPredictions,
    // stationDetailPredictionsLongTerm: state.fetch.stationDetailPredictionsLongTerm,
    stationDetailHealth: state.fetch.stationDetailHealth,
    stationDetailAverages: state.fetch.stationDetailAverages,
    // stationDetailPredictionsAllDay: state.fetch.stationDetailPredictionsAllDay,
    stationDetailCrowdData: state.fetch.stationDetailCrowdData
  }
}

export default connect(mapStateToProps, actions)(StationDetail);
