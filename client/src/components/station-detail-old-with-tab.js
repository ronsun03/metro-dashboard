import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import config from '../actions/config'
import commonFunctions from '../actions/common_functions'
import * as actions from '../actions'
import common from '../actions/common_functions';

class StationDetail extends Component {
  state = {
    stationNameFull: this.props.params.stationName.split('_').join(' '),
    stationCodes: [],
    stationTrainData: {}
  }

  componentWillMount() {
    this.props.fetchStationDetailPredictions(this.props.params.stationName.split('_').join(' '));
  }

  renderLineTabs() {
    const data = this.props.stationDetailPredictions;
    const { stationInformationByCode } = commonFunctions;
    const listArray = [];
    let boolean = true;

    _.forEach(data, (array, stationCode) => {
      const stationInfo = stationInformationByCode(stationCode);
      listArray.push(
        <li className="nav-item">
          <a className={boolean ? 'nav-link active show' : 'nav-link'} id={`pills-${stationInfo.LineCode1}-tab`} data-toggle="pill" href={`#pills-${stationInfo.LineCode1}`} role="tab" aria-controls={`pills-${stationInfo.LineCode1}`} aria-selected={boolean}>{stationInfo.LineCode1}</a>
        </li>
      );
      boolean = false;
    })

    return (listArray)
  }

  renderLineTabContent() {
    const data = this.props.stationDetailPredictions;
    console.log(data);
    const { stationInformationByCode } = commonFunctions;
    const tabContentArray = [];
    let boolean = true;

    _.forEach(data, (object, stationCode) => {
      console.log('object: ', object);
      const stationInfo = stationInformationByCode(stationCode);
      tabContentArray.push(
        <div className={boolean ? "tab-pane fade show active" : "tab-pane fade"} id={`pills-${stationInfo.LineCode1}`} role="tabpanel" aria-labelledby={`pills-${stationInfo.LineCode1}-tab`}>{stationInfo.LineCode1} Content</div>
      )
      boolean = false;
    })

    return (tabContentArray)

    // return ([
    //   <div className="tab-pane fade show active" id="pills-RD" role="tabpanel" aria-labelledby="pills-RD-tab">RD content</div>,
    //   <div className="tab-pane fade" id="pills-BL" role="tabpanel" aria-labelledby="pills-BL-tab">BL Content</div>
    // ])
  }

  render() {
    // this.reformatObject();

    return (
      <div>
        <div className="row"><h1>{this.state.stationNameFull}</h1></div>
        <hr />
        <div className="row">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ width: '100%' }}>
            {this.renderLineTabs()}
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {this.renderLineTabContent()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stationDetailPredictions: state.fetch.stationDetailPredictions,
  }
}

export default connect(mapStateToProps, actions)(StationDetail);
