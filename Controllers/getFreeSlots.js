const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const { meetingDate } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'MeetingDates'));

const getFreeSlots = async(req, res) => {
  try {
    const { date } = _.pick(req.body, ['date']);
    const freeSlots = [];

    const allMeetings = await meetingDate.find({ dateValue: date }).sort({ startTime: 1 }).lean();

    const dayStartTime = Number(moment(date + process.env.STARTTIME, 'DD/MM/YYYY HH:mm'));
    const dayendTime = Number(moment(date + process.env.ENDTIME, 'DD/MM/YYYY HH:mm'));

    const firstMeetingStartTime = allMeetings[0].startTime;
    const lastMeetingEndTime = allMeetings[allMeetings.length -  1].endTime;

    if ((firstMeetingStartTime - dayStartTime) > 0) {
      freeSlots.push({
        from: dayStartTime,
        to: firstMeetingStartTime,
      });
    }

    if ((dayendTime - lastMeetingEndTime) > 0) {
      freeSlots.push({
        from: lastMeetingEndTime,
        to: dayendTime,
      })
    }

    for (let slot of freeSlots) {
      slot.from = moment(slot.from).format('DD/MM/YYYY HH:mm');
      slot.to = moment(slot.to).format('DD/MM/YYYY HH:mm');
    }
    return res.status(200).send(freeSlots);
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
