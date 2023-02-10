import parse from 'date-fns/parse';
import addMinutes from 'date-fns/addMinutes';

function makeCalendarDateTime(date, time) {
  const datetime = `${date} ${time}:00`;
  const startDate = parse(datetime, 'dd/MM/yyyy HH:mm:ss', new Date());
  const endDate = addMinutes(startDate, 30);
  return { startDate, endDate };
}

function addEvent(booking) {
  const {
    salon_name: salonName,
    salon_address: salonAddress,
    service_date: serviceDate,
    service_time: serviceTime,
  } = booking;

  const bookingDate = makeCalendarDateTime(serviceDate, serviceTime);

  const { startDate, endDate } = bookingDate;
  const title = 'Lịch làm đẹp - iSalon';
  const eventLocation = salonName;
  const notes = salonAddress;

  const calOptions = window.plugins.calendar.getCalendarOptions();
  calOptions.firstReminderMinutes = 30;
  calOptions.secondReminderMinutes = 5;

  const success = () => {
    // eslint-disable-next-line no-alert
    // alert("Lịch làm đẹp đã được tạo trong ");
  };
  const error = () => {
    // eslint-disable-next-line no-alert
    // alert(`Error: ${message}`);
  };

  window.plugins.calendar.createEventWithOptions(
    title,
    eventLocation,
    notes,
    startDate,
    endDate,
    calOptions,
    success,
    error,
  );
}

export default { addEvent };
