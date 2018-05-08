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

class AverageWaitLineChartNorthSouth extends Component {
  generateData() {
    const eastOrNorth = this.props.dataEastOrNorth;
    const westOrSouth = this.props.dataWestOrSouth;

    const dateEastOrNorth = {};
    const finalEastOrNorth = {};

    // Assign object with each key being its date
    _.forEach(eastOrNorth, data => {
      dateEastOrNorth[data.date] = 0;
    })

    // Get average boarding times of all times for that date
    _.forEach(dateEastOrNorth, (info, date) => {
      let total = 0;
      let count = 0;
      _.forEach(eastOrNorth, data => {
        if (data.date == date) {
          total = total + data.boardingtimes;
          count++;
        }
      })
      finalEastOrNorth[date] = total / count;
    })

    // console.log('finalEastOrNorth: ', finalEastOrNorth);
    // console.log('size finalEastOrNorth: ', _.size(finalEastOrNorth));

    const dateWestOrSouth = {};
    const finalWestOrSouth = {};

    // Assign object with each key being its date
    _.forEach(westOrSouth, data => {
      dateWestOrSouth[data.date] = 0;
    })

    // Get average boarding times of all times for that date
    _.forEach(dateWestOrSouth, (info, date) => {
      let total = 0;
      let count = 0;
      _.forEach(westOrSouth, data => {
        if (data.date == date) {
          total = total + data.boardingtimes;
          count++;
        }
      })
      finalWestOrSouth[date] = total / count;
    })

    // console.log('finalWestOrSouth: ', finalWestOrSouth);
    // console.log('size finalWestOrSouth: ', _.size(finalWestOrSouth));

    // Combine two objects into one by time
    const finalCombinedData = {};
    _.forEach(finalEastOrNorth, (data, time) => {
      finalCombinedData[time] = {
        north: '',
        south: ''
      }
    })

    _.forEach(finalEastOrNorth, (data, time) => {
      finalCombinedData[time].north = data.toFixed(1)
    })

    _.forEach(finalWestOrSouth, (data, time) => {
      finalCombinedData[time].south = data.toFixed(1)
    })

    // Create data providers for chart
    const dataProvider = [];

    _.forEach(finalCombinedData, (data, time) => {
      const d = new Date(time)
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const year = d.getFullYear();

      dataProvider.push({
        "date": `${month}/${day}/${year}`,
        "north": data.north,
        "south": data.south
      });
    });

    return dataProvider;
  }

  generateGraph() {
    const graphArray = [];

    // Generate First Graph
    const graph = {
      "id": "g1",
      "type": "line",
      "title": "North-South",
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
          "title": "Northbound",
          "useLineColorForBulletBorder": true,
          "valueField": "north",
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
          "title": "Southbound",
          "useLineColorForBulletBorder": true,
          "valueField": "south",
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
        "valueZoomable": true
      },
      // "valueScrollbar":{
      //   "oppositeAxis": false,
      //   "offset":50,
      //   "scrollbarHeight":10
      // },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
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

export default AverageWaitLineChartNorthSouth;
