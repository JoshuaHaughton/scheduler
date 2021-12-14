import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  }/*{
    day: "Monday",
    days: ["Monday"],
    interviewers: {},
    appointments: {},
    appointmentsArray: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer:{
            id: 3,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 3,
        time: "2pm",
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Archie Andrews",
          interviewer:{
            id: 4,
            name: "Cohana Roy",
            avatar: "https://i.imgur.com/FK8V841.jpg",
          }
        }
      },
      {
        id: 5,
        time: "4pm",
      }
    ]
  }*/)

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log(all[0]);
      console.log(all[1]);
      console.log(all[2]); 
    
      const [first, second, third] = all;


      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}));
    })
    }, [setState]);


  const setDay = day => setState(prev => ({ ...prev, day }));

  function updateSpots(appId, newState) {
    console.log('s', newState);
  
    // let newSpots;
    let dayId = null;
   

    for (let day of newState.days) {
      if (day.appointments.includes(appId)) {
        dayId = day.id;
        break;
      }
    }
  
    console.log('dayId', dayId);

    let spotCount = 5;

    for (let app of newState.days[dayId - 1].appointments) {
      if (newState.appointments[app].interview !== null) {
        spotCount -= 1;
      }
    }

    // let spotsRemaining = 5 - spotCount;

    console.log('spotcount', spotCount);

    if (!newState.days[dayId - 1]) return;

      const day = {
        ...newState.days[dayId - 1],
        spots: spotCount
      }
      
      const days = [
        ...newState.days
      ];
      console.log('DAYS', days);
      days[dayId - 1] = day;

      console.log('axios update time!', day, days, dayId, appId);

      return days;
  }

  let newDays = null;

  function bookInterview(id, interview) {
    console.log('book interview time: ', id, interview);

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

    console.log('axios time!', appointment, id);

    return(axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(response => {
      setState({
        ...state,
        appointments: appointments,
        days: newDay
      })
      console.log('NEWDAYS', newDays)
      
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
    }))
  }

  function cancelInterview(id) {
    console.log('Appointment id of : ', id);

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

  
  console.log('axios delete time!');

  return(axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment.interview)
  .then(response => {
    setState({
      ...state,
      appointments: appointments,
      days: newDay
    });
    console.log("D-Status: ", response.status);
    console.log("D-Data: ", response.data);
  }));

    
  }

return { state, setDay, bookInterview, cancelInterview, updateSpots }


}