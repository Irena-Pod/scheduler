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
};

export function getInterview(state, interview) {
  const newInterview = {};
  const interviewers = state.interviewers;
  const appointments = state.appointments

  for (const app in appointments) {
    if (appointments[app].interview && appointments[app].interview === interview) {
      newInterview["student"] = appointments[app].interview.student
      newInterview["interviewer"] = interviewers[appointments[app].interview.interviewer];
      return newInterview
    }
  }
  return null;
};