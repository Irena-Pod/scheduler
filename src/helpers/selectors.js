export function getAppointmentsForDay(state, day) {
  const dayApps = state.days.filter(d => d.name === day)[0];

  const appointments = [];

  if (dayApps) {
    dayApps.appointments.forEach(id => {
      if (state.appointments[id]) {
        appointments.push(state.appointments[id])
      }
    });
  }
  return appointments;
}