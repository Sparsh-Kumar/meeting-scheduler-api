const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const { meetingDate } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'MeetingDates'));

const getFreeSlots = async(req, res) => {
  try {
    const { date } = _.pick(req.body, ['date']);
    const allMeetings = await meetingDate.find({ dateValue: date }).lean();
    return res.status(200).send(allMeetings);
  } catch(e) {
    return res.status(400).send({
      status: 'failure',
      message: e.message,
    })
  }
}

module.exports = {
  getFreeSlots,
}
