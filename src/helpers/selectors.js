export function getAppointmentsForDay(state, day) {

  if (!state.days || !state.appointments) return [];

  const selectedDay = state.days.filter(currentDay => currentDay.name === day)[0];

  if (!selectedDay) return [];
  
  const appointmentIdsForDay = selectedDay.appointments;

  let appointmentsForDay = [];

  for (const app in state.appointments) {
    if (appointmentIdsForDay.includes(state.appointments[app].id)) {
      appointmentsForDay.push(state.appointments[app])
    }
  }

  return appointmentsForDay;
};

export function getInterviewersForDay(state, day) {

  if (!state.days || !state.appointments) return [];

  const selectedDay = state.days.filter(currentDay => currentDay.name === day)[0];

  if (!selectedDay) return [];
  
  const interviewerIdsForDay = selectedDay.interviewers;

  let interviewersForDay = [];

  for (const app in state.interviewers) {
    if (interviewerIdsForDay.includes(state.interviewers[app].id)) {
      interviewersForDay.push(state.interviewers[app])
    }
  }

  return interviewersForDay;
};

export function getInterview(state, interview) {

  if (!interview) return null;

  let interviewData = {
    student: interview.student, 
    interviewer: {...state.interviewers[String(interview.interviewer)]}
  };

  return interviewData;

};

export default { getAppointmentsForDay, getInterview, getInterviewersForDay };