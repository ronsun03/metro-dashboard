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
import historicalData from '../internal-data/populartimes'

class CrowdingDataChart extends Component {
  generateData() {
    const { predictedDataSet, stationKeyArray } = this.props;
    const newObject = {};
    let stationKey = '';
    const dataProvider = [];

    const d = new Date();
    const today = d.getDay()

    _.forEach(predictedDataSet, (array, stationKey) => {
      _.forEach(array, (predictedDataPoint, hourIndex) => {
        const today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
        var currentHour = today.getHours();
        const hour = new Date(yyyy, mm, dd, hourIndex);
        dataProvider.push({
          time: hour,
          predictedPercent: predictedDataPoint,
          color: currentHour == hourIndex ? '#639BAD' : '#A5C8D4'
        })
      })
    })

    // _.forEach(predictedData, station => {
    //   const crowdData = station[0];
    //   stationKey = station[0].stationkey;
    //   delete station[0].stationkey;
    //
    //   _.forEach(station[0], (crowds, day) => {
    //     const array = JSON.parse(crowds)
    //     newObject[day] = array;
    //   })
    // })
    //
    //
    // if (today == 0) {
    //   const array = newObject.sunday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 1) {
    //   const array = newObject.monday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 2) {
    //   const array = newObject.tuesday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 3) {
    //   const array = newObject.wednesday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 4) {
    //   const array = newObject.thursday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 5) {
    //   const array = newObject.friday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }
    // if (today == 6) {
    //   const array = newObject.saturday;
    //   _.forEach(array, (percent, key) => {
    //     const today = new Date()
    //     var dd = today.getDate();
    //     var mm = today.getMonth();
    //     var yyyy = today.getFullYear();
    //     var currentHour = today.getHours();
    //     const hour = new Date(yyyy, mm, dd, key);
    //     dataProvider.push({
    //       time: hour,
    //       predictedPercent: percent,
    //       color: currentHour == key ? '#639BAD' : '#A5C8D4'
    //     })
    //   })
    // }

    let stationHistoricalData = {};

    _.forEach(stationKeyArray, (stationKey) => {
      _.forEach(historicalData, object => {
        if (object.stationkey == stationKey) {
          stationHistoricalData = object;
        }
      })
    });

    const todayStationHistoricalData = stationHistoricalData[today]

    _.forEach(dataProvider, (data, i) => {
      dataProvider[i].historicalPercent = todayStationHistoricalData[i]
    })
    return dataProvider;
  }

  render() {
    const config = {
      "type": "serial",
      "theme": "light",
      "legend": {
        "horizontalGap": 10,
        "maxColumns": 1,
        "position": "top",
        "useGraphSettings": true,
        "markerSize": 10,
        "marginTop": 20
      },
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": false,
        "unit": "%"
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [
        {
          "id": "g1",
          "balloon":{
            "drop": false,
            "adjustBorderColor": false,
            "color":"#ffffff"
          },
          "fillAlphas": 1,
          "lineAlpha": 0,
          "lineThickness": 2,
          "title": "Historical Crowding",
          "valueField": "historicalPercent",
          "colorField": "color",
          "balloonText": "<span style='font-size:18px;'>[[value]]%</span>",
          "type": "column"
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
          "lineColor": "#FF5229",
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "Predicted Crowding",
          "useLineColorForBulletBorder": true,
          "valueField": "predictedPercent",
          "balloonText": "<span style='font-size:18px;'>[[value]]%</span>"
        }
      ],
      // "chartScrollbar": {
      //   "graph": "g1",
      //   "oppositeAxis": false,
      //   "offset":30,
      //   "scrollbarHeight": 80,
      //   "backgroundAlpha": 0,
      //   "selectedBackgroundAlpha": 0.1,
      //   "selectedBackgroundColor": "#888888",
      //   "graphFillAlpha": 0,
      //   "graphLineAlpha": 0.5,
      //   "selectedGraphFillAlpha": 0,
      //   "selectedGraphLineAlpha": 1,
      //   "autoGridCount": true,
      //   "color":"#AAAAAA"
      // },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable": true,
        "categoryBalloonDateFormat": "JJ:NN"
      },
      // "valueScrollbar":{
      //   "oppositeAxis": false,
      //   "offset":50,
      //   "scrollbarHeight":10
      // },
      "categoryField": "time",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minPeriod": "hh",
        "minorGridEnabled": true
      },
      "dataProvider": this.generateData()
    };

    return (
      <div style={{height: '100%', width: '100%'}}>
        <AmCharts.React
          style={{
            width: "99%",
            height: "500px"
          }}
          options={config}
        />
      </div>
    )
  }
}

export default CrowdingDataChart;
