const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const { meetingDate } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'MeetingDates'));

const getFreeSlots = async(req, res) => {
  try {
    const { date } = _.pick(req.body, ['date']);
    if(!date) {
      throw new Error('Date is necessary ...');
    }

    const allMeetings = await meetingDate.find({ dateValue: date }).sort({ startTime: 1 }).lean();
    const dayStartTime = Number(moment(date + process.env.STARTTIME, 'DD/MM/YYYY HH:mm'));
    const dayendTime = Number(moment(date + process.env.ENDTIME, 'DD/MM/YYYY HH:mm'));

    console.log(allMeetings);
    const earliestTime = allMeetings[0].startTime;
    const latestTime = allMeetings[allMeetings.length - 1].endtime;

    let slotsAvailable = [];
    const startingSlotBeforeAllMeetings = dayStartTime - earliestTime;
    console.log('Starting slots');
    console.log(startingSlotBeforeAllMeetings);
    if (startingSlotBeforeAllMeetings && startingSlotBeforeAllMeetings > 0) {
      slotsAvailable.push(
        [
          Number(moment(date + process.env.STARTTIME, 'DD/MM/YYYY HH:mm')),
          Number(moment(date + earliestTime, 'DD/MM/YYYY HH:mm'))
        ]
      )
    }
    const remainingSlotAfterAllMeetings = dayendTime - latestTime;
    console.log('Remaining slots');
    console.log(remainingSlotAfterAllMeetings);
    if(remainingSlotAfterAllMeetings) {
      slotsAvailable.push(
        [
          Number(moment(date + latestTime, 'DD/MM/YYYY HH:mm')),
          Number(moment(date + process.env.ENDTIME, 'DD/MM/YYYY HH:mm'))
        ]
      )
    }

    return res.status(200).send({
      status: 'success',
      slotsAvailable,
    });

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
