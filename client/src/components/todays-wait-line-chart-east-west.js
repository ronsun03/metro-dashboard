import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import AmCharts from '@amcharts/amcharts3-react'


import config from '../actions/config'
import commonFunctions from '../actions/common_functions'
import * as actions from '../actions'
import common from '../actions/common_functions';

class TodaysWaitLineChartEastWest extends Component {
  generateData() {
    const eastOrNorth = this.props.dataEastOrNorth;
    const westOrSouth = this.props.dataWestOrSouth;
    const dataProvider = [];
    const combinedDates = {};
    const eastOrNorthDates = {};
    const westOrSouthDates = {};

    // console.log('eastOrNorth', eastOrNorth);

    let countOne = 0;

    // Assign object with each key being its time
    _.forEach(eastOrNorth, data => {
      const today = new Date()
      const todayDate = today.getDate();
      const d = new Date(data.UploadTime);
      const date = d.getDate();

      if (todayDate === date && countOne % 20 === 0) {
        combinedDates[data.UploadTime] = {
          east: 0,
          west: 0
        };
      }


      // if (todayDate === date) {
      //   combinedDates[data.UploadTime] = {
      //     east: 0,
      //     west: 0
      //   };
      // }
      //
      //

      if (todayDate === date) {
        // combinedDates[data.UploadTime] = {
        //   east: 0,
        //   west: 0
        // };

        eastOrNorthDates[data.UploadTime] = []
      }

      countOne++;
    })

    // console.log('eastOrNorthDates', eastOrNorthDates);

    _.forEach(eastOrNorth, data => {
      let min = '';
      min = data.Min
      if (!data.Min) {
        min = '0'
      }

      if (data.Min == 'BRD' || data.Min == 'ARR') {
        min = '0'
      }

      if (eastOrNorthDates[data.UploadTime]) {
        eastOrNorthDates[data.UploadTime].push(min)
      }
    })

    // console.log('eastOrNorthDates', eastOrNorthDates);

    _.forEach(eastOrNorthDates, (array, time) => {
      let minNumber = 1000000000000;
      _.forEach(array, num => {
        if (num < minNumber) {
          minNumber = num;
        }
      })

      eastOrNorthDates[time] = minNumber;
    })

    // console.log('eastOrNorthDates', eastOrNorthDates);



    //a;sdlkfja;lsdkjfal;sdjflajdsfl;ajdfl;akjsdf

    // Assign object with each key being its time
    _.forEach(westOrSouth, data => {
      const today = new Date()
      const todayDate = today.getDate();
      const d = new Date(data.UploadTime);
      const date = d.getDate();

      if (todayDate === date) {
        westOrSouthDates[data.UploadTime] = []
      }
    })

    // console.log('westOrSouthDates', westOrSouthDates);

    _.forEach(westOrSouth, data => {
      let min = '';
      min = data.Min
      if (!data.Min) {
        min = '0'
      }

      if (data.Min == 'BRD' || data.Min == 'ARR') {
        min = '0'
      }

      if (westOrSouthDates[data.UploadTime]) {
        westOrSouthDates[data.UploadTime].push(min)
      }
    })

    // console.log('westOrSouthDates', westOrSouthDates);

    _.forEach(westOrSouthDates, (array, time) => {
      let minNumber = 1000000000000;
      _.forEach(array, num => {
        if (num < minNumber) {
          minNumber = num;
        }
      })

      westOrSouthDates[time] = minNumber;
    })

    // console.log('westOrSouthDates', westOrSouthDates);

    _.forEach(combinedDates, (blank, time) => {
      combinedDates[time] = {
        east: eastOrNorthDates[time],
        west: westOrSouthDates[time]
      }
    })

    // console.log('combinedDates: ', combinedDates);

    _.forEach(combinedDates, (object, time) => {
      dataProvider.push({
        date: time,
        east: object.east,
        west: object.west
      })
    })


    return dataProvider;
  }

  generateGraph() {
    const graphArray = [];

    // Generate First Graph
    const graph = {
      "id": "g1",
      "type": "line",
      "title": "East",
      "valueField": "east",
      "lineAlpha": 1
    }

    graphArray.push(graph)

    return graphArray;
  }

  render() {
    const config = {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": true
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [
        {
          "id": "g1",
          "balloon":{
            "drop": true,
            "adjustBorderColor": false,
            "color":"#ffffff"
          },
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "east",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        },
        {
          "id": "g2",
          "balloon":{
            "drop": true,
            "adjustBorderColor": false,
            "color":"#ffffff"
          },
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "west",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }
      ],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color":"#AAAAAA"
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable": true,
        "categoryBalloonDateFormat": "JJ:NN, DD MMMM"
      },
      // "valueScrollbar":{
      //   "oppositeAxis": false,
      //   "offset":50,
      //   "scrollbarHeight":10
      // },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "minPeriod": "mm",
        "dashLength": 1,
        // "minorGridEnabled": true
      },
      "dataProvider": this.generateData()
    };

    return (
      <div style={{height: '100%', width: '100%'}}>
        <AmCharts.React
          style={{
            width: "100%",
            height: "500px"
          }}
          options={config}
        />
      </div>
    )
  }
}

export default TodaysWaitLineChartEastWest;
