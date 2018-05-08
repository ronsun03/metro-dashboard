import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import * as actions from '../actions'
import common from '../actions/common_functions';
import config from '../actions/config';

class StatusDashboard extends Component {
  componentWillMount() {
    this.props.fetchTrainPredictions();
    this.props.fetchOperationalHealth();
    this.props.fetchAllCrowdData();
  }

  renderStationLineColor(stationCode) {
    const station = common.stationInformationByCode(stationCode);
    const multipleStations = config.multipleStations;
    let stationTwoCode = '';
    let stationTwo = null;
    const iconArray = [];
    const iconArrayTwo = [];

    if (multipleStations[stationCode]) {
      stationTwoCode = multipleStations[stationCode];
      stationTwo = common.stationInformationByCode(stationTwoCode);
    }

    if (stationTwo) {
      if (station.LineCode4) {
        iconArray.push(
          <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode4}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode4}.png`} />,
        )
      }

      if (!station.LineCode4 && station.LineCode3) {
        iconArray.push(
          <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
        );
      }

      if (!station.LineCode4 && !station.LineCode3 && station.LineCode2) {
        iconArray.push(
          <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
        );

        iconArray.push(
          <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
        );
      }

      if (!station.LineCode4 && !station.LineCode3 && !station.LineCode2 && station.LineCode1) {
        iconArray.push(
          <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
        );
      }




      if (stationTwo.LineCode4) {
        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode1}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode2}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode3}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode4}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode4}.png`} />,
        )
      }

      if (!stationTwo.LineCode4 && stationTwo.LineCode3) {
        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode1}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode2}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode3}.png`} />,
        );
      }

      if (!stationTwo.LineCode4 && !stationTwo.LineCode3 && stationTwo.LineCode2) {
        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode1}.png`} />,
        );

        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode2}.png`} />,
        );
      }

      if (!stationTwo.LineCode4 && !stationTwo.LineCode3 && !stationTwo.LineCode2 && stationTwo.LineCode1) {
        iconArrayTwo.push(
          <img key={`${stationTwoCode}-${stationTwo.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${stationTwo.LineCode1}.png`} />,
        );
      }

      const combinedArray = iconArray.concat(iconArrayTwo);

      return combinedArray;
    }

    if (station.LineCode4) {
      iconArray.push(
        <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode4}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode4}.png`} />,
      )
      return iconArray;
    }

    if (!station.LineCode4 && station.LineCode3) {
      iconArray.push(
        <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode3}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode3}.png`} />,
      );
      return iconArray;
    }

    if (!station.LineCode4 && !station.LineCode3 && station.LineCode2) {
      iconArray.push(
        <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
      );

      iconArray.push(
        <img key={`${stationCode}-${station.LineCode2}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode2}.png`} />,
      );
      return iconArray;
    }

    if (!station.LineCode4 && !station.LineCode3 && !station.LineCode2 && station.LineCode1) {
      iconArray.push(
        <img key={`${stationCode}-${station.LineCode1}`} style={{marginLeft: 4}} width="18" src={`https://ignytegroup.com/wp-content/uploads/2018/04/${station.LineCode1}.png`} />,
      );
      return iconArray;
    }

  }

  renderLineIcon(train) {
    if (train.Line == 'OR') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`}  style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/orange-line.png' />
      )
    }
    if (train.Line == 'RD') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`} style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/red-line.png' />
      )
    }
    if (train.Line == 'BL') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`} style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/blue-line.png' />
      )
    }
    if (train.Line == 'SV') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`} style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/silver-line.png' />
      )
    }
    if (train.Line == 'GR') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`} style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/green-line.png' />
      )
    }
    if (train.Line == 'YL') {
      return (
        <img key={`${train.LocationCode}-${train.Detination}-${train.Min}-${train.Line}`} style={{marginRight: 8}} width="18" src='https://ignytegroup.com/wp-content/uploads/2018/04/yellow-line.png' />
      )
    }

  }

  renderCrowdData(stationCode) {
    const allCrowdData = this.props.allCrowdData;
    const data = allCrowdData[stationCode][0];
    const d = new Date();
    const day = d.getDay();
    const hour = d.getHours();

    let todayData = '';

    if (day === 0) {
      todayData = data.sunday;
    }
    if (day === 1) {
      todayData = data.monday;
    }
    if (day === 2) {
      todayData = data.tuesday;
    }
    if (day === 3) {
      todayData = data.wednesday;
    }
    if (day === 4) {
      todayData = data.thursday;
    }
    if (day === 5) {
      todayData = data.friday;
    }
    if (day === 6) {
      todayData = data.saturday;
    }

    const array = JSON.parse(todayData)
    const percentage = array[hour]

    let color = '';

    if (percentage >= 75) {
      color = '#D44E4E';
    }

    if (percentage >= 50 && percentage < 75) {
      color = '#FF6333';
    }

    if (percentage >= 25 && percentage < 50) {
      color = '#E3D430';
    }

    if (percentage < 25) {
      color = '#73D15C';
    }

    return (
      <div className="progress"
        style={{
          // backgroundColor: 'transparent !important',
          borderRadius: 6 ,
          height: '2rem'
        }}
        key={`${stationCode}-${percentage}-${color}`}
      >
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%`, backgroundColor: `${color}`, fontWeight: '700', color: 'black' }}
        >
          {`${percentage}%`}
        </div>
      </div>
    )
  }

  renderRows() {
    const trainPredictions = this.props.trainPredictions;
    const operationalHealth = this.props.operationalHealth;
    const multipleStations = config.multipleStations;



    const arrayOfAllStationRows = [];
    if (trainPredictions && operationalHealth) {

      // FOR TESTING, ONLY USE FIRST 15 STATIONS
      // const deleteArray = [
      //   'B01',
      //   'B02',
      //   'B03',
      //   'B04',
      //   'B05',
      //   'B06',
      //   'B07',
      //   'B08',
      //   'B09',
      //   'B010',
      //   'B11',
      // ];
      //
      // deleteArray.forEach(e => { delete trainPredictions[e] })

      _.forEach(multipleStations, (remove, stay) => {
        trainPredictions[stay] = trainPredictions[stay].concat(trainPredictions[remove])
        delete trainPredictions[remove]
      })

      _.forEach(trainPredictions, (station, id) => {
        const operationHealthPercentage = (operationalHealth[id][0].elevator_health + operationalHealth[id][0].escator_health) / 2
        let operationHealthColor = '';

        if (operationHealthPercentage >= 90) {
          operationHealthColor = '#73D15C';
        }

        if (operationHealthPercentage >= 80 && operationHealthPercentage < 90) {
          operationHealthColor = '#E3D430';
        }

        if (operationHealthPercentage >= 70 && operationHealthPercentage < 80) {
          operationHealthColor = '#FF6333';
        }

        if (operationHealthPercentage < 70) {
          operationHealthColor = '#D44E4E';
        }

        const objectByDestination = {};

        // Assign the object a value by destination
        _.forEach(station, train => {
          objectByDestination[train.Destination] = [];
        });

        // Push the trains by with destination they are going
        _.forEach(station, train => {
          objectByDestination[train.Destination].push(train);
        });

        // Number of lines(destinations) for this station
        const numLines = _.size(objectByDestination);

        const incomingTrains = [];

        // For each destination, get the closest train
        _.forEach(objectByDestination, (trains) => {
          incomingTrains.push(trains[0])
        });

        const stationName = common.stationInformationByCode(id).Name;
        const stationNameLink = stationName.split(' ').join('_');
        const stationRowArray = [];
        const stationRowArrayTwo = [];
        const middleArray = [];

        stationRowArrayTwo.push(
          <tr key={`${id}`} className="accordion-toggle" style={{cursor: 'pointer'}} data-toggle="collapse" data-target={`#rowid-${id}`}>
            <td width="50%">
              <Link className="station-name" style={{marginRight: 8}} to={`/${stationNameLink}`}>{stationName}</Link>
              {this.renderStationLineColor(id)}
            </td>
            <td width="25%">{this.renderCrowdData(id)}</td>
            <td width="25%" style={{ verticalAlign: 'middle' }}>
              <div className="progress"
                style={{
                  // backgroundColor: 'transparent !important',
                  borderRadius: 6 ,
                  height: '2rem'
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${operationHealthPercentage}%`, backgroundColor: operationHealthColor, fontWeight: '700', color: 'black'  }}
                >
                  {`${operationHealthPercentage}%`}
                </div>
              </div>
            </td>
          </tr>
        )

        for(let i = 0; i < numLines; i++) {
          const waitTime = incomingTrains[i].Min;
          let waitTimeString = '';

          let waitStatusColor = '';
          let percentageWaitTime = waitTime / 10 * 100;

          if (waitTime == 'BRD' || waitTime == 'ARR') {
            percentageWaitTime = 0.2 / 10 * 100;
            waitStatusColor = '#D44E4E'
            waitTimeString = waitTime;
          }

          if (waitTime <= 2) {
            waitStatusColor = '#D44E4E';
            waitTimeString = waitTime + ' mins';
          }

          if (waitTime > 2 && waitTime <= 5) {
            waitStatusColor = '#FF6333';
            waitTimeString = waitTime + ' mins';
          }

          if (waitTime > 5 && waitTime <= 10) {
            waitStatusColor = '#E3D430';
            waitTimeString = waitTime + ' mins';
          }

          if (waitTime > 10) {
            waitStatusColor = '#73D15C';
            waitTimeString = waitTime + ' mins';
          }

          middleArray.push(
            <div
              className={i == (_.size(incomingTrains) - 1) ? "row train-detail-row-last" : "row train-detail-row"}
              style={{ marginBottom: 5 }}
              key={`${incomingTrains[i].LocationCode}-${incomingTrains[i].DestinationName}-${incomingTrains[i].Line}-${incomingTrains[i].Min}`}
            >
              <div className="col-md-3">
                {this.renderLineIcon(incomingTrains[i])}
                <span>{incomingTrains[i].Destination}</span>

              </div>
              <div className="col-md-4">

                <div style={{position: 'absolute', left: '-60px'}}>{waitTimeString}</div>
                <div className="progress"
                  style={{
                    backgroundColor: 'transparent !important',
                    borderRadius: 0 ,
                    height: '1.3rem'
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${percentageWaitTime}%`, backgroundColor: waitStatusColor }}
                    // style="width: ${percentageWidth}%; background-color: ${color}"
                  >
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4">{waitTimeString}</div> */}
            </div>
          )

          stationRowArrayTwo.push(
            <tr key={`${id}--${incomingTrains[i].Destination}`} colSpan={3} className="accordion-body collapse" id={`rowid-${id}`}>
              <td colSpan={3}>{middleArray} </td>
            </tr>
          )
        }

        _.forEach(stationRowArrayTwo, row => {
          arrayOfAllStationRows.push(row)
        });

      });

      return arrayOfAllStationRows;
    }
  }

  render() {
    return (
      <div className="col-md-12 table-div">
        <table id="state-table" className="table table-bordered" data-sort-name="station" data-toggle="table" data-sort-order="desc">
          <thead>
            <tr>
              <th style={{ width: '25%' }} data-field="station" data-sortable="true">Station</th>
              {/* <th>Line</th> */}
              {/* <th>Current Wait</th> */}
              <th>Current Crowding</th>
              <th>Elevator & Escalator Health</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trainPredictions: state.fetch.trainPredictions,
    operationalHealth: state.fetch.operationalHealth,
    allCrowdData: state.fetch.allCrowdData
  }
}

export default connect(mapStateToProps, actions)(StatusDashboard);
