import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


function Application(props) {

  const [state, setState] = useState({
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
  });

  useEffect(() => {
    //   axios.get('http://localhost:8001/api/days').then(response => /*setDays*/(response.data));
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
    }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const appArray = dailyAppointments.map(app => {
    const interview = getInterview(state, app.interview);

      return <Appointment {...app} key={app.id} interview={interview}/>
});


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appArray}
      </section>
    </main>
  );
}
export default Application;