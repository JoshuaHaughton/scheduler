import React from "react";

export default function getAppointmentsForDay(state, day) {

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
