// const Authentication = require('./controllers/authentication');
// const passportService = require('./services/passport');
// const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

const Fetch = require('./controllers/fetch');

module.exports = function(app) {
  // app.get('/', requireAuth, function(req, res) {
  //   res.send({ message: 'Logged In' });
  // });
  // app.post('/signin', requireSignin, Authentication.signin);
  // app.post('/signup', Authentication.signup);
  app.get('/fetch-train-predictions', Fetch.fetchTrainPredictions)
  app.post('/fetch-train-predictions-all-day', Fetch.fetchTrainPredictionsAllDay)
  app.post('/fetch-long-term-train-predictions', Fetch.fetchLongTermTrainPredictions)
  app.get('/fetch-operational-health', Fetch.fetchOperationalHealth),
  app.post('/fetch-station-detail-averages', Fetch.fetchStationDetailAverages)
  app.get('/fetch-all-crowd-data', Fetch.fetchAllCrowdData)
  app.get('/test', function(req, res) {
    console.log('testing works');
    res.json({test: true})
  })
}
