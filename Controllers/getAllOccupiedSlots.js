const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const { meetingDate } = require (path.resolve(__dirname, '..', 'Database', 'Models', 'MeetingDates'));

const getAllOccupiedSlots = async (req, res) => {
  try {
    const { date } = _.pick(req.body, ['date']);
    if(!date) {
      throw new Error('Date is necessary.');
    }
    const allSlots = await meetingDate.find({ dateValue: date }).lean();
    for (let slot of allSlots) {
      slot.startTime = moment(slot.startTime).format('DD/MM/YYYY HH:mm');
      slot.endTime = moment(slot.endTime).format('DD/MM/YYYY HH:mm');
    }
    return res.status(200).send(allSlots);
  } catch (e) {
    return res.status(400).send({
      status: 'failure',
      message: e.message,
    })
  }
}

module.exports = {
  getAllOccupiedSlots,
}
