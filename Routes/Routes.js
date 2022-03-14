const Router = require('express').Router();
const path = require('path');
const { scheduleMeet } = require(path.resolve(__dirname, '..', 'Controllers', 'scheduleMeet'));
const { getFreeSlots } = require(path.resolve(__dirname, '..', 'Controllers', 'getFreeSlots'));

// schedule a meeting on a given date.
Router.post('/schedule', scheduleMeet);

// give free slots for particular date
Router.post('/freeslots', getFreeSlots);

module.exports = {
  Router,
}
