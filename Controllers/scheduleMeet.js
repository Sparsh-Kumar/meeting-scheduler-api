const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const { meetingDate } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'MeetingDates'));

const scheduleMeet = async (req, res) => {
  try {
    const { date, startTime, endTime } = _.pick(req.body, ['date', 'startTime', 'endTime']);
    if(!date) {
      throw new Error('Date is necessary.');
    }
    if(!startTime) {
      throw new Error('Start time is required.');
    }
    if(!endTime) {
      throw new Error('End time is required.');
    }

    const queryObj = {
      dateValue: date,
      startTime: Number(moment(date + startTime, 'DD/MM/YYYY HH:mm')),
      endTime: Number(moment(date + endTime, 'DD/MM/YYYY HH:mm')),
    }

    const dayStartTime = Number(moment(date + process.env.STARTTIME, 'DD/MM/YYYY HH:mm'));
    const dayendTime = Number(moment(date + process.env.ENDTIME, 'DD/MM/YYYY HH:mm'));

    const allMeetings = await meetingDate.find({ dateValue: date }).lean();
    for(let meeting of allMeetings) {
      if(
        (queryObj.startTime <= meeting.startTime && queryObj.startTime <= meeting.endTime && queryObj.endTime >= meeting.startTime && queryObj.endTime <= meeting.endTime) ||
        (queryObj.startTime >= meeting.startTime && queryObj.startTime <= meeting.endTime && queryObj.endTime >= meeting.startTime && queryObj.endTime <= meeting.endTime) ||
        (queryObj.startTime >= meeting.startTime && queryObj.startTime <= meeting.endTime && queryObj.endTime >= meeting.startTime && queryObj.endTime >= meeting.endTime) ||
        (queryObj.startTime === meeting.startTime && queryObj.endTime === meeting.endTime) || 
        (queryObj.startTime < dayStartTime || queryObj.endTime > dayendTime)
        ) {
          throw new Error('Already occupied');
        }
    }

    const createdMeet = await meetingDate.create(queryObj);
    return res.status(200).send(createdMeet);

  } catch(e) {
    return res.status(400).send({
      status: 'failure',
      message: e.message,
    })
  }
}

module.exports = {
  scheduleMeet,
}
