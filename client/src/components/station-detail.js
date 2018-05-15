import _ from 'lodash';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import AverageWaitLineChartEastWest from './average-wait-line-chart-east-west';
import AverageWaitLineChartNorthSouth from './average-wait-line-chart-north-south';
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

    // Set color of elevator health bar
    let elevatorHealthColor = '';

    if (elevatorHealth >= 90) {
      elevatorHealthColor = '#73D15C';
    }

    if (elevatorHealth >= 80 && elevatorHealth < 90) {
      elevatorHealthColor = '#E3D430';
    }

    if (elevatorHealth >= 70 && elevatorHealth < 80) {
      elevatorHealthColor = '#FF6333';
    }

    if (elevatorHealth < 70) {
      elevatorHealthColor = '#D44E4E';
    }

    // Set color of escalator health bar
    let escalatorHealthColor = '';

    if (escalatorHealth >= 90) {
      escalatorHealthColor = '#73D15C';
    }

    if (escalatorHealth >= 80 && escalatorHealth < 90) {
      escalatorHealthColor = '#E3D430';
    }

    if (escalatorHealth >= 70 && escalatorHealth < 80) {
      escalatorHealthColor = '#FF6333';
    }

    if (escalatorHealth < 70) {
      escalatorHealthColor = '#D44E4E';
    }


    if (numOfLines == 1) {
      return ([
        <div className="col-md-4">
          <h4 className="stat-header">Operational Escalators</h4>
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
              style={{ width: `${escalatorHealth}%`, backgroundColor: `${escalatorHealthColor}`, fontWeight: '700', color: 'black'  }}
              // style="width: ${percentageWidth}%; background-color: ${color}"
            >
              <h5 style={{ marginBottom: 0 }}>{`${escalatorHealth}%`}</h5>
            </div>
          </div>
        </div>,
        <div className="col-md-4">
          <h4 className="stat-header">Operational Elevators</h4>
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
              style={{ width: `${elevatorHealth}%`, backgroundColor: `${elevatorHealthColor}`, fontWeight: '700', color: 'black'  }}
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

      westOrSouthAverage = westOrSouthTotal / _.size(westOrSouth);
      eastOrNorthAverage = eastOrNorthTotal / _.size(eastOrNorth);

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
          {
            generalTrainDirection == 'East-West' ? <AverageWaitLineChartEastWest dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/> : <AverageWaitLineChartNorthSouth dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/>
          }
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

      westOrSouthAverage = westOrSouthTotal / _.size(westOrSouth);
      eastOrNorthAverage = eastOrNorthTotal / _.size(eastOrNorth);

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
          {
            generalTrainDirection == 'East-West' ? <AverageWaitLineChartEastWest dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/> : <AverageWaitLineChartNorthSouth dataWestOrSouth={westOrSouth} dataEastOrNorth={eastOrNorth}/>
          }
        </div>
      ])
    }
  }

  renderCurrentWaitTimeColumn() {
    const data = this.props.stationDetailPredictions;

    if (data) {
      const westOrSouth = [];
      const eastOrNorth = [];
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

        // let westOrSouthWait = '';
        // let eastOrNorthWait = '';

        const westOrSouthIncomingTrain = westOrSouth[0];
        let westOrSouthWait = 'No Train';
        let westOrSouthStation = '';
        let westOrSouthColor = '-';

        if (westOrSouthIncomingTrain) {
          westOrSouthWait = westOrSouthIncomingTrain.Min;
          westOrSouthStation = westOrSouthIncomingTrain.Destination;
          westOrSouthColor = westOrSouthIncomingTrain.Line;
        }

        const eastOrNorthIncomingTrain = eastOrNorth[0];
        let eastOrNorthWait = 'No Train';
        let eastOrNorthStation = '';
        let eastOrNorthColor = '-';

        if (eastOrNorthIncomingTrain) {
          eastOrNorthWait = eastOrNorthIncomingTrain.Min;
          eastOrNorthStation = eastOrNorthIncomingTrain.Destination;
          eastOrNorthColor = eastOrNorthIncomingTrain.Line;
        }

        // Loop through to get the shortest wait time
        // _.forEach(westOrSouth, data => {
        //   const arrivalTime = data.Min;
        //   const arrivalTimeInt = parseInt(data.Min);
        //
        //   // If nothing exists, push arrivalTime
        //   if (!westOrSouthWait) {
        //     westOrSouthWait = arrivalTime;
        //     return;
        //   }
        //
        //   // If wait time is already BRD, break for loop because BRD is the shortest possible board time.
        //   if (westOrSouthWait == 'BRD') {
        //     return;
        //   }
        //
        //   if (arrivalTime == 'BRD') {
        //     westOrSouthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (westOrSouthWait == 'ARR') {
        //     return;
        //   }
        //
        //   if (arrivalTime == 'ARR') {
        //     westOrSouthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (!westOrSouthWait) {
        //     westOrSouthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (parseInt(westOrSouthWait) > arrivalTimeInt) {
        //     westOrSouthWait = arrivalTime;
        //   }
        // })

        // Loop through to get the shortest wait time
        // _.forEach(eastOrNorth, data => {
        //   const arrivalTime = data.Min;
        //   const arrivalTimeInt = parseInt(data.Min);
        //   // console.log('arrivalTime: ', arrivalTime);
        //
        //   // If nothing exists, push arrivalTime
        //   if (!eastOrNorthWait) {
        //     eastOrNorthWait = arrivalTime;
        //     return;
        //   }
        //
        //   // If wait time is already BRD, break for loop because BRD is the shortest possible board time.
        //   if (eastOrNorthWait == 'BRD') {
        //     return;
        //   }
        //
        //   if (arrivalTime == 'BRD') {
        //     eastOrNorthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (eastOrNorthWait == 'ARR') {
        //     return;
        //   }
        //
        //   if (arrivalTime == 'ARR') {
        //     eastOrNorthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (!eastOrNorthWait) {
        //     eastOrNorthWait = arrivalTime;
        //     return;
        //   }
        //
        //   if (parseInt(eastOrNorthWait) > arrivalTimeInt) {
        //     eastOrNorthWait = arrivalTime;
        //   }
        //
        // });

        return ([
          <div className="row">
            <div className="col-md-12">
              <h4 className="stat-header">Next Train</h4>
            </div>
          </div>,
          <div className="row">
            <div className="col-md-8">
              <h6 style={{ display: 'inline '}}>{generalTrainDirection == 'East-West' ? 'Eastbound - ' : 'Northbound - '}{eastOrNorthStation}</h6>
              <img key={`${eastOrNorthStation}-${eastOrNorthColor}`} style={{marginLeft: 6, marginBottom: 2}} width="16" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${eastOrNorthColor}.png`} />
            </div>
            <div className="col-md-4"><h6>{eastOrNorthWait}</h6></div>
          </div>,
          <div className="row">
            <div className="col-md-8">
              <h6 style={{ display: 'inline '}}>{generalTrainDirection == 'East-West' ? 'Westbound - ' : 'Southbound - '}{westOrSouthStation}</h6>
              <img key={`${westOrSouthStation}-${westOrSouthColor}`} style={{marginLeft: 6, marginBottom: 2}} width="16" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${westOrSouthColor}.png`} />
            </div>
            <div className="col-md-4"><h6>{westOrSouthWait}</h6></div>
          </div>,
          // <div className="row">
          //   {this.renderHealthRow()}
          // </div>
        ])
      }
    } else {
      return (<div />)
    }
  }

  renderLineIcons() {
    const { stationDetailHealth } = this.props
    if (stationDetailHealth) {
      const numOfLines = _.size(stationDetailHealth);
      const iconArray = [];

      _.forEach(stationDetailHealth, (data, stationCode) => {
        const station = common.stationInformationByCode(stationCode);
        if (station.LineCode4) {
          iconArray.push(
            <img key={`${stationCode}-${station.LineCode1}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode2}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode3}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode4}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode4}.png`} />,
          )
        }

        if (!station.LineCode4 && station.LineCode3) {
          iconArray.push(
            <img key={`${stationCode}-${station.LineCode1}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode2}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode3}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
          );
        }

        if (!station.LineCode4 && !station.LineCode3 && station.LineCode2) {
          iconArray.push(
            <img key={`${stationCode}-${station.LineCode1}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
          );

          iconArray.push(
            <img key={`${stationCode}-${station.LineCode2}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
          );
        }

        if (!station.LineCode4 && !station.LineCode3 && !station.LineCode2 && station.LineCode1) {
          iconArray.push(
            <img key={`${stationCode}-${station.LineCode1}`} className="station-detail-title-icons" style={{marginLeft: 4}} width="26" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
          );
        }
      })
      return iconArray;
    } else {
      return (<div />)
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
    const numOfLines = _.size(data);
    const stationKeyArray = [];
    _.forEach(data, (point, key) => {
      stationKeyArray.push(key)
    })

    if (numOfLines == 1) {
      return (
        <CrowdingDataChart predictedData={data} stationKeyArray={stationKeyArray}/>
      )
    }

  }

  render() {
    return (
      <div>
        <div className="row" style={{ marginBottom: 25 }}>
          <div className="col-md-12">
            <button onClick={()=>{ browserHistory.push('/'); window.location.reload() }} type="button" className="btn btn-secondary">&larr; Back to Station Overview</button>
            {/* <button onClick={()=>{ console.log(push); push('/') }} type="button" className="btn btn-secondary">&larr; Back to Station Overview</button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 style={{ display: 'inline', marginRight: 10 }}>{this.props.params.stationName.split('_').join(' ')}</h1>
            {this.renderLineIcons()}
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
