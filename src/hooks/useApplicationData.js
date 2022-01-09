import { useState, useEffect } from "react";
import api from "api/api";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  useEffect(() => {
    Promise.all([
      api.get('/days'),
      api.get('/appointments'),
      api.get('/interviewers')
    ]).then((all) => {
    
      const [first, second, third] = all;

      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}));
    })
    }, [setState]);

  const setDay = day => setState(prev => ({ ...prev, day }));

  function updateSpots(appId, newState) {
    let dayId = null;
   
    for (let day of newState.days) {
      if (day.appointments.includes(appId)) {
        dayId = day.id;
        break;
      }
    }


    let spotCount = 5;

    for (let app of newState.days[dayId - 1].appointments) {
      if (newState.appointments[app].interview !== null) {
        spotCount -= 1;
      }
    }

    if (!newState.days[dayId - 1]) return;


      const day = {
        ...newState.days[dayId - 1],
        spots: spotCount
      }
      
      const days = [
        ...newState.days
      ];

      days[dayId - 1] = day;

      return days;
  }


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const temporaryNewState = {
      ...state,
      appointments
    }

    const newDay = updateSpots(id, temporaryNewState);

    return(api.put(`/appointments/${id}`, appointment)
    .then(response => {
      setState({
        ...state,
        appointments: appointments,
        days: newDay
      })
    }))
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const temporaryNewState = {
      ...state,
      appointments
    }

    const newDay = updateSpots(id, temporaryNewState);


    return(api.delete(`/appointments/${id}`, appointment.interview)
      .then(response => {
        setState({
          ...state,
          appointments: appointments,
          days: newDay
        });
    }));
  }

return { state, setDay, bookInterview, cancelInterview, updateSpots }


}