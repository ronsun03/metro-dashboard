import config from './config'

// Accept array of data and returns an object with sorts by station code
exports.stationDataToObjectByLocationCode = (array, codeName) => {
  console.log('in code');
  const stationObject = {};
  stationObject.A01 = [];
  stationObject.A02 = [];
  stationObject.A03 = [];
  stationObject.A04 = [];
  stationObject.A05 = [];
  stationObject.A06 = [];
  stationObject.A07 = [];
  stationObject.A08 = [];
  stationObject.A09 = [];
  stationObject.A10 = [];
  stationObject.A11 = [];
  stationObject.A12 = [];
  stationObject.A13 = [];
  stationObject.A14 = [];
  stationObject.A15 = [];
  stationObject.B01 = [];
  stationObject.B02 = [];
  stationObject.B03 = [];
  stationObject.B04 = [];
  stationObject.B05 = [];
  stationObject.B06 = [];
  stationObject.B07 = [];
  stationObject.B08 = [];
  stationObject.B09 = [];
  stationObject.B10 = [];
  stationObject.B11 = [];
  stationObject.B35 = [];
  stationObject.C01 = [];
  stationObject.C02 = [];
  stationObject.C03 = [];
  stationObject.C04 = [];
  stationObject.C05 = [];
  stationObject.C06 = [];
  stationObject.C07 = [];
  stationObject.C08 = [];
  stationObject.C09 = [];
  stationObject.C10 = [];
  stationObject.C12 = [];
  stationObject.C14 = [];
  stationObject.C13 = [];
  stationObject.C15 = [];
  stationObject.D01 = [];
  stationObject.D02 = [];
  stationObject.D03 = [];
  stationObject.D04 = [];
  stationObject.D05 = [];
  stationObject.D06 = [];
  stationObject.D07 = [];
  stationObject.D08 = [];
  stationObject.D09 = [];
  stationObject.D10 = [];
  stationObject.D11 = [];
  stationObject.D12 = [];
  stationObject.D13 = [];
  stationObject.E01 = [];
  stationObject.E02 = [];
  stationObject.E03 = [];
  stationObject.E04 = [];
  stationObject.E05 = [];
  stationObject.E06 = [];
  stationObject.E07 = [];
  stationObject.E08 = [];
  stationObject.E09 = [];
  stationObject.E10 = [];
  stationObject.F01 = [];
  stationObject.F03 = [];
  stationObject.F02 = [];
  stationObject.F04 = [];
  stationObject.F05 = [];
  stationObject.F06 = [];
  stationObject.F07 = [];
  stationObject.F08 = [];
  stationObject.F09 = [];
  stationObject.F10 = [];
  stationObject.F11 = [];
  stationObject.G01 = [];
  stationObject.G02 = [];
  stationObject.G03 = [];
  stationObject.G04 = [];
  stationObject.G05 = [];
  stationObject.J02 = [];
  stationObject.J03 = [];
  stationObject.K01 = [];
  stationObject.K02 = [];
  stationObject.K03 = [];
  stationObject.K04 = [];
  stationObject.K05 = [];
  stationObject.K06 = [];
  stationObject.K07 = [];
  stationObject.K08 = [];
  stationObject.N01 = [];
  stationObject.N02 = [];
  stationObject.N03 = [];
  stationObject.N04 = [];
  stationObject.N06 = [];
  _.forEach(array, data => {
    if (data[codeName] == 'A01') stationObject.A01.push(data);
    if (data[codeName] == 'A02') stationObject.A02.push(data);
    if (data[codeName] == 'A03') stationObject.A03.push(data);
    if (data[codeName] == 'A04') stationObject.A04.push(data);
    if (data[codeName] == 'A05') stationObject.A05.push(data);
    if (data[codeName] == 'A06') stationObject.A06.push(data);
    if (data[codeName] == 'A07') stationObject.A07.push(data);
    if (data[codeName] == 'A08') stationObject.A08.push(data);
    if (data[codeName] == 'A09') stationObject.A09.push(data);
    if (data[codeName] == 'A10') stationObject.A10.push(data);
    if (data[codeName] == 'A11') stationObject.A11.push(data);
    if (data[codeName] == 'A12') stationObject.A12.push(data);
    if (data[codeName] == 'A13') stationObject.A13.push(data);
    if (data[codeName] == 'A14') stationObject.A14.push(data);
    if (data[codeName] == 'A15') stationObject.A15.push(data);

    if (data[codeName] == 'B01') stationObject.B01.push(data);
    if (data[codeName] == 'B02') stationObject.B02.push(data);
    if (data[codeName] == 'B03') stationObject.B03.push(data);
    if (data[codeName] == 'B04') stationObject.B04.push(data);
    if (data[codeName] == 'B05') stationObject.B05.push(data);
    if (data[codeName] == 'B06') stationObject.B06.push(data);
    if (data[codeName] == 'B07') stationObject.B07.push(data);
    if (data[codeName] == 'B08') stationObject.B08.push(data);
    if (data[codeName] == 'B09') stationObject.B09.push(data);
    if (data[codeName] == 'B10') stationObject.B10.push(data);
    if (data[codeName] == 'B11') stationObject.B11.push(data);
    if (data[codeName] == 'B35') stationObject.B35.push(data);

    if (data[codeName] == 'C01') stationObject.C01.push(data);
    if (data[codeName] == 'C02') stationObject.C02.push(data);
    if (data[codeName] == 'C03') stationObject.C03.push(data);
    if (data[codeName] == 'C04') stationObject.C04.push(data);
    if (data[codeName] == 'C05') stationObject.C05.push(data);
    if (data[codeName] == 'C06') stationObject.C06.push(data);
    if (data[codeName] == 'C07') stationObject.C07.push(data);
    if (data[codeName] == 'C08') stationObject.C08.push(data);
    if (data[codeName] == 'C09') stationObject.C09.push(data);
    if (data[codeName] == 'C10') stationObject.C10.push(data);
    if (data[codeName] == 'C12') stationObject.C12.push(data);
    if (data[codeName] == 'C13') stationObject.C13.push(data);
    if (data[codeName] == 'C14') stationObject.C14.push(data);
    if (data[codeName] == 'C15') stationObject.C15.push(data);

    if (data[codeName] == 'D01') stationObject.D01.push(data);
    if (data[codeName] == 'D02') stationObject.D02.push(data);
    if (data[codeName] == 'D03') stationObject.D03.push(data);
    if (data[codeName] == 'D04') stationObject.D04.push(data);
    if (data[codeName] == 'D05') stationObject.D05.push(data);
    if (data[codeName] == 'D06') stationObject.D06.push(data);
    if (data[codeName] == 'D07') stationObject.D07.push(data);
    if (data[codeName] == 'D08') stationObject.D08.push(data);
    if (data[codeName] == 'D09') stationObject.D09.push(data);
    if (data[codeName] == 'D10') stationObject.D10.push(data);
    if (data[codeName] == 'D11') stationObject.D11.push(data);
    if (data[codeName] == 'D12') stationObject.D12.push(data);
    if (data[codeName] == 'D13') stationObject.D13.push(data);

    if (data[codeName] == 'E01') stationObject.E01.push(data);
    if (data[codeName] == 'E02') stationObject.E02.push(data);
    if (data[codeName] == 'E03') stationObject.E03.push(data);
    if (data[codeName] == 'E04') stationObject.E04.push(data);
    if (data[codeName] == 'E05') stationObject.E05.push(data);
    if (data[codeName] == 'E06') stationObject.E06.push(data);
    if (data[codeName] == 'E07') stationObject.E07.push(data);
    if (data[codeName] == 'E08') stationObject.E08.push(data);
    if (data[codeName] == 'E09') stationObject.E09.push(data);
    if (data[codeName] == 'E10') stationObject.E10.push(data);

    if (data[codeName] == 'F01') stationObject.F01.push(data);
    if (data[codeName] == 'F02') stationObject.F02.push(data);
    if (data[codeName] == 'F03') stationObject.F03.push(data);
    if (data[codeName] == 'F04') stationObject.F04.push(data);
    if (data[codeName] == 'F05') stationObject.F05.push(data);
    if (data[codeName] == 'F06') stationObject.F06.push(data);
    if (data[codeName] == 'F07') stationObject.F07.push(data);
    if (data[codeName] == 'F08') stationObject.F08.push(data);
    if (data[codeName] == 'F09') stationObject.F09.push(data);
    if (data[codeName] == 'F10') stationObject.F10.push(data);
    if (data[codeName] == 'F11') stationObject.F11.push(data);

    if (data[codeName] == 'G01') stationObject.G01.push(data);
    if (data[codeName] == 'G02') stationObject.G02.push(data);
    if (data[codeName] == 'G03') stationObject.G03.push(data);
    if (data[codeName] == 'G04') stationObject.G04.push(data);
    if (data[codeName] == 'G05') stationObject.G05.push(data);

    if (data[codeName] == 'J02') stationObject.J02.push(data);
    if (data[codeName] == 'J03') stationObject.J03.push(data);

    if (data[codeName] == 'K01') stationObject.K01.push(data);
    if (data[codeName] == 'K02') stationObject.K02.push(data);
    if (data[codeName] == 'K03') stationObject.K03.push(data);
    if (data[codeName] == 'K04') stationObject.K04.push(data);
    if (data[codeName] == 'K05') stationObject.K05.push(data);
    if (data[codeName] == 'K06') stationObject.K06.push(data);
    if (data[codeName] == 'K07') stationObject.K07.push(data);
    if (data[codeName] == 'K08') stationObject.K08.push(data);

    if (data[codeName] == 'N01') stationObject.N01.push(data);
    if (data[codeName] == 'N02') stationObject.N02.push(data);
    if (data[codeName] == 'N03') stationObject.N03.push(data);
    if (data[codeName] == 'N04') stationObject.N04.push(data);
    if (data[codeName] == 'N06') stationObject.N06.push(data);
  });
  return stationObject;
};

// Accepts a station code in String form and returns the stations information
exports.stationInformationByCode = (code) => {
  const stations = config.stationInformation;
  let stationMatch;
  _.forEach(stations, station => {
    if (station.Code == code) {
      stationMatch = station;
      return false;
    }
  })

  return stationMatch;
};
