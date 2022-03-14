const Router = require('express').Router();
const path = require('path');
const { scheduleMeet } = require(path.resolve(__dirname, '..', 'Controllers', 'scheduleMeet'));
const { getFreeSlots } = require(path.resolve(__dirname, '..', 'Controllers', 'getFreeSlots'));
const { getAllSlots } = require(path.resolve(__dirname, '..', 'Controllers', 'getAllSlots'));

// schedule a meeting on a given date.
Router.post('/schedule', scheduleMeet);

// give free slots for particular date
Router.post('/freeslots', getFreeSlots);

// get list of all time slots for a particular date
Router.post('/getallslots', getAllSlots);

module.exports = {
  Router,
}
