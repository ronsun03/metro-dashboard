var mysql = require('mysql');
var _ = require('lodash');

exports.fetchTrainPredictions = function(req, res, next) {
  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * from TrainPredictionsWMATA WHERE (LocationCode,UploadTime) IN ( SELECT LocationCode, MAX(UploadTime) FROM TrainPredictionsWMATA GROUP BY LocationCode);', function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}

exports.fetchTrainPredictionsAllDay = function(req, res, next) {
  const { stationCodeObject } = req.body

  console.log('stationCodeObject', stationCodeObject);

  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * from TrainPredictionsWMATA', function(err, rows, fields) {
    if (!err) {
      _.forEach(stationCodeObject, (station, stationCode) => {
        _.forEach(rows, row => {
          if (stationCode === row.LocationCode) {
            stationCodeObject[stationCode].push(row)
          }
        })
      })

      res.json(stationCodeObject);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}

exports.fetchStationDetailAverages = function(req, res, next) {
  console.log('req.body', req.body);
  const { stationCodeObject } = req.body

  console.log('stationCodeObject', stationCodeObject);

  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * from DailyAverage', function(err, rows, fields) {
    if (!err) {
      console.log(rows);
      _.forEach(stationCodeObject, (station, stationCode) => {
        _.forEach(rows, row => {
          if (stationCode === row.LocationCode) {
            stationCodeObject[stationCode].push(row)
          }
        })
      })

      console.log('stationCodeObject', stationCodeObject);
      // console.log('TrainPredictionsWMATA: ', rows);
      res.json(stationCodeObject);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}

exports.fetchLongTermTrainPredictions = function(req, res, next) {
  const { stationCodeObject } = req.body

  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * from TrainPredictionsWMATALongTerm', function(err, rows, fields) {
    if (!err) {
      // console.log('TrainPredictionsWMATA: ', rows);
      // res.json(rows);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}

exports.fetchOperationalHealth = function(req, res, next) {
  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * FROM StationHealth WHERE (Station_Code,UploadTime) IN ( SELECT Station_Code, MAX(UploadTime) FROM StationHealth GROUP BY Station_Code)', function(err, rows, fields) {
    if (!err) {
      // console.log('StationHealth: ', rows);
      res.json(rows);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}

exports.fetchAllCrowdData = function(req, res, next) {
  var connection = mysql.createConnection({
    host     : 'metrod3.cfbbqu7kclkl.us-east-2.rds.amazonaws.com',
    user     : 'ignytegroup',
    password : 'Ignyterox!',
    database : 'metrodb'
  });

  connection.connect();

  connection.query('SELECT * FROM populartimes', function(err, rows, fields) {
    if (!err) {
      // console.log('StationHealth: ', rows);
      res.json(rows);
    } else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
}
